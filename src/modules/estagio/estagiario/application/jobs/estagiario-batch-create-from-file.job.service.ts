import { ValidationError } from "@/application/errors/application.error";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7";
import {
  type EstagiarioBatchCreateCommand,
  IEstagiarioBatchCreateCommandHandler,
} from "@/modules/estagio/estagiario/domain/commands";

export type EstagiarioBatchJobStatus = "PENDENTE" | "PROCESSANDO" | "CONCLUIDO" | "FALHOU";

export type EstagiarioBatchJob = {
  id: string;
  status: EstagiarioBatchJobStatus;
  totalItems: number;
  successCount: number;
  failCount: number;
  errorMessage: string | null;
  dateCreated: string;
  dateUpdated: string;
};

type EstagiarioBatchFilePayload = {
  estagiarios: EstagiarioBatchCreateCommand["estagiarios"];
};

@Impl()
export class EstagiarioBatchCreateFromFileJobService {
  readonly #jobs = new Map<string, EstagiarioBatchJob>();

  constructor(
    @Dep(IEstagiarioBatchCreateCommandHandler)
    private readonly batchCreateHandler: IEstagiarioBatchCreateCommandHandler,
  ) {}

  start(
    accessContext: IAccessContext | null,
    file: Express.Multer.File | undefined,
  ): EstagiarioBatchJob {
    if (!file) {
      throw ValidationError.fromField("file", "Arquivo é obrigatório.");
    }

    const payload = this.parseFile(file);

    const now = new Date().toISOString();
    const jobId = generateUuidV7();

    const job: EstagiarioBatchJob = {
      id: jobId,
      status: "PENDENTE",
      totalItems: payload.estagiarios.length,
      successCount: 0,
      failCount: 0,
      errorMessage: null,
      dateCreated: now,
      dateUpdated: now,
    };

    this.#jobs.set(jobId, job);

    void this.runJob(jobId, accessContext, payload);

    return { ...job };
  }

  getById(jobId: string): EstagiarioBatchJob | null {
    const job = this.#jobs.get(jobId);
    return job ? { ...job } : null;
  }

  private parseFile(file: Express.Multer.File): EstagiarioBatchFilePayload {
    const raw = file.buffer?.toString("utf-8")?.trim();

    if (!raw) {
      throw ValidationError.fromField("file", "Arquivo vazio.");
    }

    let parsed: unknown;

    try {
      parsed = JSON.parse(raw);
    } catch {
      throw ValidationError.fromField(
        "file",
        "Arquivo inválido. Envie um JSON válido com a chave 'estagiarios'.",
      );
    }

    if (
      !parsed ||
      typeof parsed !== "object" ||
      !Array.isArray((parsed as EstagiarioBatchFilePayload).estagiarios)
    ) {
      throw ValidationError.fromField(
        "file",
        "Estrutura inválida. Esperado: { estagiarios: [...] }.",
      );
    }

    return parsed as EstagiarioBatchFilePayload;
  }

  private async runJob(
    jobId: string,
    accessContext: IAccessContext | null,
    payload: EstagiarioBatchFilePayload,
  ): Promise<void> {
    const job = this.#jobs.get(jobId);
    if (!job) return;

    this.#jobs.set(jobId, {
      ...job,
      status: "PROCESSANDO",
      dateUpdated: new Date().toISOString(),
    });

    try {
      const result = await this.batchCreateHandler.execute(accessContext, {
        estagiarios: payload.estagiarios,
      });

      this.#jobs.set(jobId, {
        ...this.#jobs.get(jobId)!,
        status: "CONCLUIDO",
        successCount: result.length,
        failCount: Math.max(payload.estagiarios.length - result.length, 0),
        dateUpdated: new Date().toISOString(),
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erro desconhecido.";

      this.#jobs.set(jobId, {
        ...this.#jobs.get(jobId)!,
        status: "FALHOU",
        successCount: 0,
        failCount: payload.estagiarios.length,
        errorMessage: message,
        dateUpdated: new Date().toISOString(),
      });
    }
  }
}

import { QueryFailedError } from "typeorm";
import { Dep, Impl } from "@/domain/dependency-injection";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7";
import { getNowISO } from "@/utils/date";
import {
  IIdempotencyRecordRepository,
  type IIdempotencyRecordRepository as IIdempotencyRecordRepositoryType,
} from "./domain";
import type {
  IIdempotencyExecuteParams,
  IIdempotencyService,
} from "./idempotency.service.interface";

const POSTGRES_UNIQUE_VIOLATION = "23505";

function isUniqueViolation(error: unknown): boolean {
  return (
    error instanceof QueryFailedError &&
    (error as unknown as { code?: string }).code === POSTGRES_UNIQUE_VIOLATION
  );
}

@Impl()
export class IdempotencyService implements IIdempotencyService {
  private readonly inFlight = new Map<string, Promise<unknown>>();

  constructor(
    @Dep(IIdempotencyRecordRepository)
    private readonly repository: IIdempotencyRecordRepositoryType,
  ) {}

  async execute<T>({ idempotencyKey, comando, run }: IIdempotencyExecuteParams<T>): Promise<T> {
    if (!idempotencyKey) {
      return run();
    }

    const key = `${idempotencyKey}:${comando}`;

    const running = this.inFlight.get(key);
    if (running) {
      return running as Promise<T>;
    }

    const promise = this.executeWithPersistence<T>(idempotencyKey, comando, run);
    this.inFlight.set(key, promise);

    try {
      return await promise;
    } finally {
      this.inFlight.delete(key);
    }
  }

  private async executeWithPersistence<T>(
    idempotencyKey: string,
    comando: string,
    run: () => Promise<T>,
  ): Promise<T> {
    const existing = await this.repository.findByChaveAndComando(idempotencyKey, comando);
    if (existing) {
      return existing.resultado as T;
    }

    const resultado = await run();

    try {
      await this.repository.save({
        id: generateUuidV7(),
        chave: idempotencyKey,
        comando,
        resultado,
        dateCreated: getNowISO(),
      });
    } catch (error) {
      if (isUniqueViolation(error)) {
        const concorrente = await this.repository.findByChaveAndComando(idempotencyKey, comando);
        if (concorrente) {
          return concorrente.resultado as T;
        }
      }

      throw error;
    }

    return resultado;
  }
}

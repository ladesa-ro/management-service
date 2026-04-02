import type { z } from "zod";
import { ValidationError } from "@/application/errors";
import type { IdUuid } from "@/domain/abstractions/scalars";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7";
import { zodValidate } from "@/shared/validation/index";
import { getNowISO } from "@/utils/date";
import { GerarHorarioCreateSchema, GerarHorarioSchema } from "./gerar-horario.schemas";
import { GerarHorarioDuracao, GerarHorarioStatus } from "./gerar-horario.types";

export type IGerarHorarioDomain = z.infer<typeof GerarHorarioSchema>;

export class GerarHorario {
  static readonly entityName = "GerarHorario";

  id!: IdUuid;
  status!: GerarHorarioStatus;
  duracao!: GerarHorarioDuracao;
  dataInicio!: string;
  dataTermino!: string | null;
  requisicaoGerador!: Record<string, unknown> | null;
  respostaGerador!: Record<string, unknown> | null;
  dateCreated!: string;

  calendarioLetivoIds!: string[];
  ofertaFormacaoIds!: string[];

  private constructor() {}

  static create(dados: unknown): GerarHorario {
    const parsed = zodValidate(GerarHorario.entityName, GerarHorarioCreateSchema, dados);

    const instance = new GerarHorario();

    instance.id = generateUuidV7();
    instance.status = GerarHorarioStatus.SOLICITADO;
    instance.duracao = GerarHorarioDuracao.TEMPORARIO;
    instance.dataInicio = parsed.dataInicio;
    instance.dataTermino = parsed.dataTermino ?? null;
    instance.requisicaoGerador = null;
    instance.respostaGerador = null;
    instance.dateCreated = getNowISO();

    instance.calendarioLetivoIds = parsed.calendarioLetivoIds ?? [];
    instance.ofertaFormacaoIds = parsed.ofertaFormacaoIds ?? [];

    return instance;
  }

  static load(dados: IGerarHorarioDomain): GerarHorario {
    const parsed = zodValidate(GerarHorario.entityName, GerarHorarioSchema, dados);

    const instance = new GerarHorario();

    instance.id = parsed.id;
    instance.status = parsed.status;
    instance.duracao = parsed.duracao;
    instance.dataInicio = parsed.dataInicio;
    instance.dataTermino = parsed.dataTermino;
    instance.requisicaoGerador = parsed.requisicaoGerador;
    instance.respostaGerador = parsed.respostaGerador;
    instance.dateCreated = parsed.dateCreated;

    instance.calendarioLetivoIds = parsed.calendarioLetivoIds;
    instance.ofertaFormacaoIds = parsed.ofertaFormacaoIds;

    return instance;
  }

  markAsPendente(requisicao: Record<string, unknown>): void {
    this.status = GerarHorarioStatus.PENDENTE;
    this.requisicaoGerador = requisicao;
  }

  aceitar(): void {
    if (this.status !== GerarHorarioStatus.SUCESSO) {
      throw ValidationError.fromField(
        "status",
        `Solicitacao ${this.id} nao pode ser aceita no status ${this.status}. Status esperado: SUCESSO.`,
      );
    }
    this.status = GerarHorarioStatus.ACEITO;
    this.duracao = GerarHorarioDuracao.PERMANENTE;
  }

  rejeitar(): void {
    if (this.status !== GerarHorarioStatus.SUCESSO) {
      throw ValidationError.fromField(
        "status",
        `Solicitacao ${this.id} nao pode ser rejeitada no status ${this.status}. Status esperado: SUCESSO.`,
      );
    }
    this.status = GerarHorarioStatus.REJEITADO;
  }
}

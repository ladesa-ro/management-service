import type { z } from "zod";
import type { IVersioned, ObjectUuidRef } from "@/domain/abstractions";
import type { IdUuid, ScalarDateTimeString } from "@/domain/abstractions/scalars";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7";
import { zodValidate } from "@/shared/validation/index";
import { getNowISO } from "@/utils/date";
import {
  CalendarioAgendamentoCreateSchema,
  CalendarioAgendamentoExcecaoSchema,
  CalendarioAgendamentoReviseSchema,
  CalendarioAgendamentoSchema,
} from "./calendario-agendamento.schemas";
import type { CalendarioAgendamentoTipo } from "./calendario-agendamento.types";
import { CalendarioAgendamentoStatus } from "./calendario-agendamento.types";

export type ICalendarioAgendamento = z.infer<typeof CalendarioAgendamentoSchema>;

export class CalendarioAgendamento implements IVersioned {
  static readonly entityName = "CalendarioAgendamento";

  id!: IdUuid;
  identificadorExterno!: IdUuid;
  tipo!: CalendarioAgendamentoTipo;
  dataInicio!: string;
  dataFim!: string | null;
  diaInteiro!: boolean;
  horarioInicio!: string;
  horarioFim!: string;
  repeticao!: string | null;
  status!: CalendarioAgendamentoStatus | null;

  campus!: ObjectUuidRef | null;
  colecao!: ObjectUuidRef | null;
  autorId!: IdUuid | null;
  motivo!: string | null;

  identificadorExternoSerieOrigem!: IdUuid | null;
  dataOcorrenciaReferenciada!: string | null;

  turmas!: ObjectUuidRef[];
  perfis!: ObjectUuidRef[];
  calendariosLetivos!: ObjectUuidRef[];
  ofertasFormacao!: ObjectUuidRef[];
  modalidades!: ObjectUuidRef[];
  ambientes!: ObjectUuidRef[];
  diarios!: ObjectUuidRef[];

  version!: number;
  previousVersionId!: IdUuid | null;
  validFrom!: ScalarDateTimeString;
  validTo!: ScalarDateTimeString | null;

  dateCreated!: ScalarDateTimeString;
  dateUpdated!: ScalarDateTimeString;
  dateDeleted!: ScalarDateTimeString | null;

  private constructor() {}

  static create(dados: unknown): CalendarioAgendamento {
    const parsed = zodValidate(
      CalendarioAgendamento.entityName,
      CalendarioAgendamentoCreateSchema.domain,
      dados,
    );

    const instance = new CalendarioAgendamento();

    instance.id = generateUuidV7();
    instance.identificadorExterno = generateUuidV7();
    instance.tipo = parsed.tipo;
    instance.dataInicio = parsed.dataInicio;
    instance.dataFim = parsed.dataFim ?? null;
    instance.diaInteiro = parsed.diaInteiro;
    instance.horarioInicio = parsed.horarioInicio ?? "00:00:00";
    instance.horarioFim = parsed.horarioFim ?? "23:59:59";
    instance.repeticao = parsed.repeticao ?? null;
    instance.status = parsed.status ?? null;

    instance.campus = parsed.campus ?? null;
    instance.colecao = parsed.colecao ?? null;
    instance.autorId = parsed.autorId ?? null;
    instance.motivo = parsed.motivo ?? null;
    instance.identificadorExternoSerieOrigem = null;
    instance.dataOcorrenciaReferenciada = null;

    instance.turmas = parsed.turmas ?? [];
    instance.perfis = parsed.perfis ?? [];
    instance.calendariosLetivos = parsed.calendariosLetivos ?? [];
    instance.ofertasFormacao = parsed.ofertasFormacao ?? [];
    instance.modalidades = parsed.modalidades ?? [];
    instance.ambientes = parsed.ambientes ?? [];
    instance.diarios = parsed.diarios ?? [];

    instance.version = 1;
    instance.previousVersionId = null;
    instance.validFrom = getNowISO();
    instance.validTo = null;

    instance.dateCreated = getNowISO();
    instance.dateUpdated = getNowISO();
    instance.dateDeleted = null;

    return instance;
  }

  static load(dados: ICalendarioAgendamento): CalendarioAgendamento {
    const parsed = zodValidate(
      CalendarioAgendamento.entityName,
      CalendarioAgendamentoSchema,
      dados,
    );

    const instance = new CalendarioAgendamento();

    instance.id = parsed.id;
    instance.identificadorExterno = parsed.identificadorExterno;
    instance.tipo = parsed.tipo;
    instance.dataInicio = parsed.dataInicio;
    instance.dataFim = parsed.dataFim;
    instance.diaInteiro = parsed.diaInteiro;
    instance.horarioInicio = parsed.horarioInicio;
    instance.horarioFim = parsed.horarioFim;
    instance.repeticao = parsed.repeticao;
    instance.status = parsed.status;

    instance.campus = parsed.campus;
    instance.colecao = parsed.colecao;
    instance.autorId = parsed.autorId;
    instance.motivo = parsed.motivo;
    instance.identificadorExternoSerieOrigem = parsed.identificadorExternoSerieOrigem;
    instance.dataOcorrenciaReferenciada = parsed.dataOcorrenciaReferenciada;

    instance.turmas = parsed.turmas;
    instance.perfis = parsed.perfis;
    instance.calendariosLetivos = parsed.calendariosLetivos;
    instance.ofertasFormacao = parsed.ofertasFormacao;
    instance.modalidades = parsed.modalidades;
    instance.ambientes = parsed.ambientes;
    instance.diarios = parsed.diarios;

    instance.version = parsed.version;
    instance.previousVersionId = parsed.previousVersionId;
    instance.validFrom = parsed.validFrom;
    instance.validTo = parsed.validTo;

    instance.dateCreated = parsed.dateCreated;
    instance.dateUpdated = parsed.dateUpdated;
    instance.dateDeleted = parsed.dateDeleted;

    return instance;
  }

  /**
   * Cria nova versao a partir de uma versao anterior.
   * A versao anterior deve ser encerrada via `close()` antes.
   */
  static createNewVersion(previous: CalendarioAgendamento, dados: unknown): CalendarioAgendamento {
    const parsed = zodValidate(
      CalendarioAgendamento.entityName,
      CalendarioAgendamentoReviseSchema,
      dados,
    );

    const instance = new CalendarioAgendamento();

    instance.id = generateUuidV7();
    instance.identificadorExterno = previous.identificadorExterno;
    instance.tipo = previous.tipo;

    instance.dataInicio = parsed.dataInicio ?? previous.dataInicio;
    instance.dataFim = parsed.dataFim !== undefined ? parsed.dataFim : previous.dataFim;
    instance.diaInteiro = parsed.diaInteiro ?? previous.diaInteiro;
    instance.horarioInicio = parsed.horarioInicio ?? previous.horarioInicio;
    instance.horarioFim = parsed.horarioFim ?? previous.horarioFim;
    instance.repeticao = parsed.repeticao !== undefined ? parsed.repeticao : previous.repeticao;
    instance.status = parsed.status !== undefined ? parsed.status : previous.status;

    instance.campus = parsed.campus !== undefined ? parsed.campus : previous.campus;
    instance.colecao = parsed.colecao !== undefined ? parsed.colecao : previous.colecao;
    instance.autorId = parsed.autorId !== undefined ? parsed.autorId : previous.autorId;
    instance.motivo = parsed.motivo !== undefined ? parsed.motivo : previous.motivo;
    instance.identificadorExternoSerieOrigem = previous.identificadorExternoSerieOrigem;
    instance.dataOcorrenciaReferenciada = previous.dataOcorrenciaReferenciada;

    instance.turmas = parsed.turmas ?? previous.turmas;
    instance.perfis = parsed.perfis ?? previous.perfis;
    instance.calendariosLetivos = parsed.calendariosLetivos ?? previous.calendariosLetivos;
    instance.ofertasFormacao = parsed.ofertasFormacao ?? previous.ofertasFormacao;
    instance.modalidades = parsed.modalidades ?? previous.modalidades;
    instance.ambientes = parsed.ambientes ?? previous.ambientes;
    instance.diarios = parsed.diarios ?? previous.diarios;

    instance.version = previous.version + 1;
    instance.previousVersionId = previous.id;
    instance.validFrom = getNowISO();
    instance.validTo = null;

    instance.dateCreated = getNowISO();
    instance.dateUpdated = getNowISO();
    instance.dateDeleted = null;

    return instance;
  }

  static criarExcecao(
    serieOrigem: CalendarioAgendamento,
    dataOcorrencia: string,
    dados: unknown,
  ): CalendarioAgendamento {
    const parsed = zodValidate(
      CalendarioAgendamento.entityName,
      CalendarioAgendamentoExcecaoSchema,
      dados,
    );

    const instance = new CalendarioAgendamento();

    instance.id = generateUuidV7();
    instance.identificadorExterno = generateUuidV7();
    instance.tipo = serieOrigem.tipo;

    instance.dataInicio = dataOcorrencia;
    instance.dataFim = dataOcorrencia;
    instance.diaInteiro = parsed.diaInteiro ?? serieOrigem.diaInteiro;
    instance.horarioInicio = parsed.horarioInicio ?? serieOrigem.horarioInicio;
    instance.horarioFim = parsed.horarioFim ?? serieOrigem.horarioFim;
    instance.repeticao = null;
    instance.status = parsed.status ?? serieOrigem.status;

    instance.campus = parsed.campus !== undefined ? parsed.campus : serieOrigem.campus;
    instance.colecao = parsed.colecao !== undefined ? parsed.colecao : serieOrigem.colecao;
    instance.autorId = parsed.autorId ?? null;
    instance.motivo = parsed.motivo ?? null;

    instance.identificadorExternoSerieOrigem = serieOrigem.identificadorExterno;
    instance.dataOcorrenciaReferenciada = dataOcorrencia;

    instance.turmas = parsed.turmas ?? serieOrigem.turmas;
    instance.perfis = parsed.perfis ?? serieOrigem.perfis;
    instance.calendariosLetivos = parsed.calendariosLetivos ?? serieOrigem.calendariosLetivos;
    instance.ofertasFormacao = parsed.ofertasFormacao ?? serieOrigem.ofertasFormacao;
    instance.modalidades = parsed.modalidades ?? serieOrigem.modalidades;
    instance.ambientes = parsed.ambientes ?? serieOrigem.ambientes;
    instance.diarios = parsed.diarios ?? serieOrigem.diarios;

    instance.version = 1;
    instance.previousVersionId = null;
    instance.validFrom = getNowISO();
    instance.validTo = null;

    instance.dateCreated = getNowISO();
    instance.dateUpdated = getNowISO();
    instance.dateDeleted = null;

    return instance;
  }

  static cancelarOcorrencia(
    serieOrigem: CalendarioAgendamento,
    dataOcorrencia: string,
    autorId: IdUuid | null = null,
    motivo: string | null = null,
  ): CalendarioAgendamento {
    return CalendarioAgendamento.criarExcecao(serieOrigem, dataOcorrencia, {
      status: CalendarioAgendamentoStatus.INATIVO,
      autorId,
      motivo,
    });
  }

  static adicionarDataAvulsa(
    serieOrigem: CalendarioAgendamento,
    dataOcorrencia: string,
    dados: unknown,
  ): CalendarioAgendamento {
    const instance = CalendarioAgendamento.criarExcecao(serieOrigem, dataOcorrencia, dados);
    instance.dataOcorrenciaReferenciada = null;
    return instance;
  }

  /**
   * Encerra esta versao (seta valid_to e ativo implicitamente via status).
   */
  close(): void {
    this.validTo = getNowISO();
    this.dateUpdated = getNowISO();
  }

  isActive(): boolean {
    return this.dateDeleted === null && this.validTo === null;
  }
}

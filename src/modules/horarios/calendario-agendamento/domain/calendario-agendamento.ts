import type { z } from "zod";
import type { IdUuid, ScalarDateTimeString } from "@/domain/abstractions/scalars";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7";
import { zodValidate } from "@/shared/validation/index";
import { getNowISO } from "@/utils/date";
import {
  CalendarioAgendamentoCreateSchema,
  CalendarioAgendamentoSchema,
  CalendarioAgendamentoUpdateSchema,
} from "./calendario-agendamento.schemas";
import type {
  CalendarioAgendamentoStatus,
  CalendarioAgendamentoTipo,
} from "./calendario-agendamento.types";

export type ICalendarioAgendamento = z.infer<typeof CalendarioAgendamentoSchema>;

export class CalendarioAgendamento {
  static readonly entityName = "CalendarioAgendamento";

  id!: IdUuid;
  tipo!: CalendarioAgendamentoTipo;
  dataInicio!: string;
  dataFim!: string | null;
  diaInteiro!: boolean;
  horarioInicio!: string;
  horarioFim!: string;
  repeticao!: string | null;
  nome!: string | null;
  cor!: string | null;
  status!: CalendarioAgendamentoStatus | null;

  turmaIds!: string[];
  perfilIds!: string[];
  calendarioLetivoIds!: string[];
  ofertaFormacaoIds!: string[];
  modalidadeIds!: string[];
  ambienteIds!: string[];
  diarioIds!: string[];

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
    instance.tipo = parsed.tipo;
    instance.nome = parsed.nome ?? null;
    instance.dataInicio = parsed.dataInicio;
    instance.dataFim = parsed.dataFim ?? null;
    instance.diaInteiro = parsed.diaInteiro;
    instance.horarioInicio = parsed.horarioInicio ?? "00:00:00";
    instance.horarioFim = parsed.horarioFim ?? "23:59:59";
    instance.cor = parsed.cor ?? null;
    instance.repeticao = parsed.repeticao ?? null;
    instance.status = parsed.status ?? null;

    instance.turmaIds = parsed.turmaIds ?? [];
    instance.perfilIds = parsed.perfilIds ?? [];
    instance.calendarioLetivoIds = parsed.calendarioLetivoIds ?? [];
    instance.ofertaFormacaoIds = parsed.ofertaFormacaoIds ?? [];
    instance.modalidadeIds = parsed.modalidadeIds ?? [];
    instance.ambienteIds = parsed.ambienteIds ?? [];
    instance.diarioIds = parsed.diarioIds ?? [];

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
    instance.tipo = parsed.tipo;
    instance.nome = parsed.nome;
    instance.dataInicio = parsed.dataInicio;
    instance.dataFim = parsed.dataFim;
    instance.diaInteiro = parsed.diaInteiro;
    instance.horarioInicio = parsed.horarioInicio;
    instance.horarioFim = parsed.horarioFim;
    instance.cor = parsed.cor;
    instance.repeticao = parsed.repeticao;
    instance.status = parsed.status;

    instance.turmaIds = parsed.turmaIds;
    instance.perfilIds = parsed.perfilIds;
    instance.calendarioLetivoIds = parsed.calendarioLetivoIds;
    instance.ofertaFormacaoIds = parsed.ofertaFormacaoIds;
    instance.modalidadeIds = parsed.modalidadeIds;
    instance.ambienteIds = parsed.ambienteIds;
    instance.diarioIds = parsed.diarioIds;

    instance.dateCreated = parsed.dateCreated;
    instance.dateUpdated = parsed.dateUpdated;
    instance.dateDeleted = parsed.dateDeleted;

    return instance;
  }

  update(dados: unknown): void {
    const parsed = zodValidate(
      CalendarioAgendamento.entityName,
      CalendarioAgendamentoUpdateSchema.domain,
      dados,
    );

    if (parsed.nome !== undefined) this.nome = parsed.nome;
    if (parsed.dataInicio !== undefined) this.dataInicio = parsed.dataInicio;
    if (parsed.dataFim !== undefined) this.dataFim = parsed.dataFim;
    if (parsed.diaInteiro !== undefined) this.diaInteiro = parsed.diaInteiro;
    if (parsed.horarioInicio !== undefined) this.horarioInicio = parsed.horarioInicio;
    if (parsed.horarioFim !== undefined) this.horarioFim = parsed.horarioFim;
    if (parsed.cor !== undefined) this.cor = parsed.cor;
    if (parsed.repeticao !== undefined) this.repeticao = parsed.repeticao;

    if (parsed.turmaIds !== undefined) this.turmaIds = parsed.turmaIds;
    if (parsed.perfilIds !== undefined) this.perfilIds = parsed.perfilIds;
    if (parsed.calendarioLetivoIds !== undefined)
      this.calendarioLetivoIds = parsed.calendarioLetivoIds;
    if (parsed.ofertaFormacaoIds !== undefined) this.ofertaFormacaoIds = parsed.ofertaFormacaoIds;
    if (parsed.modalidadeIds !== undefined) this.modalidadeIds = parsed.modalidadeIds;
    if (parsed.ambienteIds !== undefined) this.ambienteIds = parsed.ambienteIds;
    if (parsed.diarioIds !== undefined) this.diarioIds = parsed.diarioIds;

    this.dateUpdated = getNowISO();

    zodValidate(CalendarioAgendamento.entityName, CalendarioAgendamentoSchema, this);
  }

  isActive(): boolean {
    return this.dateDeleted === null;
  }
}

import type { ObjectUuidRef } from "@/domain/abstractions";
import { CalendarioAgendamentoFields } from "../calendario-agendamento.fields";
import type { CalendarioAgendamentoStatus } from "../calendario-agendamento.types";

export const CalendarioAgendamentoEditarOcorrenciaCommandFields = {
  dataOcorrencia: CalendarioAgendamentoFields.dataOcorrencia,
  diaInteiro: CalendarioAgendamentoFields.diaInteiro,
  horarioInicio: CalendarioAgendamentoFields.horarioInicio,
  horarioFim: CalendarioAgendamentoFields.horarioFim,
  campus: CalendarioAgendamentoFields.campus,
  colecao: CalendarioAgendamentoFields.colecao,
  motivo: CalendarioAgendamentoFields.motivo,
  turmas: CalendarioAgendamentoFields.turmas,
  perfis: CalendarioAgendamentoFields.perfis,
  calendariosLetivos: CalendarioAgendamentoFields.calendariosLetivos,
  ofertasFormacao: CalendarioAgendamentoFields.ofertasFormacao,
  modalidades: CalendarioAgendamentoFields.modalidades,
  ambientes: CalendarioAgendamentoFields.ambientes,
  diarios: CalendarioAgendamentoFields.diarios,
};

/**
 * Cria uma exceção de ocorrência (RECURRENCE-ID): a data indicada passa a ser
 * atendida por um agendamento independente, com os campos informados sobrepondo
 * os da série raiz. A série raiz não é alterada.
 */
export class CalendarioAgendamentoEditarOcorrenciaCommand {
  dataOcorrencia!: string;
  diaInteiro?: boolean;
  horarioInicio?: string;
  horarioFim?: string;
  status?: CalendarioAgendamentoStatus;
  campus?: ObjectUuidRef | null;
  colecao?: ObjectUuidRef | null;
  motivo?: string | null;

  turmas?: ObjectUuidRef[];
  perfis?: ObjectUuidRef[];
  calendariosLetivos?: ObjectUuidRef[];
  ofertasFormacao?: ObjectUuidRef[];
  modalidades?: ObjectUuidRef[];
  ambientes?: ObjectUuidRef[];
  diarios?: ObjectUuidRef[];
}

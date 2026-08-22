import type { ObjectUuidRef } from "@/domain/abstractions";
import { CalendarioAgendamentoFields } from "../calendario-agendamento.fields";
import type { CalendarioAgendamentoStatus } from "../calendario-agendamento.types";

export const CalendarioAgendamentoAdicionarDataAvulsaCommandFields = {
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
 * Adiciona uma data avulsa a uma série recorrente (RDATE): cria uma
 * ocorrência extra na data indicada, que a RRULE da série não geraria. A
 * série raiz não é alterada.
 */
export class CalendarioAgendamentoAdicionarDataAvulsaCommand {
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

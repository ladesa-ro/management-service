import type { ObjectUuidRef } from "@/domain/abstractions";
import { CalendarioAgendamentoFields } from "../calendario-agendamento.fields";
import type { CalendarioAgendamentoTipo } from "../calendario-agendamento.types";

export const CalendarioAgendamentoCreateCommandFields = {
  nome: CalendarioAgendamentoFields.nome,
  dataInicio: CalendarioAgendamentoFields.dataInicio,
  dataFim: CalendarioAgendamentoFields.dataFim,
  diaInteiro: CalendarioAgendamentoFields.diaInteiro,
  horarioInicio: CalendarioAgendamentoFields.horarioInicio,
  horarioFim: CalendarioAgendamentoFields.horarioFim,
  cor: CalendarioAgendamentoFields.cor,
  repeticao: CalendarioAgendamentoFields.repeticao,
  turmas: CalendarioAgendamentoFields.turmas,
  perfis: CalendarioAgendamentoFields.perfis,
  calendariosLetivos: CalendarioAgendamentoFields.calendariosLetivos,
  ofertasFormacao: CalendarioAgendamentoFields.ofertasFormacao,
  modalidades: CalendarioAgendamentoFields.modalidades,
  ambientes: CalendarioAgendamentoFields.ambientes,
  diarios: CalendarioAgendamentoFields.diarios,
};

export class CalendarioAgendamentoCreateCommand {
  tipo!: CalendarioAgendamentoTipo;
  nome?: string | null;
  dataInicio!: string;
  dataFim?: string | null;
  diaInteiro!: boolean;
  horarioInicio?: string;
  horarioFim?: string;
  cor?: string | null;
  repeticao?: string | null;

  turmas?: ObjectUuidRef[];
  perfis?: ObjectUuidRef[];
  calendariosLetivos?: ObjectUuidRef[];
  ofertasFormacao?: ObjectUuidRef[];
  modalidades?: ObjectUuidRef[];
  ambientes?: ObjectUuidRef[];
  diarios?: ObjectUuidRef[];
}

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
  turmaIds: CalendarioAgendamentoFields.turmaIds,
  perfilIds: CalendarioAgendamentoFields.perfilIds,
  calendarioLetivoIds: CalendarioAgendamentoFields.calendarioLetivoIds,
  ofertaFormacaoIds: CalendarioAgendamentoFields.ofertaFormacaoIds,
  modalidadeIds: CalendarioAgendamentoFields.modalidadeIds,
  ambienteIds: CalendarioAgendamentoFields.ambienteIds,
  diarioIds: CalendarioAgendamentoFields.diarioIds,
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

  turmaIds?: string[];
  perfilIds?: string[];
  calendarioLetivoIds?: string[];
  ofertaFormacaoIds?: string[];
  modalidadeIds?: string[];
  ambienteIds?: string[];
  diarioIds?: string[];
}

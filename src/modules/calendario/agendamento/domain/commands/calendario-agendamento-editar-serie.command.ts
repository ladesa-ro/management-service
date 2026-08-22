import type { ObjectUuidRef } from "@/domain/abstractions";
import { CalendarioAgendamentoFields } from "../calendario-agendamento.fields";
import type { CalendarioAgendamentoEscopoEdicaoSerie } from "../calendario-agendamento.types";

export const CalendarioAgendamentoEditarSerieCommandFields = {
  dataOcorrencia: CalendarioAgendamentoFields.dataOcorrencia,
  escopo: CalendarioAgendamentoFields.escopo,
  dataInicio: CalendarioAgendamentoFields.dataInicio,
  dataFim: CalendarioAgendamentoFields.dataFim,
  diaInteiro: CalendarioAgendamentoFields.diaInteiro,
  horarioInicio: CalendarioAgendamentoFields.horarioInicio,
  horarioFim: CalendarioAgendamentoFields.horarioFim,
  repeticao: CalendarioAgendamentoFields.repeticao,
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
 * Edita uma série recorrente a partir de uma data de referência, com dois
 * alcances possíveis:
 * - TODAS: aplica as mudanças à série inteira (nova versão da raiz).
 * - ESTA_E_SEGUINTES: encerra a regra original antes da data de referência e
 *   nasce uma nova série independente, a partir dela, com as mudanças aplicadas.
 *
 * Exceções e cancelamentos já registrados para datas anteriores permanecem
 * válidos em ambos os casos; para ESTA_E_SEGUINTES, os que caem a partir da
 * data de referência são reatribuídos à nova série.
 */
export class CalendarioAgendamentoEditarSerieCommand {
  ifMatch?: string;

  dataOcorrencia!: string;
  escopo!: CalendarioAgendamentoEscopoEdicaoSerie;

  dataInicio?: string;
  dataFim?: string | null;
  diaInteiro?: boolean;
  horarioInicio?: string;
  horarioFim?: string;
  repeticao?: string | null;
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

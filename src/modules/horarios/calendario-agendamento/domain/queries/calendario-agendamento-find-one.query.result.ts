import { EntityQueryResult, SharedFields } from "@/domain/abstractions";
import { CalendarioAgendamentoFields } from "../calendario-agendamento.fields";
import type {
  CalendarioAgendamentoStatus,
  CalendarioAgendamentoTipo,
} from "../calendario-agendamento.types";

export const CalendarioAgendamentoFindOneQueryResultFields = {
  id: SharedFields.idUuid,
  ...CalendarioAgendamentoFields,
};

export class CalendarioAgendamentoFindOneQueryResult extends EntityQueryResult {
  tipo!: CalendarioAgendamentoTipo;
  nome!: string | null;
  dataInicio!: string;
  dataFim!: string | null;
  diaInteiro!: boolean;
  horarioInicio!: string;
  horarioFim!: string;
  cor!: string | null;
  repeticao!: string | null;
  status!: CalendarioAgendamentoStatus | null;

  turmaIds!: string[];
  perfilIds!: string[];
  calendarioLetivoIds!: string[];
  ofertaFormacaoIds!: string[];
  modalidadeIds!: string[];
  ambienteIds!: string[];
  diarioIds!: string[];
}

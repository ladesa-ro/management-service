import { SharedFields } from "@/domain/abstractions";

export const CalendarioAgendamentoLinhaDoTempoQueryFields = {
  identificadorExterno: SharedFields.idUuid,
};

export class CalendarioAgendamentoLinhaDoTempoQuery {
  identificadorExterno!: string;
}

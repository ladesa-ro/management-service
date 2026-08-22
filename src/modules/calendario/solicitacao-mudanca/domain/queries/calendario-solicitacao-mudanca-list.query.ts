import {
  createFieldMetadata,
  type IFilterAcceptableValues,
  PaginationQuery,
  SharedListFields,
} from "@/domain/abstractions";

export const CalendarioSolicitacaoMudancaListQueryFields = {
  ...SharedListFields,
  filterStatus: createFieldMetadata({ description: "Filtro por status", nullable: true }),
  filterCalendarioAgendamentoId: createFieldMetadata({
    description: "Filtro por ID do agendamento alvo",
    nullable: true,
  }),
  filterAutorId: createFieldMetadata({
    description: "Filtro por ID do autor",
    nullable: true,
  }),
};

export class CalendarioSolicitacaoMudancaListQuery extends PaginationQuery {
  "filter.id"?: IFilterAcceptableValues;
  "filter.status"?: IFilterAcceptableValues;
  "filter.calendarioAgendamento.id"?: IFilterAcceptableValues;
  "filter.autor.id"?: IFilterAcceptableValues;
}

import {
  createFieldMetadata,
  type IFilterAcceptableValues,
  PaginationQuery,
  SharedListFields,
} from "@/domain/abstractions";

export const CidadeListQueryFields = {
  ...SharedListFields,
  filterEstadoId: createFieldMetadata({ description: "Filtro por ID do Estado", nullable: true }),
  filterEstadoNome: createFieldMetadata({
    description: "Filtro por nome do Estado",
    nullable: true,
  }),
  filterEstadoSigla: createFieldMetadata({
    description: "Filtro por sigla do Estado",
    nullable: true,
  }),
};

export class CidadeListQuery extends PaginationQuery {
  "filter.id"?: IFilterAcceptableValues;
  "filter.estado.id"?: IFilterAcceptableValues;
  "filter.estado.nome"?: IFilterAcceptableValues;
  "filter.estado.sigla"?: IFilterAcceptableValues;
}

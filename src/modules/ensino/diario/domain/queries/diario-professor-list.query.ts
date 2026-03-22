import {
  createFieldMetadata,
  type IFilterAcceptableValues,
  PaginationQuery,
  SharedListFields,
} from "@/domain/abstractions";

export const DiarioProfessorListQueryFields = {
  ...SharedListFields,
  filterDiarioId: createFieldMetadata({ description: "Filtro por ID do Diario", nullable: true }),
  filterPerfilId: createFieldMetadata({ description: "Filtro por ID do Perfil", nullable: true }),
  filterPerfilUsuarioId: createFieldMetadata({
    description: "Filtro por ID do Usuario do Perfil",
    nullable: true,
  }),
};

export class DiarioProfessorListQuery extends PaginationQuery {
  "filter.id"?: IFilterAcceptableValues;
  "filter.diario.id"?: IFilterAcceptableValues;
  "filter.perfil.id"?: IFilterAcceptableValues;
  "filter.perfil.usuario.id"?: IFilterAcceptableValues;
}

import {
  createFieldMetadata,
  type IFilterAcceptableValues,
  PaginationQuery,
  SharedListFields,
} from "@/domain/abstractions";

export const PerfilListQueryFields = {
  ...SharedListFields,
  filterCampusId: createFieldMetadata({ description: "Filtro por ID de campus", nullable: true }),
  filterUsuarioId: createFieldMetadata({ description: "Filtro por ID de usuario", nullable: true }),
  filterCargoNome: createFieldMetadata({ description: "Filtro por nome do cargo", nullable: true }),
};

export class PerfilListQuery extends PaginationQuery {
  "filter.id"?: IFilterAcceptableValues;
  "filter.ativo"?: IFilterAcceptableValues;
  "filter.cargo.nome"?: IFilterAcceptableValues;
  "filter.campus.id"?: IFilterAcceptableValues;
  "filter.usuario.id"?: IFilterAcceptableValues;
}

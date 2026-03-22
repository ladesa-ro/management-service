import {
  createFieldMetadata,
  type IFilterAcceptableValues,
  PaginationQuery,
  SharedListFields,
} from "@/domain/abstractions";

export const PerfilListQueryFields = {
  ...SharedListFields,
  filterAtivo: createFieldMetadata({ description: "Filtro por ativo", nullable: true }),
  filterCargo: createFieldMetadata({ description: "Filtro por cargo", nullable: true }),
  filterCampusId: createFieldMetadata({ description: "Filtro por ID do Campus", nullable: true }),
  filterUsuarioId: createFieldMetadata({ description: "Filtro por ID do Usuario", nullable: true }),
};

export class PerfilListQuery extends PaginationQuery {
  "filter.id"?: IFilterAcceptableValues;
  "filter.ativo"?: IFilterAcceptableValues;
  "filter.cargo"?: IFilterAcceptableValues;
  "filter.campus.id"?: IFilterAcceptableValues;
  "filter.usuario.id"?: IFilterAcceptableValues;
}

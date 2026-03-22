import { createFieldMetadata, SharedListFields } from "@/domain/abstractions";
import { PaginationQuery } from "@/domain/abstractions/queries/pagination.query";
import { EstagioStatus } from "../estagio";

export const EstagioListQueryFields = {
  ...SharedListFields,
  filterEmpresaId: createFieldMetadata({ description: "Filtro por empresa", nullable: true }),
  filterEstagiarioId: createFieldMetadata({
    description: "Filtro por estagiário",
    nullable: true,
  }),
  filterStatus: createFieldMetadata({
    description: "Filtro por status (string ou array)",
    nullable: true,
  }),
};

export class EstagioListQuery extends PaginationQuery {
  filterEmpresaId?: string[];
  filterEstagiarioId?: string[];
  filterStatus?: EstagioStatus[];
}

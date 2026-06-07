import { createFieldMetadata, SharedListFields } from "@/domain/abstractions";
import { PaginationQuery } from "@/domain/abstractions/queries/pagination.query";
import { EstagioStatus } from "../estagio";

export const EstagioListQueryFields = {
  ...SharedListFields,
  filterCampusId: createFieldMetadata({ description: "Filtro por campus", nullable: true }),
  filterEmpresaId: createFieldMetadata({ description: "Filtro por empresa", nullable: true }),
  filterEstagiarioId: createFieldMetadata({
    description: "Filtro por estagiário",
    nullable: true,
  }),
  filterStatus: createFieldMetadata({
    description: "Filtro por status (string ou array)",
    nullable: true,
  }),
  filterCursoReferenciaId: createFieldMetadata({
    description: "Filtro por ID do curso",
    nullable: true,
  }),
};

export class EstagioListQuery extends PaginationQuery {
  filterCampusId?: string[];
  filterEmpresaId?: string[];
  filterEstagiarioId?: string[];
  filterStatus?: EstagioStatus[];
  filterCursoReferenciaId?: string[];
}

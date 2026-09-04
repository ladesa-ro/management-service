import { type IPaginationSpec, PaginationFilter } from "@/application/pagination";

export const relatorioPaginationSpec: IPaginationSpec = {
  defaultSortBy: [["dateCreated", "DESC"]],
  filterableColumns: {
    id: [PaginationFilter.EQ],
    "estagio.id": [PaginationFilter.EQ],
    "estagio.empresa.id": [PaginationFilter.EQ],
    "estagio.status": [PaginationFilter.EQ, PaginationFilter.IN],
    "estagio.estagiario.id": [PaginationFilter.EQ],
    "estagio.estagiario.perfil.usuario.matricula": [PaginationFilter.EQ],
    "estagio.estagiario.perfil.usuario.nome": [PaginationFilter.EQ, PaginationFilter.ILIKE],
  },
  searchableColumns: [
    "estagio.estagiario.perfil.usuario.nome",
    "estagio.estagiario.perfil.usuario.matricula",
  ],
  sortableColumns: ["dateCreated", "dateUpdated"],
};

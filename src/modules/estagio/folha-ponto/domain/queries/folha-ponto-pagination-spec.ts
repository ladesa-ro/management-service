import { type IPaginationSpec, PaginationFilter } from "@/application/pagination";

export const folhaPontoPaginationSpec: IPaginationSpec = {
  defaultSortBy: [["dateCreated", "DESC"]],
  filterableColumns: {
    id: [PaginationFilter.EQ],
    status: [PaginationFilter.EQ, PaginationFilter.IN],
    data: [PaginationFilter.EQ, PaginationFilter.GTE, PaginationFilter.LTE],
    "estagio.id": [PaginationFilter.EQ],
    "estagio.empresa.id": [PaginationFilter.EQ],
    "estagio.estagiario.id": [PaginationFilter.EQ],
    "estagio.estagiario.perfil.usuario.id": [PaginationFilter.EQ],
    "estagio.estagiario.perfil.usuario.matricula": [PaginationFilter.EQ],
    "estagio.estagiario.perfil.usuario.nome": [PaginationFilter.EQ, PaginationFilter.ILIKE],
  },
  searchableColumns: [
    "observacoes",
    "status",
    "estagio.estagiario.perfil.usuario.nome",
    "estagio.estagiario.perfil.usuario.matricula",
  ],
  sortableColumns: ["data", "status", "quantidadeHoras", "dateCreated"],
};

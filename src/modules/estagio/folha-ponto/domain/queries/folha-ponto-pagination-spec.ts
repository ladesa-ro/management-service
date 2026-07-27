import { type IPaginationSpec, PaginationFilter } from "@/application/pagination";

export const folhaPontoPaginationSpec: IPaginationSpec = {
  defaultSortBy: [["dateCreated", "DESC"]],
  filterableColumns: {
    status: [PaginationFilter.EQ, PaginationFilter.IN],
    "estagio.id": [PaginationFilter.EQ],
  },
  searchableColumns: ["observacoes", "status"],
  sortableColumns: ["data", "status", "quantidadeHoras", "dateCreated"],
};

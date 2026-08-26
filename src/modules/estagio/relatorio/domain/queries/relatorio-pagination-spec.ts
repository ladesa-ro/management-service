import { type IPaginationSpec, PaginationFilter } from "@/application/pagination";

export const relatorioPaginationSpec: IPaginationSpec = {
  defaultSortBy: [["dateCreated", "DESC"]],
  filterableColumns: {
    id: [PaginationFilter.EQ],
    "estagio.id": [PaginationFilter.EQ],
  },
  searchableColumns: [],
  sortableColumns: ["dateCreated", "dateUpdated"],
};

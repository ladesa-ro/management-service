import type { IPaginationMeta } from "@/Ladesa.Management.Application/@shared/application/pagination";

export class PaginationMetaDto implements IPaginationMeta {
  currentPage!: number;
  totalPages!: number;
  itemsPerPage!: number;
  totalItems!: number;
  sortBy!: [string, string][];
  filter!: Record<string, string | string[]>;
  search!: string;
}

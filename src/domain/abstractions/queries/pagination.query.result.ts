import type { IPaginationResult } from "@/application/pagination";
import { PaginationMeta } from "./pagination-meta";

/**
 * Resultado paginado genérico
 */
export class PaginationQueryResult<T> implements IPaginationResult<T> {
  meta!: PaginationMeta;
  data!: T[];
}

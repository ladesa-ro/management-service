import type { IPaginationResult } from "@/modules/@shared/application/pagination";
import { PaginationMeta } from "./pagination-meta";

/**
 * Resultado paginado genérico
 */
export class PaginationQueryResult<T> implements IPaginationResult<T> {
  meta!: PaginationMeta;
  data!: T[];
}

/**
 * Critérios de paginação genéricos
 */
export interface IPaginationCriteria {
  page?: number | null;
  limit?: number | null;
  search?: string | null;
  sortBy?: string[];
  filters?: Record<string, string | string[]>;
}

import type { FilterOperator } from "./pagination-config";

/**
 * Constantes nomeadas para operadores de filtro de paginação.
 * Reutiliza o type `FilterOperator` existente — valores idênticos aos do nestjs-paginate.
 * Módulos devem usar estas constantes em vez de importar diretamente de nestjs-paginate.
 */
export const PaginationFilter = {
  EQ: "$eq",
  NE: "$ne",
  GT: "$gt",
  GTE: "$gte",
  LT: "$lt",
  LTE: "$lte",
  IN: "$in",
  NIN: "$nin",
  LIKE: "$like",
  ILIKE: "$ilike",
  NULL: "$null",
  NOT_NULL: "$notnull",
  BETWEEN: "$between",
  OR: "$or",
  AND: "$and",
  NOT: "$not",
} as const satisfies Record<string, FilterOperator>;

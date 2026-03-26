export interface Mapper<I, O> {
  map(input: I): O;
  mapArray(inputs: I[]): O[];
}

export function createMapper<I, O>(mapFn: (input: I) => O): Mapper<I, O> {
  return {
    map: mapFn,

    mapArray(inputs: I[]): O[] {
      return inputs.map(mapFn);
    },
  };
}

// ============================================================================
// List helpers
// ============================================================================

/**
 * Cria um mapper de lista paginada a partir de um mapper de item.
 *
 * Instancia o DTO de lista, copia o meta de paginação e mapeia cada item do data.
 */
export function createListMapper<
  TItemIn,
  TItemOut,
  TList extends { meta: unknown; data: TItemOut[] },
>(
  ListDtoClass: new () => TList,
  itemMapper: Mapper<TItemIn, TItemOut>,
): (input: { meta: TList["meta"]; data: TItemIn[] }) => TList {
  return (input) => {
    const dto = new ListDtoClass();
    dto.meta = input.meta;
    dto.data = itemMapper.mapArray(input.data);
    return dto;
  };
}

/**
 * Campos de paginação comuns a todos os DTOs de lista (REST e GraphQL).
 */
interface PaginationLike {
  page?: number | null;
  limit?: number | null;
  search?: string | null;
  sortBy?: string[] | null;
}

/**
 * Mapeia os campos de paginação comuns (page, limit, search, sortBy) do DTO para a query.
 */
function mapPaginationFields(dto: PaginationLike, query: PaginationLike): void {
  if (dto.page !== undefined) query.page = dto.page;
  if (dto.limit !== undefined) query.limit = dto.limit;
  if (dto.search !== undefined) query.search = dto.search;
  if (dto.sortBy !== undefined) query.sortBy = dto.sortBy;
}

/**
 * Cria um mapper de list input (DTO → Query) com suporte a filtros customizados.
 *
 * Os campos de paginação (page, limit, search, sortBy) são mapeados automaticamente.
 * Apenas a lógica de filtros específicos do módulo precisa ser implementada.
 *
 * @example
 * // REST (filter fields usam dot notation)
 * export const toListInput = createPaginatedInputMapper(EstadoListQuery, (dto, query) => {
 *   if (dto["filter.id"] !== undefined) query["filter.id"] = dto["filter.id"];
 * });
 *
 * // GraphQL (filter fields usam camelCase)
 * const listInputMapper = createPaginatedInputMapper(EstadoListQuery, (dto, query) => {
 *   if (dto.filterId !== undefined) query["filter.id"] = dto.filterId;
 * });
 */
export function createPaginatedInputMapper<
  TDto extends PaginationLike,
  TQuery extends PaginationLike,
>(
  QueryClass: new () => TQuery,
  mapFilters: (dto: TDto, query: TQuery) => void,
): Mapper<TDto, TQuery> {
  return createMapper<TDto, TQuery>((dto) => {
    const query = new QueryClass();
    mapPaginationFields(dto, query);
    mapFilters(dto, query);
    return query;
  });
}

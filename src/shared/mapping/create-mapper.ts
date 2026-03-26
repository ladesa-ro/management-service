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
// Field helper
// ============================================================================

/**
 * Copia um campo de source para target se o valor não for undefined.
 *
 * @example
 * mapField(query, "filter.id", dto, "filter.id");
 * mapField(query, "filter.id", dto, "filterId"); // renomeia
 */
export function mapField<
  TTarget,
  TKTarget extends keyof TTarget,
  TSource,
  TKSource extends keyof TSource,
>(target: TTarget, targetKey: TKTarget, source: TSource, sourceKey: TKSource): void {
  const value = source[sourceKey];
  if (value !== undefined) {
    target[targetKey] = value as never;
  }
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
  mapField(query, "page", dto, "page");
  mapField(query, "limit", dto, "limit");
  mapField(query, "search", dto, "search");
  mapField(query, "sortBy", dto, "sortBy");
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
 *   mapField(query, "filter.id", dto, "filter.id");
 * });
 *
 * // GraphQL (filter fields usam camelCase → dot notation)
 * const listInputMapper = createPaginatedInputMapper(EstadoListQuery, (dto, query) => {
 *   mapField(query, "filter.id", dto, "filterId");
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

// ============================================================================
// Imagem output helper (GraphQL)
// ============================================================================

interface ImagemLikeArquivo {
  id: string;
  name: string | null;
  mimeType: string | null;
  sizeBytes: number | null;
  storageType: string;
  dateCreated?: unknown;
  dateUpdated?: unknown;
  dateDeleted?: unknown;
}

interface ImagemLikeVersao {
  id: string;
  largura: number | null;
  altura: number | null;
  formato: string | null;
  mimeType: string | null;
  arquivo: ImagemLikeArquivo;
  dateCreated?: unknown;
  dateUpdated?: unknown;
  dateDeleted?: unknown;
}

export interface ImagemLike {
  id: string;
  descricao: string | null;
  versoes?: ImagemLikeVersao[];
  dateCreated?: unknown;
  dateUpdated?: unknown;
  dateDeleted?: unknown;
}

/**
 * Mapeia uma imagem com versões para o formato de output GraphQL.
 * Usa interfaces estruturais para acomodar diferentes shapes de query result.
 */
export function mapImagemOutput<T = unknown>(imagem: ImagemLike | null | undefined): T | null {
  if (!imagem) return null;
  return {
    id: imagem.id,
    descricao: imagem.descricao,
    versoes: (imagem.versoes || []).map((v) => ({
      id: v.id,
      largura: v.largura,
      altura: v.altura,
      formato: v.formato,
      mimeType: v.mimeType,
      arquivo: {
        id: v.arquivo.id,
        name: v.arquivo.name,
        mimeType: v.arquivo.mimeType,
        sizeBytes: v.arquivo.sizeBytes,
        storageType: v.arquivo.storageType,
        dateCreated: v.arquivo.dateCreated,
        dateUpdated: v.arquivo.dateUpdated,
        dateDeleted: v.arquivo.dateDeleted,
      },
      dateCreated: v.dateCreated,
      dateUpdated: v.dateUpdated,
      dateDeleted: v.dateDeleted,
    })),
    dateCreated: imagem.dateCreated,
    dateUpdated: imagem.dateUpdated,
    dateDeleted: imagem.dateDeleted,
  } as T;
}

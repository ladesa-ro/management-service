export interface Mapper<I, O> {
  map(input: I): O;
  mapOptional(input: I | null | undefined): O | null;
  mapArray(inputs: I[]): O[];
}

export function createMapper<I, O>(mapFn: (input: I) => O): Mapper<I, O> {
  return {
    map: mapFn,

    mapOptional(input: I | null | undefined): O | null {
      return input != null ? mapFn(input) : null;
    },

    mapArray(inputs: I[]): O[] {
      return inputs.map(mapFn);
    },
  };
}

// ============================================================================
// Field helper (deprecated — use `into`)
// ============================================================================

/**
 * @deprecated Use `into(target).from(source).field(...)` em vez de `mapField`.
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
// into — DSL imperativa centrada no destino
// ============================================================================

function isNil(value: unknown): value is undefined | null {
  return value === undefined || value === null;
}

/**
 * Builder fluente retornado por `into()`.
 *
 * Cada método retorna `this` para permitir encadeamento total:
 * `.from().field().field()` e `.field().from().field().from()`.
 */
interface IntoChain<TTarget> {
  /** Define a source global para os próximos .field(), ou executa per-field com sourceKey opcional */
  from(source: object, sourceKey?: string): IntoChain<TTarget>;

  /** Mapeia um campo. Se há source global, executa imediatamente. Senão, abre pipeline. */
  field<TK extends keyof TTarget>(targetKey: TK, sourceKey?: string): IntoChain<TTarget>;

  /** Define transform para o campo corrente (antes de .from() per-field) */
  transform(fn: (value: unknown) => unknown): IntoChain<TTarget>;

  /** Define valor default se nil */
  default(value: unknown): IntoChain<TTarget>;

  /** Condicional de escrita */
  when(predicate: (value: unknown) => boolean): IntoChain<TTarget>;

  /** Falha se valor nil */
  required(): IntoChain<TTarget>;

  /** Ignora se valor nil */
  optional(): IntoChain<TTarget>;
}

/**
 * DSL imperativa centrada no destino para construir objetos de forma incremental.
 *
 * @example
 * // Forma canônica — source global
 * into(query)
 *   .from(dto)
 *   .field("filter.id", "filterId")
 *   .field("page")
 *   .field("limit");
 *
 * @example
 * // Forma per-field — múltiplas sources
 * into(query)
 *   .field("filter.id").from(dto, "filterId")
 *   .field("tenantId").from(context, "tenantId");
 *
 * @example
 * // Pipeline por campo
 * into(query)
 *   .field("page").default(1).from(dto)
 *   .field("userId").required().from(auth);
 */

export function into<TTarget>(target: TTarget): IntoChain<TTarget> {
  let globalSource: object | undefined;

  // Pipeline state per current field
  let currentTargetKey: keyof TTarget | undefined;
  let transformFn: ((v: unknown) => unknown) | undefined;
  let defaultValue: unknown;
  let hasDefault = false;
  let whenPredicate: ((v: unknown) => boolean) | undefined;
  let isRequired = false;
  let isOptional = false;

  function resetPipeline(): void {
    currentTargetKey = undefined;
    transformFn = undefined;
    defaultValue = undefined;
    hasDefault = false;
    whenPredicate = undefined;
    isRequired = false;
    isOptional = false;
  }

  function executePipeline(targetKey: keyof TTarget, rawValue: unknown): void {
    let v = rawValue;

    if (transformFn) v = transformFn(v);
    if (hasDefault && isNil(v)) v = defaultValue;
    if (whenPredicate && !whenPredicate(v)) {
      resetPipeline();
      return;
    }
    if (isRequired && isNil(v)) {
      resetPipeline();
      throw new Error(`into: field "${String(targetKey)}" is required`);
    }
    if (isOptional && isNil(v)) {
      resetPipeline();
      return;
    }

    if (v !== undefined) {
      target[targetKey] = v as never;
    }

    resetPipeline();
  }

  function resolveFromSource(source: object, targetKey: keyof TTarget, sourceKey?: string): void {
    const key = sourceKey ?? targetKey;
    const value = (source as Record<string | number | symbol, unknown>)[key as string];
    executePipeline(targetKey, value);
  }

  const chain: IntoChain<TTarget> = {
    from(source: object, sourceKey?: string) {
      if (currentTargetKey !== undefined) {
        // .field("x").from(source, "y") — per-field form
        resolveFromSource(source, currentTargetKey, sourceKey);
      } else {
        // .from(source) — set global
        globalSource = source;
      }
      return chain;
    },

    field(targetKey, sourceKey?) {
      // Se tinha field pendente sem .from(), descarta pipeline
      resetPipeline();
      currentTargetKey = targetKey;

      if (globalSource !== undefined) {
        // Executa imediatamente com global source
        resolveFromSource(globalSource, targetKey, sourceKey);
        return chain;
      }

      return chain;
    },

    transform(fn) {
      transformFn = fn;
      return chain;
    },

    default(value) {
      defaultValue = value;
      hasDefault = true;
      return chain;
    },

    when(predicate) {
      whenPredicate = predicate;
      return chain;
    },

    required() {
      isRequired = true;
      return chain;
    },

    optional() {
      isOptional = true;
      return chain;
    },
  };

  return chain;
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
  into(query).from(dto).field("page").field("limit").field("search").field("sortBy");
}

/**
 * Cria um mapper de list input (DTO → Query) com suporte a filtros customizados.
 *
 * Os campos de paginação (page, limit, search, sortBy) são mapeados automaticamente.
 * Apenas a lógica de filtros específicos do módulo precisa ser implementada.
 *
 * @example
 * // REST (filter fields usam dot notation)
 *
export const toListInput = createPaginatedInputMapper(EstadoListQuery, (dto, query) => {
 *   into(query).field("filter.id").from(dto, "filter.id");
 * });
 *
 * // GraphQL (filter fields usam camelCase → dot notation)
 * const listInputMapper = createPaginatedInputMapper(EstadoListQuery, (dto, query) => {
 *   into(query).field("filter.id").from(dto, "filterId");
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

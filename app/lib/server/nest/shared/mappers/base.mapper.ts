/**
 * Utilitários compartilhados para mappers REST e GraphQL.
 * Seguindo DRY: funções comuns extraídas para reutilização.
 */

/**
 * Interface para saída de paginação padrão do core
 */
export interface PaginatedOutputMeta {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  totalItems: number;
  sortBy: unknown;
  filter?: unknown;
  search: string | null;
}

/**
 * Interface para metadados de paginação da apresentação.
 * Ambas PaginationMetaRestDto e PaginationMetaGraphQlDto satisfazem esta interface.
 */
export interface IPaginationMetaPresentation {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  totalItems: number;
  sortBy: [string, string][];
  search: string;
  filter?: Record<string, string | string[]>;
}

/**
 * Mapeia metadados de paginação do output do core para o DTO de apresentação.
 * Usado por todos os mappers que retornam listas paginadas.
 */
export function mapPaginationMeta(meta: PaginatedOutputMeta): IPaginationMetaPresentation {
  return {
    currentPage: meta.currentPage,
    totalPages: meta.totalPages,
    itemsPerPage: meta.itemsPerPage,
    totalItems: meta.totalItems,
    sortBy: meta.sortBy,
    filter: meta.filter,
    search: meta.search,
  } as IPaginationMetaPresentation;
}

/**
 * Cria um mapeador de ListOutput genérico.
 * Reduz boilerplate em todos os mappers de lista.
 *
 * @example
 * static toListOutputDto = createListOutputMapper(
 *   ModalidadeListOutputGraphQlDto,
 *   ModalidadeGraphqlMapper.toFindOneOutputDto
 * );
 */
export function createListOutputMapper<
  TOutput,
  TDto,
  TListDto extends { meta: IPaginationMetaPresentation; data: TDto[] },
>(ListDtoClass: new () => TListDto, toFindOneOutputDto: (output: TOutput) => TDto) {
  return (output: { meta: PaginatedOutputMeta; data: TOutput[] }): TListDto => {
    const dto = new ListDtoClass();
    dto.meta = mapPaginationMeta(output.meta);
    dto.data = output.data.map((item) => toFindOneOutputDto(item));
    return dto;
  };
}

/**
 * Helper para mapear campos condicionalmente no update.
 * Evita repetição de `if (dto.field !== undefined)`.
 */
export function mapIfDefined<T, K extends keyof T>(
  target: T,
  source: Partial<Pick<T, K>>,
  field: K,
): void {
  if (source[field] !== undefined) {
    target[field] = source[field] as T[K];
  }
}

/**
 * Helper para mapear múltiplos campos condicionalmente.
 */
export function mapFieldsIfDefined<T>(target: T, source: Partial<T>, fields: (keyof T)[]): void {
  for (const field of fields) {
    mapIfDefined(target, source, field);
  }
}

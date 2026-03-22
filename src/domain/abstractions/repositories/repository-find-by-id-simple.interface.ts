import type { IAccessContext } from "@/domain/abstractions";

/**
 * Variante simplificada de findById que aceita o ID diretamente (não um DTO wrapper).
 * Usado em lookups internos e validações onde o DTO completo de busca seria excessivo.
 */
export interface IRepositoryFindByIdSimple<FindOneOutputDto> {
  findByIdSimple(
    accessContext: IAccessContext | null,
    id: string | number,
    selection?: string[] | boolean | null,
  ): Promise<FindOneOutputDto | null>;
}

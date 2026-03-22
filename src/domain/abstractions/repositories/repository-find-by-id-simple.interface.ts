import type { AccessContext } from "@/server/access-context";

/**
 * Variante simplificada de findById que aceita o ID diretamente (não um DTO wrapper).
 * Usado em lookups internos e validações onde o DTO completo de busca seria excessivo.
 */
export interface IRepositoryFindByIdSimple<FindOneOutputDto> {
  findByIdSimple(
    accessContext: AccessContext | null,
    id: string | number,
    selection?: string[] | boolean | null,
  ): Promise<FindOneOutputDto | null>;
}

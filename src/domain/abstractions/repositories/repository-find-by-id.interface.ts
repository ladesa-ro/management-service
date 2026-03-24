import type { IAccessContext } from "@/domain/abstractions";

/**
 * Contrato granular para busca por ID com DTO estruturado.
 * Composição por interface, não herança — cada repositório monta seu contrato combinando interfaces.
 */
export interface IRepositoryFindById<FindOneOutputDto> {
  findById(
    accessContext: IAccessContext | null,
    dto: { id: string | number },
  ): Promise<FindOneOutputDto | null>;
}

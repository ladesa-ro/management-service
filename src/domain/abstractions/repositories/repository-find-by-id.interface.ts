import type { AccessContext } from "@/server/access-context";

/**
 * Contrato granular para busca por ID com DTO estruturado. Aceita selection para projeção parcial.
 * Composição por interface, não herança — cada repositório monta seu contrato combinando interfaces.
 */
export interface IRepositoryFindById<FindOneOutputDto> {
  findById(
    accessContext: AccessContext | null,
    dto: { id: string | number },
    selection?: string[] | boolean | null,
  ): Promise<FindOneOutputDto | null>;
}

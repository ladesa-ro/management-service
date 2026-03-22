import type { AccessContext } from "@/server/access-context";

/**
 * Contrato granular para listagem paginada. Composto por interface — não por herança de classe base —
 * para que cada repositório declare apenas as operações que implementa (Interface Segregation).
 */
export interface IRepositoryFindAll<ListOutputDto> {
  findAll(
    accessContext: AccessContext | null,
    dto: unknown,
    selection?: string[] | boolean | null,
  ): Promise<ListOutputDto>;
}

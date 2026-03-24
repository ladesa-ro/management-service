import type { IAccessContext } from "@/domain/abstractions";

/**
 * Contrato granular para listagem paginada. Composto por interface — não por herança de classe base —
 * para que cada repositório declare apenas as operações que implementa (Interface Segregation).
 */
export interface IRepositoryFindAll<ListOutputDto> {
  findAll(accessContext: IAccessContext | null, dto: unknown): Promise<ListOutputDto>;
}

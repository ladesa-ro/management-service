import type { IBaseCrudRepository } from "@/domain/abstractions";
import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICampus } from "@/modules/ambientes/campus";
import type { CampusFindOneQueryResult, CampusListQueryResult } from "../queries";
/**
 * Token de injeção para o repositório de Campus
 */
export const ICampusRepository = Symbol("ICampusRepository");

/**
 * Port de saída para operações de persistência de Campus
 * Estende a interface base de CRUD com operações padrão
 */
export interface ICampusRepository
  extends IBaseCrudRepository<ICampus, CampusListQueryResult, CampusFindOneQueryResult> {
  /**
   * Busca um campus por ID (formato simples) - método obrigatório
   */
  findByIdSimple(
    accessContext: AccessContext | null,
    id: string,
    selection?: string[] | boolean | null,
  ): Promise<CampusFindOneQueryResult | null>;
}

import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IBaseCrudRepository } from "@/modules/@shared";
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
    accessContext: AccessContext,
    id: string,
    selection?: string[] | boolean,
  ): Promise<CampusFindOneQueryResult | null>;
}

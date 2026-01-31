import type { IBaseCrudRepositoryPort } from "@/modules/@shared";
import type { CampusEntity } from "@/modules/campus/infrastructure/persistence/typeorm";
import type { AccessContext } from "@/v2/old/infrastructure/access-context";
import type { CampusFindOneOutput, CampusListOutput } from "../../dtos";

/**
 * Token de injeção para o repositório de Campus
 */
export const CAMPUS_REPOSITORY_PORT = Symbol("ICampusRepositoryPort");

/**
 * Port de saída para operações de persistência de Campus
 * Estende a interface base de CRUD com operações padrão
 */
export interface ICampusRepositoryPort
  extends IBaseCrudRepositoryPort<CampusEntity, CampusListOutput, CampusFindOneOutput> {
  /**
   * Busca um campus por ID (formato simples) - método obrigatório
   */
  findByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[] | boolean,
  ): Promise<CampusFindOneOutput | null>;
}

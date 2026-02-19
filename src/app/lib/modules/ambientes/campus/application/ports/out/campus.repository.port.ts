import type { AccessContext } from "@/modules/@core/contexto-acesso";
import type { IBaseCrudRepositoryPort } from "@/modules/@shared";
import type { ICampus } from "@/modules/ambientes/campus";
import type { CampusFindOneOutputDto, CampusListOutputDto } from "../../dtos";

/**
 * Token de injeção para o repositório de Campus
 */
export const CAMPUS_REPOSITORY_PORT = Symbol("ICampusRepositoryPort");

/**
 * Port de saída para operações de persistência de Campus
 * Estende a interface base de CRUD com operações padrão
 */
export interface ICampusRepositoryPort
  extends IBaseCrudRepositoryPort<ICampus, CampusListOutputDto, CampusFindOneOutputDto> {
  /**
   * Busca um campus por ID (formato simples) - método obrigatório
   */
  findByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[] | boolean,
  ): Promise<CampusFindOneOutputDto | null>;
}

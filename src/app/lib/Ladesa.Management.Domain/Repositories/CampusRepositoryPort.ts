import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { IBaseCrudRepositoryPort } from "@/Ladesa.Management.Application/@shared";
import type { ICampus } from "@/Ladesa.Management.Application/ambientes/campus";
import type { CampusFindOneOutputDto, CampusListOutputDto } from "@/Ladesa.Management.Application/ambientes/campus/application/dtos";

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

import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { IBaseCrudRepositoryPort } from "@/Ladesa.Management.Application/@shared";
import type { Campus } from "@/Ladesa.Management.Application/ambientes/campus";
import { type CampusFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/CampusFindOneOutputDto";
import { type CampusListOutputDto } from "@/Ladesa.Management.Domain/Dtos/CampusListOutputDto";

/**
 * Token de injeção para o repositório de Campus
 */
export const ICampusRepository = Symbol("ICampusRepository");

/**
 * Port de saída para operações de persistência de Campus
 * Estende a interface base de CRUD com operações padrão
 */
export interface ICampusRepository
  extends IBaseCrudRepositoryPort<Campus, CampusListOutputDto, CampusFindOneOutputDto> {
  /**
   * Busca um campus por ID (formato simples) - método obrigatório
   */
  findByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[] | boolean,
  ): Promise<CampusFindOneOutputDto | null>;
}

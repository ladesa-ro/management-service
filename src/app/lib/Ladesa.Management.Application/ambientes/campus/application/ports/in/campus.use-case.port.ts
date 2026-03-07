import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import { type CampusCreateInputDto } from "@/Ladesa.Management.Domain/Dtos/CampusCreateInputDto";
import { type CampusFindOneInputDto } from "@/Ladesa.Management.Domain/Dtos/CampusFindOneInputDto";
import { type CampusFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/CampusFindOneOutputDto";
import { type CampusListInputDto } from "@/Ladesa.Management.Domain/Dtos/CampusListInputDto";
import { type CampusListOutputDto } from "@/Ladesa.Management.Domain/Dtos/CampusListOutputDto";
import { type CampusUpdateInputDto } from "@/Ladesa.Management.Domain/Dtos/CampusUpdateInputDto";

/**
 * Port de entrada para casos de uso de Campus
 * Define o contrato que o service deve implementar
 */
export interface ICampusUseCasePort {
  /**
   * Lista campus com paginacao
   */
  findAll(
    accessContext: AccessContext,
    dto: CampusListInputDto | null,
    selection?: string[] | boolean,
  ): Promise<CampusListOutputDto>;

  /**
   * Busca um campus por ID
   */
  findById(
    accessContext: AccessContext,
    dto: CampusFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<CampusFindOneOutputDto | null>;

  /**
   * Busca um campus por ID (lanca excecao se nao encontrado)
   */
  findByIdStrict(
    accessContext: AccessContext,
    dto: CampusFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<CampusFindOneOutputDto>;

  /**
   * Busca um campus por ID (formato simples)
   */
  findByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[] | boolean,
  ): Promise<CampusFindOneOutputDto | null>;

  /**
   * Busca um campus por ID (formato simples, lanca excecao se nao encontrado)
   */
  findByIdSimpleStrict(
    accessContext: AccessContext,
    id: string,
    selection?: string[] | boolean,
  ): Promise<CampusFindOneOutputDto>;

  /**
   * Cria um novo campus
   */
  create(accessContext: AccessContext, dto: CampusCreateInputDto): Promise<CampusFindOneOutputDto>;

  /**
   * Atualiza um campus existente
   */
  update(
    accessContext: AccessContext,
    dto: CampusFindOneInputDto & CampusUpdateInputDto,
  ): Promise<CampusFindOneOutputDto>;

  /**
   * Remove um campus (soft delete)
   */
  deleteOneById(accessContext: AccessContext, dto: CampusFindOneInputDto): Promise<boolean>;
}

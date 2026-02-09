import type { AccessContext } from "@/modules/@core/access-context";
import type {
  CampusCreateInputDto,
  CampusFindOneInputDto,
  CampusFindOneOutputDto,
  CampusListInputDto,
  CampusListOutputDto,
  CampusUpdateInputDto,
} from "../../dtos";

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

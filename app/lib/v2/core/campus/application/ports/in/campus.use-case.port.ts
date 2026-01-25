import type { AccessContext } from "@/infrastructure/access-context";
import type {
  CampusCreateInputDto,
  CampusFindOneInputDto,
  CampusFindOneOutputDto,
  CampusListInputDto,
  CampusListOutputDto,
  CampusUpdateInputDto,
} from "@/v2/server/modules/campus/http/dto";

/**
 * Port de entrada para casos de uso de Campus
 * Define o contrato que o service deve implementar
 */
export interface ICampusUseCasePort {
  /**
   * Lista campus com paginação
   */
  campusFindAll(
    accessContext: AccessContext,
    dto: CampusListInputDto | null,
    selection?: string[] | boolean,
  ): Promise<CampusListOutputDto>;

  /**
   * Busca um campus por ID
   */
  campusFindById(
    accessContext: AccessContext,
    dto: CampusFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<CampusFindOneOutputDto | null>;

  /**
   * Busca um campus por ID (lança exceção se não encontrado)
   */
  campusFindByIdStrict(
    accessContext: AccessContext,
    dto: CampusFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<CampusFindOneOutputDto>;

  /**
   * Busca um campus por ID (formato simples)
   */
  campusFindByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[] | boolean,
  ): Promise<CampusFindOneOutputDto | null>;

  /**
   * Busca um campus por ID (formato simples, lança exceção se não encontrado)
   */
  campusFindByIdSimpleStrict(
    accessContext: AccessContext,
    id: string,
    selection?: string[] | boolean,
  ): Promise<CampusFindOneOutputDto>;

  /**
   * Cria um novo campus
   */
  campusCreate(
    accessContext: AccessContext,
    dto: CampusCreateInputDto,
  ): Promise<CampusFindOneOutputDto>;

  /**
   * Atualiza um campus existente
   */
  campusUpdate(
    accessContext: AccessContext,
    dto: CampusFindOneInputDto & CampusUpdateInputDto,
  ): Promise<CampusFindOneOutputDto>;

  /**
   * Remove um campus (soft delete)
   */
  campusDeleteOneById(accessContext: AccessContext, dto: CampusFindOneInputDto): Promise<boolean>;
}

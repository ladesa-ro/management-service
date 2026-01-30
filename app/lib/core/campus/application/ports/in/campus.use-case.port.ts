import type { AccessContext } from "@/v2/old/infrastructure/access-context";
import type {
  CampusCreateInput,
  CampusFindOneInput,
  CampusFindOneOutput,
  CampusListInput,
  CampusListOutput,
  CampusUpdateInput,
} from "../../dtos";

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
    dto: CampusListInput | null,
    selection?: string[] | boolean,
  ): Promise<CampusListOutput>;

  /**
   * Busca um campus por ID
   */
  campusFindById(
    accessContext: AccessContext,
    dto: CampusFindOneInput,
    selection?: string[] | boolean,
  ): Promise<CampusFindOneOutput | null>;

  /**
   * Busca um campus por ID (lança exceção se não encontrado)
   */
  campusFindByIdStrict(
    accessContext: AccessContext,
    dto: CampusFindOneInput,
    selection?: string[] | boolean,
  ): Promise<CampusFindOneOutput>;

  /**
   * Busca um campus por ID (formato simples)
   */
  campusFindByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[] | boolean,
  ): Promise<CampusFindOneOutput | null>;

  /**
   * Busca um campus por ID (formato simples, lança exceção se não encontrado)
   */
  campusFindByIdSimpleStrict(
    accessContext: AccessContext,
    id: string,
    selection?: string[] | boolean,
  ): Promise<CampusFindOneOutput>;

  /**
   * Cria um novo campus
   */
  campusCreate(
    accessContext: AccessContext,
    dto: CampusCreateInput,
  ): Promise<CampusFindOneOutput>;

  /**
   * Atualiza um campus existente
   */
  campusUpdate(
    accessContext: AccessContext,
    dto: CampusFindOneInput & CampusUpdateInput,
  ): Promise<CampusFindOneOutput>;

  /**
   * Remove um campus (soft delete)
   */
  campusDeleteOneById(accessContext: AccessContext, dto: CampusFindOneInput): Promise<boolean>;
}

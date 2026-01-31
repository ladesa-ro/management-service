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
   * Lista campus com paginacao
   */
  findAll(
    accessContext: AccessContext,
    dto: CampusListInput | null,
    selection?: string[] | boolean,
  ): Promise<CampusListOutput>;

  /**
   * Busca um campus por ID
   */
  findById(
    accessContext: AccessContext,
    dto: CampusFindOneInput,
    selection?: string[] | boolean,
  ): Promise<CampusFindOneOutput | null>;

  /**
   * Busca um campus por ID (lanca excecao se nao encontrado)
   */
  findByIdStrict(
    accessContext: AccessContext,
    dto: CampusFindOneInput,
    selection?: string[] | boolean,
  ): Promise<CampusFindOneOutput>;

  /**
   * Busca um campus por ID (formato simples)
   */
  findByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[] | boolean,
  ): Promise<CampusFindOneOutput | null>;

  /**
   * Busca um campus por ID (formato simples, lanca excecao se nao encontrado)
   */
  findByIdSimpleStrict(
    accessContext: AccessContext,
    id: string,
    selection?: string[] | boolean,
  ): Promise<CampusFindOneOutput>;

  /**
   * Cria um novo campus
   */
  create(accessContext: AccessContext, dto: CampusCreateInput): Promise<CampusFindOneOutput>;

  /**
   * Atualiza um campus existente
   */
  update(
    accessContext: AccessContext,
    dto: CampusFindOneInput & CampusUpdateInput,
  ): Promise<CampusFindOneOutput>;

  /**
   * Remove um campus (soft delete)
   */
  deleteOneById(accessContext: AccessContext, dto: CampusFindOneInput): Promise<boolean>;
}

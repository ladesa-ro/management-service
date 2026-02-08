import type { AccessContext } from "@/modules/@core/access-context";
import type {
  CalendarioLetivoCreateInput,
  CalendarioLetivoFindOneInput,
  CalendarioLetivoFindOneOutput,
  CalendarioLetivoListInput,
  CalendarioLetivoListOutput,
  CalendarioLetivoUpdateInput,
} from "../../dtos";

/**
 * Port de entrada para casos de uso de CalendarioLetivo
 * Define o contrato que o service deve implementar
 */
export interface ICalendarioLetivoUseCasePort {
  /**
   * Lista calendarios letivos com paginacao
   */
  findAll(
    accessContext: AccessContext,
    dto: CalendarioLetivoListInput | null,
    selection?: string[] | boolean,
  ): Promise<CalendarioLetivoListOutput>;

  /**
   * Busca um calendario letivo por ID
   */
  findById(
    accessContext: AccessContext,
    dto: CalendarioLetivoFindOneInput,
    selection?: string[] | boolean,
  ): Promise<CalendarioLetivoFindOneOutput | null>;

  /**
   * Busca um calendario letivo por ID (lanca excecao se nao encontrado)
   */
  findByIdStrict(
    accessContext: AccessContext,
    dto: CalendarioLetivoFindOneInput,
    selection?: string[] | boolean,
  ): Promise<CalendarioLetivoFindOneOutput>;

  /**
   * Busca um calendario letivo por ID (formato simples, lanca excecao se nao encontrado)
   */
  findByIdSimpleStrict(
    accessContext: AccessContext,
    id: string,
    selection?: string[] | boolean,
  ): Promise<CalendarioLetivoFindOneOutput>;

  /**
   * Cria um novo calendario letivo
   */
  create(
    accessContext: AccessContext,
    dto: CalendarioLetivoCreateInput,
  ): Promise<CalendarioLetivoFindOneOutput>;

  /**
   * Atualiza um calendario letivo existente
   */
  update(
    accessContext: AccessContext,
    dto: CalendarioLetivoFindOneInput & CalendarioLetivoUpdateInput,
  ): Promise<CalendarioLetivoFindOneOutput>;

  /**
   * Remove um calendario letivo (soft delete)
   */
  deleteOneById(accessContext: AccessContext, dto: CalendarioLetivoFindOneInput): Promise<boolean>;
}

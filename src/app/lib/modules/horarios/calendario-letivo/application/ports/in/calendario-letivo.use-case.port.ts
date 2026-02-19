import type { AccessContext } from "@/modules/@core/contexto-acesso";
import type {
  CalendarioLetivoCreateInputDto,
  CalendarioLetivoFindOneInputDto,
  CalendarioLetivoFindOneOutputDto,
  CalendarioLetivoListInputDto,
  CalendarioLetivoListOutputDto,
  CalendarioLetivoUpdateInputDto,
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
    dto: CalendarioLetivoListInputDto | null,
    selection?: string[] | boolean,
  ): Promise<CalendarioLetivoListOutputDto>;

  /**
   * Busca um calendario letivo por ID
   */
  findById(
    accessContext: AccessContext,
    dto: CalendarioLetivoFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<CalendarioLetivoFindOneOutputDto | null>;

  /**
   * Busca um calendario letivo por ID (lanca excecao se nao encontrado)
   */
  findByIdStrict(
    accessContext: AccessContext,
    dto: CalendarioLetivoFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<CalendarioLetivoFindOneOutputDto>;

  /**
   * Busca um calendario letivo por ID (formato simples, lanca excecao se nao encontrado)
   */
  findByIdSimpleStrict(
    accessContext: AccessContext,
    id: string,
    selection?: string[] | boolean,
  ): Promise<CalendarioLetivoFindOneOutputDto>;

  /**
   * Cria um novo calendario letivo
   */
  create(
    accessContext: AccessContext,
    dto: CalendarioLetivoCreateInputDto,
  ): Promise<CalendarioLetivoFindOneOutputDto>;

  /**
   * Atualiza um calendario letivo existente
   */
  update(
    accessContext: AccessContext,
    dto: CalendarioLetivoFindOneInputDto & CalendarioLetivoUpdateInputDto,
  ): Promise<CalendarioLetivoFindOneOutputDto>;

  /**
   * Remove um calendario letivo (soft delete)
   */
  deleteOneById(
    accessContext: AccessContext,
    dto: CalendarioLetivoFindOneInputDto,
  ): Promise<boolean>;
}

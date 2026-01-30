import type { AccessContext } from "@/v2/old/infrastructure/access-context";
import type {
  ReservaCreateInput,
  ReservaFindOneInput,
  ReservaFindOneOutput,
  ReservaListInput,
  ReservaListOutput,
  ReservaUpdateInput,
} from "../../dtos";

/**
 * Porta de entrada (use case) para operações de Reserva
 * Define os casos de uso disponíveis para o domínio
 */
export interface IReservaUseCasePort {
  /**
   * Lista todas as reservas com paginação
   */
  reservaFindAll(
    accessContext: AccessContext,
    dto: ReservaListInput | null,
    selection?: string[] | boolean,
  ): Promise<ReservaListOutput>;

  /**
   * Busca uma reserva por ID
   */
  reservaFindById(
    accessContext: AccessContext,
    dto: ReservaFindOneInput,
    selection?: string[] | boolean,
  ): Promise<ReservaFindOneOutput | null>;

  /**
   * Busca uma reserva por ID, lançando exceção se não encontrada
   */
  reservaFindByIdStrict(
    accessContext: AccessContext,
    dto: ReservaFindOneInput,
    selection?: string[] | boolean,
  ): Promise<ReservaFindOneOutput>;

  /**
   * Busca uma reserva por ID (versão simplificada)
   */
  reservaFindByIdSimple(
    accessContext: AccessContext,
    id: ReservaFindOneInput["id"],
    selection?: string[],
  ): Promise<ReservaFindOneOutput | null>;

  /**
   * Busca uma reserva por ID (versão simplificada), lançando exceção se não encontrada
   */
  reservaFindByIdSimpleStrict(
    accessContext: AccessContext,
    id: ReservaFindOneInput["id"],
    selection?: string[],
  ): Promise<ReservaFindOneOutput>;

  /**
   * Cria uma nova reserva
   */
  reservaCreate(
    accessContext: AccessContext,
    dto: ReservaCreateInput,
  ): Promise<ReservaFindOneOutput>;

  /**
   * Atualiza uma reserva existente
   */
  reservaUpdate(
    accessContext: AccessContext,
    dto: ReservaFindOneInput & ReservaUpdateInput,
  ): Promise<ReservaFindOneOutput>;

  /**
   * Remove uma reserva por ID (soft delete)
   */
  reservaDeleteOneById(accessContext: AccessContext, dto: ReservaFindOneInput): Promise<boolean>;
}

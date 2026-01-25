import type { AccessContext } from "@/infrastructure/access-context";
import type {
  ReservaCreateInputDto,
  ReservaFindOneInputDto,
  ReservaFindOneOutputDto,
  ReservaListInputDto,
  ReservaListOutputDto,
  ReservaUpdateInputDto,
} from "@/v2/adapters/in/http/reserva/dto";

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
    dto: ReservaListInputDto | null,
    selection?: string[] | boolean,
  ): Promise<ReservaListOutputDto>;

  /**
   * Busca uma reserva por ID
   */
  reservaFindById(
    accessContext: AccessContext,
    dto: ReservaFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<ReservaFindOneOutputDto | null>;

  /**
   * Busca uma reserva por ID, lançando exceção se não encontrada
   */
  reservaFindByIdStrict(
    accessContext: AccessContext,
    dto: ReservaFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<ReservaFindOneOutputDto>;

  /**
   * Busca uma reserva por ID (versão simplificada)
   */
  reservaFindByIdSimple(
    accessContext: AccessContext,
    id: ReservaFindOneInputDto["id"],
    selection?: string[],
  ): Promise<ReservaFindOneOutputDto | null>;

  /**
   * Busca uma reserva por ID (versão simplificada), lançando exceção se não encontrada
   */
  reservaFindByIdSimpleStrict(
    accessContext: AccessContext,
    id: ReservaFindOneInputDto["id"],
    selection?: string[],
  ): Promise<ReservaFindOneOutputDto>;

  /**
   * Cria uma nova reserva
   */
  reservaCreate(
    accessContext: AccessContext,
    dto: ReservaCreateInputDto,
  ): Promise<ReservaFindOneOutputDto>;

  /**
   * Atualiza uma reserva existente
   */
  reservaUpdate(
    accessContext: AccessContext,
    dto: ReservaFindOneInputDto & ReservaUpdateInputDto,
  ): Promise<ReservaFindOneOutputDto>;

  /**
   * Remove uma reserva por ID (soft delete)
   */
  reservaDeleteOneById(accessContext: AccessContext, dto: ReservaFindOneInputDto): Promise<boolean>;
}

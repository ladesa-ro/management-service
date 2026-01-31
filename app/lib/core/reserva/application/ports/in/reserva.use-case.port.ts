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
 * Porta de entrada (use case) para operacoes de Reserva
 * Define os casos de uso disponiveis para o dominio
 */
export interface IReservaUseCasePort {
  /**
   * Lista todas as reservas com paginacao
   */
  findAll(
    accessContext: AccessContext,
    dto: ReservaListInput | null,
    selection?: string[] | boolean,
  ): Promise<ReservaListOutput>;

  /**
   * Busca uma reserva por ID
   */
  findById(
    accessContext: AccessContext,
    dto: ReservaFindOneInput,
    selection?: string[] | boolean,
  ): Promise<ReservaFindOneOutput | null>;

  /**
   * Busca uma reserva por ID, lancando excecao se nao encontrada
   */
  findByIdStrict(
    accessContext: AccessContext,
    dto: ReservaFindOneInput,
    selection?: string[] | boolean,
  ): Promise<ReservaFindOneOutput>;

  /**
   * Busca uma reserva por ID (versao simplificada)
   */
  findByIdSimple(
    accessContext: AccessContext,
    id: ReservaFindOneInput["id"],
    selection?: string[],
  ): Promise<ReservaFindOneOutput | null>;

  /**
   * Busca uma reserva por ID (versao simplificada), lancando excecao se nao encontrada
   */
  findByIdSimpleStrict(
    accessContext: AccessContext,
    id: ReservaFindOneInput["id"],
    selection?: string[],
  ): Promise<ReservaFindOneOutput>;

  /**
   * Cria uma nova reserva
   */
  create(accessContext: AccessContext, dto: ReservaCreateInput): Promise<ReservaFindOneOutput>;

  /**
   * Atualiza uma reserva existente
   */
  update(
    accessContext: AccessContext,
    dto: ReservaFindOneInput & ReservaUpdateInput,
  ): Promise<ReservaFindOneOutput>;

  /**
   * Remove uma reserva por ID (soft delete)
   */
  deleteOneById(accessContext: AccessContext, dto: ReservaFindOneInput): Promise<boolean>;
}

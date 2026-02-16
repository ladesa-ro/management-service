import type { AccessContext } from "@/modules/@core/access-context";
import type {
  ReservaCreateInputDto,
  ReservaFindOneInputDto,
  ReservaFindOneOutputDto,
  ReservaListInputDto,
  ReservaListOutputDto,
  ReservaUpdateInputDto,
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
    dto: ReservaListInputDto | null,
    selection?: string[] | boolean,
  ): Promise<ReservaListOutputDto>;

  /**
   * Busca uma reserva por ID
   */
  findById(
    accessContext: AccessContext,
    dto: ReservaFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<ReservaFindOneOutputDto | null>;

  /**
   * Busca uma reserva por ID, lancando excecao se nao encontrada
   */
  findByIdStrict(
    accessContext: AccessContext,
    dto: ReservaFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<ReservaFindOneOutputDto>;

  /**
   * Busca uma reserva por ID (versao simplificada)
   */
  findByIdSimple(
    accessContext: AccessContext,
    id: ReservaFindOneInputDto["id"],
    selection?: string[],
  ): Promise<ReservaFindOneOutputDto | null>;

  /**
   * Busca uma reserva por ID (versao simplificada), lancando excecao se nao encontrada
   */
  findByIdSimpleStrict(
    accessContext: AccessContext,
    id: ReservaFindOneInputDto["id"],
    selection?: string[],
  ): Promise<ReservaFindOneOutputDto>;

  /**
   * Cria uma nova reserva
   */
  create(
    accessContext: AccessContext,
    dto: ReservaCreateInputDto,
  ): Promise<ReservaFindOneOutputDto>;

  /**
   * Atualiza uma reserva existente
   */
  update(
    accessContext: AccessContext,
    dto: ReservaFindOneInputDto & ReservaUpdateInputDto,
  ): Promise<ReservaFindOneOutputDto>;

  /**
   * Remove uma reserva por ID (soft delete)
   */
  deleteOneById(accessContext: AccessContext, dto: ReservaFindOneInputDto): Promise<boolean>;
}

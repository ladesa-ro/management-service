import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import { type CalendarioLetivoCreateInputDto } from "@/Ladesa.Management.Domain/Dtos/CalendarioLetivoCreateInputDto";
import { type CalendarioLetivoFindOneInputDto } from "@/Ladesa.Management.Domain/Dtos/CalendarioLetivoFindOneInputDto";
import { type CalendarioLetivoFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/CalendarioLetivoFindOneOutputDto";
import { type CalendarioLetivoListInputDto } from "@/Ladesa.Management.Domain/Dtos/CalendarioLetivoListInputDto";
import { type CalendarioLetivoListOutputDto } from "@/Ladesa.Management.Domain/Dtos/CalendarioLetivoListOutputDto";
import { type CalendarioLetivoUpdateInputDto } from "@/Ladesa.Management.Domain/Dtos/CalendarioLetivoUpdateInputDto";

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

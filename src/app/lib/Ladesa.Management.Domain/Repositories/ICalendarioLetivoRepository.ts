import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { IBaseCrudRepositoryPort } from "@/Ladesa.Management.Application/@shared";
import type { CalendarioLetivo } from "@/Ladesa.Management.Application/horarios/calendario-letivo";
import { type CalendarioLetivoFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/CalendarioLetivoFindOneOutputDto";
import { type CalendarioLetivoListOutputDto } from "@/Ladesa.Management.Domain/Dtos/CalendarioLetivoListOutputDto";

/**
 * Token de injeção para o repositório de CalendarioLetivo
 */
export const ICalendarioLetivoRepository = Symbol("ICalendarioLetivoRepository");

/**
 * Port de saída para operações de persistência de CalendarioLetivo
 * Estende a interface base de CRUD com operações padrão
 */
export interface ICalendarioLetivoRepository
  extends IBaseCrudRepositoryPort<
    CalendarioLetivo,
    CalendarioLetivoListOutputDto,
    CalendarioLetivoFindOneOutputDto
  > {
  /**
   * Busca um calendário letivo por ID (formato simples) - método obrigatório
   */
  findByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[] | boolean,
  ): Promise<CalendarioLetivoFindOneOutputDto | null>;
}

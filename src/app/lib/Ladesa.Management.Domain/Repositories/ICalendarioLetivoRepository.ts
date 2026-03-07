import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { IBaseCrudRepositoryPort } from "@/Ladesa.Management.Application/@shared";
import type { CalendarioLetivo } from "@/Ladesa.Management.Application/horarios/calendario-letivo";
import type {
  CalendarioLetivoFindOneOutputDto,
  CalendarioLetivoListOutputDto,
} from "@/Ladesa.Management.Application/horarios/calendario-letivo/application/dtos";

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

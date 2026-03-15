import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IBaseCrudRepository } from "@/modules/@shared";
import type { ICalendarioLetivo } from "@/modules/horarios/calendario-letivo";
import type {
  CalendarioLetivoFindOneQueryResult,
  CalendarioLetivoListQueryResult,
} from "../queries";
/**
 * Token de injeção para o repositório de CalendarioLetivo
 */
export const ICalendarioLetivoRepository = Symbol("ICalendarioLetivoRepository");

/**
 * Port de saída para operações de persistência de CalendarioLetivo
 * Estende a interface base de CRUD com operações padrão
 */
export interface ICalendarioLetivoRepository
  extends IBaseCrudRepository<
    ICalendarioLetivo,
    CalendarioLetivoListQueryResult,
    CalendarioLetivoFindOneQueryResult
  > {
  /**
   * Busca um calendário letivo por ID (formato simples) - método obrigatório
   */
  findByIdSimple(
    accessContext: AccessContext | null,
    id: string,
    selection?: string[] | boolean | null,
  ): Promise<CalendarioLetivoFindOneQueryResult | null>;
}

import type { AccessContext } from "@/modules/@core/access-context";
import type { IBaseCrudRepositoryPort } from "@/modules/@shared";
import type { CalendarioLetivoEntity } from "@/modules/calendario-letivo/infrastructure/persistence/typeorm";
import type { CalendarioLetivoFindOneOutput, CalendarioLetivoListOutput } from "../../dtos";

/**
 * Token de injeção para o repositório de CalendarioLetivo
 */
export const CALENDARIO_LETIVO_REPOSITORY_PORT = Symbol("ICalendarioLetivoRepositoryPort");

/**
 * Port de saída para operações de persistência de CalendarioLetivo
 * Estende a interface base de CRUD com operações padrão
 */
export interface ICalendarioLetivoRepositoryPort
  extends IBaseCrudRepositoryPort<
    CalendarioLetivoEntity,
    CalendarioLetivoListOutput,
    CalendarioLetivoFindOneOutput
  > {
  /**
   * Busca um calendário letivo por ID (formato simples) - método obrigatório
   */
  findByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[] | boolean,
  ): Promise<CalendarioLetivoFindOneOutput | null>;
}

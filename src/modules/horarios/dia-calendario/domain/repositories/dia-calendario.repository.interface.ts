import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IBaseCrudRepository } from "@/modules/@shared";
import type { IDiaCalendario } from "@/modules/horarios/dia-calendario";
import type { DiaCalendarioFindOneQueryResult, DiaCalendarioListQueryResult } from "../queries";
export const IDiaCalendarioRepository = Symbol("IDiaCalendarioRepository");

/**
 * Port de saída para operações de persistência de DiaCalendario
 * Estende a interface base de CRUD com operações padrão
 */
export interface IDiaCalendarioRepository
  extends IBaseCrudRepository<
    IDiaCalendario,
    DiaCalendarioListQueryResult,
    DiaCalendarioFindOneQueryResult
  > {
  /**
   * Busca um dia do calendário por ID (formato simples) - método obrigatório
   */
  findByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<DiaCalendarioFindOneQueryResult | null>;
}

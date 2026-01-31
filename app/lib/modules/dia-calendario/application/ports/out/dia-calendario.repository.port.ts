import type { IBaseCrudRepositoryPort } from "@/modules/@shared";
import type { DiaCalendarioEntity } from "@/modules/dia-calendario/infrastructure/persistence/typeorm";
import type { AccessContext } from "@/v2/old/infrastructure/access-context";
import type { DiaCalendarioFindOneOutput, DiaCalendarioListOutput } from "../../dtos";

export const DIA_CALENDARIO_REPOSITORY_PORT = Symbol("IDiaCalendarioRepositoryPort");

/**
 * Port de saída para operações de persistência de DiaCalendario
 * Estende a interface base de CRUD com operações padrão
 */
export interface IDiaCalendarioRepositoryPort
  extends IBaseCrudRepositoryPort<
    DiaCalendarioEntity,
    DiaCalendarioListOutput,
    DiaCalendarioFindOneOutput
  > {
  /**
   * Busca um dia do calendário por ID (formato simples) - método obrigatório
   */
  findByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<DiaCalendarioFindOneOutput | null>;
}

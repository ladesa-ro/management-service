import type { IBaseCrudRepositoryPort } from "@/modules/@shared";
import type { HorarioGeradoEntity } from "@/modules/horario-gerado/infrastructure/persistence/typeorm";
import type { AccessContext } from "@/v2/old/infrastructure/access-context";
import type { HorarioGeradoFindOneOutput, HorarioGeradoListOutput } from "../../dtos";

/**
 * Token de injeção para o repositório de HorarioGerado
 */
export const HORARIO_GERADO_REPOSITORY_PORT = Symbol("IHorarioGeradoRepositoryPort");

/**
 * Port de saída para operações de persistência de HorarioGerado
 * Estende a interface base de CRUD com operações padrão
 */
export interface IHorarioGeradoRepositoryPort
  extends IBaseCrudRepositoryPort<
    HorarioGeradoEntity,
    HorarioGeradoListOutput,
    HorarioGeradoFindOneOutput
  > {
  /**
   * Busca um horário gerado por ID (formato simples) - método obrigatório
   */
  findByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<HorarioGeradoFindOneOutput | null>;
}

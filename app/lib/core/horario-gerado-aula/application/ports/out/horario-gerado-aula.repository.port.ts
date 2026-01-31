import type { IBaseCrudRepositoryPort } from "@/core/@shared";
import type { HorarioGeradoAulaEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import type { AccessContext } from "@/v2/old/infrastructure/access-context";
import type { HorarioGeradoAulaFindOneOutput, HorarioGeradoAulaListOutput } from "../../dtos";

/**
 * Token de injeção para o repositório de HorarioGeradoAula
 */
export const HORARIO_GERADO_AULA_REPOSITORY_PORT = Symbol("IHorarioGeradoAulaRepositoryPort");

/**
 * Port de saída para operações de persistência de HorarioGeradoAula
 * Estende a interface base de CRUD com operações padrão
 */
export interface IHorarioGeradoAulaRepositoryPort
  extends IBaseCrudRepositoryPort<
    HorarioGeradoAulaEntity,
    HorarioGeradoAulaListOutput,
    HorarioGeradoAulaFindOneOutput
  > {
  /**
   * Busca um horário gerado de aula por ID (formato simples) - método obrigatório
   */
  findByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<HorarioGeradoAulaFindOneOutput | null>;
}

import type { AccessContext } from "@/modules/@core/access-context";
import type { IBaseCrudRepositoryPort } from "@/modules/@shared";
import type { HorarioGeradoAulaEntity } from "@/modules/horario-gerado-aula/infrastructure/persistence/typeorm";
import type { HorarioGeradoAulaFindOneOutputDto, HorarioGeradoAulaListOutputDto } from "../../dtos";

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
    HorarioGeradoAulaListOutputDto,
    HorarioGeradoAulaFindOneOutputDto
  > {
  /**
   * Busca um horário gerado de aula por ID (formato simples) - método obrigatório
   */
  findByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<HorarioGeradoAulaFindOneOutputDto | null>;
}

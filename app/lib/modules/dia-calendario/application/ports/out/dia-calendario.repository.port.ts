import type { AccessContext } from "@/modules/@core/access-context";
import type { IBaseCrudRepositoryPort } from "@/modules/@shared";
import type { DiaCalendarioEntity } from "@/modules/dia-calendario/infrastructure/persistence/typeorm";
import type { DiaCalendarioFindOneOutputDto, DiaCalendarioListOutputDto } from "../../dtos";

export const DIA_CALENDARIO_REPOSITORY_PORT = Symbol("IDiaCalendarioRepositoryPort");

/**
 * Port de saída para operações de persistência de DiaCalendario
 * Estende a interface base de CRUD com operações padrão
 */
export interface IDiaCalendarioRepositoryPort
  extends IBaseCrudRepositoryPort<
    DiaCalendarioEntity,
    DiaCalendarioListOutputDto,
    DiaCalendarioFindOneOutputDto
  > {
  /**
   * Busca um dia do calendário por ID (formato simples) - método obrigatório
   */
  findByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<DiaCalendarioFindOneOutputDto | null>;
}

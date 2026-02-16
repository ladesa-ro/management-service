import type { AccessContext } from "@/modules/@core/contexto-acesso";
import type { IBaseCrudRepositoryPort } from "@/modules/@shared";
import type { IDiaCalendario } from "@/modules/horarios/dia-calendario";
import type { DiaCalendarioFindOneOutputDto, DiaCalendarioListOutputDto } from "../../dtos";

export const DIA_CALENDARIO_REPOSITORY_PORT = Symbol("IDiaCalendarioRepositoryPort");

/**
 * Port de saída para operações de persistência de DiaCalendario
 * Estende a interface base de CRUD com operações padrão
 */
export interface IDiaCalendarioRepositoryPort
  extends IBaseCrudRepositoryPort<
    IDiaCalendario,
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

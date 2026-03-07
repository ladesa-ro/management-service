import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { IBaseCrudRepositoryPort } from "@/Ladesa.Management.Application/@shared";
import type { DiaCalendario } from "@/Ladesa.Management.Application/horarios/dia-calendario";
import { type DiaCalendarioFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/DiaCalendarioFindOneOutputDto";
import { type DiaCalendarioListOutputDto } from "@/Ladesa.Management.Domain/Dtos/DiaCalendarioListOutputDto";

export const IDiaCalendarioRepository = Symbol("IDiaCalendarioRepository");

/**
 * Port de saída para operações de persistência de DiaCalendario
 * Estende a interface base de CRUD com operações padrão
 */
export interface IDiaCalendarioRepository
  extends IBaseCrudRepositoryPort<
    DiaCalendario,
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

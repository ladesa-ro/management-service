import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { IBaseCrudRepositoryPort } from "@/Ladesa.Management.Application/@shared";
import type { HorarioGerado } from "@/Ladesa.Management.Application/horarios/horario-gerado";
import { type HorarioGeradoFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/HorarioGeradoFindOneOutputDto";
import { type HorarioGeradoListOutputDto } from "@/Ladesa.Management.Domain/Dtos/HorarioGeradoListOutputDto";

/**
 * Token de injeção para o repositório de HorarioGerado
 */
export const IHorarioGeradoRepository = Symbol("IHorarioGeradoRepository");

/**
 * Port de saída para operações de persistência de HorarioGerado
 * Estende a interface base de CRUD com operações padrão
 */
export interface IHorarioGeradoRepository
  extends IBaseCrudRepositoryPort<
    HorarioGerado,
    HorarioGeradoListOutputDto,
    HorarioGeradoFindOneOutputDto
  > {
  /**
   * Busca um horário gerado por ID (formato simples) - método obrigatório
   */
  findByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<HorarioGeradoFindOneOutputDto | null>;
}

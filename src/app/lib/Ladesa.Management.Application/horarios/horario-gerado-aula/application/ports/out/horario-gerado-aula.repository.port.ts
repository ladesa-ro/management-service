import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { IBaseCrudRepositoryPort } from "@/Ladesa.Management.Application/@shared";
import type { IHorarioGeradoAula } from "@/Ladesa.Management.Application/horarios/horario-gerado-aula";
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
    IHorarioGeradoAula,
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

import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IBaseCrudRepositoryPort } from "@/modules/@shared";
import type { IHorarioGerado } from "@/modules/horarios/horario-gerado";
import type { HorarioGeradoFindOneOutputDto, HorarioGeradoListOutputDto } from "../../dtos";

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
    IHorarioGerado,
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

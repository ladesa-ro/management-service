import type { AccessContext } from "@/modules/@core/access-context";
import type { IBaseCrudRepositoryPort } from "@/modules/@shared";
import type { IAula } from "@/modules/sisgha/aula";
import type { AulaFindOneOutputDto, AulaListOutputDto } from "../../dtos";

export const AULA_REPOSITORY_PORT = Symbol("IAulaRepositoryPort");

/**
 * Port de saída para operações de persistência de Aula
 * Estende a interface base de CRUD com operações padrão
 */
export interface IAulaRepositoryPort
  extends IBaseCrudRepositoryPort<IAula, AulaListOutputDto, AulaFindOneOutputDto> {
  /**
   * Busca uma aula por ID (formato simples) - método obrigatório
   */
  findByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[] | boolean,
  ): Promise<AulaFindOneOutputDto | null>;
}

import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { IBaseCrudRepositoryPort } from "@/Ladesa.Management.Application/@shared";
import type { IAula } from "@/Ladesa.Management.Application/horarios/aula";
import type {
  AulaFindOneOutputDto,
  AulaListOutputDto,
} from "@/Ladesa.Management.Application/horarios/aula/application/dtos";

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

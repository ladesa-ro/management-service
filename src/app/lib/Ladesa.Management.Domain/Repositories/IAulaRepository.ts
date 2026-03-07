import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { IBaseCrudRepositoryPort } from "@/Ladesa.Management.Application/@shared";
import type { Aula } from "@/Ladesa.Management.Application/horarios/aula";
import type {
  AulaFindOneOutputDto,
  AulaListOutputDto,
} from "@/Ladesa.Management.Application/horarios/aula/application/dtos";

export const IAulaRepository = Symbol("IAulaRepository");

/**
 * Port de saída para operações de persistência de Aula
 * Estende a interface base de CRUD com operações padrão
 */
export interface IAulaRepository
  extends IBaseCrudRepositoryPort<Aula, AulaListOutputDto, AulaFindOneOutputDto> {
  /**
   * Busca uma aula por ID (formato simples) - método obrigatório
   */
  findByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[] | boolean,
  ): Promise<AulaFindOneOutputDto | null>;
}

import type { IBaseCrudRepositoryPort } from "@/Ladesa.Management.Application/@shared";
import type {
  Bloco,
  BlocoFindOneOutputDto,
  BlocoListOutputDto,
} from "@/Ladesa.Management.Application/ambientes/bloco";

/**
 * Token de injeção para o repositório de Bloco
 */
export const IBlocoRepository = Symbol("IBlocoRepository");

/**
 * Port de saída para operações de persistência de Bloco
 * Estende a interface base de CRUD com operações padrão
 */
export interface IBlocoRepository
  extends IBaseCrudRepositoryPort<Bloco, BlocoListOutputDto, BlocoFindOneOutputDto> {}

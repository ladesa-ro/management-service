import type { IBaseCrudRepositoryPort } from "@/modules/@shared";
import type { IDiario } from "@/modules/ensino/diario";
import type {
  DiarioFindOneOutputDto,
  DiarioListOutputDto,
} from "@/modules/ensino/diario/application/dtos";

/**
 * Token de injeção para o repositório de Diario
 */
export const DIARIO_REPOSITORY_PORT = Symbol("IDiarioRepositoryPort");

/**
 * Port de saída para operações de persistência de Diario
 * Estende a interface base de CRUD com operações padrão
 */
export interface IDiarioRepositoryPort
  extends IBaseCrudRepositoryPort<IDiario, DiarioListOutputDto, DiarioFindOneOutputDto> {}

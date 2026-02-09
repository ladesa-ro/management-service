import type { IBaseCrudRepositoryPort } from "@/modules/@shared";
import type {
  DiarioFindOneOutputDto,
  DiarioListOutputDto,
} from "@/modules/diario/application/dtos";
import type { DiarioEntity } from "@/modules/diario/infrastructure/persistence/typeorm";

/**
 * Token de injeção para o repositório de Diario
 */
export const DIARIO_REPOSITORY_PORT = Symbol("IDiarioRepositoryPort");

/**
 * Port de saída para operações de persistência de Diario
 * Estende a interface base de CRUD com operações padrão
 */
export interface IDiarioRepositoryPort
  extends IBaseCrudRepositoryPort<DiarioEntity, DiarioListOutputDto, DiarioFindOneOutputDto> {}

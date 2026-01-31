import type { IBaseCrudRepositoryPort } from "@/core/@shared";
import {
  ModalidadeFindOneOutput,
  ModalidadeListOutput,
} from "@/core/modalidade";
import type { ModalidadeEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";

export const MODALIDADE_REPOSITORY_PORT = Symbol("IModalidadeRepositoryPort");

/**
 * Port de saída para operações de persistência de Modalidade
 * Estende a interface base de CRUD com operações padrão
 */
export interface IModalidadeRepositoryPort
  extends IBaseCrudRepositoryPort<ModalidadeEntity, ModalidadeListOutput, ModalidadeFindOneOutput> {}

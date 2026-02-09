import type { IBaseCrudRepositoryPort } from "@/modules/@shared";
import { ModalidadeFindOneOutputDto, ModalidadeListOutputDto } from "@/modules/modalidade";
import type { ModalidadeEntity } from "@/modules/modalidade/infrastructure/persistence/typeorm";

export const MODALIDADE_REPOSITORY_PORT = Symbol("IModalidadeRepositoryPort");

/**
 * Port de saída para operações de persistência de Modalidade
 * Estende a interface base de CRUD com operações padrão
 */
export interface IModalidadeRepositoryPort
  extends IBaseCrudRepositoryPort<
    ModalidadeEntity,
    ModalidadeListOutputDto,
    ModalidadeFindOneOutputDto
  > {}

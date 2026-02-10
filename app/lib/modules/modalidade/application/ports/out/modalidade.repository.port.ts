import type { IBaseCrudRepositoryPort } from "@/modules/@shared";
import {
  type IModalidade,
  ModalidadeFindOneOutputDto,
  ModalidadeListOutputDto,
} from "@/modules/modalidade";

export const MODALIDADE_REPOSITORY_PORT = Symbol("IModalidadeRepositoryPort");

/**
 * Port de saída para operações de persistência de Modalidade
 * Estende a interface base de CRUD com operações padrão
 */
export interface IModalidadeRepositoryPort
  extends IBaseCrudRepositoryPort<
    IModalidade,
    ModalidadeListOutputDto,
    ModalidadeFindOneOutputDto
  > {}

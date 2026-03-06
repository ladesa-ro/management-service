import type { IBaseCrudRepositoryPort } from "@/Ladesa.Management.Application/@shared";
import {
  type IModalidade,
  ModalidadeFindOneOutputDto,
  ModalidadeListOutputDto,
} from "@/Ladesa.Management.Application/ensino/modalidade";

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

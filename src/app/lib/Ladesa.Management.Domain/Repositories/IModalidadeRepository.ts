import type { IBaseCrudRepositoryPort } from "@/Ladesa.Management.Application/@shared";
import {
  type Modalidade,
  ModalidadeFindOneOutputDto,
  ModalidadeListOutputDto,
} from "@/Ladesa.Management.Application/ensino/modalidade";

export const IModalidadeRepository = Symbol("IModalidadeRepository");

/**
 * Port de saída para operações de persistência de Modalidade
 * Estende a interface base de CRUD com operações padrão
 */
export interface IModalidadeRepository
  extends IBaseCrudRepositoryPort<
    Modalidade,
    ModalidadeListOutputDto,
    ModalidadeFindOneOutputDto
  > {}

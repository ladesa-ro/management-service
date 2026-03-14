import type { IBaseCrudRepository } from "@/modules/@shared";
import {
  type IModalidade,
  ModalidadeFindOneOutputDto,
  ModalidadeListOutputDto,
} from "@/modules/ensino/modalidade";

export const IModalidadeRepository = Symbol("IModalidadeRepository");

/**
 * Port de saída para operações de persistência de Modalidade
 * Estende a interface base de CRUD com operações padrão
 */
export interface IModalidadeRepository
  extends IBaseCrudRepository<IModalidade, ModalidadeListOutputDto, ModalidadeFindOneOutputDto> {}

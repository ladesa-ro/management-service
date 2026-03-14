import type { IBaseCrudRepository } from "@/modules/@shared";
import {
  type IModalidade,
  ModalidadeFindOneQueryResult,
  ModalidadeListQueryResult,
} from "@/modules/ensino/modalidade";

export const IModalidadeRepository = Symbol("IModalidadeRepository");

/**
 * Port de saída para operações de persistência de Modalidade
 * Estende a interface base de CRUD com operações padrão
 */
export interface IModalidadeRepository
  extends IBaseCrudRepository<
    IModalidade,
    ModalidadeListQueryResult,
    ModalidadeFindOneQueryResult
  > {}

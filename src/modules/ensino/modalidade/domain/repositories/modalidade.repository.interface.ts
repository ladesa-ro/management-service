import type {
  IRepositoryCreate,
  IRepositoryFindAll,
  IRepositoryFindById,
  IRepositorySoftDelete,
  IRepositoryUpdate,
} from "@/domain/abstractions";
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
export type IModalidadeRepository = IRepositoryFindAll<ModalidadeListQueryResult> &
  IRepositoryFindById<ModalidadeFindOneQueryResult> &
  IRepositoryCreate<IModalidade> &
  IRepositoryUpdate<IModalidade> &
  IRepositorySoftDelete;

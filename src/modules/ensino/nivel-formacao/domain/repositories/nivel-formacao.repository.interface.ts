import type {
  IRepositoryCreate,
  IRepositoryFindAll,
  IRepositoryFindById,
  IRepositorySoftDelete,
  IRepositoryUpdate,
} from "@/domain/abstractions";
import {
  type INivelFormacao,
  NivelFormacaoFindOneQueryResult,
  NivelFormacaoListQueryResult,
} from "@/modules/ensino/nivel-formacao";

export const INivelFormacaoRepository = Symbol("INivelFormacaoRepository");

/**
 * Port de saída para operações de persistência de NivelFormacao
 * Estende a interface base de CRUD com operações padrão
 */
export type INivelFormacaoRepository = IRepositoryFindAll<NivelFormacaoListQueryResult> &
  IRepositoryFindById<NivelFormacaoFindOneQueryResult> &
  IRepositoryCreate<INivelFormacao> &
  IRepositoryUpdate<INivelFormacao> &
  IRepositorySoftDelete;

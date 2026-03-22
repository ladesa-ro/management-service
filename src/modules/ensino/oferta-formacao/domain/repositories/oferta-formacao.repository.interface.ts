import type {
  IRepositoryCreate,
  IRepositoryFindAll,
  IRepositoryFindById,
  IRepositorySoftDelete,
  IRepositoryUpdate,
} from "@/domain/abstractions";
import {
  type IOfertaFormacao,
  OfertaFormacaoFindOneQueryResult,
  OfertaFormacaoListQueryResult,
} from "@/modules/ensino/oferta-formacao";

export const IOfertaFormacaoRepository = Symbol("IOfertaFormacaoRepository");

/**
 * Port de saída para operações de persistência de OfertaFormacao
 * Estende a interface base de CRUD com operações padrão
 */
export type IOfertaFormacaoRepository = IRepositoryFindAll<OfertaFormacaoListQueryResult> &
  IRepositoryFindById<OfertaFormacaoFindOneQueryResult> &
  IRepositoryCreate<IOfertaFormacao> &
  IRepositoryUpdate<IOfertaFormacao> &
  IRepositorySoftDelete;

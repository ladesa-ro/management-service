import type { IBaseCrudRepository } from "@/domain/abstractions";
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
export interface IOfertaFormacaoRepository
  extends IBaseCrudRepository<
    IOfertaFormacao,
    OfertaFormacaoListQueryResult,
    OfertaFormacaoFindOneQueryResult
  > {}

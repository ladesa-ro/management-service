import type { IBaseCrudRepository } from "@/modules/@shared";
import type { IOfertaFormacaoNivelFormacao } from "@/modules/ensino/oferta-formacao";
import type {
  OfertaFormacaoNivelFormacaoFindOneQueryResult,
  OfertaFormacaoNivelFormacaoListQueryResult,
} from "../queries";
/**
 * Token de injecao para o repositorio de OfertaFormacaoNivelFormacao
 */
export const IOfertaFormacaoNivelFormacaoRepository = Symbol(
  "IOfertaFormacaoNivelFormacaoRepository",
);

/**
 * Port de saida para operacoes de persistencia de OfertaFormacaoNivelFormacao
 * Define o contrato que os adapters de persistencia devem implementar
 */
export interface IOfertaFormacaoNivelFormacaoRepository
  extends IBaseCrudRepository<
    IOfertaFormacaoNivelFormacao,
    OfertaFormacaoNivelFormacaoListQueryResult,
    OfertaFormacaoNivelFormacaoFindOneQueryResult
  > {}

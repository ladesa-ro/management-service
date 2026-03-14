import type { IBaseCrudRepository } from "@/modules/@shared";
import {
  type IOfertaFormacao,
  OfertaFormacaoFindOneOutputDto,
  OfertaFormacaoListOutputDto,
} from "@/modules/ensino/oferta-formacao";

export const IOfertaFormacaoRepository = Symbol("IOfertaFormacaoRepository");

/**
 * Port de saída para operações de persistência de OfertaFormacao
 * Estende a interface base de CRUD com operações padrão
 */
export interface IOfertaFormacaoRepository
  extends IBaseCrudRepository<
    IOfertaFormacao,
    OfertaFormacaoListOutputDto,
    OfertaFormacaoFindOneOutputDto
  > {}

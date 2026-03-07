import type { IBaseCrudRepositoryPort } from "@/Ladesa.Management.Application/@shared";
import {
  type OfertaFormacao,
  OfertaFormacaoFindOneOutputDto,
  OfertaFormacaoListOutputDto,
} from "@/Ladesa.Management.Application/ensino/oferta-formacao";

export const IOfertaFormacaoRepository = Symbol("IOfertaFormacaoRepository");

/**
 * Port de saída para operações de persistência de OfertaFormacao
 * Estende a interface base de CRUD com operações padrão
 */
export interface IOfertaFormacaoRepository
  extends IBaseCrudRepositoryPort<
    OfertaFormacao,
    OfertaFormacaoListOutputDto,
    OfertaFormacaoFindOneOutputDto
  > {}

import type { IBaseCrudRepositoryPort } from "@/modules/@shared";
import {
  type IOfertaFormacao,
  OfertaFormacaoFindOneOutputDto,
  OfertaFormacaoListOutputDto,
} from "@/modules/ensino/oferta-formacao";

export const OFERTA_FORMACAO_REPOSITORY_PORT = Symbol("IOfertaFormacaoRepositoryPort");

/**
 * Port de saída para operações de persistência de OfertaFormacao
 * Estende a interface base de CRUD com operações padrão
 */
export interface IOfertaFormacaoRepositoryPort
  extends IBaseCrudRepositoryPort<
    IOfertaFormacao,
    OfertaFormacaoListOutputDto,
    OfertaFormacaoFindOneOutputDto
  > {}

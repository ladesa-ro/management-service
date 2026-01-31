import type { IBaseCrudRepositoryPort } from "@/core/@shared";
import { OfertaFormacaoFindOneOutput, OfertaFormacaoListOutput } from "@/core/oferta-formacao";
import type { OfertaFormacaoEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";

export const OFERTA_FORMACAO_REPOSITORY_PORT = Symbol("IOfertaFormacaoRepositoryPort");

/**
 * Port de saída para operações de persistência de OfertaFormacao
 * Estende a interface base de CRUD com operações padrão
 */
export interface IOfertaFormacaoRepositoryPort
  extends IBaseCrudRepositoryPort<
    OfertaFormacaoEntity,
    OfertaFormacaoListOutput,
    OfertaFormacaoFindOneOutput
  > {}

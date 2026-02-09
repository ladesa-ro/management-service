import type { IBaseCrudRepositoryPort } from "@/modules/@shared";
import {
  OfertaFormacaoFindOneOutputDto,
  OfertaFormacaoListOutputDto,
} from "@/modules/oferta-formacao";
import type { OfertaFormacaoEntity } from "@/modules/oferta-formacao/infrastructure/persistence/typeorm";

export const OFERTA_FORMACAO_REPOSITORY_PORT = Symbol("IOfertaFormacaoRepositoryPort");

/**
 * Port de saída para operações de persistência de OfertaFormacao
 * Estende a interface base de CRUD com operações padrão
 */
export interface IOfertaFormacaoRepositoryPort
  extends IBaseCrudRepositoryPort<
    OfertaFormacaoEntity,
    OfertaFormacaoListOutputDto,
    OfertaFormacaoFindOneOutputDto
  > {}

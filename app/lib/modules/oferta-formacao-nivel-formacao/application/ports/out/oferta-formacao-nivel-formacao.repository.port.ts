import type { IBaseCrudRepositoryPort } from "@/modules/@shared";
import type { OfertaFormacaoNivelFormacaoEntity } from "@/modules/oferta-formacao-nivel-formacao/infrastructure/persistence/typeorm";
import type {
  OfertaFormacaoNivelFormacaoFindOneOutputDto,
  OfertaFormacaoNivelFormacaoListOutputDto,
} from "../../dtos";

/**
 * Token de injecao para o repositorio de OfertaFormacaoNivelFormacao
 */
export const OFERTA_FORMACAO_NIVEL_FORMACAO_REPOSITORY_PORT = Symbol(
  "IOfertaFormacaoNivelFormacaoRepositoryPort",
);

/**
 * Port de saida para operacoes de persistencia de OfertaFormacaoNivelFormacao
 * Define o contrato que os adapters de persistencia devem implementar
 */
export interface IOfertaFormacaoNivelFormacaoRepositoryPort
  extends IBaseCrudRepositoryPort<
    OfertaFormacaoNivelFormacaoEntity,
    OfertaFormacaoNivelFormacaoListOutputDto,
    OfertaFormacaoNivelFormacaoFindOneOutputDto
  > {}

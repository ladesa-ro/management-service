import type { IBaseCrudRepositoryPort } from "@/Ladesa.Management.Application/@shared";
import type { IOfertaFormacaoNivelFormacao } from "@/Ladesa.Management.Application/ensino/oferta-formacao-nivel-formacao";
import type {
  OfertaFormacaoNivelFormacaoFindOneOutputDto,
  OfertaFormacaoNivelFormacaoListOutputDto,
} from "@/Ladesa.Management.Application/ensino/oferta-formacao-nivel-formacao/application/dtos";

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
    IOfertaFormacaoNivelFormacao,
    OfertaFormacaoNivelFormacaoListOutputDto,
    OfertaFormacaoNivelFormacaoFindOneOutputDto
  > {}

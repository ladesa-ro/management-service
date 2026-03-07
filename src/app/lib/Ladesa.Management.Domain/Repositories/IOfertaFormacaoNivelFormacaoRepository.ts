import type { IBaseCrudRepositoryPort } from "@/Ladesa.Management.Application/@shared";
import type { OfertaFormacaoNivelFormacao } from "@/Ladesa.Management.Application/ensino/oferta-formacao-nivel-formacao";
import { type OfertaFormacaoNivelFormacaoFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/OfertaFormacaoNivelFormacaoFindOneOutputDto";
import { type OfertaFormacaoNivelFormacaoListOutputDto } from "@/Ladesa.Management.Domain/Dtos/OfertaFormacaoNivelFormacaoListOutputDto";

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
  extends IBaseCrudRepositoryPort<
    OfertaFormacaoNivelFormacao,
    OfertaFormacaoNivelFormacaoListOutputDto,
    OfertaFormacaoNivelFormacaoFindOneOutputDto
  > {}

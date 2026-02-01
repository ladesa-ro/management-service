import type { AccessContext } from "@/modules/@core/access-context";
import {
  OfertaFormacaoNivelFormacaoCreateInput,
  OfertaFormacaoNivelFormacaoFindOneInput,
  OfertaFormacaoNivelFormacaoFindOneOutput,
  OfertaFormacaoNivelFormacaoListInput,
  OfertaFormacaoNivelFormacaoListOutput,
  OfertaFormacaoNivelFormacaoUpdateInput,
} from "@/modules/oferta-formacao-nivel-formacao";

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
export interface IOfertaFormacaoNivelFormacaoRepositoryPort {
  /**
   * Lista ofertas de formacao nivel formacao com paginacao
   * @param accessContext Contexto de acesso para aplicar filtros de permissao
   * @param dto DTO com criterios de busca e paginacao
   * @returns Lista paginada de ofertas formacao nivel formacao
   */
  findAll(
    accessContext: AccessContext,
    dto: OfertaFormacaoNivelFormacaoListInput | null,
  ): Promise<OfertaFormacaoNivelFormacaoListOutput>;

  /**
   * Busca uma oferta formacao nivel formacao por ID
   * @param accessContext Contexto de acesso para aplicar filtros de permissao
   * @param dto DTO com ID da oferta formacao nivel formacao
   * @returns Oferta formacao nivel formacao encontrada ou null
   */
  findById(
    accessContext: AccessContext | null,
    dto: OfertaFormacaoNivelFormacaoFindOneInput,
  ): Promise<OfertaFormacaoNivelFormacaoFindOneOutput | null>;

  /**
   * Cria uma nova oferta formacao nivel formacao
   * @param accessContext Contexto de acesso para aplicar filtros de permissao
   * @param dto DTO com dados para criacao
   * @returns Oferta formacao nivel formacao criada
   */
  createOne(
    accessContext: AccessContext,
    dto: OfertaFormacaoNivelFormacaoCreateInput,
  ): Promise<OfertaFormacaoNivelFormacaoFindOneOutput>;

  /**
   * Atualiza uma oferta formacao nivel formacao existente
   * @param accessContext Contexto de acesso para aplicar filtros de permissao
   * @param dto DTO com ID e dados para atualizacao
   * @returns Oferta formacao nivel formacao atualizada
   */
  update(
    accessContext: AccessContext,
    dto: OfertaFormacaoNivelFormacaoFindOneInput & OfertaFormacaoNivelFormacaoUpdateInput,
  ): Promise<OfertaFormacaoNivelFormacaoFindOneOutput>;

  /**
   * Remove uma oferta formacao nivel formacao por ID (soft delete)
   * @param accessContext Contexto de acesso para aplicar filtros de permissao
   * @param dto DTO com ID da oferta formacao nivel formacao
   * @returns True se removido com sucesso
   */
  deleteById(
    accessContext: AccessContext,
    dto: OfertaFormacaoNivelFormacaoFindOneInput,
  ): Promise<boolean>;
}

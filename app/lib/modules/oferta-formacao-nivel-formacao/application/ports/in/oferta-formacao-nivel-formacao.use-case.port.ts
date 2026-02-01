import type { AccessContext } from "@/modules/@core/access-context";
import {
  OfertaFormacaoNivelFormacaoCreateInput,
  OfertaFormacaoNivelFormacaoFindOneInput,
  OfertaFormacaoNivelFormacaoFindOneOutput,
  OfertaFormacaoNivelFormacaoListInput,
  OfertaFormacaoNivelFormacaoListOutput,
  OfertaFormacaoNivelFormacaoUpdateInput,
} from "../../dtos";

/**
 * Port de entrada para casos de uso de OfertaFormacaoNivelFormacao
 * Define o contrato que o service deve implementar
 */
export interface IOfertaFormacaoNivelFormacaoUseCasePort {
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
    accessContext: AccessContext,
    dto: OfertaFormacaoNivelFormacaoFindOneInput,
  ): Promise<OfertaFormacaoNivelFormacaoFindOneOutput | null>;

  /**
   * Busca uma oferta formacao nivel formacao por ID (lanca excecao se nao encontrado)
   * @param accessContext Contexto de acesso para aplicar filtros de permissao
   * @param dto DTO com ID da oferta formacao nivel formacao
   * @returns Oferta formacao nivel formacao encontrada
   */
  findByIdStrict(
    accessContext: AccessContext,
    dto: OfertaFormacaoNivelFormacaoFindOneInput,
  ): Promise<OfertaFormacaoNivelFormacaoFindOneOutput>;

  /**
   * Cria uma nova oferta formacao nivel formacao
   * @param accessContext Contexto de acesso para aplicar filtros de permissao
   * @param dto DTO com dados para criacao
   * @returns Oferta formacao nivel formacao criada
   */
  create(
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
   * Remove uma oferta formacao nivel formacao por ID
   * @param accessContext Contexto de acesso para aplicar filtros de permissao
   * @param dto DTO com ID da oferta formacao nivel formacao
   * @returns True se removido com sucesso
   */
  deleteOneById(
    accessContext: AccessContext,
    dto: OfertaFormacaoNivelFormacaoFindOneInput,
  ): Promise<boolean>;
}

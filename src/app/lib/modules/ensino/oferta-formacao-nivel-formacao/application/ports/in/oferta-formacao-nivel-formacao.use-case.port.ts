import type { AccessContext } from "@/modules/@core/contexto-acesso";
import {
  OfertaFormacaoNivelFormacaoCreateInputDto,
  OfertaFormacaoNivelFormacaoFindOneInputDto,
  OfertaFormacaoNivelFormacaoFindOneOutputDto,
  OfertaFormacaoNivelFormacaoListInputDto,
  OfertaFormacaoNivelFormacaoListOutputDto,
  OfertaFormacaoNivelFormacaoUpdateInputDto,
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
    dto: OfertaFormacaoNivelFormacaoListInputDto | null,
  ): Promise<OfertaFormacaoNivelFormacaoListOutputDto>;

  /**
   * Busca uma oferta formacao nivel formacao por ID
   * @param accessContext Contexto de acesso para aplicar filtros de permissao
   * @param dto DTO com ID da oferta formacao nivel formacao
   * @returns Oferta formacao nivel formacao encontrada ou null
   */
  findById(
    accessContext: AccessContext,
    dto: OfertaFormacaoNivelFormacaoFindOneInputDto,
  ): Promise<OfertaFormacaoNivelFormacaoFindOneOutputDto | null>;

  /**
   * Busca uma oferta formacao nivel formacao por ID (lanca excecao se nao encontrado)
   * @param accessContext Contexto de acesso para aplicar filtros de permissao
   * @param dto DTO com ID da oferta formacao nivel formacao
   * @returns Oferta formacao nivel formacao encontrada
   */
  findByIdStrict(
    accessContext: AccessContext,
    dto: OfertaFormacaoNivelFormacaoFindOneInputDto,
  ): Promise<OfertaFormacaoNivelFormacaoFindOneOutputDto>;

  /**
   * Cria uma nova oferta formacao nivel formacao
   * @param accessContext Contexto de acesso para aplicar filtros de permissao
   * @param dto DTO com dados para criacao
   * @returns Oferta formacao nivel formacao criada
   */
  create(
    accessContext: AccessContext,
    dto: OfertaFormacaoNivelFormacaoCreateInputDto,
  ): Promise<OfertaFormacaoNivelFormacaoFindOneOutputDto>;

  /**
   * Atualiza uma oferta formacao nivel formacao existente
   * @param accessContext Contexto de acesso para aplicar filtros de permissao
   * @param dto DTO com ID e dados para atualizacao
   * @returns Oferta formacao nivel formacao atualizada
   */
  update(
    accessContext: AccessContext,
    dto: OfertaFormacaoNivelFormacaoFindOneInputDto & OfertaFormacaoNivelFormacaoUpdateInputDto,
  ): Promise<OfertaFormacaoNivelFormacaoFindOneOutputDto>;

  /**
   * Remove uma oferta formacao nivel formacao por ID
   * @param accessContext Contexto de acesso para aplicar filtros de permissao
   * @param dto DTO com ID da oferta formacao nivel formacao
   * @returns True se removido com sucesso
   */
  deleteOneById(
    accessContext: AccessContext,
    dto: OfertaFormacaoNivelFormacaoFindOneInputDto,
  ): Promise<boolean>;
}

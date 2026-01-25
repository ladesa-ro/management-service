import type { AccessContext } from "@/infrastructure/access-context";
import type {
  OfertaFormacaoCreateInputDto,
  OfertaFormacaoFindOneInputDto,
  OfertaFormacaoFindOneOutputDto,
  OfertaFormacaoListInputDto,
  OfertaFormacaoListOutputDto,
  OfertaFormacaoUpdateInputDto,
} from "@/v2/adapters/in/http/oferta-formacao/dto";

/**
 * Port de entrada para casos de uso de OfertaFormacao
 * Define o contrato que o service deve implementar
 */
export interface IOfertaFormacaoUseCasePort {
  /**
   * Lista ofertas de formação com paginação
   */
  ofertaFormacaoFindAll(
    accessContext: AccessContext,
    dto: OfertaFormacaoListInputDto | null,
    selection?: string[],
  ): Promise<OfertaFormacaoListOutputDto>;

  /**
   * Busca uma oferta de formação por ID
   */
  ofertaFormacaoFindById(
    accessContext: AccessContext | null,
    dto: OfertaFormacaoFindOneInputDto,
    selection?: string[],
  ): Promise<OfertaFormacaoFindOneOutputDto | null>;

  /**
   * Busca uma oferta de formação por ID (lança exceção se não encontrada)
   */
  ofertaFormacaoFindByIdStrict(
    accessContext: AccessContext,
    dto: OfertaFormacaoFindOneInputDto,
    selection?: string[],
  ): Promise<OfertaFormacaoFindOneOutputDto>;

  /**
   * Busca uma oferta de formação por ID com seleção simplificada
   */
  ofertaFormacaoFindByIdSimple(
    accessContext: AccessContext,
    id: OfertaFormacaoFindOneInputDto["id"],
    selection?: string[],
  ): Promise<OfertaFormacaoFindOneOutputDto | null>;

  /**
   * Busca uma oferta de formação por ID com seleção simplificada (lança exceção se não encontrada)
   */
  ofertaFormacaoFindByIdSimpleStrict(
    accessContext: AccessContext,
    id: OfertaFormacaoFindOneInputDto["id"],
    selection?: string[],
  ): Promise<OfertaFormacaoFindOneOutputDto>;

  /**
   * Cria uma nova oferta de formação
   */
  ofertaFormacaoCreate(
    accessContext: AccessContext,
    dto: OfertaFormacaoCreateInputDto,
  ): Promise<OfertaFormacaoFindOneOutputDto>;

  /**
   * Atualiza uma oferta de formação existente
   */
  ofertaFormacaoUpdate(
    accessContext: AccessContext,
    dto: OfertaFormacaoFindOneInputDto & OfertaFormacaoUpdateInputDto,
  ): Promise<OfertaFormacaoFindOneOutputDto>;

  /**
   * Remove uma oferta de formação (soft delete)
   */
  ofertaFormacaoDeleteOneById(
    accessContext: AccessContext,
    dto: OfertaFormacaoFindOneInputDto,
  ): Promise<boolean>;
}

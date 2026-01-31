import type { AccessContext } from "@/v2/old/infrastructure/access-context";
import type {
  GradeHorarioOfertaFormacaoCreateInput,
  GradeHorarioOfertaFormacaoFindOneInput,
  GradeHorarioOfertaFormacaoFindOneOutput,
  GradeHorarioOfertaFormacaoListInput,
  GradeHorarioOfertaFormacaoListOutput,
  GradeHorarioOfertaFormacaoUpdateInput,
} from "../../dtos";

/**
 * Token de injecao para o repositorio de GradeHorarioOfertaFormacao
 */
export const GRADE_HORARIO_OFERTA_FORMACAO_REPOSITORY_PORT = Symbol(
  "IGradeHorarioOfertaFormacaoRepositoryPort",
);

/**
 * Port de saida para operacoes de persistencia de GradeHorarioOfertaFormacao
 * Define o contrato que os adapters de persistencia devem implementar
 */
export interface IGradeHorarioOfertaFormacaoRepositoryPort {
  /**
   * Lista grades horarios de ofertas de formacao com paginacao
   * @param accessContext Contexto de acesso para aplicar filtros de permissao
   * @param dto DTO com criterios de busca e paginacao
   * @returns Lista paginada de grades horarios de ofertas de formacao
   */
  findAll(
    accessContext: AccessContext,
    dto: GradeHorarioOfertaFormacaoListInput | null,
  ): Promise<GradeHorarioOfertaFormacaoListOutput>;

  /**
   * Busca uma grade horario de oferta de formacao por ID
   * @param accessContext Contexto de acesso para aplicar filtros de permissao
   * @param dto DTO com ID da grade horario de oferta de formacao
   * @returns Grade horario de oferta de formacao encontrada ou null
   */
  findById(
    accessContext: AccessContext | null,
    dto: GradeHorarioOfertaFormacaoFindOneInput,
  ): Promise<GradeHorarioOfertaFormacaoFindOneOutput | null>;

  /**
   * Cria uma nova grade horario de oferta de formacao
   * @param accessContext Contexto de acesso para verificar permissoes
   * @param dto DTO com dados para criacao
   * @returns Grade horario de oferta de formacao criada
   */
  createOne(
    accessContext: AccessContext,
    dto: GradeHorarioOfertaFormacaoCreateInput,
  ): Promise<GradeHorarioOfertaFormacaoFindOneOutput>;

  /**
   * Atualiza uma grade horario de oferta de formacao existente
   * @param accessContext Contexto de acesso para verificar permissoes
   * @param id ID da grade horario de oferta de formacao
   * @param dto DTO com dados para atualizacao
   * @returns Grade horario de oferta de formacao atualizada
   */
  update(
    accessContext: AccessContext,
    id: string,
    dto: GradeHorarioOfertaFormacaoUpdateInput,
  ): Promise<GradeHorarioOfertaFormacaoFindOneOutput>;

  /**
   * Remove uma grade horario de oferta de formacao (soft delete)
   * @param accessContext Contexto de acesso para verificar permissoes
   * @param dto DTO com ID da grade horario de oferta de formacao
   * @returns true se removida com sucesso
   */
  deleteById(
    accessContext: AccessContext,
    dto: GradeHorarioOfertaFormacaoFindOneInput,
  ): Promise<boolean>;
}

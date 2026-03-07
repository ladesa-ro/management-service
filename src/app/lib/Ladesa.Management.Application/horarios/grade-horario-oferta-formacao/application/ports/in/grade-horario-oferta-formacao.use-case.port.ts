import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import { type GradeHorarioOfertaFormacaoCreateInputDto } from "@/Ladesa.Management.Domain/Dtos/GradeHorarioOfertaFormacaoCreateInputDto";
import { type GradeHorarioOfertaFormacaoFindOneInputDto } from "@/Ladesa.Management.Domain/Dtos/GradeHorarioOfertaFormacaoFindOneInputDto";
import { type GradeHorarioOfertaFormacaoFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/GradeHorarioOfertaFormacaoFindOneOutputDto";
import { type GradeHorarioOfertaFormacaoListInputDto } from "@/Ladesa.Management.Domain/Dtos/GradeHorarioOfertaFormacaoListInputDto";
import { type GradeHorarioOfertaFormacaoListOutputDto } from "@/Ladesa.Management.Domain/Dtos/GradeHorarioOfertaFormacaoListOutputDto";
import { type GradeHorarioOfertaFormacaoUpdateInputDto } from "@/Ladesa.Management.Domain/Dtos/GradeHorarioOfertaFormacaoUpdateInputDto";

/**
 * Port de entrada para casos de uso de GradeHorarioOfertaFormacao
 * Define o contrato que o service deve implementar
 */
export interface IGradeHorarioOfertaFormacaoUseCasePort {
  /**
   * Lista grades horarios de ofertas de formacao com paginacao
   * @param accessContext Contexto de acesso para aplicar filtros de permissao
   * @param dto DTO com criterios de busca e paginacao
   * @returns Lista paginada de grades horarios de ofertas de formacao
   */
  findAll(
    accessContext: AccessContext,
    dto: GradeHorarioOfertaFormacaoListInputDto | null,
  ): Promise<GradeHorarioOfertaFormacaoListOutputDto>;

  /**
   * Busca uma grade horario de oferta de formacao por ID
   * @param accessContext Contexto de acesso para aplicar filtros de permissao
   * @param dto DTO com ID da grade horario de oferta de formacao
   * @returns Grade horario de oferta de formacao encontrada ou null
   */
  findById(
    accessContext: AccessContext | null,
    dto: GradeHorarioOfertaFormacaoFindOneInputDto,
  ): Promise<GradeHorarioOfertaFormacaoFindOneOutputDto | null>;

  /**
   * Busca uma grade horario de oferta de formacao por ID (lanca excecao se nao encontrada)
   * @param accessContext Contexto de acesso para aplicar filtros de permissao
   * @param dto DTO com ID da grade horario de oferta de formacao
   * @returns Grade horario de oferta de formacao encontrada
   */
  findByIdStrict(
    accessContext: AccessContext,
    dto: GradeHorarioOfertaFormacaoFindOneInputDto,
  ): Promise<GradeHorarioOfertaFormacaoFindOneOutputDto>;

  /**
   * Cria uma nova grade horario de oferta de formacao
   * @param accessContext Contexto de acesso para verificar permissoes
   * @param dto DTO com dados para criacao
   * @returns Grade horario de oferta de formacao criada
   */
  create(
    accessContext: AccessContext,
    dto: GradeHorarioOfertaFormacaoCreateInputDto,
  ): Promise<GradeHorarioOfertaFormacaoFindOneOutputDto>;

  /**
   * Atualiza uma grade horario de oferta de formacao existente
   * @param accessContext Contexto de acesso para verificar permissoes
   * @param dto DTO com ID e dados para atualizacao
   * @returns Grade horario de oferta de formacao atualizada
   */
  update(
    accessContext: AccessContext,
    dto: GradeHorarioOfertaFormacaoFindOneInputDto & GradeHorarioOfertaFormacaoUpdateInputDto,
  ): Promise<GradeHorarioOfertaFormacaoFindOneOutputDto>;

  /**
   * Remove uma grade horario de oferta de formacao (soft delete)
   * @param accessContext Contexto de acesso para verificar permissoes
   * @param dto DTO com ID da grade horario de oferta de formacao
   * @returns true se removida com sucesso
   */
  deleteOneById(
    accessContext: AccessContext,
    dto: GradeHorarioOfertaFormacaoFindOneInputDto,
  ): Promise<boolean>;
}

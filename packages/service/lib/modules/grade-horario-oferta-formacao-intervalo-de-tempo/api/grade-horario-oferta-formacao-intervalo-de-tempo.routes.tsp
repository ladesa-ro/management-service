import "@typespec/http";
import "@typespec/json-schema";
import "@typespec/openapi";
import "@typespec/openapi3";

using Http;
using OpenAPI;
using JsonSchema;

namespace Ladesa.ManagementService;

/**
 * Sem descrição.
 */
@tag("grades-horarios-ofertas-formacoes-intervalos-de-tempo")
@route("/grades-horarios-ofertas-formacoes-intervalos-de-tempo")
@get
op GradeHorarioOfertaFormacaoIntervaloDeTempoList(
  /**
   * Página de consulta.
   */
  @minValue(1) @query(#{ explode: true }) page?: integer,

  /**
   * Limite da quantidade de resultados por página.
   */
  @minValue(1) @query(#{ explode: true }) limit?: integer,

  /**
   * Busca textual.
   */
  @query(#{ explode: true }) search?: string,

  /**
   * Ordenação.
   */
  @query(#{ explode: true }) sortBy?: string[],
): GradeHorarioOfertaFormacaoIntervaloDeTempoListOutput | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("grades-horarios-ofertas-formacoes-intervalos-de-tempo")
@route("/grades-horarios-ofertas-formacoes-intervalos-de-tempo")
@post
op GradeHorarioOfertaFormacaoIntervaloDeTempoCreate(
  /**
   * Dados de entrada para a criação de uma oferta de formação.
   */
  @body body: GradeHorarioOfertaFormacaoIntervaloDeTempoCreateInput,
): GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutput | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("grades-horarios-ofertas-formacoes-intervalos-de-tempo")
@route("/grades-horarios-ofertas-formacoes-intervalos-de-tempo/{id}")
@delete
op GradeHorarioOfertaFormacaoIntervaloDeTempoDeleteOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension(
    "x-unispec-constraint-entity-exists",
    "GradeHorarioOfertaFormacaoIntervaloDeTempo"
  )
  @format("uuid")
  @path
  id: string,
): Body<boolean> | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("grades-horarios-ofertas-formacoes-intervalos-de-tempo")
@route("/grades-horarios-ofertas-formacoes-intervalos-de-tempo/{id}")
@get
op GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension(
    "x-unispec-constraint-entity-exists",
    "GradeHorarioOfertaFormacaoIntervaloDeTempo"
  )
  @format("uuid")
  @path
  id: string,
): GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutput | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("grades-horarios-ofertas-formacoes-intervalos-de-tempo")
@route("/grades-horarios-ofertas-formacoes-intervalos-de-tempo/{id}")
@patch(#{implicitOptionality: false})
op GradeHorarioOfertaFormacaoIntervaloDeTempoUpdateOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension(
    "x-unispec-constraint-entity-exists",
    "GradeHorarioOfertaFormacaoIntervaloDeTempo"
  )
  @format("uuid")
  @path
  id: string,

  /**
   * Dados de entrada para a atualização de uma oferta de formação.
   */
  @body body: GradeHorarioOfertaFormacaoIntervaloDeTempoUpdateInput,
): GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutput | ForbiddenResponse | NotFoundResponse;

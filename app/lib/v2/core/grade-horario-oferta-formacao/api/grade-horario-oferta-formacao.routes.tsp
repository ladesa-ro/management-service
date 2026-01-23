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
@tag("grades-horarios-ofertas-formacoes")
@route("/grades-horarios-ofertas-formacoes")
@get
op GradeHorarioOfertaFormacaoList(
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
): GradeHorarioOfertaFormacaoListOutput | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("grades-horarios-ofertas-formacoes")
@route("/grades-horarios-ofertas-formacoes")
@post
op GradeHorarioOfertaFormacaoCreate(
  /**
   * Dados de entrada para a criação de uma oferta de formação.
   */
  @body body: GradeHorarioOfertaFormacaoCreateInput,
): GradeHorarioOfertaFormacaoFindOneOutput | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("grades-horarios-ofertas-formacoes")
@route("/grades-horarios-ofertas-formacoes/{id}")
@delete
op GradeHorarioOfertaFormacaoDeleteOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension(
    "x-unispec-constraint-entity-exists",
    "GradeHorarioOfertaFormacao"
  )
  @format("uuid")
  @path
  id: string,
): Body<boolean> | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("grades-horarios-ofertas-formacoes")
@route("/grades-horarios-ofertas-formacoes/{id}")
@get
op GradeHorarioOfertaFormacaoFindOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension(
    "x-unispec-constraint-entity-exists",
    "GradeHorarioOfertaFormacao"
  )
  @format("uuid")
  @path
  id: string,
): GradeHorarioOfertaFormacaoFindOneOutput | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("grades-horarios-ofertas-formacoes")
@route("/grades-horarios-ofertas-formacoes/{id}")
@patch(#{implicitOptionality: false})
op GradeHorarioOfertaFormacaoUpdateOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension(
    "x-unispec-constraint-entity-exists",
    "GradeHorarioOfertaFormacao"
  )
  @format("uuid")
  @path
  id: string,

  /**
   * Dados de entrada para a atualização de uma oferta de formação.
   */
  @body body: GradeHorarioOfertaFormacaoUpdateInput,
): GradeHorarioOfertaFormacaoFindOneOutput | ForbiddenResponse | NotFoundResponse;

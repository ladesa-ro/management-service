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
@tag("aulas")
@route("/aulas")
@get
op AulaList(
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

  @query(#{ explode: true }) `filter.diario.id`?: string[],
  @query(#{ explode: true }) `filter.ambiente.id`?: string[],
): AulaListOutput | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("aulas")
@route("/aulas")
@post
op AulaCreate(
  /**
   * Dados de entrada para a criação de uma Aula.
   */
  @body body: AulaCreateInput,
): AulaFindOneOutput | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("aulas")
@route("/aulas/{id}")
@delete
op AulaDeleteOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "Aula")
  @format("uuid")
  @path
  id: string,
): Body<boolean> | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("aulas")
@route("/aulas/{id}")
@get
op AulaFindOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "Aula")
  @format("uuid")
  @path
  id: string,
): AulaFindOneOutput | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("aulas")
@route("/aulas/{id}")
@patch(#{implicitOptionality: false})
op AulaUpdateOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "Aula")
  @format("uuid")
  @path
  id: string,

  /**
   * Dados de entrada para a atualização de uma Aula.
   */
  @body body: AulaUpdateInput,
): AulaFindOneOutput | ForbiddenResponse | NotFoundResponse;

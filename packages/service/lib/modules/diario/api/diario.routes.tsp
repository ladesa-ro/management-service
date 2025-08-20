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
@tag("diarios")
@route("/diarios")
@get
op DiarioList(
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

  @query(#{ explode: true }) `filter.turma.id`?: string[],
  @query(#{ explode: true }) `filter.disciplina.id`?: string[],
  @query(#{ explode: true }) `filter.ambientePadrao.id`?: string[],
  @query(#{ explode: true }) `filter.calendarioLetivo.id`?: string[],
): DiarioListOutput | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("diarios")
@route("/diarios")
@post
op DiarioCreate(
  /**
   * Dados de entrada para a criação de um diário.
   */
  @body body: DiarioCreateInput,
): DiarioFindOneOutput | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("diarios")
@route("/diarios/{id}")
@delete
op DiarioDeleteOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "Diario")
  @format("uuid")
  @path
  id: string,
): Body<boolean> | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("diarios")
@route("/diarios/{id}")
@get
op DiarioFindOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "Diario")
  @format("uuid")
  @path
  id: string,
): DiarioFindOneOutput | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("diarios")
@route("/diarios/{id}")
@patch(#{implicitOptionality: false})
op DiarioUpdateOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "Diario")
  @format("uuid")
  @path
  id: string,

  /**
   * Dados de entrada para a atualização de um diário.
   */
  @body body: DiarioUpdateInput,
): DiarioFindOneOutput | ForbiddenResponse | NotFoundResponse;

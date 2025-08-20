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
@tag("campi")
@route("/campi")
@get
op CampusList(
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

  @query(#{ explode: true }) `filter.endereco.cidade.id`?: string[],
  @query(#{ explode: true }) `filter.endereco.cidade.estado.id`?: string[],
): CampusListOutput | ForbiddenResponse | NotFoundResponse;

/**
 * Operação de criação de um campus.
 */
@tag("campi")
@route("/campi")
@post
op CampusCreate(
  /**
   * Dados de entrada para a criação de um campus.
   */
  @body body: CampusCreateInput,
): CampusFindOneOutput | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("campi")
@route("/campi/{id}")
@delete
op CampusDeleteOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "Campus")
  @format("uuid")
  @path
  id: string,
): Body<boolean> | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("campi")
@route("/campi/{id}")
@get
op CampusFindOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "Campus")
  @format("uuid")
  @path
  id: string,
): CampusFindOneOutput | ForbiddenResponse | NotFoundResponse;

/**
 * Operação de atualização de um campus.
 */
@tag("campi")
@route("/campi/{id}")
@patch(#{implicitOptionality: false})
op CampusUpdateOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "Campus")
  @format("uuid")
  @path
  id: string,

  /**
   * Dados de entrada para a atualização de um campus.
   */
  @body body: CampusUpdateInput,
): CampusFindOneOutput | ForbiddenResponse | NotFoundResponse;

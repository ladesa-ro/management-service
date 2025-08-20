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
@tag("eventos")
@route("/eventos")
@get
op EventoList(
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

  @query(#{ explode: true }) `filter.calendario.id`?: string[],
): EventoListOutput | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("eventos")
@route("/eventos")
@post
op EventoCreate(
  /**
   * Dados de entrada para a criação de um Evento.
   */
  @body body: EventoCreateInput,
): EventoFindOneOutput | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("eventos")
@route("/eventos/{id}")
@delete
op EventoDeleteOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "Evento")
  @format("uuid")
  @path
  id: string,
): Body<boolean> | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("eventos")
@route("/eventos/{id}")
@get
op EventoFindOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "Evento")
  @format("uuid")
  @path
  id: string,
): EventoFindOneOutput | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("eventos")
@route("/eventos/{id}")
@patch(#{implicitOptionality: false})
op EventoUpdateOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "Evento")
  @format("uuid")
  @path
  id: string,

  /**
   * Dados de entrada para a atualização de um Evento.
   */
  @body body: EventoUpdateInput,
): EventoFindOneOutput | ForbiddenResponse | NotFoundResponse;

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
@tag("calendarios-letivos")
@route("/calendarios-letivos")
@get
op CalendarioLetivoList(
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

  @query(#{ explode: true }) `filter.campus.id`?: string[],
  @query(#{ explode: true }) `filter.ofertaFormacao.id`?: string[],
): CalendarioLetivoListOutput | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("calendarios-letivos")
@route("/calendarios-letivos")
@post
op CalendarioLetivoCreate(
  /**
   * Dados de entrada para a criação de um calendário letivo.
   */
  @body body: CalendarioLetivoCreateInput,
): CalendarioLetivoFindOneOutput | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("calendarios-letivos")
@route("/calendarios-letivos/{id}")
@delete
op CalendarioLetivoDeleteOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension(
    "x-unispec-constraint-entity-exists",
    "CalendarioLetivo"
  )
  @format("uuid")
  @path
  id: string,
): Body<boolean> | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("calendarios-letivos")
@route("/calendarios-letivos/{id}")
@get
op CalendarioLetivoFindOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension(
    "x-unispec-constraint-entity-exists",
    "CalendarioLetivo"
  )
  @format("uuid")
  @path
  id: string,
): CalendarioLetivoFindOneOutput | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("calendarios-letivos")
@route("/calendarios-letivos/{id}")
@patch(#{implicitOptionality: false})
op CalendarioLetivoUpdateOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension(
    "x-unispec-constraint-entity-exists",
    "CalendarioLetivo"
  )
  @format("uuid")
  @path
  id: string,

  /**
   * Dados de entrada para a atualização de um calendário letivo.
   */
  @body body: CalendarioLetivoUpdateInput,
): CalendarioLetivoFindOneOutput | ForbiddenResponse | NotFoundResponse;

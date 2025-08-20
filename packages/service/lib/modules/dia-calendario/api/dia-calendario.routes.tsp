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
@tag("dias-calendarios")
@route("/dias-calendario")
@get
op DiaCalendarioList(
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
): DiaCalendarioListOutput | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("dias-calendarios")
@route("/dias-calendario")
@post
op DiaCalendarioCreate(
  /**
   * Dados de entrada para a criação de um DiaCalendario.
   */
  @body body: DiaCalendarioCreateInput,
): DiaCalendarioFindOneOutput | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("dias-calendarios")
@route("/dias-calendario/{id}")
@delete
op DiaCalendarioDeleteOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension(
    "x-unispec-constraint-entity-exists",
    "DiaCalendario"
  )
  @format("uuid")
  @path
  id: string,
): Body<boolean> | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("dias-calendarios")
@route("/dias-calendario/{id}")
@get
op DiaCalendarioFindOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension(
    "x-unispec-constraint-entity-exists",
    "DiaCalendario"
  )
  @format("uuid")
  @path
  id: string,
): DiaCalendarioFindOneOutput | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("dias-calendarios")
@route("/dias-calendario/{id}")
@patch(#{implicitOptionality: false})
op DiaCalendarioUpdateOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension(
    "x-unispec-constraint-entity-exists",
    "DiaCalendario"
  )
  @format("uuid")
  @path
  id: string,

  /**
   * Dados de entrada para a atualização de um DiaCalendario.
   */
  @body body: DiaCalendarioUpdateInput,
): DiaCalendarioFindOneOutput | ForbiddenResponse | NotFoundResponse;

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
@tag("reservas")
@route("/reservas")
@get
op ReservaList(
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

  @query(#{ explode: true }) `filter.dataInicio`?: string[],
  @query(#{ explode: true }) `filter.dataTermino`?: string[],
  @query(#{ explode: true }) `intervaloDeTempo.periodoInicio`?: string[],
  @query(#{ explode: true }) `intervaloDeTempo.periodoFim`?: string[],
): ReservaListOutput | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("reservas")
@route("/reservas")
@post
op ReservaCreate(
  /**
   * Dados de entrada para a criação de uma Reserva.
   */
  @body body: ReservaCreateInput,
): ReservaFindOneOutput | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("reservas")
@route("/reservas/{id}")
@delete
op ReservaDeleteOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension(
    "x-unispec-constraint-entity-exists",
    "Reserva"
  )
  @format("uuid")
  @path
  id: string,
): Body<boolean> | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("reservas")
@route("/reservas/{id}")
@get
op ReservaFindOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension(
    "x-unispec-constraint-entity-exists",
    "Reserva"
  )
  @format("uuid")
  @path
  id: string,
): ReservaFindOneOutput | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("reservas")
@route("/reservas/{id}")
@patch(#{implicitOptionality: false})
op ReservaUpdateOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension(
    "x-unispec-constraint-entity-exists",
    "Reserva"
  )
  @format("uuid")
  @path
  id: string,

  /**
   * Dados de entrada para a atualização de uma Reserva.
   */
  @body body: ReservaUpdateInput,
): ReservaFindOneOutput | ForbiddenResponse | NotFoundResponse;

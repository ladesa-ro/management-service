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
@tag("diarios-preferencia-agrupamento")
@route("/diarios-preferencia-agrupamento")
@get
op DiarioPreferenciaAgrupamentoList(
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
): DiarioPreferenciaAgrupamentoListOutput | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("diarios-preferencia-agrupamento")
@route("/diarios-preferencia-agrupamento")
@post
op DiarioPreferenciaAgrupamentoCreate(
  /**
   * Dados de entrada para a criação de um DiarioPreferenciaAgrupamento.
   */
  @body body: DiarioPreferenciaAgrupamentoCreateInput,
): DiarioPreferenciaAgrupamentoFindOneOutput | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("diarios-preferencia-agrupamento")
@route("/diarios-preferencia-agrupamento/{id}")
@delete
op DiarioPreferenciaAgrupamentoDeleteOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension(
    "x-unispec-constraint-entity-exists",
    "DiarioPreferenciaAgrupamento"
  )
  @format("uuid")
  @path
  id: string,
): Body<boolean> | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("diarios-preferencia-agrupamento")
@route("/diarios-preferencia-agrupamento/{id}")
@get
op DiarioPreferenciaAgrupamentoFindOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension(
    "x-unispec-constraint-entity-exists",
    "DiarioPreferenciaAgrupamento"
  )
  @format("uuid")
  @path
  id: string,
): DiarioPreferenciaAgrupamentoFindOneOutput | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("diarios-preferencia-agrupamento")
@route("/diarios-preferencia-agrupamento/{id}")
@patch(#{implicitOptionality: false})
op DiarioPreferenciaAgrupamentoUpdateOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension(
    "x-unispec-constraint-entity-exists",
    "DiarioPreferenciaAgrupamento"
  )
  @format("uuid")
  @path
  id: string,

  /**
   * Dados de entrada para a atualização de um DiarioPreferenciaAgrupamento.
   */
  @body body: DiarioPreferenciaAgrupamentoUpdateInput,
): DiarioPreferenciaAgrupamentoFindOneOutput | ForbiddenResponse | NotFoundResponse;

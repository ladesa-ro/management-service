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
@tag("cidades")
@route("/base/cidades")
@get
op CidadeList(
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

  @query(#{ explode: true }) `filter.estado.id`?: string[],
): CidadeListOutput | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("cidades")
@route("/base/cidades/{id}")
@get
op CidadeFindOneById(
  /**
   * Identificador do registro (numérico).
   */
  @minValue(1) @path id: integer,
): CidadeFindOneOutput | ForbiddenResponse | NotFoundResponse;
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
@tag("etapas")
@route("/etapas")
@get
op EtapaList(
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
): EtapaListOutput | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("etapas")
@route("/etapas")
@post
op EtapaCreate(
  /**
   * Dados de entrada para a criação de uma Etapa.
   */
  @body body: EtapaCreateInput,
): EtapaFindOneOutput | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("etapas")
@route("/etapas/{id}")
@delete
op EtapaDeleteOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "Etapa")
  @format("uuid")
  @path
  id: string,
): Body<boolean> | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("etapas")
@route("/etapas/{id}")
@get
op EtapaFindOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "Etapa")
  @format("uuid")
  @path
  id: string,
): EtapaFindOneOutput | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("etapas")
@route("/etapas/{id}")
@patch(#{implicitOptionality: false})
op EtapaUpdateOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "Etapa")
  @format("uuid")
  @path
  id: string,

  /**
   * Dados de entrada para a atualização de uma Etapa.
   */
  @body body: EtapaUpdateInput,
): EtapaFindOneOutput | ForbiddenResponse | NotFoundResponse;

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
@tag("ofertas-formacoes")
@route("/ofertas-formacoes")
@get
op OfertaFormacaoList(
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
): OfertaFormacaoListOutput | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("ofertas-formacoes")
@route("/ofertas-formacoes")
@post
op OfertaFormacaoCreate(
  /**
   * Dados de entrada para a criação de uma oferta de formação.
   */
  @body body: OfertaFormacaoCreateInput,
): OfertaFormacaoFindOneOutput | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("ofertas-formacoes")
@route("/ofertas-formacoes/{id}")
@delete
op OfertaFormacaoDeleteOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension(
    "x-unispec-constraint-entity-exists",
    "OfertaFormacao"
  )
  @format("uuid")
  @path
  id: string,
): Body<boolean> | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("ofertas-formacoes")
@route("/ofertas-formacoes/{id}")
@get
op OfertaFormacaoFindOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension(
    "x-unispec-constraint-entity-exists",
    "OfertaFormacao"
  )
  @format("uuid")
  @path
  id: string,
): OfertaFormacaoFindOneOutput | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("ofertas-formacoes")
@route("/ofertas-formacoes/{id}")
@patch(#{implicitOptionality: false})
op OfertaFormacaoUpdateOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension(
    "x-unispec-constraint-entity-exists",
    "OfertaFormacao"
  )
  @format("uuid")
  @path
  id: string,

  /**
   * Dados de entrada para a atualização de uma oferta de formação.
   */
  @body body: OfertaFormacaoUpdateInput,
): OfertaFormacaoFindOneOutput | ForbiddenResponse | NotFoundResponse;

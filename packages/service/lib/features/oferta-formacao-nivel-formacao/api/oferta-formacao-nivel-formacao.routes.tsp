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
@tag("ofertas-formacoes-niveis-formacoes")
@route("/ofertas-formacoes-niveis-formacoes")
@get
op OfertaFormacaoNivelFormacaoList(
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
): OfertaFormacaoNivelFormacaoListOutput | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("ofertas-formacoes-niveis-formacoes")
@route("/ofertas-formacoes-niveis-formacoes")
@post
op OfertaFormacaoNivelFormacaoCreate(
  /**
   * Dados de entrada para a criação de uma oferta de formação.
   */
  @body body: OfertaFormacaoNivelFormacaoCreateInput,
): OfertaFormacaoNivelFormacaoFindOneOutput | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("ofertas-formacoes-niveis-formacoes")
@route("/ofertas-formacoes-niveis-formacoes/{id}")
@delete
op OfertaFormacaoNivelFormacaoDeleteOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension(
    "x-unispec-constraint-entity-exists",
    "OfertaFormacaoNivelFormacao"
  )
  @format("uuid")
  @path
  id: string,
): Body<boolean> | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("ofertas-formacoes-niveis-formacoes")
@route("/ofertas-formacoes-niveis-formacoes/{id}")
@get
op OfertaFormacaoNivelFormacaoFindOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension(
    "x-unispec-constraint-entity-exists",
    "OfertaFormacaoNivelFormacao"
  )
  @format("uuid")
  @path
  id: string,
): OfertaFormacaoNivelFormacaoFindOneOutput | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("ofertas-formacoes-niveis-formacoes")
@route("/ofertas-formacoes-niveis-formacoes/{id}")
@patch(#{implicitOptionality: false})
op OfertaFormacaoNivelFormacaoUpdateOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension(
    "x-unispec-constraint-entity-exists",
    "OfertaFormacaoNivelFormacao"
  )
  @format("uuid")
  @path
  id: string,

  /**
   * Dados de entrada para a atualização de uma oferta de formação.
   */
  @body body: OfertaFormacaoNivelFormacaoUpdateInput,
): OfertaFormacaoNivelFormacaoFindOneOutput | ForbiddenResponse | NotFoundResponse;

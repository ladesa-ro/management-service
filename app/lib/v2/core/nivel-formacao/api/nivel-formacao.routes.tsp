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
@tag("niveis-formacoes")
@route("/niveis-formacoes")
@get
op NivelFormacaoList(
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
): NivelFormacaoListOutput | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("niveis-formacoes")
@route("/niveis-formacoes")
@post
op NivelFormacaoCreate(
  /**
   * Dados de entrada para a criação de um nível de formação.
   */
  @body body: NivelFormacaoCreateInput,
): NivelFormacaoFindOneOutput | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("niveis-formacoes")
@route("/niveis-formacoes/{id}")
@delete
op NivelFormacaoDeleteOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension(
    "x-unispec-constraint-entity-exists",
    "NivelFormacao"
  )
  @format("uuid")
  @path
  id: string,
): Body<boolean> | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("niveis-formacoes")
@route("/niveis-formacoes/{id}")
@get
op NivelFormacaoFindOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension(
    "x-unispec-constraint-entity-exists",
    "NivelFormacao"
  )
  @format("uuid")
  @path
  id: string,
): NivelFormacaoFindOneOutput | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("niveis-formacoes")
@route("/niveis-formacoes/{id}")
@patch(#{implicitOptionality: false})
op NivelFormacaoUpdateOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension(
    "x-unispec-constraint-entity-exists",
    "NivelFormacao"
  )
  @format("uuid")
  @path
  id: string,

  /**
   * Dados de entrada para a atualização de um nível de formação.
   */
  @body body: NivelFormacaoUpdateInput,
): NivelFormacaoFindOneOutput | ForbiddenResponse | NotFoundResponse;

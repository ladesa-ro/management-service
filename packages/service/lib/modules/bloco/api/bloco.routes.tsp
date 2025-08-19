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
@tag("blocos")
@route("/blocos")
@get
op BlocoList(
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
): BlocoListOutput | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("blocos")
@route("/blocos")
@post
op BlocoCreate(
  /**
   * Dados de entrada para a criação de um bloco.
   */
  @body body: BlocoCreateInput,
): BlocoFindOneOutput | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("blocos")
@route("/blocos/{id}")
@delete
op BlocoDeleteOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "Bloco")
  @format("uuid")
  @path
  id: string,
): Body<boolean> | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("blocos")
@route("/blocos/{id}")
@get
op BlocoFindOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "Bloco")
  @format("uuid")
  @path
  id: string,
): BlocoFindOneOutput | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("blocos")
@route("/blocos/{id}")
@patch(#{implicitOptionality: false})
op BlocoUpdateOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "Bloco")
  @format("uuid")
  @path
  id: string,

  /**
   * Dados de entrada para a atualização de um bloco.
   */
  @body body: BlocoUpdateInput,
): BlocoFindOneOutput | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("blocos")
@route("/blocos/{id}/imagem/capa")
@get
op BlocoGetImagemCapa(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "Bloco")
  @format("uuid")
  @path
  id: string,

  @query(#{explode: true}) imgCapa?: string,
): {
  @header contentType: "image/jpeg";
  @body body: bytes;
} | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("blocos")
@route("/blocos/{id}/imagem/capa")
@put
op BlocoSetImagemCapa(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "Bloco")
  @format("uuid")
  @path
  id: string,

  @header contentType: "multipart/form-data",
  @multipartBody body: {
    file: HttpPart<unknown>;
  },
): Body<boolean> | ForbiddenResponse | NotFoundResponse;

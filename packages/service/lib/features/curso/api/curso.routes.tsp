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
@tag("cursos")
@route("/cursos")
@get
op CursoList(
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
): CursoListOutput | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("cursos")
@route("/cursos")
@post
op CursoCreate(
  /**
   * Dados de entrada para a criação de um Curso.
   */
  @body body: CursoCreateInput,
): CursoFindOneOutput | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("cursos")
@route("/cursos/{id}")
@delete
op CursoDeleteOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "Curso")
  @format("uuid")
  @path
  id: string,
): Body<boolean> | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("cursos")
@route("/cursos/{id}")
@get
op CursoFindOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "Curso")
  @format("uuid")
  @path
  id: string,
): CursoFindOneOutput | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("cursos")
@route("/cursos/{id}")
@patch(#{implicitOptionality: false})
op CursoUpdateOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "Curso")
  @format("uuid")
  @path
  id: string,

  /**
   * Dados de entrada para a atualização de um Curso.
   */
  @body body: CursoUpdateInput,
): CursoFindOneOutput | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("cursos")
@route("/cursos/{id}/imagem/capa")
@get
op CursoGetImagemCapa(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "Curso")
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
@tag("cursos")
@route("/cursos/{id}/imagem/capa")
@put
op CursoSetImagemCapa(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "Curso")
  @format("uuid")
  @path
  id: string,

  @header contentType: "multipart/form-data",
  @multipartBody body: {
    file: HttpPart<unknown>;
  },
): Body<boolean> | ForbiddenResponse | NotFoundResponse;

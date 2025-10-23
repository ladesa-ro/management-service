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
@tag("disciplinas")
@route("/disciplinas")
@get
op DisciplinaList(
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

  @query(#{ explode: true }) `filter.diarios.id`?: string[],
  @query(#{ explode: true }) `filter.campus.id`?: string[],
  @query(#{ explode: true }) `filter.professores.id`?: string[],
  @query(#{ explode: true }) `filter.turma.id`?: string[],
  
): DisciplinaListOutput | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("disciplinas")
@route("/disciplinas")
@post
op DisciplinaCreate(
  /**
   * Dados de entrada para a criação de uma Disciplina.
   */
  @body body: DisciplinaCreateInput,
): DisciplinaFindOneOutput | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("disciplinas")
@route("/disciplinas/{id}")
@delete
op DisciplinaDeleteOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension(
    "x-unispec-constraint-entity-exists",
    "Disciplina"
  )
  @format("uuid")
  @path
  id: string,
): Body<boolean> | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("disciplinas")
@route("/disciplinas/{id}")
@get
op DisciplinaFindOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension(
    "x-unispec-constraint-entity-exists",
    "Disciplina"
  )
  @format("uuid")
  @path
  id: string,
): DisciplinaFindOneOutput | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("disciplinas")
@route("/disciplinas/{id}")
@patch(#{implicitOptionality: false})
op DisciplinaUpdateOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension(
    "x-unispec-constraint-entity-exists",
    "Disciplina"
  )
  @format("uuid")
  @path
  id: string,

  /**
   * Dados de entrada para a atualização de uma Disciplina.
   */
  @body body: DisciplinaUpdateInput,
): DisciplinaFindOneOutput | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("disciplinas")
@route("/disciplinas/{id}/imagem/capa")
@get
op DisciplinaGetImagemCapa(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension(
    "x-unispec-constraint-entity-exists",
    "Disciplina"
  )
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
@tag("disciplinas")
@route("/disciplinas/{id}/imagem/capa")
@put
op DisciplinaSetImagemCapa(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension(
    "x-unispec-constraint-entity-exists",
    "Disciplina"
  )
  @format("uuid")
  @path
  id: string,

  @header contentType: "multipart/form-data",
  @multipartBody body: {
    file: HttpPart<unknown>;
  },
): Body<boolean> | ForbiddenResponse | NotFoundResponse;

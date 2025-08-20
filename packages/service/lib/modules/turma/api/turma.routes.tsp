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
@tag("turmas")
@route("/turmas")
@get
op TurmaList(
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

  @query(#{ explode: true }) `filter.ambientePadraoAula.nome`?: string[],
  @query(#{ explode: true }) `filter.ambientePadraoAula.codigo`?: string[],
  @query(#{ explode: true }) `filter.ambientePadraoAula.capacidade`?: string[],
  @query(#{ explode: true }) `filter.ambientePadraoAula.tipo`?: string[],
  @query(#{ explode: true }) `filter.curso.id`?: string[],
  @query(#{ explode: true }) `filter.curso.nome`?: string[],
  @query(#{ explode: true }) `filter.curso.nomeAbreviado`?: string[],
  @query(#{ explode: true }) `filter.curso.campus.id`?: string[],
  @query(#{ explode: true }) `filter.curso.ofertaFormacao.id`?: string[],
  @query(#{ explode: true }) `filter.curso.ofertaFormacao.nome`?: string[],
  @query(#{ explode: true }) `filter.curso.ofertaFormacao.slug`?: string[],
): TurmaListOutput | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("turmas")
@route("/turmas")
@post
op TurmaCreate(
  /**
   * Dados de entrada para a criação de uma Turma.
   */
  @body body: TurmaCreateInput,
): TurmaFindOneOutput | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("turmas")
@route("/turmas/{id}")
@delete
op TurmaDeleteOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "Turma")
  @format("uuid")
  @path
  id: string,
): Body<boolean> | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("turmas")
@route("/turmas/{id}")
@get
op TurmaFindOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "Turma")
  @format("uuid")
  @path
  id: string,
): TurmaFindOneOutput | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("turmas")
@route("/turmas/{id}")
@patch(#{implicitOptionality: false})
op TurmaUpdateOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "Turma")
  @format("uuid")
  @path
  id: string,

  /**
   * Dados de entrada para a atualização de uma Turma.
   */
  @body body: TurmaUpdateInput,
): TurmaFindOneOutput | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("turmas")
@route("/turmas/{id}/imagem/capa")
@get
op TurmaGetImagemCapa(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "Turma")
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
@tag("turmas")
@route("/turmas/{id}/imagem/capa")
@put
op TurmaSetImagemCapa(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension("x-unispec-constraint-entity-exists", "Turma")
  @format("uuid")
  @path
  id: string,

  @header contentType: "multipart/form-data",
  @multipartBody body: {
    file: HttpPart<unknown>;
  },
): Body<boolean> | ForbiddenResponse | NotFoundResponse;

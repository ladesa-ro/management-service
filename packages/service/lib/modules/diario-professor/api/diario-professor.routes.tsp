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
@tag("diarios-professores")
@route("/diarios-professores")
@get
op DiarioProfessorList(
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

  @query(#{ explode: true }) `filter.perfil.id`?: string[],
  @query(#{ explode: true }) `filter.diario.id`?: string[],
): DiarioProfessorListOutput | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("diarios-professores")
@route("/diarios-professores")
@post
op DiarioProfessorCreate(
  /**
   * Dados de entrada para a criação de um DiarioProfessor.
   */
  @body body: DiarioProfessorCreateInput,
): DiarioProfessorFindOneOutput | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("diarios-professores")
@route("/diarios-professores/{id}")
@delete
op DiarioProfessorDeleteOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension(
    "x-unispec-constraint-entity-exists",
    "DiarioProfessor"
  )
  @format("uuid")
  @path
  id: string,
): Body<boolean> | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("diarios-professores")
@route("/diarios-professores/{id}")
@get
op DiarioProfessorFindOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension(
    "x-unispec-constraint-entity-exists",
    "DiarioProfessor"
  )
  @format("uuid")
  @path
  id: string,
): DiarioProfessorFindOneOutput | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("diarios-professores")
@route("/diarios-professores/{id}")
@patch(#{implicitOptionality: false})
op DiarioProfessorUpdateOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension(
    "x-unispec-constraint-entity-exists",
    "DiarioProfessor"
  )
  @format("uuid")
  @path
  id: string,

  /**
   * Dados de entrada para a atualização de um DiarioProfessor.
   */
  @body body: DiarioProfessorUpdateInput,
): DiarioProfessorFindOneOutput | ForbiddenResponse | NotFoundResponse;

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
@tag("turmas-disponibilidades")
@route("/turmas-disponibilidades/{id}")
@delete
op TurmaDisponibilidadeDeleteOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension(
    "x-unispec-constraint-entity-exists",
    "TurmaDisponibilidade"
  )
  @format("uuid")
  @path
  id: string,
): Body<boolean> | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("turmas-disponibilidades")
@route("/turmas-disponibilidades/{id}")
@get
op TurmaDisponibilidadeFindOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension(
    "x-unispec-constraint-entity-exists",
    "TurmaDisponibilidade"
  )
  @format("uuid")
  @path
  id: string,
): TurmaDisponibilidadeFindOneOutput | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("turmas-disponibilidades")
@route("/turmas-disponibilidades/{id}")
@patch(#{implicitOptionality: false})
op TurmaDisponibilidadeUpdateOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension(
    "x-unispec-constraint-entity-exists",
    "TurmaDisponibilidade"
  )
  @format("uuid")
  @path
  id: string,

  /**
   * Dados de entrada para a atualização de uma TurmaDisponibilidade.
   */
  @body body: TurmaDisponibilidadeUpdateInput,
): TurmaDisponibilidadeFindOneOutput | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("professores-disponibilidades")
@route("/professores-disponibilidades")
@get
op ProfessorDisponibilidadeList(
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

  @query(#{ explode: true }) `filter.professor.id`?: string[],
): ProfessorDisponibilidadeListOutput | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("professores-disponibilidades")
@route("/professores-disponibilidades")
@post
op ProfessorDisponibilidadeCreate(
  /**
   * Dados de entrada para a criação de uma ProfessorDisponibilidade.
   */
  @body body: ProfessorDisponibilidadeCreateInput,
): ProfessorDisponibilidadeFindOneOutput | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("professores-disponibilidades")
@route("/professores-disponibilidades/{id}")
@delete
op ProfessorDisponibilidadeDeleteOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension(
    "x-unispec-constraint-entity-exists",
    "ProfessorDisponibilidade"
  )
  @format("uuid")
  @path
  id: string,
): Body<boolean> | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("professores-disponibilidades")
@route("/professores-disponibilidades/{id}")
@get
op ProfessorDisponibilidadeFindOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension(
    "x-unispec-constraint-entity-exists",
    "ProfessorDisponibilidade"
  )
  @format("uuid")
  @path
  id: string,
): ProfessorDisponibilidadeFindOneOutput | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("professores-disponibilidades")
@route("/professores-disponibilidades/{id}")
@patch(#{implicitOptionality: false})
op ProfessorDisponibilidadeUpdateOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension(
    "x-unispec-constraint-entity-exists",
    "ProfessorDisponibilidade"
  )
  @format("uuid")
  @path
  id: string,

  /**
   * Dados de entrada para a atualização de uma ProfessorDisponibilidade.
   */
  @body body: ProfessorDisponibilidadeUpdateInput,
): ProfessorDisponibilidadeFindOneOutput | ForbiddenResponse | NotFoundResponse;

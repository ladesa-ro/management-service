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
@tag("horarios-gerados-aula")
@route("/horarios-gerados-aula")
@get
op HorarioGeradoAulaList(
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
): HorarioGeradoAulaListOutput | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("horarios-gerados-aula")
@route("/horarios-gerados-aula")
@post
op HorarioGeradoAulaCreate(
  /**
   * Dados de entrada para a criação de um HorarioGeradoAula.
   */
  @body body: HorarioGeradoAulaCreateInput,
): HorarioGeradoAulaFindOneOutput | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("horarios-gerados-aula")
@route("/horarios-gerados-aula/{id}")
@delete
op HorarioGeradoAulaDeleteOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension(
    "x-unispec-constraint-entity-exists",
    "HorarioGeradoAula"
  )
  @format("uuid")
  @path
  id: string,
): Body<boolean> | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("horarios-gerados-aula")
@route("/horarios-gerados-aula/{id}")
@get
op HorarioGeradoAulaFindOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension(
    "x-unispec-constraint-entity-exists",
    "HorarioGeradoAula"
  )
  @format("uuid")
  @path
  id: string,
): HorarioGeradoAulaFindOneOutput | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("horarios-gerados-aula")
@route("/horarios-gerados-aula/{id}")
@patch(#{implicitOptionality: false})
op HorarioGeradoAulaUpdateOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension(
    "x-unispec-constraint-entity-exists",
    "HorarioGeradoAula"
  )
  @format("uuid")
  @path
  id: string,

  /**
   * Dados de entrada para a atualização de um HorarioGeradoAula.
   */
  @body body: HorarioGeradoAulaUpdateInput,
): HorarioGeradoAulaFindOneOutput | ForbiddenResponse | NotFoundResponse;

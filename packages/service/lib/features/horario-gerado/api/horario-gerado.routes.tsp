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
@tag("horarios-gerados")
@route("/horarios-gerados")
@get
op HorarioGeradoList(
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
): HorarioGeradoListOutput | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("horarios-gerados")
@route("/horarios-gerados")
@post
op HorarioGeradoCreate(
  /**
   * Dados de entrada para a criação de um HorarioGerado.
   */
  @body body: HorarioGeradoCreateInput,
): HorarioGeradoFindOneOutput | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("horarios-gerados")
@route("/horarios-gerados/{id}")
@delete
op HorarioGeradoDeleteOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension(
    "x-unispec-constraint-entity-exists",
    "HorarioGerado"
  )
  @format("uuid")
  @path
  id: string,
): Body<boolean> | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("horarios-gerados")
@route("/horarios-gerados/{id}")
@get
op HorarioGeradoFindOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension(
    "x-unispec-constraint-entity-exists",
    "HorarioGerado"
  )
  @format("uuid")
  @path
  id: string,
): HorarioGeradoFindOneOutput | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("horarios-gerados")
@route("/horarios-gerados/{id}")
@patch(#{implicitOptionality: false})
op HorarioGeradoUpdateOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension(
    "x-unispec-constraint-entity-exists",
    "HorarioGerado"
  )
  @format("uuid")
  @path
  id: string,

  /**
   * Dados de entrada para a atualização de um HorarioGerado.
   */
  @body body: HorarioGeradoUpdateInput,
): HorarioGeradoFindOneOutput | ForbiddenResponse | NotFoundResponse;

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
@tag("disponibilidades")
@route("/disponibilidades")
@get
op DisponibilidadeList(
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
): DisponibilidadeListOutput | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("disponibilidades")
@route("/disponibilidades")
@post
op DisponibilidadeCreate(
  /**
   * Dados de entrada para a criação de uma Disponibilidade.
   */
  @body body: DisponibilidadeCreateInput,
): DisponibilidadeFindOneOutput | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("disponibilidades")
@route("/disponibilidades/{id}")
@delete
op DisponibilidadeDeleteOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension(
    "x-unispec-constraint-entity-exists",
    "Disponibilidade"
  )
  @format("uuid")
  @path
  id: string,
): Body<boolean> | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("disponibilidades")
@route("/disponibilidades/{id}")
@get
op DisponibilidadeFindOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension(
    "x-unispec-constraint-entity-exists",
    "Disponibilidade"
  )
  @format("uuid")
  @path
  id: string,
): DisponibilidadeFindOneOutput | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("disponibilidades")
@route("/disponibilidades/{id}")
@patch(#{implicitOptionality: false})
op DisponibilidadeUpdateOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension(
    "x-unispec-constraint-entity-exists",
    "Disponibilidade"
  )
  @format("uuid")
  @path
  id: string,

  /**
   * Dados de entrada para a atualização de uma Disponibilidade.
   */
  @body body: DisponibilidadeUpdateInput,
): DisponibilidadeFindOneOutput | ForbiddenResponse | NotFoundResponse;

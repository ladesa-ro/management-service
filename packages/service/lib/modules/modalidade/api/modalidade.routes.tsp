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
@tag("modalidades")
@route("/modalidades")
@get
op ModalidadeList(
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
): ModalidadeListOutput | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("modalidades")
@route("/modalidades")
@post
op ModalidadeCreate(
  /**
   * Dados de entrada para a criação de uma modalidade.
   */
  @body body: ModalidadeCreateInput,
): ModalidadeFindOneOutput | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("modalidades")
@route("/modalidades/{id}")
@delete
op ModalidadeDeleteOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension(
    "x-unispec-constraint-entity-exists",
    "Modalidade"
  )
  @format("uuid")
  @path
  id: string,
): Body<boolean> | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("modalidades")
@route("/modalidades/{id}")
@get
op ModalidadeFindOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension(
    "x-unispec-constraint-entity-exists",
    "Modalidade"
  )
  @format("uuid")
  @path
  id: string,
): ModalidadeFindOneOutput | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("modalidades")
@route("/modalidades/{id}")
@patch(#{implicitOptionality: false})
op ModalidadeUpdateOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension(
    "x-unispec-constraint-entity-exists",
    "Modalidade"
  )
  @format("uuid")
  @path
  id: string,

  /**
   * Dados de entrada para a atualização de uma modalidade.
   */
  @body body: ModalidadeUpdateInput,
): ModalidadeFindOneOutput | ForbiddenResponse | NotFoundResponse;

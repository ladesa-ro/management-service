import "@typespec/http";
import "@typespec/json-schema";
import "@typespec/openapi";
import "@typespec/openapi3";

using Http;
using OpenAPI;
using JsonSchema;

namespace Ladesa.ManagementService;

@tag("perfis")
@route("/perfis/{id}/ensino")
@get
op PerfilEnsinoById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension(
    "x-unispec-constraint-entity-exists",
    "Usuario"
  )
  @format("uuid")
  @path
  id: string,
): PerfilEnsinoOutput | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("perfis")
@route("/perfis")
@get
op PerfilList(
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

  @query(#{ explode: true }) `filter.cargo`?: string[],
  @query(#{ explode: true }) `filter.ativo`?: string[],
  @query(#{ explode: true }) `filter.campus.id`?: string[],
  @query(#{ explode: true }) `filter.usuario.id`?: string[],
): PerfilListOutput | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("perfis")
@route("/perfis")
@post
op PerfilUpdateOneById(
  /**
   * Dados de entrada para a alteração de vínculo de um Usuário a um Campus.
   */
  @body body: PerfilUpdateInput,
): PerfilListOutput | ForbiddenResponse | NotFoundResponse;

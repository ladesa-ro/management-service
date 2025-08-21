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
@route("/turmas-disponibilidades")
@get
op TurmaDisponibilidadeList(
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

  @query(#{ explode: true }) `filter.turma.id`?: string[],
): TurmaDisponibilidadeListOutput | ForbiddenResponse | NotFoundResponse;

/**
 * Sem descrição.
 */
@tag("turmas-disponibilidades")
@route("/turmas-disponibilidades")
@post
op TurmaDisponibilidadeCreate(
  /**
   * Dados de entrada para a criação de uma TurmaDisponibilidade.
   */
  @body body: TurmaDisponibilidadeCreateInput,
): TurmaDisponibilidadeFindOneOutput | ForbiddenResponse | NotFoundResponse;

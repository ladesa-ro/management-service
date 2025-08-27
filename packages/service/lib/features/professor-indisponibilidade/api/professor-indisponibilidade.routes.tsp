import "@typespec/http";
import "@typespec/json-schema";
import "@typespec/openapi";
import "@typespec/openapi3";

using Http;
using OpenAPI;
using JsonSchema;

namespace Ladesa.ManagementService;

/**
 * Indisponibilidades de Professor - listagem com paginacao, filtro e ordens.
 */
@tag("indisponibilidades-professores")
@route("/indisponibilidades")
@get
op ProfessorIndisponibilidadeList(
  /** Página de consulta. */
  @minValue(1) @query(#{ explode: true }) page?: integer,
  /** Limite por página. */
  @minValue(1) @query(#{ explode: true }) limit?: integer,
  /** Busca textual. */
  @query(#{ explode: true }) search?: string,
  /** Ordenaçao. */
  @query(#{ explode: true }) sortBy?: string[],
  /** Filtro por perfil (uuid). */
  @query id_perfil_fk?: string,
): ProfessorIndisponibilidadeListOutput | ForbiddenResponse | NotFoundResponse;

/**
 * Criar indisponibilidade para um professor (perfil).
 */
@tag("indisponibilidades-professores")
@route("/professores/{id_perfil}/indisponibilidades")
@post
op ProfessorIndisponibilidadeCreate(
  /** Identificador do perfil do professor (uuid). */
  @format("uuid") @path id_perfil: string,
  /** Dados de entrada para criaçao. */
  @key key: ProfessorIndisponibilidadeCreateInput,
): ProfessorIndisponibilidadeFindOneOutput | ForbiddenResponse | NotFoundResponse;

/**
 * Excluir uma indisponibilidade por id.
 */
@tag("indisponibilidades-professores")
@route("/indisponibilidades/{id}")
@delete
op ProfessorIndisponibilidadeDeleteOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension(
    "x-unispec-constraint-entity-exists",
    "ProfessorIndisponibilidade"
  )
  @format("uuid")
  @path
  id: string,
): Body<boolean> | ForbiddenResponse | NotFoundResponse;

/**
 * Buscar uma indisponibilidade por id.
 */
@tag("indisponibilidades-professores")
@route("/indisponibilidades/{id}")
@get
op ProfessorIndisponibilidadeFindOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension(
    "x-unispec-constraint-entity-exists",
    "ProfessorIndisponibilidade"
  )
  @format("uuid")
  @path
  id: string,
): ProfessorIndisponibilidadeFindOneOutput | ForbiddenResponse | NotFoundResponse;

/**
 * Atualizar parcialmente uma indisponibilidade.
 */
@tag("indisponibilidades-professores")
@route("/indisponibilidades/{id}")
@patch(#{ implicitOptionality: false })
op ProfessorIndisponibilidadeUpdateOneById(
  /**
   * Identificador do registro (uuid).
   */
  @TypeSpec.JsonSchema.extension(
    "x-unispec-constraint-entity-exists",
    "ProfessorIndisponibilidade"
  )
  @format("uuid")
  @path
  id: string,

  /**
   * Dados de entrada para atualização (campos opcionais quando desejado).
   */
  @body body: ProfessorIndisponibilidadeUpdateInput,
): ProfessorIndisponibilidadeFindOneOutput | ForbiddenResponse | NotFoundResponse;

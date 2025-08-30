import "@typespec/http";
import "@typespec/json-schema";
import "@typespec/openapi";
import "@typespec/openapi3";

using Http;
using OpenAPI;
using JsonSchema;

namespace Ladesa.ManagementService;

/** Listar (com filtro por id_perfil_fk) */
@tag("indisponibilidades-professores")
@route("/indisponibilidades")
@get
op ProfessorIndisponibilidadeList(
  @query idPerfilFk?: string,
): ProfessorIndisponibilidadeListOutput | ForbiddenResponse | NotFoundResponse;

/** Criar para um professor (perfil) */
@tag("indisponibilidades-professores")
@route("/professores/{id_perfil}/indisponibilidades")
@post
op ProfessorIndisponibilidadeCreate(
  @format("uuid") @path id_perfil: string,
  @body body: ProfessorIndisponibilidadeCreateInput,
): ProfessorIndisponibilidadeFindOneOutput | ForbiddenResponse | NotFoundResponse;

/** Buscar por id */
@tag("indisponibilidades-professores")
@route("/indisponibilidades/{id}")
@get
op ProfessorIndisponibilidadeFindOneById(
  @format("uuid") @path id: string,
): ProfessorIndisponibilidadeFindOneOutput | ForbiddenResponse | NotFoundResponse;

/** Atualizar parcialmente (PATCH) */
@tag("indisponibilidades-professores")
@route("/indisponibilidades/{id}")
@patch(#{ implicitOptionality: false })
op ProfessorIndisponibilidadeUpdateOneById(
  @format("uuid") @path id: string,
  @body body: ProfessorIndisponibilidadeUpdateInput,
): ProfessorIndisponibilidadeFindOneOutput | ForbiddenResponse | NotFoundResponse;

/** Excluir*/
@tag("indisponibilidades-professores")
@route("/indisponibilidades/{id}")
@delete
op ProfessorIndisponibilidadeDeleteOneById(
  @format("uuid") @path id: string,
): Body<boolean> | ForbiddenResponse | NotFoundResponse;

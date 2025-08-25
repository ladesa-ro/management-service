import "@typespec/http";
import "@typespec/json-schema";
import "@typespec/openapi";
import "@typespec/openapi3";

using Http;
using OpenAPI;
using JsonSchema;

namespace Ladesa.ManagementService;

@tag("indisponibilidades-professores")
@route("/indisponibilidades")
@get
op ProfessorIndisponibilidadeList(
  @minValue(1) @query page?: integer,
  @minValue(1) @query limit?: integer,
  @query id_perfil_fk?: string,
): ProfessorIndisponibilidadeListOutput;

@tag("indisponibilidades-professores")
@route("/indisponibilidades/{id}")
@get
op ProfessorIndisponibilidadeFindOneById(
  @format("uuid") @path id: string,
): ProfessorIndisponibilidadeFindOneOutput;

@tag("indisponibilidades-professores")
@route("/professores/{id_perfil}/indisponibilidades")
@get
op ProfessorIndisponibilidadeListByProfessor(
  @format("uuid") @path id_perfil: string,
): ProfessorIndisponibilidadeListOutput;

@tag("indisponibilidades-professores")
@route("/professores/{id_perfil}/indisponibilidades")
@post
op ProfessorIndisponibilidadeCreate(
  @format("uuid") @path id_perfil: string,
  @body body: ProfessorIndisponibilidadeCreateInput,
): ProfessorIndisponibilidadeFindOneOutput;

@tag("indisponibilidades-professores")
@route("/indisponibilidades/{id}")
@patch
op ProfessorIndisponibilidadeUpdate(
  @format("uuid") @path id: string,
  @body body: ProfessorIndisponibilidadeUpdateInput,
): ProfessorIndisponibilidadeFindOneOutput;

@tag("indisponibilidades-professores")
@route("/indisponibilidades/{id}")
@delete
op ProfessorIndisponibilidadeDeleteOneById(
  @format("uuid") @path id: string,
): Body<boolean>;

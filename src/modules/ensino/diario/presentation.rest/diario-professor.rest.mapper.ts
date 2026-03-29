import * as PerfilRestMapper from "@/modules/acesso/usuario/perfil/presentation.rest/perfil.rest.mapper";
import { createListMapper, createMapper } from "@/shared/mapping";
import { getNow } from "@/utils/date";
import { DiarioProfessorBulkReplaceCommand, DiarioProfessorListQuery } from "../domain";
import type { DiarioProfessorFindOneQueryResult } from "../domain/queries";
import * as DiarioRestMapper from "./diario.rest.mapper";
import {
  type DiarioProfessorBulkReplaceInputRestDto,
  DiarioProfessorFindOneOutputRestDto,
  type DiarioProfessorListInputRestDto,
  DiarioProfessorListOutputRestDto,
  type DiarioProfessorParentParamsRestDto,
} from "./diario-professor.rest.dto";

// ============================================================================
// Externa -> Interna (Input: Presentation -> Core)
// ============================================================================

export function listInputDtoToListQuery(
  parentParams: DiarioProfessorParentParamsRestDto,
  dto: DiarioProfessorListInputRestDto,
): DiarioProfessorListQuery {
  const input = new DiarioProfessorListQuery();
  input.page = dto.page;
  input.limit = dto.limit;
  input.search = dto.search;
  input.sortBy = dto.sortBy;
  input["filter.id"] = dto["filter.id"];
  input["filter.diario.id"] = [parentParams.diarioId];
  input["filter.perfil.id"] = dto["filter.perfil.id"];
  input["filter.perfil.usuario.id"] = dto["filter.perfil.usuario.id"];
  return input;
}

export function toBulkReplaceInput(
  parentParams: DiarioProfessorParentParamsRestDto,
  dto: DiarioProfessorBulkReplaceInputRestDto,
): DiarioProfessorBulkReplaceCommand {
  const input = new DiarioProfessorBulkReplaceCommand();
  input.diarioId = parentParams.diarioId;
  input.professores = dto.professores.map((p) => ({
    perfilId: p.perfilId,
    situacao: p.situacao,
  }));
  return input;
}

// ============================================================================
// Interna -> Externa (Output: Core -> Presentation)
// ============================================================================

export const findOneQueryResultToOutputDto = createMapper<
  DiarioProfessorFindOneQueryResult,
  DiarioProfessorFindOneOutputRestDto
>((output) => ({
  id: output.id,
  situacao: output.situacao,
  perfil: PerfilRestMapper.findOneQueryResultToOutputDto.mapOptional(output.perfil),
  diario: DiarioRestMapper.findOneQueryResultToOutputDto.mapOptional(output.diario),
  dateCreated: output.dateCreated
    ? new Date(output.dateCreated).toISOString()
    : getNow().toISOString(),
  dateUpdated: output.dateUpdated
    ? new Date(output.dateUpdated).toISOString()
    : getNow().toISOString(),
  dateDeleted: output.dateDeleted ? new Date(output.dateDeleted).toISOString() : null,
}));

export const listQueryResultToListOutputDto = createListMapper(
  DiarioProfessorListOutputRestDto,
  findOneQueryResultToOutputDto,
);

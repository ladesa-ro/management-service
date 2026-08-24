import { createListMapper, createMapper } from "@/shared/mapping";
import { TurmaMatriculaVincularCommand } from "../domain/commands/turma-matricula-vincular.command";
import { TurmaMatriculaFindOneQuery } from "../domain/queries/turma-matricula-find-one.query";
import type { TurmaMatriculaFindOneQueryResult } from "../domain/queries/turma-matricula-find-one.query.result";
import { TurmaMatriculaListQuery } from "../domain/queries/turma-matricula-list.query";
import {
  type TurmaMatriculaFindOneParamsRestDto,
  TurmaMatriculaFindOneOutputRestDto,
  type TurmaMatriculaListInputRestDto,
  TurmaMatriculaListOutputRestDto,
  type TurmaMatriculaVincularInputRestDto,
} from "./turma-matricula.rest.dto";

export const findOneParamsInputDtoToFindOneQuery = createMapper<
  TurmaMatriculaFindOneParamsRestDto,
  TurmaMatriculaFindOneQuery
>((params) => {
  const input = new TurmaMatriculaFindOneQuery();
  input.id = params.id;
  return input;
});

export const vincularInputDtoToVincularCommand = createMapper<
  TurmaMatriculaVincularInputRestDto,
  TurmaMatriculaVincularCommand
>((dto) => {
  const input = new TurmaMatriculaVincularCommand();
  input.turmaId = dto.turma.id;
  input.perfilId = dto.perfil.id;
  return input;
});

export const listInputDtoToListQuery = createMapper<
  TurmaMatriculaListInputRestDto,
  TurmaMatriculaListQuery
>((dto) => {
  const query = new TurmaMatriculaListQuery();
  query.page = dto.page;
  query.limit = dto.limit;
  query.search = dto.search;
  query.sortBy = dto.sortBy;
  query["filter.id"] = dto["filter.id"];
  query["filter.turma.id"] = dto["filter.turma.id"];
  query["filter.perfil.id"] = dto["filter.perfil.id"];
  return query;
});

export const findOneQueryResultToOutputDto = createMapper<
  TurmaMatriculaFindOneQueryResult,
  TurmaMatriculaFindOneOutputRestDto
>((output) => {
  const dto = new TurmaMatriculaFindOneOutputRestDto();
  dto.id = output.id;
  dto.turma = { id: output.turma.id };
  dto.perfil = { id: output.perfil.id };
  dto.dateCreated = output.dateCreated;
  dto.dateUpdated = output.dateUpdated;
  dto.dateDeleted = output.dateDeleted;
  return dto;
});

export const listQueryResultToListOutputDto = createListMapper(
  TurmaMatriculaListOutputRestDto,
  findOneQueryResultToOutputDto,
);

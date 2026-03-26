import {
  DisciplinaCreateCommand,
  DisciplinaFindOneQuery,
  type DisciplinaFindOneQueryResult,
  DisciplinaListQuery,
  DisciplinaUpdateCommand,
} from "@/modules/ensino/disciplina";
import {
  createListMapper,
  createMapper,
  createPaginatedInputMapper,
  mapField,
  mapImagemOutput,
} from "@/shared/mapping";
import {
  type DisciplinaCreateInputGraphQlDto,
  DisciplinaFindOneOutputGraphQlDto,
  type DisciplinaListInputGraphQlDto,
  DisciplinaListOutputGraphQlDto,
  type DisciplinaUpdateInputGraphQlDto,
} from "./disciplina.graphql.dto";

// ============================================================================
// Externa → Interna (Input: Presentation → Core)
// ============================================================================

export const findOneInputDtoToFindOneQuery = createMapper<string, DisciplinaFindOneQuery>((id) => {
  const input = new DisciplinaFindOneQuery();
  input.id = id;
  return input;
});

const listInputMapper = createPaginatedInputMapper<
  DisciplinaListInputGraphQlDto,
  DisciplinaListQuery
>(DisciplinaListQuery, (dto, query) => {
  mapField(query, "filter.id", dto, "filterId");
  mapField(query, "filter.diarios.id", dto, "filterDiariosId");
});

export function listInputDtoToListQuery(
  dto: DisciplinaListInputGraphQlDto | null,
): DisciplinaListQuery | null {
  if (!dto) return null;
  return listInputMapper.map(dto);
}

export const createInputDtoToCreateCommand = createMapper<
  DisciplinaCreateInputGraphQlDto,
  DisciplinaCreateCommand
>((dto) => {
  const input = new DisciplinaCreateCommand();
  input.nome = dto.nome;
  input.nomeAbreviado = dto.nomeAbreviado;
  input.cargaHoraria = dto.cargaHoraria;
  input.imagemCapa = dto.imagemCapa ? { id: dto.imagemCapa.id } : null;
  return input;
});

export const updateInputDtoToUpdateCommand = createMapper<
  { id: string; dto: DisciplinaUpdateInputGraphQlDto },
  DisciplinaFindOneQuery & DisciplinaUpdateCommand
>(({ id, dto }) => ({
  id,
  nome: dto.nome,
  nomeAbreviado: dto.nomeAbreviado,
  cargaHoraria: dto.cargaHoraria,
  imagemCapa:
    dto.imagemCapa !== undefined ? (dto.imagemCapa ? { id: dto.imagemCapa.id } : null) : undefined,
}));

// ============================================================================
// Interna → Externa (Output: Core → Presentation)
// ============================================================================

export const findOneQueryResultToOutputDto = createMapper<
  DisciplinaFindOneQueryResult,
  DisciplinaFindOneOutputGraphQlDto
>((output) => ({
  id: output.id,
  nome: output.nome,
  nomeAbreviado: output.nomeAbreviado,
  cargaHoraria: output.cargaHoraria,
  imagemCapa: mapImagemOutput(output.imagemCapa),
  dateCreated: new Date(output.dateCreated),
  dateUpdated: new Date(output.dateUpdated),
  dateDeleted: output.dateDeleted ? new Date(output.dateDeleted) : null,
}));

export const listQueryResultToListOutputDto = createListMapper(
  DisciplinaListOutputGraphQlDto,
  findOneQueryResultToOutputDto,
);

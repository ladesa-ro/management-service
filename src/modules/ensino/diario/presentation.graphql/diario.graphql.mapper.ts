import type { AmbienteFindOneQueryResult } from "@/modules/ambientes/ambiente";
import {
  DiarioCreateCommand,
  DiarioFindOneQuery,
  type DiarioFindOneQueryResult,
  DiarioListQuery,
  DiarioUpdateCommand,
} from "@/modules/ensino/diario";
import type { DisciplinaFindOneQueryResult } from "@/modules/ensino/disciplina";
import type { TurmaFindOneQueryResult } from "@/modules/ensino/turma";
import * as CalendarioLetivoGraphqlMapper from "@/modules/horarios/calendario-letivo/presentation.graphql/calendario-letivo.graphql.mapper";
import {
  createListMapper,
  createMapper,
  createPaginatedInputMapper,
  mapField,
  mapImagemOutput,
} from "@/shared/mapping";
import {
  AmbienteFindOneOutputForDiarioGraphQlDto,
  type DiarioCreateInputGraphQlDto,
  DiarioFindOneOutputGraphQlDto,
  type DiarioListInputGraphQlDto,
  DiarioListOutputGraphQlDto,
  type DiarioUpdateInputGraphQlDto,
  DisciplinaFindOneOutputForDiarioGraphQlDto,
  TurmaFindOneOutputForDiarioGraphQlDto,
} from "./diario.graphql.dto";

// ============================================================================
// Local helper functions for nested DTOs
// ============================================================================

function mapTurma(turma: TurmaFindOneQueryResult): TurmaFindOneOutputForDiarioGraphQlDto {
  return {
    id: turma.id,
    periodo: turma.periodo,
    dateCreated: new Date(turma.dateCreated),
    dateUpdated: new Date(turma.dateUpdated),
    dateDeleted: turma.dateDeleted ? new Date(turma.dateDeleted) : null,
  };
}

function mapDisciplina(
  disciplina: DisciplinaFindOneQueryResult,
): DisciplinaFindOneOutputForDiarioGraphQlDto {
  return {
    id: disciplina.id,
    nome: disciplina.nome,
    nomeAbreviado: disciplina.nomeAbreviado,
    cargaHoraria: disciplina.cargaHoraria,
    dateCreated: new Date(disciplina.dateCreated),
    dateUpdated: new Date(disciplina.dateUpdated),
    dateDeleted: disciplina.dateDeleted ? new Date(disciplina.dateDeleted) : null,
  };
}

function mapAmbiente(
  ambiente: AmbienteFindOneQueryResult | null,
): AmbienteFindOneOutputForDiarioGraphQlDto | null {
  if (!ambiente) return null;
  return {
    id: ambiente.id,
    nome: ambiente.nome,
    descricao: ambiente.descricao,
    codigo: ambiente.codigo,
    capacidade: ambiente.capacidade,
    tipo: ambiente.tipo,
    dateCreated: new Date(ambiente.dateCreated),
    dateUpdated: new Date(ambiente.dateUpdated),
    dateDeleted: ambiente.dateDeleted ? new Date(ambiente.dateDeleted) : null,
  };
}

// ============================================================================
// Externa -> Interna (Input: Presentation -> Core)
// ============================================================================

export const findOneInputDtoToFindOneQuery = createMapper<string, DiarioFindOneQuery>((id) => {
  const input = new DiarioFindOneQuery();
  input.id = id;
  return input;
});

const listInputMapper = createPaginatedInputMapper<DiarioListInputGraphQlDto, DiarioListQuery>(
  DiarioListQuery,
  (dto, query) => {
    mapField(query, "filter.id", dto, "filterId");
    mapField(query, "filter.turma.id", dto, "filterTurmaId");
    mapField(query, "filter.disciplina.id", dto, "filterDisciplinaId");
    mapField(query, "filter.calendarioLetivo.id", dto, "filterCalendarioLetivoId");
    // Note: filter.ambientePadrao.id is not in DiarioListQuery
  },
);

export function listInputDtoToListQuery(
  dto: DiarioListInputGraphQlDto | null,
): DiarioListQuery | null {
  if (!dto) return null;
  return listInputMapper.map(dto);
}

export const createInputDtoToCreateCommand = createMapper<
  DiarioCreateInputGraphQlDto,
  DiarioCreateCommand
>((dto) => ({
  ativo: dto.ativo,
  calendarioLetivo: { id: dto.calendarioLetivo.id },
  turma: { id: dto.turma.id },
  disciplina: { id: dto.disciplina.id },
  ambientePadrao: dto.ambientePadrao ? { id: dto.ambientePadrao.id } : null,
  imagemCapa: dto.imagemCapa ? { id: dto.imagemCapa.id } : null,
}));

export const updateInputDtoToUpdateCommand = createMapper<
  { id: string; dto: DiarioUpdateInputGraphQlDto },
  DiarioFindOneQuery & DiarioUpdateCommand
>(({ id, dto }) => ({
  id,
  ativo: dto.ativo,
  calendarioLetivo: dto.calendarioLetivo ? { id: dto.calendarioLetivo.id } : undefined,
  turma: dto.turma ? { id: dto.turma.id } : undefined,
  disciplina: dto.disciplina ? { id: dto.disciplina.id } : undefined,
  ambientePadrao:
    dto.ambientePadrao !== undefined
      ? dto.ambientePadrao
        ? { id: dto.ambientePadrao.id }
        : null
      : undefined,
  imagemCapa:
    dto.imagemCapa !== undefined ? (dto.imagemCapa ? { id: dto.imagemCapa.id } : null) : undefined,
}));

// ============================================================================
// Interna -> Externa (Output: Core -> Presentation)
// ============================================================================

export const findOneQueryResultToOutputDto = createMapper<
  DiarioFindOneQueryResult,
  DiarioFindOneOutputGraphQlDto
>((output) => ({
  id: output.id,
  ativo: output.ativo,
  calendarioLetivo: CalendarioLetivoGraphqlMapper.findOneQueryResultToOutputDto.map(
    output.calendarioLetivo,
  ),
  turma: mapTurma(output.turma),
  disciplina: mapDisciplina(output.disciplina),
  ambientePadrao: mapAmbiente(output.ambientePadrao),
  imagemCapa: mapImagemOutput(output.imagemCapa),
  dateCreated: new Date(output.dateCreated),
  dateUpdated: new Date(output.dateUpdated),
  dateDeleted: output.dateDeleted ? new Date(output.dateDeleted) : null,
}));

export const listQueryResultToListOutputDto = createListMapper(
  DiarioListOutputGraphQlDto,
  findOneQueryResultToOutputDto,
);

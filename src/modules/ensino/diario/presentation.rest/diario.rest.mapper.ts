import * as AmbienteRestMapper from "@/modules/ambientes/ambiente/presentation.rest/ambiente.rest.mapper";
import * as BlocoRestMapper from "@/modules/ambientes/bloco/presentation.rest/bloco.rest.mapper";
import * as CalendarioLetivoRestMapper from "@/modules/calendario/letivo/presentation.rest/calendario-letivo.rest.mapper";
import {
  DiarioCreateCommand,
  DiarioFindOneQuery,
  type DiarioFindOneQueryResult,
  DiarioListQuery,
  DiarioUpdateCommand,
} from "@/modules/ensino/diario";
import * as DisciplinaRestMapper from "@/modules/ensino/disciplina/presentation.rest/disciplina.rest.mapper";
import * as TurmaRestMapper from "@/modules/ensino/turma/presentation.rest/turma.rest.mapper";
import { createListMapper, createMapper, createPaginatedInputMapper, into } from "@/shared/mapping";
import {
  type DiarioCreateInputRestDto,
  type DiarioFindOneInputRestDto,
  DiarioFindOneOutputRestDto,
  type DiarioListInputRestDto,
  DiarioListOutputRestDto,
  type DiarioUpdateInputRestDto,
} from "./diario.rest.dto";

// ============================================================================
// Externa -> Interna (Input: Presentation -> Core)
// ============================================================================

export const findOneInputDtoToFindOneQuery = createMapper<
  DiarioFindOneInputRestDto,
  DiarioFindOneQuery
>((dto) => {
  const input = new DiarioFindOneQuery();
  input.id = dto.id;
  return input;
});

export const listInputDtoToListQuery = createPaginatedInputMapper<
  DiarioListInputRestDto,
  DiarioListQuery
>(DiarioListQuery, (dto, query) => {
  into(query).field("filter.id").from(dto);
  into(query).field("filter.turma.id").from(dto);
  into(query).field("filter.disciplina.id").from(dto);
  into(query).field("filter.calendarioLetivo.id").from(dto);
});

export const createInputDtoToCreateCommand = createMapper<
  DiarioCreateInputRestDto,
  DiarioCreateCommand
>((dto) => ({
  ativo: dto.ativo,
  calendarioLetivo: { id: dto.calendarioLetivo.id },
  turma: { id: dto.turma.id },
  disciplina: { id: dto.disciplina.id },
  ambientePadrao:
    dto.ambientePadrao !== undefined
      ? dto.ambientePadrao
        ? { id: dto.ambientePadrao.id }
        : null
      : undefined,
}));

export const updateInputDtoToUpdateCommand = createMapper<
  { params: DiarioFindOneInputRestDto; dto: DiarioUpdateInputRestDto },
  DiarioFindOneQuery & DiarioUpdateCommand
>(({ params, dto }) => ({
  id: params.id,
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
}));

// ============================================================================
// Interna -> Externa (Output: Core -> Presentation)
// ============================================================================

export const findOneQueryResultToOutputDto = createMapper<
  DiarioFindOneQueryResult,
  DiarioFindOneOutputRestDto
>((output) => ({
  id: output.id,
  ativo: output.ativo,
  calendarioLetivo: CalendarioLetivoRestMapper.findOneQueryResultToOutputDto.map(
    output.calendarioLetivo,
  ),
  turma: TurmaRestMapper.findOneQueryResultToOutputDto.map(output.turma),
  disciplina: DisciplinaRestMapper.findOneQueryResultToOutputDto.map(output.disciplina),
  ambientePadrao: AmbienteRestMapper.findOneQueryResultToOutputDto.mapOptional(
    output.ambientePadrao,
  ),
  imagemCapa: output.imagemCapa ? BlocoRestMapper.toImagemOutput(output.imagemCapa) : null,
  dateCreated: output.dateCreated,
  dateUpdated: output.dateUpdated,
  dateDeleted: output.dateDeleted,
}));

export const listQueryResultToListOutputDto = createListMapper(
  DiarioListOutputRestDto,
  findOneQueryResultToOutputDto,
);

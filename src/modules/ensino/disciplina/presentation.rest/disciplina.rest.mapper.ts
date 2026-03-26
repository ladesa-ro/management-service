import * as BlocoRestMapper from "@/modules/ambientes/bloco/presentation.rest/bloco.rest.mapper";
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
} from "@/shared/mapping";
import {
  type DisciplinaCreateInputRestDto,
  type DisciplinaFindOneInputRestDto,
  DisciplinaFindOneOutputRestDto,
  type DisciplinaListInputRestDto,
  DisciplinaListOutputRestDto,
  type DisciplinaUpdateInputRestDto,
} from "./disciplina.rest.dto";

// ============================================================================
// Externa → Interna (Input: Presentation → Core)
// ============================================================================

export const toFindOneInput = createMapper<DisciplinaFindOneInputRestDto, DisciplinaFindOneQuery>(
  (dto) => {
    const input = new DisciplinaFindOneQuery();
    input.id = dto.id;
    return input;
  },
);

export const toListInput = createPaginatedInputMapper<
  DisciplinaListInputRestDto,
  DisciplinaListQuery
>(DisciplinaListQuery, (dto, query) => {
  mapField(query, "filter.id", dto, "filter.id");
});

export const toCreateInput = createMapper<DisciplinaCreateInputRestDto, DisciplinaCreateCommand>(
  (dto) => {
    const input = new DisciplinaCreateCommand();
    input.nome = dto.nome;
    input.nomeAbreviado = dto.nomeAbreviado;
    input.cargaHoraria = dto.cargaHoraria;
    return input;
  },
);

export const toUpdateInput = createMapper<
  { params: DisciplinaFindOneInputRestDto; dto: DisciplinaUpdateInputRestDto },
  DisciplinaFindOneQuery & DisciplinaUpdateCommand
>(({ params, dto }) => ({
  id: params.id,
  nome: dto.nome,
  nomeAbreviado: dto.nomeAbreviado,
  cargaHoraria: dto.cargaHoraria,
}));

// ============================================================================
// Interna → Externa (Output: Core → Presentation)
// ============================================================================

export const toFindOneOutput = createMapper<
  DisciplinaFindOneQueryResult,
  DisciplinaFindOneOutputRestDto
>((output) => ({
  id: output.id,
  nome: output.nome,
  nomeAbreviado: output.nomeAbreviado,
  cargaHoraria: output.cargaHoraria,
  imagemCapa: output.imagemCapa ? BlocoRestMapper.toImagemOutput(output.imagemCapa) : null,
  dateCreated: output.dateCreated,
  dateUpdated: output.dateUpdated,
  dateDeleted: output.dateDeleted,
}));

export const toListOutput = createListMapper(DisciplinaListOutputRestDto, toFindOneOutput);

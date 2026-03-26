import * as BlocoRestMapper from "@/modules/ambientes/bloco/presentation.rest/bloco.rest.mapper";
import * as CampusRestMapper from "@/modules/ambientes/campus/presentation.rest/campus.rest.mapper";
import {
  CursoCreateCommand,
  CursoFindOneQuery,
  type CursoFindOneQueryResult,
  CursoListQuery,
  CursoUpdateCommand,
} from "@/modules/ensino/curso";
import * as OfertaFormacaoRestMapper from "@/modules/ensino/oferta-formacao/presentation.rest/oferta-formacao.rest.mapper";
import {
  createListMapper,
  createMapper,
  createPaginatedInputMapper,
  mapField,
} from "@/shared/mapping";
import {
  type CursoCreateInputRestDto,
  type CursoFindOneInputRestDto,
  CursoFindOneOutputRestDto,
  type CursoListInputRestDto,
  CursoListOutputRestDto,
  type CursoUpdateInputRestDto,
} from "./curso.rest.dto";

// ============================================================================
// Externa → Interna (Input: Presentation → Core)
// ============================================================================

export const toFindOneInput = createMapper<CursoFindOneInputRestDto, CursoFindOneQuery>((dto) => {
  const input = new CursoFindOneQuery();
  input.id = dto.id;
  return input;
});

export const toListInput = createPaginatedInputMapper<CursoListInputRestDto, CursoListQuery>(
  CursoListQuery,
  (dto, query) => {
    mapField(query, "filter.id", dto, "filter.id");
    mapField(query, "filter.campus.id", dto, "filter.campus.id");
    mapField(query, "filter.ofertaFormacao.id", dto, "filter.ofertaFormacao.id");
  },
);

export const toCreateInput = createMapper<CursoCreateInputRestDto, CursoCreateCommand>((dto) => {
  const input = new CursoCreateCommand();
  input.nome = dto.nome;
  input.nomeAbreviado = dto.nomeAbreviado;
  input.campus = { id: dto.campus.id };
  input.ofertaFormacao = { id: dto.ofertaFormacao.id };
  return input;
});

export const toUpdateInput = createMapper<
  { params: CursoFindOneInputRestDto; dto: CursoUpdateInputRestDto },
  CursoFindOneQuery & CursoUpdateCommand
>(({ params, dto }) => ({
  id: params.id,
  nome: dto.nome,
  nomeAbreviado: dto.nomeAbreviado,
  campus: dto.campus ? { id: dto.campus.id } : undefined,
  ofertaFormacao: dto.ofertaFormacao ? { id: dto.ofertaFormacao.id } : undefined,
}));

// ============================================================================
// Interna → Externa (Output: Core → Presentation)
// ============================================================================

export const toFindOneOutput = createMapper<CursoFindOneQueryResult, CursoFindOneOutputRestDto>(
  (output) => ({
    id: output.id,
    nome: output.nome,
    nomeAbreviado: output.nomeAbreviado,
    campus: CampusRestMapper.toFindOneOutput.map(output.campus),
    ofertaFormacao: OfertaFormacaoRestMapper.toFindOneOutput.map(output.ofertaFormacao),
    imagemCapa: output.imagemCapa ? BlocoRestMapper.toImagemOutput(output.imagemCapa) : null,
    dateCreated: output.dateCreated,
    dateUpdated: output.dateUpdated,
    dateDeleted: output.dateDeleted,
  }),
);

export const toListOutput = createListMapper(CursoListOutputRestDto, toFindOneOutput);

import * as CampusGraphqlMapper from "@/modules/ambientes/campus/presentation.graphql/campus.graphql.mapper";
import {
  CursoCreateCommand,
  CursoFindOneQuery,
  type CursoFindOneQueryResult,
  CursoListQuery,
  CursoUpdateCommand,
} from "@/modules/ensino/curso";
import * as OfertaFormacaoGraphqlMapper from "@/modules/ensino/oferta-formacao/presentation.graphql/oferta-formacao.graphql.mapper";
import {
  createListMapper,
  createMapper,
  createPaginatedInputMapper,
  mapField,
  mapImagemOutput,
} from "@/shared/mapping";
import {
  type CursoCreateInputGraphQlDto,
  CursoFindOneOutputGraphQlDto,
  type CursoListInputGraphQlDto,
  CursoListOutputGraphQlDto,
  type CursoUpdateInputGraphQlDto,
} from "./curso.graphql.dto";

// ============================================================================
// Externa → Interna (Input: Presentation → Core)
// ============================================================================

export const toFindOneInput = createMapper<string, CursoFindOneQuery>((id) => {
  const input = new CursoFindOneQuery();
  input.id = id;
  return input;
});

const listInputMapper = createPaginatedInputMapper<CursoListInputGraphQlDto, CursoListQuery>(
  CursoListQuery,
  (dto, query) => {
    mapField(query, "filter.id", dto, "filterId");
    mapField(query, "filter.campus.id", dto, "filterCampusId");
    mapField(query, "filter.ofertaFormacao.id", dto, "filterOfertaFormacaoId");
  },
);

export function toListInput(dto: CursoListInputGraphQlDto | null): CursoListQuery | null {
  if (!dto) return null;
  return listInputMapper.map(dto);
}

export const toCreateInput = createMapper<CursoCreateInputGraphQlDto, CursoCreateCommand>((dto) => {
  const input = new CursoCreateCommand();
  input.nome = dto.nome;
  input.nomeAbreviado = dto.nomeAbreviado;
  input.campus = { id: dto.campus.id };
  input.ofertaFormacao = { id: dto.ofertaFormacao.id };
  input.imagemCapa = dto.imagemCapa ? { id: dto.imagemCapa.id } : null;
  return input;
});

export const toUpdateInput = createMapper<
  { id: string; dto: CursoUpdateInputGraphQlDto },
  CursoFindOneQuery & CursoUpdateCommand
>(({ id, dto }) => ({
  id,
  nome: dto.nome,
  nomeAbreviado: dto.nomeAbreviado,
  campus: dto.campus ? { id: dto.campus.id } : undefined,
  ofertaFormacao: dto.ofertaFormacao ? { id: dto.ofertaFormacao.id } : undefined,
  imagemCapa:
    dto.imagemCapa !== undefined ? (dto.imagemCapa ? { id: dto.imagemCapa.id } : null) : undefined,
}));

// ============================================================================
// Interna → Externa (Output: Core → Presentation)
// ============================================================================

export const toFindOneOutput = createMapper<CursoFindOneQueryResult, CursoFindOneOutputGraphQlDto>(
  (output) => ({
    id: output.id,
    nome: output.nome,
    nomeAbreviado: output.nomeAbreviado,
    campus: CampusGraphqlMapper.toFindOneOutput.map(output.campus),
    ofertaFormacao: OfertaFormacaoGraphqlMapper.toFindOneOutput.map(output.ofertaFormacao),
    imagemCapa: mapImagemOutput(output.imagemCapa),
    dateCreated: new Date(output.dateCreated),
    dateUpdated: new Date(output.dateUpdated),
    dateDeleted: output.dateDeleted ? new Date(output.dateDeleted) : null,
  }),
);

export const toListOutput = createListMapper(CursoListOutputGraphQlDto, toFindOneOutput);

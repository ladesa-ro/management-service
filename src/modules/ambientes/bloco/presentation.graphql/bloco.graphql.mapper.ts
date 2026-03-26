import {
  BlocoCreateCommand,
  BlocoFindOneQuery,
  type BlocoFindOneQueryResult,
  BlocoListQuery,
  BlocoUpdateCommand,
} from "@/modules/ambientes/bloco";
import * as CampusGraphqlMapper from "@/modules/ambientes/campus/presentation.graphql/campus.graphql.mapper";
import {
  createListMapper,
  createMapper,
  createPaginatedInputMapper,
  mapField,
  mapImagemOutput,
} from "@/shared/mapping";
import {
  type BlocoCreateInputGraphQlDto,
  BlocoFindOneOutputGraphQlDto,
  type BlocoListInputGraphQlDto,
  BlocoListOutputGraphQlDto,
  type BlocoUpdateInputGraphQlDto,
} from "./bloco.graphql.dto";

// ============================================================================
// Externa -> Interna (Input: Presentation -> Core)
// ============================================================================

export const toFindOneInput = createMapper<string, BlocoFindOneQuery>((id) => {
  const input = new BlocoFindOneQuery();
  input.id = id;
  return input;
});

const listInputMapper = createPaginatedInputMapper<BlocoListInputGraphQlDto, BlocoListQuery>(
  BlocoListQuery,
  (dto, query) => {
    mapField(query, "filter.id", dto, "filterId");
    mapField(query, "filter.campus.id", dto, "filterCampusId");
  },
);

export function toListInput(dto: BlocoListInputGraphQlDto | null): BlocoListQuery | null {
  if (!dto) return null;
  return listInputMapper.map(dto);
}

export const toCreateInput = createMapper<BlocoCreateInputGraphQlDto, BlocoCreateCommand>((dto) => {
  const input = new BlocoCreateCommand();
  input.nome = dto.nome;
  input.codigo = dto.codigo;
  input.campus = { id: dto.campus.id };
  return input;
});

export const toUpdateInput = createMapper<
  { id: string; dto: BlocoUpdateInputGraphQlDto },
  BlocoFindOneQuery & BlocoUpdateCommand
>(({ id, dto }) => ({
  id,
  nome: dto.nome,
  codigo: dto.codigo,
  campus: dto.campus ? { id: dto.campus.id } : undefined,
}));

// ============================================================================
// Interna -> Externa (Output: Core -> Presentation)
// ============================================================================

export const toFindOneOutput = createMapper<BlocoFindOneQueryResult, BlocoFindOneOutputGraphQlDto>(
  (output) => ({
    id: output.id,
    nome: output.nome,
    codigo: output.codigo,
    campus: CampusGraphqlMapper.toFindOneOutput.map(output.campus),
    imagemCapa: mapImagemOutput(output.imagemCapa),
    dateCreated: new Date(output.dateCreated),
    dateUpdated: new Date(output.dateUpdated),
    dateDeleted: output.dateDeleted ? new Date(output.dateDeleted) : null,
  }),
);

export const toListOutput = createListMapper(BlocoListOutputGraphQlDto, toFindOneOutput);

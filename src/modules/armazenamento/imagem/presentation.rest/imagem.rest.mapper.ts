import {
  ImagemFindOneQuery,
  type ImagemFindOneQueryResult,
  ImagemListQuery,
} from "@/modules/armazenamento/imagem";
import {
  createListMapper,
  createMapper,
  createPaginatedInputMapper,
  mapField,
} from "@/shared/mapping";
import {
  type ImagemFindOneInputRestDto,
  ImagemFindOneOutputRestDto,
  type ImagemListInputRestDto,
  ImagemListOutputRestDto,
} from "./imagem.rest.dto";

// ============================================================================
// Externa → Interna (Input: Presentation → Core)
// ============================================================================

export const toFindOneInput = createMapper<ImagemFindOneInputRestDto, ImagemFindOneQuery>((dto) => {
  const input = new ImagemFindOneQuery();
  input.id = dto.id;
  return input;
});

export const toListInput = createPaginatedInputMapper<ImagemListInputRestDto, ImagemListQuery>(
  ImagemListQuery,
  (dto, query) => {
    mapField(query, "filter.id", dto, "filter.id");
  },
);

// ============================================================================
// Interna → Externa (Output: Core → Presentation)
// ============================================================================

export const toFindOneOutput = createMapper<ImagemFindOneQueryResult, ImagemFindOneOutputRestDto>(
  (output) => ({
    id: output.id,
    descricao: output.descricao,
    versoes: [],
    dateCreated: output.dateCreated,
    dateUpdated: output.dateUpdated,
    dateDeleted: output.dateDeleted,
  }),
);

export const toListOutput = createListMapper(ImagemListOutputRestDto, toFindOneOutput);

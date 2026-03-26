import {
  ImagemFindOneQuery,
  type ImagemFindOneQueryResult,
  ImagemListQuery,
} from "@/modules/armazenamento/imagem";
import { createListMapper, createMapper, createPaginatedInputMapper, into } from "@/shared/mapping";
import {
  type ImagemFindOneInputRestDto,
  ImagemFindOneOutputRestDto,
  type ImagemListInputRestDto,
  ImagemListOutputRestDto,
} from "./imagem.rest.dto";

// ============================================================================
// Externa → Interna (Input: Presentation → Core)
// ============================================================================

export const findOneInputDtoToFindOneQuery = createMapper<
  ImagemFindOneInputRestDto,
  ImagemFindOneQuery
>((dto) => {
  const input = new ImagemFindOneQuery();
  input.id = dto.id;
  return input;
});

export const listInputDtoToListQuery = createPaginatedInputMapper<
  ImagemListInputRestDto,
  ImagemListQuery
>(ImagemListQuery, (dto, query) => {
  into(query).field("filter.id").from(dto);
});

// ============================================================================
// Interna → Externa (Output: Core → Presentation)
// ============================================================================

export const findOneQueryResultToOutputDto = createMapper<
  ImagemFindOneQueryResult,
  ImagemFindOneOutputRestDto
>((output) => ({
  id: output.id,
  descricao: output.descricao,
  versoes: [],
  dateCreated: output.dateCreated,
  dateUpdated: output.dateUpdated,
  dateDeleted: output.dateDeleted,
}));

export const listQueryResultToListOutputDto = createListMapper(
  ImagemListOutputRestDto,
  findOneQueryResultToOutputDto,
);

import {
  ImagemArquivoFindOneQuery,
  type ImagemArquivoFindOneQueryResult,
  ImagemArquivoListQuery,
} from "@/modules/armazenamento/imagem-arquivo";
import {
  createListMapper,
  createMapper,
  createPaginatedInputMapper,
  mapField,
} from "@/shared/mapping";
import {
  ImagemArquivoFindOneOutputGraphQlDto,
  type ImagemArquivoListInputGraphQlDto,
  ImagemArquivoListOutputGraphQlDto,
} from "./imagem-arquivo.graphql.dto";

// ============================================================================
// Externa → Interna (Input: Presentation → Core)
// ============================================================================

export const toFindOneInput = createMapper<string, ImagemArquivoFindOneQuery>((id) => {
  const input = new ImagemArquivoFindOneQuery();
  input.id = id;
  return input;
});

const listInputMapper = createPaginatedInputMapper<
  ImagemArquivoListInputGraphQlDto,
  ImagemArquivoListQuery
>(ImagemArquivoListQuery, (dto, query) => {
  mapField(query, "filter.id", dto, "filterId");
});

export function toListInput(
  dto: ImagemArquivoListInputGraphQlDto | null,
): ImagemArquivoListQuery | null {
  if (!dto) return null;
  return listInputMapper.map(dto);
}

// ============================================================================
// Interna → Externa (Output: Core → Presentation)
// ============================================================================

export const toFindOneOutput = createMapper<
  ImagemArquivoFindOneQueryResult,
  ImagemArquivoFindOneOutputGraphQlDto
>((output) => ({
  id: output.id,
  largura: output.largura,
  altura: output.altura,
  formato: output.formato,
  mimeType: output.mimeType,
  imagem: {
    id: output.imagem.id,
  },
  arquivo: {
    id: output.arquivo.id,
    name: output.arquivo.name,
    mimeType: output.arquivo.mimeType,
    sizeBytes: output.arquivo.sizeBytes,
    storageType: output.arquivo.storageType,
    dateCreated: new Date(output.arquivo.dateCreated),
    dateUpdated: new Date(output.arquivo.dateUpdated),
    dateDeleted: output.arquivo.dateDeleted ? new Date(output.arquivo.dateDeleted) : null,
  },
  dateCreated: new Date(output.dateCreated),
  dateUpdated: new Date(output.dateUpdated),
  dateDeleted: output.dateDeleted ? new Date(output.dateDeleted) : null,
}));

export const toListOutput = createListMapper(ImagemArquivoListOutputGraphQlDto, toFindOneOutput);

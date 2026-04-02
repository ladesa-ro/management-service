import type { ImagemFindOneQueryResult } from "@/modules/armazenamento/imagem";
import {
  ModalidadeCreateCommand,
  ModalidadeFindOneQuery,
  type ModalidadeFindOneQueryResult,
  ModalidadeListQuery,
  ModalidadeUpdateCommand,
} from "@/modules/ensino/modalidade";
import { createListMapper, createMapper, createPaginatedInputMapper, into } from "@/shared/mapping";
import { getNow } from "@/utils/date";
import {
  ImagemArquivoFindOneFromImagemOutputFromModalidadeRestDto,
  ImagemFindOneOutputFromModalidadeRestDto,
  type ModalidadeCreateInputRestDto,
  type ModalidadeFindOneInputRestDto,
  ModalidadeFindOneOutputRestDto,
  type ModalidadeListInputRestDto,
  ModalidadeListOutputRestDto,
  type ModalidadeUpdateInputRestDto,
} from "./modalidade.rest.dto";

// ============================================================================
// Externa → Interna (Input: Presentation → Core)
// ============================================================================

export const findOneInputDtoToFindOneQuery = createMapper<
  ModalidadeFindOneInputRestDto,
  ModalidadeFindOneQuery
>((dto) => {
  const query = new ModalidadeFindOneQuery();
  query.id = dto.id;
  return query;
});

export const listInputDtoToListQuery = createPaginatedInputMapper<
  ModalidadeListInputRestDto,
  ModalidadeListQuery
>(ModalidadeListQuery, (dto, query) => {
  into(query).field("filter.id").from(dto);
});

export const createInputDtoToCreateCommand = createMapper<
  ModalidadeCreateInputRestDto,
  ModalidadeCreateCommand
>((dto) => {
  const command = new ModalidadeCreateCommand();
  into(command).from(dto).field("nome").field("slug");
  return command;
});

export const updateInputDtoToUpdateCommand = createMapper<
  { params: ModalidadeFindOneInputRestDto; dto: ModalidadeUpdateInputRestDto },
  ModalidadeFindOneQuery & ModalidadeUpdateCommand
>(({ params, dto }) => ({
  id: params.id,
  nome: dto.nome,
  slug: dto.slug,
}));

// ============================================================================
// Interna → Externa (Output: Core → Presentation)
// ============================================================================

export function toImagemOutput(
  output: ImagemFindOneQueryResult,
): ImagemFindOneOutputFromModalidadeRestDto {
  const dto = new ImagemFindOneOutputFromModalidadeRestDto();
  dto.id = output.id;
  dto.descricao = output.descricao;
  dto.versoes = (output.versoes || []).map((v) => {
    const versaoDto = new ImagemArquivoFindOneFromImagemOutputFromModalidadeRestDto();
    versaoDto.id = v.id;
    versaoDto.largura = v.largura;
    versaoDto.altura = v.altura;
    versaoDto.formato = v.formato;
    versaoDto.mimeType = v.mimeType;
    versaoDto.arquivo = { id: v.arquivo?.id };
    return versaoDto;
  });
  dto.dateCreated = output.dateCreated
    ? new Date(output.dateCreated).toISOString()
    : getNow().toISOString();
  dto.dateUpdated = output.dateUpdated
    ? new Date(output.dateUpdated).toISOString()
    : getNow().toISOString();
  dto.dateDeleted = output.dateDeleted ? new Date(output.dateDeleted).toISOString() : null;
  return dto;
}

export const findOneQueryResultToOutputDto = createMapper<
  ModalidadeFindOneQueryResult,
  ModalidadeFindOneOutputRestDto
>((queryResult) => ({
  id: queryResult.id,
  nome: queryResult.nome,
  slug: queryResult.slug,
  imagemCapa: queryResult.imagemCapa ? toImagemOutput(queryResult.imagemCapa) : null,
  dateCreated: queryResult.dateCreated,
  dateUpdated: queryResult.dateUpdated,
  dateDeleted: queryResult.dateDeleted,
}));

export const listQueryResultToListOutputDto = createListMapper(
  ModalidadeListOutputRestDto,
  findOneQueryResultToOutputDto,
);

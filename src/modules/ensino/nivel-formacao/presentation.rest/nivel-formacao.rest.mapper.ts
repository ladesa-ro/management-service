import type { ImagemFindOneQueryResult } from "@/modules/armazenamento/imagem";
import {
  NivelFormacaoCreateCommand,
  NivelFormacaoFindOneQuery,
  type NivelFormacaoFindOneQueryResult,
  NivelFormacaoListQuery,
  NivelFormacaoUpdateCommand,
} from "@/modules/ensino/nivel-formacao";
import { createListMapper, createMapper, createPaginatedInputMapper, into } from "@/shared/mapping";
import { getNow } from "@/utils/date";
import {
  ImagemArquivoFindOneFromImagemOutputFromNivelFormacaoRestDto,
  ImagemFindOneOutputFromNivelFormacaoRestDto,
  type NivelFormacaoCreateInputRestDto,
  type NivelFormacaoFindOneInputRestDto,
  NivelFormacaoFindOneOutputRestDto,
  type NivelFormacaoListInputRestDto,
  NivelFormacaoListOutputRestDto,
  type NivelFormacaoUpdateInputRestDto,
} from "./nivel-formacao.rest.dto";

// ============================================================================
// Externa → Interna (Input: Presentation → Core)
// ============================================================================

export const findOneInputDtoToFindOneQuery = createMapper<
  NivelFormacaoFindOneInputRestDto,
  NivelFormacaoFindOneQuery
>((dto) => {
  const input = new NivelFormacaoFindOneQuery();
  input.id = dto.id;
  return input;
});

export const listInputDtoToListQuery = createPaginatedInputMapper<
  NivelFormacaoListInputRestDto,
  NivelFormacaoListQuery
>(NivelFormacaoListQuery, (dto, query) => {
  into(query).field("filter.id").from(dto);
});

export const createInputDtoToCreateCommand = createMapper<
  NivelFormacaoCreateInputRestDto,
  NivelFormacaoCreateCommand
>((dto) => {
  const input = new NivelFormacaoCreateCommand();
  input.nome = dto.nome;
  input.slug = dto.slug;
  return input;
});

export const updateInputDtoToUpdateCommand = createMapper<
  { params: NivelFormacaoFindOneInputRestDto; dto: NivelFormacaoUpdateInputRestDto },
  NivelFormacaoFindOneQuery & NivelFormacaoUpdateCommand
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
): ImagemFindOneOutputFromNivelFormacaoRestDto {
  const dto = new ImagemFindOneOutputFromNivelFormacaoRestDto();
  dto.id = output.id;
  dto.descricao = output.descricao;
  dto.versoes = (output.versoes || []).map((v) => {
    const versaoDto = new ImagemArquivoFindOneFromImagemOutputFromNivelFormacaoRestDto();
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
  NivelFormacaoFindOneQueryResult,
  NivelFormacaoFindOneOutputRestDto
>((output) => ({
  id: output.id,
  nome: output.nome,
  slug: output.slug,
  imagemCapa: output.imagemCapa ? toImagemOutput(output.imagemCapa) : null,
  dateCreated: output.dateCreated,
  dateUpdated: output.dateUpdated,
  dateDeleted: output.dateDeleted,
}));

export const listQueryResultToListOutputDto = createListMapper(
  NivelFormacaoListOutputRestDto,
  findOneQueryResultToOutputDto,
);

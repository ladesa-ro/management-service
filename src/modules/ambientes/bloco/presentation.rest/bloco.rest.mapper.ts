import {
  BlocoCreateCommand,
  BlocoFindOneQuery,
  type BlocoFindOneQueryResult,
  BlocoListQuery,
  BlocoUpdateCommand,
} from "@/modules/ambientes/bloco";
import * as CampusRestMapper from "@/modules/ambientes/campus/presentation.rest/campus.rest.mapper";
import type { ImagemFindOneQueryResult } from "@/modules/armazenamento/imagem";
import {
  createListMapper,
  createMapper,
  createPaginatedInputMapper,
  mapField,
} from "@/shared/mapping";
import { getNow } from "@/utils/date";
import {
  type BlocoCreateInputRestDto,
  type BlocoFindOneInputRestDto,
  BlocoFindOneOutputRestDto,
  type BlocoListInputRestDto,
  BlocoListOutputRestDto,
  type BlocoUpdateInputRestDto,
  ImagemArquivoFindOneFromImagemOutputRestDto,
  ImagemFindOneOutputRestDto,
} from "./bloco.rest.dto";

// ============================================================================
// Externa -> Interna (Input: Presentation -> Core)
// ============================================================================

export const toFindOneInput = createMapper<BlocoFindOneInputRestDto, BlocoFindOneQuery>((dto) => {
  const input = new BlocoFindOneQuery();
  input.id = dto.id;
  return input;
});

export const toListInput = createPaginatedInputMapper<BlocoListInputRestDto, BlocoListQuery>(
  BlocoListQuery,
  (dto, query) => {
    mapField(query, "filter.id", dto, "filter.id");
    mapField(query, "filter.campus.id", dto, "filter.campus.id");
  },
);

export const toCreateInput = createMapper<BlocoCreateInputRestDto, BlocoCreateCommand>((dto) => {
  const input = new BlocoCreateCommand();
  input.nome = dto.nome;
  input.codigo = dto.codigo;
  input.campus = { id: dto.campus.id };
  return input;
});

export const toUpdateInput = createMapper<
  { params: BlocoFindOneInputRestDto; dto: BlocoUpdateInputRestDto },
  BlocoFindOneQuery & BlocoUpdateCommand
>(({ params, dto }) => ({
  id: params.id,
  nome: dto.nome,
  codigo: dto.codigo,
  campus: dto.campus ? { id: dto.campus.id } : undefined,
}));

// ============================================================================
// Interna -> Externa (Output: Core -> Presentation)
// ============================================================================

export function toImagemOutput(output: ImagemFindOneQueryResult): ImagemFindOneOutputRestDto {
  const dto = new ImagemFindOneOutputRestDto();
  dto.id = output.id;
  dto.descricao = output.descricao;
  dto.versoes = (output.versoes || []).map((v) => {
    const versaoDto = new ImagemArquivoFindOneFromImagemOutputRestDto();
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

export const toFindOneOutput = createMapper<BlocoFindOneQueryResult, BlocoFindOneOutputRestDto>(
  (output) => ({
    id: output.id,
    nome: output.nome,
    codigo: output.codigo,
    campus: CampusRestMapper.toFindOneOutput.map(output.campus),
    imagemCapa: output.imagemCapa ? toImagemOutput(output.imagemCapa) : null,
    dateCreated: output.dateCreated,
    dateUpdated: output.dateUpdated,
    dateDeleted: output.dateDeleted,
  }),
);

export const toListOutput = createListMapper(BlocoListOutputRestDto, toFindOneOutput);

import {
  BlocoCreateInputDto,
  BlocoFindOneInputDto,
  BlocoFindOneOutputDto,
  BlocoListInputDto,
  BlocoUpdateInputDto,
} from "@/modules/ambientes/bloco";
import { CampusGraphqlMapper } from "@/modules/ambientes/campus/presentation/graphql/campus.graphql.mapper";
import { createListOutputMapper, mapDatedFields } from "@/modules/@shared/application/mappers";
import {
  BlocoCreateInputGraphQlDto,
  BlocoFindOneOutputGraphQlDto,
  BlocoListInputGraphQlDto,
  BlocoListOutputGraphQlDto,
  BlocoUpdateInputGraphQlDto,
} from "./bloco.graphql.dto";

// Helper to map imagem output
function mapImagemOutput(imagem: any): any {
  if (!imagem) return null;
  return {
    id: imagem.id,
    descricao: imagem.descricao,
    versoes: (imagem.versoes || []).map((v: any) => ({
      id: v.id,
      largura: v.largura,
      altura: v.altura,
      formato: v.formato,
      mimeType: v.mimeType,
      arquivo: {
        id: v.arquivo.id,
        name: v.arquivo.name,
        mimeType: v.arquivo.mimeType,
        sizeBytes: v.arquivo.sizeBytes,
        storageType: v.arquivo.storageType,
        dateCreated: v.arquivo.dateCreated,
        dateUpdated: v.arquivo.dateUpdated,
        dateDeleted: v.arquivo.dateDeleted,
      },
      dateCreated: v.dateCreated,
      dateUpdated: v.dateUpdated,
      dateDeleted: v.dateDeleted,
    })),
    dateCreated: imagem.dateCreated,
    dateUpdated: imagem.dateUpdated,
    dateDeleted: imagem.dateDeleted,
  };
}

export class BlocoGraphqlMapper {
  static toListInput(dto: BlocoListInputGraphQlDto | null): BlocoListInputDto | null {
    if (!dto) {
      return null;
    }

    const input = new BlocoListInputDto();
    input.page = dto.page;
    input.limit = dto.limit;
    input.search = dto.search;
    input.sortBy = dto.sortBy;
    input["filter.id"] = dto.filterId;
    input["filter.campus.id"] = dto.filterCampusId;
    return input;
  }

  static toFindOneInput(id: string, selection?: string[]): BlocoFindOneInputDto {
    const input = new BlocoFindOneInputDto();
    input.id = id;
    input.selection = selection;
    return input;
  }

  static toCreateInput(dto: BlocoCreateInputGraphQlDto): BlocoCreateInputDto {
    const input = new BlocoCreateInputDto();
    input.nome = dto.nome;
    input.codigo = dto.codigo;
    input.campus = { id: dto.campus.id };
    return input;
  }

  static toUpdateInput(
    params: { id: string },
    dto: BlocoUpdateInputGraphQlDto,
  ): BlocoFindOneInputDto & BlocoUpdateInputDto {
    const input = new BlocoFindOneInputDto() as BlocoFindOneInputDto & BlocoUpdateInputDto;
    input.id = params.id;
    if (dto.nome !== undefined) input.nome = dto.nome;
    if (dto.codigo !== undefined) input.codigo = dto.codigo;
    if (dto.campus !== undefined) input.campus = { id: dto.campus.id };
    return input;
  }

  static toFindOneOutputDto(output: BlocoFindOneOutputDto): BlocoFindOneOutputGraphQlDto {
    const dto = new BlocoFindOneOutputGraphQlDto();
    dto.id = output.id;
    dto.nome = output.nome;
    dto.codigo = output.codigo;
    dto.campus = CampusGraphqlMapper.toFindOneOutputDto(output.campus);
    dto.imagemCapa = mapImagemOutput(output.imagemCapa);
    mapDatedFields(dto, output);
    return dto;
  }

  static toListOutputDto = createListOutputMapper(
    BlocoListOutputGraphQlDto,
    BlocoGraphqlMapper.toFindOneOutputDto,
  );
}

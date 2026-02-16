import {
  AmbienteCreateInputDto,
  AmbienteFindOneInputDto,
  AmbienteFindOneOutputDto,
  AmbienteListInputDto,
  AmbienteUpdateInputDto,
} from "@/modules/sisgea/ambiente";
import { BlocoGraphqlMapper } from "@/server/nest/modules/bloco/graphql/bloco.graphql.mapper";
import {
  createFindOneInputMapper,
  createListOutputMapper,
  mapDatedFields,
} from "@/server/nest/shared/mappers";
import {
  AmbienteCreateInputGraphQlDto,
  AmbienteFindOneOutputGraphQlDto,
  AmbienteListInputGraphQlDto,
  AmbienteListOutputGraphQlDto,
  AmbienteUpdateInputGraphQlDto,
} from "./ambiente.graphql.dto";

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

export class AmbienteGraphqlMapper {
  static toListInput(dto: AmbienteListInputGraphQlDto | null): AmbienteListInputDto | null {
    if (!dto) {
      return null;
    }

    const input = new AmbienteListInputDto();
    input.page = dto.page;
    input.limit = dto.limit;
    input.search = dto.search;
    input.sortBy = dto.sortBy;
    input["filter.id"] = dto.filterId;
    input["filter.bloco.id"] = dto.filterBlocoId;
    input["filter.bloco.campus.id"] = dto.filterBlocoCampusId;
    return input;
  }

  static toFindOneInput = createFindOneInputMapper(AmbienteFindOneInputDto);

  static toCreateInput(dto: AmbienteCreateInputGraphQlDto): AmbienteCreateInputDto {
    const input = new AmbienteCreateInputDto();
    input.nome = dto.nome;
    input.descricao = dto.descricao ?? null;
    input.codigo = dto.codigo;
    input.capacidade = dto.capacidade ?? null;
    input.tipo = dto.tipo ?? null;
    input.bloco = { id: dto.bloco.id };
    return input;
  }

  static toUpdateInput(
    params: { id: string },
    dto: AmbienteUpdateInputGraphQlDto,
  ): AmbienteFindOneInputDto & AmbienteUpdateInputDto {
    const input = new AmbienteFindOneInputDto() as AmbienteFindOneInputDto & AmbienteUpdateInputDto;
    input.id = params.id;
    if (dto.nome !== undefined) input.nome = dto.nome;
    if (dto.descricao !== undefined) input.descricao = dto.descricao ?? null;
    if (dto.codigo !== undefined) input.codigo = dto.codigo;
    if (dto.capacidade !== undefined) input.capacidade = dto.capacidade ?? null;
    if (dto.tipo !== undefined) input.tipo = dto.tipo ?? null;
    if (dto.bloco !== undefined) input.bloco = { id: dto.bloco.id };
    return input;
  }

  static toFindOneOutputDto(output: AmbienteFindOneOutputDto): AmbienteFindOneOutputGraphQlDto {
    const dto = new AmbienteFindOneOutputGraphQlDto();
    dto.id = output.id;
    dto.nome = output.nome;
    dto.descricao = output.descricao;
    dto.codigo = output.codigo;
    dto.capacidade = output.capacidade;
    dto.tipo = output.tipo;
    dto.bloco = BlocoGraphqlMapper.toFindOneOutputDto(output.bloco);
    dto.imagemCapa = mapImagemOutput(output.imagemCapa);
    mapDatedFields(dto, output);
    return dto;
  }

  static toListOutputDto = createListOutputMapper(
    AmbienteListOutputGraphQlDto,
    AmbienteGraphqlMapper.toFindOneOutputDto,
  );
}

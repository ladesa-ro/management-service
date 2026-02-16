import {
  UsuarioCreateInputDto,
  UsuarioFindOneInputDto,
  UsuarioFindOneOutputDto,
  UsuarioListInputDto,
  UsuarioUpdateInputDto,
} from "@/modules/acesso/usuario";
import {
  createFindOneInputMapper,
  createListOutputMapper,
  mapDatedFields,
} from "@/server/nest/shared/mappers";
import {
  UsuarioCreateInputGraphQlDto,
  UsuarioFindOneOutputGraphQlDto,
  UsuarioListInputGraphQlDto,
  UsuarioListOutputGraphQlDto,
  UsuarioUpdateInputGraphQlDto,
} from "./usuario.graphql.dto";

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

export class UsuarioGraphqlMapper {
  static toListInput(dto: UsuarioListInputGraphQlDto | null): UsuarioListInputDto | null {
    if (!dto) {
      return null;
    }

    const input = new UsuarioListInputDto();
    input.page = dto.page;
    input.limit = dto.limit;
    input.search = dto.search;
    input.sortBy = dto.sortBy;
    input["filter.id"] = dto.filterId;
    return input;
  }

  static toFindOneInput = createFindOneInputMapper(UsuarioFindOneInputDto);

  static toCreateInput(dto: UsuarioCreateInputGraphQlDto): UsuarioCreateInputDto {
    const input = new UsuarioCreateInputDto();
    input.nome = dto.nome;
    input.matriculaSiape = dto.matriculaSiape;
    input.email = dto.email;
    return input;
  }

  static toUpdateInput(
    params: { id: string },
    dto: UsuarioUpdateInputGraphQlDto,
  ): UsuarioFindOneInputDto & UsuarioUpdateInputDto {
    const input = new UsuarioFindOneInputDto() as UsuarioFindOneInputDto & UsuarioUpdateInputDto;
    input.id = params.id;
    if (dto.nome !== undefined) {
      input.nome = dto.nome;
    }
    if (dto.matriculaSiape !== undefined) {
      input.matriculaSiape = dto.matriculaSiape;
    }
    if (dto.email !== undefined) {
      input.email = dto.email;
    }
    return input;
  }

  static toFindOneOutputDto(output: UsuarioFindOneOutputDto): UsuarioFindOneOutputGraphQlDto {
    const dto = new UsuarioFindOneOutputGraphQlDto();
    dto.id = output.id;
    dto.nome = output.nome;
    dto.matriculaSiape = output.matriculaSiape;
    dto.email = output.email;
    dto.isSuperUser = output.isSuperUser;
    dto.imagemCapa = mapImagemOutput(output.imagemCapa);
    dto.imagemPerfil = mapImagemOutput(output.imagemPerfil);
    mapDatedFields(dto, output);
    return dto;
  }

  static toListOutputDto = createListOutputMapper(
    UsuarioListOutputGraphQlDto,
    UsuarioGraphqlMapper.toFindOneOutputDto,
  );
}

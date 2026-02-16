import { EnderecoGraphqlMapper } from "@/modules/@base/localidades/endereco/presentation/graphql/endereco.graphql.mapper";
import {
  CampusCreateInputDto,
  CampusFindOneInputDto,
  CampusFindOneOutputDto,
  CampusListInputDto,
  CampusUpdateInputDto,
} from "@/modules/ambientes/campus";
import { createListOutputMapper, mapDatedFields } from "@/server/nest/shared/mappers";
import {
  CampusCreateInputGraphQlDto,
  CampusFindOneOutputGraphQlDto,
  CampusListInputGraphQlDto,
  CampusListOutputGraphQlDto,
  CampusUpdateInputGraphQlDto,
} from "./campus.graphql.dto";

export class CampusGraphqlMapper {
  static toListInput(dto: CampusListInputGraphQlDto | null): CampusListInputDto | null {
    if (!dto) {
      return null;
    }

    const input = new CampusListInputDto();
    input.page = dto.page;
    input.limit = dto.limit;
    input.search = dto.search;
    input.sortBy = dto.sortBy;
    input["filter.id"] = dto.filterId;
    return input;
  }

  static toFindOneInput(id: string, selection?: string[]): CampusFindOneInputDto {
    const input = new CampusFindOneInputDto();
    input.id = id;
    input.selection = selection;
    return input;
  }

  static toCreateInput(dto: CampusCreateInputGraphQlDto): CampusCreateInputDto {
    const input = new CampusCreateInputDto();
    input.nomeFantasia = dto.nomeFantasia;
    input.razaoSocial = dto.razaoSocial;
    input.apelido = dto.apelido;
    input.cnpj = dto.cnpj;
    input.endereco = {
      cep: dto.endereco.cep,
      logradouro: dto.endereco.logradouro,
      numero: dto.endereco.numero,
      bairro: dto.endereco.bairro,
      complemento: dto.endereco.complemento ?? null,
      pontoReferencia: dto.endereco.pontoReferencia ?? null,
      cidade: { id: dto.endereco.cidade.id },
    };
    return input;
  }

  static toUpdateInput(
    params: { id: string },
    dto: CampusUpdateInputGraphQlDto,
  ): CampusFindOneInputDto & CampusUpdateInputDto {
    const input = new CampusFindOneInputDto() as CampusFindOneInputDto & CampusUpdateInputDto;
    input.id = params.id;
    if (dto.nomeFantasia !== undefined) {
      input.nomeFantasia = dto.nomeFantasia;
    }
    if (dto.razaoSocial !== undefined) {
      input.razaoSocial = dto.razaoSocial;
    }
    if (dto.apelido !== undefined) {
      input.apelido = dto.apelido;
    }
    if (dto.cnpj !== undefined) {
      input.cnpj = dto.cnpj;
    }
    if (dto.endereco !== undefined) {
      input.endereco = {
        cep: dto.endereco.cep,
        logradouro: dto.endereco.logradouro,
        numero: dto.endereco.numero,
        bairro: dto.endereco.bairro,
        complemento: dto.endereco.complemento ?? null,
        pontoReferencia: dto.endereco.pontoReferencia ?? null,
        cidade: { id: dto.endereco.cidade.id },
      };
    }
    return input;
  }

  static toFindOneOutputDto(output: CampusFindOneOutputDto): CampusFindOneOutputGraphQlDto {
    const dto = new CampusFindOneOutputGraphQlDto();
    dto.id = output.id;
    dto.nomeFantasia = output.nomeFantasia;
    dto.razaoSocial = output.razaoSocial;
    dto.apelido = output.apelido;
    dto.cnpj = output.cnpj;
    dto.endereco = EnderecoGraphqlMapper.toFindOneOutputDto(output.endereco);
    mapDatedFields(dto, output);
    return dto;
  }

  static toListOutputDto = createListOutputMapper(
    CampusListOutputGraphQlDto,
    CampusGraphqlMapper.toFindOneOutputDto,
  );
}

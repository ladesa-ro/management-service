import {
  EmpresaCreateCommand,
  EmpresaFindOneQuery,
  EmpresaFindOneQueryResult,
  EmpresaListQuery,
  EmpresaUpdateCommand,
} from "@/modules/estagio/empresa";
import { EnderecoGraphqlMapper } from "@/modules/localidades/endereco/presentation.graphql/endereco.graphql.mapper";
import { createListOutputMapper, mapDatedFields } from "@/shared/mapping";
import {
  EmpresaCreateInputGraphQlDto,
  EmpresaFindOneOutputGraphQlDto,
  EmpresaListInputGraphQlDto,
  EmpresaListOutputGraphQlDto,
  EmpresaUpdateInputGraphQlDto,
} from "./empresa.graphql.dto";

export class EmpresaGraphqlMapper {
  static toListInput(dto: EmpresaListInputGraphQlDto | null): EmpresaListQuery | null {
    if (!dto) {
      return null;
    }

    const input = new EmpresaListQuery();
    input.page = dto.page;
    input.limit = dto.limit;
    input.search = dto.search;
    input.sortBy = dto.sortBy;
    input["filter.id"] = dto.filterId;
    input["filter.cnpj"] = dto.filterCnpj;
    input["filter.nomeFantasia"] = dto.filterNomeFantasia;
    input["filter.endereco.id"] = dto.filterEnderecoId;
    return input;
  }

  static toFindOneInput(id: string): EmpresaFindOneQuery {
    const input = new EmpresaFindOneQuery();
    input.id = id;
    return input;
  }

  static toCreateInput(dto: EmpresaCreateInputGraphQlDto): EmpresaCreateCommand {
    const input = new EmpresaCreateCommand();
    input.razaoSocial = dto.razaoSocial;
    input.nomeFantasia = dto.nomeFantasia;
    input.cnpj = dto.cnpj;
    input.telefone = dto.telefone;
    input.email = dto.email;
    input.endereco = { id: dto.endereco.id };
    return input;
  }

  static toUpdateInput(
    params: { id: string },
    dto: EmpresaUpdateInputGraphQlDto,
  ): EmpresaFindOneQuery & EmpresaUpdateCommand {
    const input = new EmpresaFindOneQuery() as EmpresaFindOneQuery & EmpresaUpdateCommand;
    input.id = params.id;
    if (dto.razaoSocial !== undefined) {
      input.razaoSocial = dto.razaoSocial;
    }
    if (dto.nomeFantasia !== undefined) {
      input.nomeFantasia = dto.nomeFantasia;
    }
    if (dto.cnpj !== undefined) {
      input.cnpj = dto.cnpj;
    }
    if (dto.telefone !== undefined) {
      input.telefone = dto.telefone;
    }
    if (dto.email !== undefined) {
      input.email = dto.email;
    }
    if (dto.endereco !== undefined) {
      input.endereco = { id: dto.endereco.id };
    }
    return input;
  }

  static toFindOneOutputDto(output: EmpresaFindOneQueryResult): EmpresaFindOneOutputGraphQlDto {
    const dto = new EmpresaFindOneOutputGraphQlDto();
    dto.id = output.id;
    dto.razaoSocial = output.razaoSocial;
    dto.nomeFantasia = output.nomeFantasia;
    dto.cnpj = output.cnpj;
    dto.telefone = output.telefone;
    dto.email = output.email;
    dto.endereco = EnderecoGraphqlMapper.toFindOneOutputDto(output.endereco);
    dto.ativo = output.ativo;
    mapDatedFields(dto, output);
    return dto;
  }

  static toListOutputDto = createListOutputMapper(
    EmpresaListOutputGraphQlDto,
    EmpresaGraphqlMapper.toFindOneOutputDto,
  );
}

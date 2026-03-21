import { createListOutputMapper, mapDatedFields } from "@/modules/@shared/application/mappers";
import {
  EmpresaCreateCommand,
  EmpresaFindOneQuery,
  EmpresaFindOneQueryResult,
  EmpresaListQuery,
  EmpresaUpdateCommand,
} from "@/modules/estagio/empresa";
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
    input["filter.idEnderecoFk"] = dto.filterIdEnderecoFk;
    return input;
  }

  static toFindOneInput(id: string, selection?: string[]): EmpresaFindOneQuery {
    const input = new EmpresaFindOneQuery();
    input.id = id;
    input.selection = selection;
    return input;
  }

  static toCreateInput(dto: EmpresaCreateInputGraphQlDto): EmpresaCreateCommand {
    const input = new EmpresaCreateCommand();
    input.razaoSocial = dto.razaoSocial;
    input.nomeFantasia = dto.nomeFantasia;
    input.cnpj = dto.cnpj;
    input.telefone = dto.telefone;
    input.email = dto.email;
    input.idEnderecoFk = dto.idEnderecoFk;
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
    if (dto.idEnderecoFk !== undefined) {
      input.idEnderecoFk = dto.idEnderecoFk;
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
    dto.idEnderecoFk = output.idEnderecoFk;
    dto.ativo = output.ativo;
    mapDatedFields(dto, output);
    return dto;
  }

  static toListOutputDto = createListOutputMapper(
    EmpresaListOutputGraphQlDto,
    EmpresaGraphqlMapper.toFindOneOutputDto,
  );
}

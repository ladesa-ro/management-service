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
//
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
//
  static toCreateInput(dto: EmpresaCreateInputGraphQlDto): EmpresaCreateCommand {
    const input = new EmpresaCreateCommand();
    const fields = ['razaoSocial', 'nomeFantasia', 'cnpj', 'telefone', 'email', 'idEnderecoFk'] as const;

    fields.forEach(field => {
      input[field] = dto[field];
    });

    return input;
  }

 //
  static toUpdateInput(
    params: { id: string },
    dto: EmpresaUpdateInputGraphQlDto,
  ): EmpresaFindOneQuery & EmpresaUpdateCommand {
    const input = new EmpresaFindOneQuery() as EmpresaFindOneQuery & EmpresaUpdateCommand;
    input.id = params.id;

    const fields = ['razaoSocial', 'nomeFantasia', 'cnpj', 'telefone', 'email', 'idEnderecoFk'] as const;
    fields.forEach(field => {
      if (dto[field] !== undefined) {
        input[field] = dto[field];
      }
    });

    return input;
  }

  //
  static toFindOneOutputDto(output: EmpresaFindOneQueryResult): EmpresaFindOneOutputGraphQlDto {
    const dto = new EmpresaFindOneOutputGraphQlDto();
    const fields = ['id', 'razaoSocial', 'nomeFantasia', 'cnpj', 'telefone', 'email', 'idEnderecoFk', 'ativo'] as const;

    fields.forEach(field => {
      (dto[field] as any) = output[field];
    });

    mapDatedFields(dto, output);
    return dto;
  }

  static toListOutputDto = createListOutputMapper(
    EmpresaListOutputGraphQlDto,
    EmpresaGraphqlMapper.toFindOneOutputDto,
  );
}

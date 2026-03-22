import {
  EmpresaCreateCommand,
  EmpresaUpdateCommand,
} from "@/modules/estagio/empresa/domain/commands";
import {
  EmpresaFindOneQuery,
  type EmpresaFindOneQueryResult,
  EmpresaListQuery,
} from "@/modules/estagio/empresa/domain/queries";
import { EnderecoRestMapper } from "@/modules/localidades/endereco/presentation.rest";
import {
  createFindOneInputMapper,
  createListInputMapper,
  createListOutputMapper,
  mapDatedFields,
  mapFieldsIfDefined,
} from "@/shared/mapping";
import {
  EmpresaCreateInputRestDto,
  EmpresaFindOneInputRestDto,
  EmpresaFindOneOutputRestDto,
  EmpresaListOutputRestDto,
  EmpresaUpdateInputRestDto,
} from "./empresa.rest.dto";

export class EmpresaRestMapper {
  static toFindOneInput = createFindOneInputMapper(EmpresaFindOneQuery);

  static toListInput = createListInputMapper(EmpresaListQuery, [
    "filter.id",
    "filter.cnpj",
    "filter.nomeFantasia",
    "filter.endereco.id",
  ]);

  static toCreateInput(dto: EmpresaCreateInputRestDto): EmpresaCreateCommand {
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
    params: EmpresaFindOneInputRestDto,
    dto: EmpresaUpdateInputRestDto,
  ): EmpresaFindOneQuery & EmpresaUpdateCommand {
    const input = new EmpresaFindOneQuery() as EmpresaFindOneQuery & EmpresaUpdateCommand;
    input.id = params.id;
    mapFieldsIfDefined(input, dto, ["razaoSocial", "nomeFantasia", "cnpj", "telefone", "email"]);
    if (dto.endereco !== undefined) {
      input.endereco = { id: dto.endereco.id };
    }
    return input;
  }

  static toFindOneOutputDto(output: EmpresaFindOneQueryResult): EmpresaFindOneOutputRestDto {
    const dto = new EmpresaFindOneOutputRestDto();
    dto.id = output.id;
    dto.razaoSocial = output.razaoSocial;
    dto.nomeFantasia = output.nomeFantasia;
    dto.cnpj = output.cnpj;
    dto.telefone = output.telefone;
    dto.email = output.email;
    dto.endereco = EnderecoRestMapper.toFindOneOutputDto(output.endereco);
    dto.ativo = output.ativo;
    mapDatedFields(dto, output);
    return dto;
  }

  static toListOutputDto = createListOutputMapper(
    EmpresaListOutputRestDto,
    EmpresaRestMapper.toFindOneOutputDto,
  );
}

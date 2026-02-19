import { mapDatedFields } from "@/modules/@shared/application/mappers";
import { CidadeGraphqlMapper } from "@/modules/localidades/cidade/presentation/graphql/cidade.graphql.mapper";
import { EnderecoFindOneInputDto, EnderecoFindOneOutputDto } from "@/modules/localidades/endereco";
import { EnderecoFindOneOutputGraphQlDto } from "./endereco.graphql.dto";

export class EnderecoGraphqlMapper {
  static toFindOneInput(id: string, selection?: string[]): EnderecoFindOneInputDto {
    const input = new EnderecoFindOneInputDto();
    input.id = id;
    input.selection = selection;
    return input;
  }

  static toFindOneOutputDto(output: EnderecoFindOneOutputDto): EnderecoFindOneOutputGraphQlDto {
    const dto = new EnderecoFindOneOutputGraphQlDto();
    dto.id = output.id;
    dto.cep = output.cep;
    dto.logradouro = output.logradouro;
    dto.numero = output.numero;
    dto.bairro = output.bairro;
    dto.complemento = output.complemento;
    dto.pontoReferencia = output.pontoReferencia;
    dto.cidade = CidadeGraphqlMapper.toFindOneOutputDto(output.cidade);
    mapDatedFields(dto, output);
    return dto;
  }
}

import {
  EnderecoFindOneInputDto,
  EnderecoFindOneOutputDto,
} from "@/modules/base/localidades/endereco";
import { CidadeGraphqlMapper } from "@/server/nest/modules/cidade/graphql/cidade.graphql.mapper";
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
    dto.dateCreated = output.dateCreated as unknown as Date;
    dto.dateUpdated = output.dateUpdated as unknown as Date;
    dto.dateDeleted = output.dateDeleted as unknown as Date | null;
    return dto;
  }
}

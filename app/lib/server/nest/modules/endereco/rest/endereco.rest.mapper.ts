import { EnderecoCreateInput, EnderecoFindOneOutput } from "@/modules/endereco";
import { CidadeRestMapper } from "@/server/nest/modules/cidade/rest/cidade.rest.mapper";
import { EnderecoFindOneOutputDto, EnderecoInputDto } from "./endereco.rest.dto";

export class EnderecoRestMapper {
  static toCreateInput(dto: EnderecoInputDto): EnderecoCreateInput {
    const input = new EnderecoCreateInput();
    input.cep = dto.cep;
    input.logradouro = dto.logradouro;
    input.numero = dto.numero;
    input.bairro = dto.bairro;
    input.complemento = dto.complemento ?? null;
    input.pontoReferencia = dto.pontoReferencia ?? null;
    input.cidade = { id: dto.cidade.id };
    return input;
  }

  static toFindOneOutputDto(output: EnderecoFindOneOutput): EnderecoFindOneOutputDto {
    const dto = new EnderecoFindOneOutputDto();
    dto.id = output.id;
    dto.cep = output.cep;
    dto.logradouro = output.logradouro;
    dto.numero = output.numero;
    dto.bairro = output.bairro;
    dto.complemento = output.complemento;
    dto.pontoReferencia = output.pontoReferencia;
    dto.cidade = CidadeRestMapper.toFindOneOutputDto(output.cidade);
    dto.dateCreated = new Date(output.dateCreated);
    dto.dateUpdated = new Date(output.dateUpdated);
    dto.dateDeleted = output.dateDeleted ? new Date(output.dateDeleted) : null;
    return dto;
  }
}

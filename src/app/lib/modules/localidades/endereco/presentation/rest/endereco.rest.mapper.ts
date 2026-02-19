import { CidadeRestMapper } from "@/modules/localidades/cidade/presentation/rest/cidade.rest.mapper";
import {
  EnderecoCreateInputDto,
  EnderecoFindOneOutputDto,
} from "@/modules/localidades/endereco";
import { mapDatedFields } from "@/modules/@shared/application/mappers";
import { EnderecoFindOneOutputRestDto, EnderecoInputRestDto } from "./endereco.rest.dto";

export class EnderecoRestMapper {
  static toCreateInput(dto: EnderecoInputRestDto): EnderecoCreateInputDto {
    const input = new EnderecoCreateInputDto();
    input.cep = dto.cep;
    input.logradouro = dto.logradouro;
    input.numero = dto.numero;
    input.bairro = dto.bairro;
    input.complemento = dto.complemento ?? null;
    input.pontoReferencia = dto.pontoReferencia ?? null;
    input.cidade = { id: dto.cidade.id };
    return input;
  }

  static toFindOneOutputDto(output: EnderecoFindOneOutputDto): EnderecoFindOneOutputRestDto {
    const dto = new EnderecoFindOneOutputRestDto();
    dto.id = output.id;
    dto.cep = output.cep;
    dto.logradouro = output.logradouro;
    dto.numero = output.numero;
    dto.bairro = output.bairro;
    dto.complemento = output.complemento;
    dto.pontoReferencia = output.pontoReferencia;
    dto.cidade = CidadeRestMapper.toFindOneOutputDto(output.cidade);
    mapDatedFields(dto, output);
    return dto;
  }
}

import { EnderecoFindOneInput, EnderecoFindOneOutput } from "@/modules/endereco";
import { CidadeFindOneOutputDto } from "@/server/nest/modules/cidade/rest/cidade.rest.dto";
import { EnderecoFindOneOutputDto } from "../rest/endereco.rest.dto";

export class EnderecoGraphqlMapper {
  static toFindOneInput(id: string, selection?: string[]): EnderecoFindOneInput {
    const input = new EnderecoFindOneInput();
    input.id = id;
    input.selection = selection;
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
    dto.cidade = output.cidade as CidadeFindOneOutputDto;
    dto.dateCreated = output.dateCreated as unknown as Date;
    dto.dateUpdated = output.dateUpdated as unknown as Date;
    dto.dateDeleted = output.dateDeleted as unknown as Date | null;
    return dto;
  }
}

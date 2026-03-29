import * as CidadeRestMapper from "@/modules/localidades/cidade/presentation.rest/cidade.rest.mapper";
import {
  EnderecoCreateCommand,
  type EnderecoFindOneQueryResult,
} from "@/modules/localidades/endereco";
import { createMapper } from "@/shared/mapping";
import { EnderecoFindOneOutputRestDto, type EnderecoInputRestDto } from "./endereco.rest.dto";

// ============================================================================
// Externa → Interna (Input: Presentation → Core)
// ============================================================================

export const createInputDtoToCreateCommand = createMapper<
  EnderecoInputRestDto,
  EnderecoCreateCommand
>((dto) => {
  const input = new EnderecoCreateCommand();
  input.cep = dto.cep;
  input.logradouro = dto.logradouro;
  input.numero = dto.numero;
  input.bairro = dto.bairro;
  input.complemento = dto.complemento ?? null;
  input.pontoReferencia = dto.pontoReferencia ?? null;
  input.cidade = { id: dto.cidade.id };
  return input;
});

// ============================================================================
// Interna → Externa (Output: Core → Presentation)
// ============================================================================

export const findOneQueryResultToOutputDto = createMapper<
  EnderecoFindOneQueryResult,
  EnderecoFindOneOutputRestDto
>((output) => ({
  id: output.id,
  cep: output.cep,
  logradouro: output.logradouro,
  numero: output.numero,
  bairro: output.bairro,
  complemento: output.complemento,
  pontoReferencia: output.pontoReferencia,
  cidade: CidadeRestMapper.findOneQueryResultToOutputDto.mapOptional(output.cidade),
  dateCreated: output.dateCreated,
  dateUpdated: output.dateUpdated,
  dateDeleted: output.dateDeleted,
}));

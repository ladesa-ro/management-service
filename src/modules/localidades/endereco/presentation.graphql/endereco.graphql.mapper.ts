import * as CidadeGraphqlMapper from "@/modules/localidades/cidade/presentation.graphql/cidade.graphql.mapper";
import {
  EnderecoFindOneQuery,
  type EnderecoFindOneQueryResult,
} from "@/modules/localidades/endereco";
import { createMapper } from "@/shared/mapping";
import { EnderecoFindOneOutputGraphQlDto } from "./endereco.graphql.dto";

// ============================================================================
// Externa → Interna (Input: Presentation → Core)
// ============================================================================

export const findOneInputDtoToFindOneQuery = createMapper<string, EnderecoFindOneQuery>((id) => {
  const input = new EnderecoFindOneQuery();
  input.id = id;
  return input;
});

// ============================================================================
// Interna → Externa (Output: Core → Presentation)
// ============================================================================

export const findOneQueryResultToOutputDto = createMapper<
  EnderecoFindOneQueryResult,
  EnderecoFindOneOutputGraphQlDto
>((output) => ({
  id: output.id,
  cep: output.cep,
  logradouro: output.logradouro,
  numero: output.numero,
  bairro: output.bairro,
  complemento: output.complemento,
  pontoReferencia: output.pontoReferencia,
  cidade: CidadeGraphqlMapper.findOneQueryResultToOutputDto.map(output.cidade),
  dateCreated: new Date(output.dateCreated),
  dateUpdated: new Date(output.dateUpdated),
  dateDeleted: output.dateDeleted ? new Date(output.dateDeleted) : null,
}));

import {
  CampusCreateCommand,
  CampusFindOneQuery,
  type CampusFindOneQueryResult,
  CampusListQuery,
  CampusUpdateCommand,
} from "@/modules/ambientes/campus";
import * as EnderecoRestMapper from "@/modules/localidades/endereco/presentation.rest/endereco.rest.mapper";
import {
  createListMapper,
  createMapper,
  createPaginatedInputMapper,
  mapField,
} from "@/shared/mapping";
import {
  type CampusCreateInputRestDto,
  type CampusFindOneInputRestDto,
  CampusFindOneOutputRestDto,
  type CampusListInputRestDto,
  CampusListOutputRestDto,
  type CampusUpdateInputRestDto,
} from "./campus.rest.dto";

// ============================================================================
// Externa → Interna (Input: Presentation → Core)
// ============================================================================

export const toFindOneInput = createMapper<CampusFindOneInputRestDto, CampusFindOneQuery>((dto) => {
  const input = new CampusFindOneQuery();
  input.id = dto.id;
  return input;
});

export const toListInput = createPaginatedInputMapper<CampusListInputRestDto, CampusListQuery>(
  CampusListQuery,
  (dto, query) => {
    mapField(query, "filter.id", dto, "filter.id");
  },
);

export const toCreateInput = createMapper<CampusCreateInputRestDto, CampusCreateCommand>((dto) => {
  const input = new CampusCreateCommand();
  input.nomeFantasia = dto.nomeFantasia;
  input.razaoSocial = dto.razaoSocial;
  input.apelido = dto.apelido;
  input.cnpj = dto.cnpj;
  input.endereco = EnderecoRestMapper.toCreateInput.map(dto.endereco);
  return input;
});

export const toUpdateInput = createMapper<
  { params: CampusFindOneInputRestDto; dto: CampusUpdateInputRestDto },
  CampusFindOneQuery & CampusUpdateCommand
>(({ params, dto }) => ({
  id: params.id,
  nomeFantasia: dto.nomeFantasia,
  razaoSocial: dto.razaoSocial,
  apelido: dto.apelido,
  cnpj: dto.cnpj,
  endereco: dto.endereco ? EnderecoRestMapper.toCreateInput.map(dto.endereco) : undefined,
}));

// ============================================================================
// Interna → Externa (Output: Core → Presentation)
// ============================================================================

export const toFindOneOutput = createMapper<CampusFindOneQueryResult, CampusFindOneOutputRestDto>(
  (output) => ({
    id: output.id,
    nomeFantasia: output.nomeFantasia,
    razaoSocial: output.razaoSocial,
    apelido: output.apelido,
    cnpj: output.cnpj,
    endereco: EnderecoRestMapper.toFindOneOutput.map(output.endereco),
    dateCreated: output.dateCreated,
    dateUpdated: output.dateUpdated,
    dateDeleted: output.dateDeleted,
  }),
);

export const toListOutput = createListMapper(CampusListOutputRestDto, toFindOneOutput);

import {
  AmbienteCreateCommand,
  AmbienteFindOneQuery,
  type AmbienteFindOneQueryResult,
  AmbienteListQuery,
  AmbienteUpdateCommand,
} from "@/modules/ambientes/ambiente";
import * as BlocoRestMapper from "@/modules/ambientes/bloco/presentation.rest/bloco.rest.mapper";
import {
  createListMapper,
  createMapper,
  createPaginatedInputMapper,
  mapField,
} from "@/shared/mapping";
import {
  type AmbienteCreateInputRestDto,
  type AmbienteFindOneInputRestDto,
  AmbienteFindOneOutputRestDto,
  type AmbienteListInputRestDto,
  AmbienteListOutputRestDto,
  type AmbienteUpdateInputRestDto,
} from "./ambiente.rest.dto";

// ============================================================================
// Externa -> Interna (Input: Presentation -> Core)
// ============================================================================

export const toFindOneInput = createMapper<AmbienteFindOneInputRestDto, AmbienteFindOneQuery>(
  (dto) => {
    const input = new AmbienteFindOneQuery();
    input.id = dto.id;
    return input;
  },
);

export const toListInput = createPaginatedInputMapper<AmbienteListInputRestDto, AmbienteListQuery>(
  AmbienteListQuery,
  (dto, query) => {
    mapField(query, "filter.id", dto, "filter.id");
    mapField(query, "filter.bloco.id", dto, "filter.bloco.id");
    mapField(query, "filter.bloco.campus.id", dto, "filter.bloco.campus.id");
  },
);

export const toCreateInput = createMapper<AmbienteCreateInputRestDto, AmbienteCreateCommand>(
  (dto) => ({
    nome: dto.nome,
    codigo: dto.codigo,
    descricao: dto.descricao,
    capacidade: dto.capacidade,
    tipo: dto.tipo,
    bloco: { id: dto.bloco.id },
  }),
);

export const toUpdateInput = createMapper<
  { params: AmbienteFindOneInputRestDto; dto: AmbienteUpdateInputRestDto },
  AmbienteFindOneQuery & AmbienteUpdateCommand
>(({ params, dto }) => ({
  id: params.id,
  nome: dto.nome,
  codigo: dto.codigo,
  descricao: dto.descricao,
  capacidade: dto.capacidade,
  tipo: dto.tipo,
  bloco: dto.bloco ? { id: dto.bloco.id } : undefined,
}));

// ============================================================================
// Interna -> Externa (Output: Core -> Presentation)
// ============================================================================

export const toFindOneOutput = createMapper<
  AmbienteFindOneQueryResult,
  AmbienteFindOneOutputRestDto
>((output) => ({
  id: output.id,
  nome: output.nome,
  descricao: output.descricao,
  codigo: output.codigo,
  capacidade: output.capacidade,
  tipo: output.tipo,
  bloco: BlocoRestMapper.toFindOneOutput.map(output.bloco),
  imagemCapa: output.imagemCapa ? BlocoRestMapper.toImagemOutput(output.imagemCapa) : null,
  dateCreated: output.dateCreated,
  dateUpdated: output.dateUpdated,
  dateDeleted: output.dateDeleted,
}));

export const toListOutput = createListMapper(AmbienteListOutputRestDto, toFindOneOutput);

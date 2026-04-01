import type {
  EstagioCreateCommand,
  EstagioUpdateCommand,
} from "@/modules/estagio/estagio/domain/commands";
import type { EstagioStatus } from "@/modules/estagio/estagio/domain/estagio";
import {
  EstagioFindOneQuery,
  type EstagioFindOneQueryResult,
  EstagioListQuery,
  type EstagioListQueryResult,
} from "@/modules/estagio/estagio/domain/queries";
import { createMapper, createPaginatedInputMapper, into } from "@/shared/mapping";
import {
  type EstagioCreateInputGraphQlDto,
  EstagioFindOneOutputGraphQlDto,
  type EstagioListInputGraphQlDto,
  EstagioListOutputGraphQlDto,
  type EstagioUpdateInputGraphQlDto,
} from "./estagio.graphql.dto";

export const findOneInputDtoToFindOneQuery = createMapper<string, EstagioFindOneQuery>((id) => {
  const input = new EstagioFindOneQuery();
  input.id = id;
  return input;
});

const listInputMapper = createPaginatedInputMapper<EstagioListInputGraphQlDto, EstagioListQuery>(
  EstagioListQuery,
  (dto, query) => {
    into(query as never)
      .field("filter.id")
      .from(dto, "filterId");
    into(query as never)
      .field("filter.empresa.id")
      .from(dto, "filterEmpresaId");
    into(query as never)
      .field("filter.estagiario.id")
      .from(dto, "filterEstagiarioId");
    into(query as never)
      .field("filter.status")
      .from(dto, "filterStatus");
  },
);

export function listInputDtoToListQuery(
  dto: EstagioListInputGraphQlDto | null,
): EstagioListQuery | null {
  if (!dto) return null;
  return listInputMapper.map(dto);
}

export const createInputDtoToCreateCommand = createMapper<
  EstagioCreateInputGraphQlDto,
  EstagioCreateCommand
>((dto) => ({
  empresa: { id: dto.empresa.id },
  estagiario: dto.estagiario ? { id: dto.estagiario.id } : undefined,
  cargaHoraria: dto.cargaHoraria,
  dataInicio: dto.dataInicio,
  dataFim: dto.dataFim,
  status: dto.status as EstagioStatus | undefined,
  horariosEstagio: dto.horariosEstagio,
}));

export const updateInputDtoToUpdateCommand = createMapper<
  { id: string; dto: EstagioUpdateInputGraphQlDto },
  EstagioFindOneQuery & EstagioUpdateCommand
>(({ id, dto }) => ({
  id,
  empresa: dto.empresa ? { id: dto.empresa.id } : undefined,
  estagiario: dto.estagiario ? { id: dto.estagiario.id } : undefined,
  cargaHoraria: dto.cargaHoraria,
  dataInicio: dto.dataInicio,
  dataFim: dto.dataFim,
  status: dto.status as EstagioStatus | undefined,
  horariosEstagio: dto.horariosEstagio,
}));

export const findOneQueryResultToOutputDto = createMapper<
  EstagioFindOneQueryResult,
  EstagioFindOneOutputGraphQlDto
>((output) => ({
  id: output.id,
  empresa: output.empresa,
  estagiario: output.estagiario,
  cargaHoraria: output.cargaHoraria,
  dataInicio: output.dataInicio,
  dataFim: output.dataFim,
  status: output.status,
  horariosEstagio: output.horariosEstagio,
  ativo: output.ativo,
  dateCreated: new Date(output.dateCreated),
  dateUpdated: new Date(output.dateUpdated),
  dateDeleted: null,
}));

export const listQueryResultToListOutputDto = createMapper<
  EstagioListQueryResult,
  EstagioListOutputGraphQlDto
>((data) => {
  const output = new EstagioListOutputGraphQlDto();
  output.meta = {
    itemsPerPage: data.limit,
    totalItems: data.total,
    currentPage: data.page,
    totalPages: data.limit > 0 ? Math.ceil(data.total / data.limit) : 0,
    search: "",
    sortBy: [],
  };
  output.data = findOneQueryResultToOutputDto.mapArray(data.data);
  return output;
});

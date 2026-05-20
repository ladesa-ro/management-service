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
  type HorarioEstagioInputGraphQlDto,
} from "./estagio.graphql.dto";

export const findOneInputDtoToFindOneQuery = createMapper<string, EstagioFindOneQuery>((id) => {
  const input = new EstagioFindOneQuery();
  input.id = id;
  return input;
});

const listInputMapper = createPaginatedInputMapper<EstagioListInputGraphQlDto, EstagioListQuery>(
  EstagioListQuery,
  (dto, query) => {
    into(query).field("filterEmpresaId").from(dto, "filterEmpresaId");
    into(query).field("filterEstagiarioId").from(dto, "filterEstagiarioId");
    into(query).field("filterStatus").from(dto, "filterStatus");
  },
);

export function listInputDtoToListQuery(
  dto: EstagioListInputGraphQlDto | null,
): EstagioListQuery | null {
  if (!dto) return null;
  return listInputMapper.map(dto);
}

function normalizeHorariosEstagio(
  horarios: HorarioEstagioInputGraphQlDto[] | null | undefined,
): { diaSemana: number; horaInicio: string | null; horaFim: string | null }[] | null | undefined {
  if (horarios === undefined) return undefined;
  if (horarios === null) return null;

  return horarios.map((horario) => ({
    diaSemana: horario.diaSemana,
    horaInicio: horario.horaInicio === "" ? null : (horario.horaInicio ?? null),
    horaFim: horario.horaFim === "" ? null : (horario.horaFim ?? null),
  }));
}

export const createInputDtoToCreateCommand = createMapper<
  EstagioCreateInputGraphQlDto,
  EstagioCreateCommand
>((dto) => ({
  empresa: { id: dto.empresa.id },
  CursoReferencia:
    dto.CursoReferencia === undefined
      ? undefined
      : dto.CursoReferencia === null
        ? null
        : { id: dto.CursoReferencia.id },
  estagiario:
    dto.estagiario === undefined
      ? undefined
      : dto.estagiario === null
        ? null
        : { id: dto.estagiario.id },
  usuarioOrientador: dto.usuarioOrientador ? { id: dto.usuarioOrientador.id } : undefined,
  cargaHoraria: dto.cargaHoraria,
  dataInicio: dto.dataInicio,
  dataFim: dto.dataFim,
  status: dto.status as EstagioStatus | undefined,
  nomeSupervisor: dto.nomeSupervisor,
  emailSupervisor: dto.emailSupervisor,
  telefoneSupervisor: dto.telefoneSupervisor,
  aditivo: dto.aditivo,
  tipoAditivo: dto.tipoAditivo,
  horariosEstagio: normalizeHorariosEstagio(dto.horariosEstagio),
}));

export const updateInputDtoToUpdateCommand = createMapper<
  { id: string; dto: EstagioUpdateInputGraphQlDto },
  EstagioFindOneQuery & EstagioUpdateCommand
>(({ id, dto }) => ({
  id,
  empresa: dto.empresa ? { id: dto.empresa.id } : undefined,
  CursoReferencia:
    dto.CursoReferencia === undefined
      ? undefined
      : dto.CursoReferencia === null
        ? null
        : { id: dto.CursoReferencia.id },
  estagiario:
    dto.estagiario === undefined
      ? undefined
      : dto.estagiario === null
        ? null
        : { id: dto.estagiario.id },
  usuarioOrientador: dto.usuarioOrientador ? { id: dto.usuarioOrientador.id } : undefined,
  cargaHoraria: dto.cargaHoraria,
  dataInicio: dto.dataInicio,
  dataFim: dto.dataFim,
  status: dto.status as EstagioStatus | undefined,
  nomeSupervisor: dto.nomeSupervisor,
  emailSupervisor: dto.emailSupervisor,
  telefoneSupervisor: dto.telefoneSupervisor,
  aditivo: dto.aditivo,
  tipoAditivo: dto.tipoAditivo,
  horariosEstagio: normalizeHorariosEstagio(dto.horariosEstagio),
}));

export const findOneQueryResultToOutputDto = createMapper<
  EstagioFindOneQueryResult,
  EstagioFindOneOutputGraphQlDto
>((output) => ({
  id: output.id,
  empresa: output.empresa,
  CursoReferencia: output.CursoReferencia,
  estagiario: output.estagiario,
  usuarioOrientador: output.usuarioOrientador,
  cargaHoraria: output.cargaHoraria,
  dataInicio: output.dataInicio,
  dataFim: output.dataFim,
  status: output.status,
  nomeSupervisor: output.nomeSupervisor,
  emailSupervisor: output.emailSupervisor,
  telefoneSupervisor: output.telefoneSupervisor,
  aditivo: output.aditivo,
  tipoAditivo: output.tipoAditivo,
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
  const pagination = data as unknown as {
    meta: {
      itemsPerPage: number;
      totalItems: number;
      currentPage: number;
      totalPages: number;
      search?: string | null;
      sortBy?: [string, string][] | null;
    };
  };

  const output = new EstagioListOutputGraphQlDto();
  output.meta = {
    itemsPerPage: pagination.meta.itemsPerPage,
    totalItems: pagination.meta.totalItems,
    currentPage: pagination.meta.currentPage,
    totalPages: pagination.meta.totalPages,
    search: pagination.meta.search ?? "",
    sortBy: pagination.meta.sortBy ?? [],
  };
  output.data = findOneQueryResultToOutputDto.mapArray(data.data);
  return output;
});

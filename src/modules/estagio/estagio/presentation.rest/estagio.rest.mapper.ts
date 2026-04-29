import type {
  EstagioCreateCommand,
  EstagioUpdateCommand,
} from "@/modules/estagio/estagio/domain/commands";
import type { EstagioStatus } from "@/modules/estagio/estagio/domain/estagio";
import type {
  EstagioFindOneQuery,
  EstagioFindOneQueryResult,
  EstagioListQuery,
  EstagioListQueryResult,
} from "@/modules/estagio/estagio/domain/queries";
import { createMapper, into } from "@/shared/mapping";
import type {
  EstagioCreateInputRestDto,
  EstagioFindOneInputRestDto,
  EstagioFindOneOutputRestDto,
  EstagioListInputRestDto,
  EstagioListOutputRestDto,
  EstagioUpdateInputRestDto,
} from "./estagio.rest.dto";

// ============================================================================
// Externa → Interna (Input: Presentation → Core)
// ============================================================================

export const findOneInputDtoToFindOneQuery = createMapper<
  EstagioFindOneInputRestDto,
  EstagioFindOneQuery
>((dto) => ({
  id: dto.id,
}));

export const listInputDtoToListQuery = createMapper<EstagioListInputRestDto, EstagioListQuery>(
  (dto) => {
    const query: EstagioListQuery = {
      page: dto.page,
      limit: dto.limit,
      search: dto.search,
    };

    into(query).field("filterEmpresaId").from(dto, "filter.empresa.id");

    into(query).field("filterEstagiarioId").from(dto, "filter.estagiario.id");

    into(query).field("filterStatus").from(dto, "filter.status");

    return query;
  },
);

export const createInputDtoToCreateCommand = createMapper<
  EstagioCreateInputRestDto,
  EstagioCreateCommand
>((dto) => ({
  empresa: dto.empresa,
  estagiario: dto.estagiario,
  usuarioOrientador: dto.usuarioOrientador,
  cargaHoraria: dto.cargaHoraria,
  dataInicio: dto.dataInicio,
  dataFim: dto.dataFim,
  status: dto.status as EstagioStatus | undefined,
  nomeSupervisor: dto.nomeSupervisor,
  emailSupervisor: dto.emailSupervisor,
  telefoneSupervisor: dto.telefoneSupervisor,
  aditivo: dto.aditivo,
  tipoAditivo: dto.tipoAditivo,
  horariosEstagio: dto.horariosEstagio,
}));

export const updateInputDtoToUpdateCommand = createMapper<
  EstagioUpdateInputRestDto,
  EstagioUpdateCommand
>((dto) => ({
  empresa: dto.empresa,
  estagiario: dto.estagiario,
  usuarioOrientador: dto.usuarioOrientador,
  cargaHoraria: dto.cargaHoraria,
  dataInicio: dto.dataInicio,
  dataFim: dto.dataFim,
  status: dto.status as EstagioStatus | undefined,
  nomeSupervisor: dto.nomeSupervisor,
  emailSupervisor: dto.emailSupervisor,
  telefoneSupervisor: dto.telefoneSupervisor,
  aditivo: dto.aditivo,
  tipoAditivo: dto.tipoAditivo,
  horariosEstagio: dto.horariosEstagio,
}));

// ============================================================================
// Interna → Externa (Output: Core → Presentation)
// ============================================================================

export const findOneQueryResultToOutputDto = createMapper<
  EstagioFindOneQueryResult,
  EstagioFindOneOutputRestDto
>((data) => ({
  id: data.id,
  empresa: data.empresa,
  estagiario: data.estagiario,
  usuarioOrientador: data.usuarioOrientador,
  cargaHoraria: data.cargaHoraria,
  dataInicio: data.dataInicio,
  dataFim: data.dataFim,
  status: data.status,
  nomeSupervisor: data.nomeSupervisor,
  emailSupervisor: data.emailSupervisor,
  telefoneSupervisor: data.telefoneSupervisor,
  aditivo: data.aditivo,
  tipoAditivo: data.tipoAditivo,
  horariosEstagio: data.horariosEstagio,
  ativo: data.ativo,
  dateCreated: data.dateCreated,
  dateUpdated: data.dateUpdated,
}));

export const listQueryResultToListOutputDto = createMapper<
  EstagioListQueryResult,
  EstagioListOutputRestDto
>((data) => ({
  data: findOneQueryResultToOutputDto.mapArray(data.data),
  total: data.total,
  page: data.page,
  limit: data.limit,
}));

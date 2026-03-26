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
import { createMapper, mapField } from "@/shared/mapping";
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

export const toFindOneInput = createMapper<EstagioFindOneInputRestDto, EstagioFindOneQuery>(
  (dto) => ({
    id: dto.id,
  }),
);

export const toListInput = createMapper<EstagioListInputRestDto, EstagioListQuery>((dto) => {
  const query: EstagioListQuery = {
    page: dto.page,
    limit: dto.limit,
    search: dto.search,
  };

  mapField(query, "filterEmpresaId", dto, "filter.empresa.id");
  mapField(query, "filterEstagiarioId", dto, "filter.estagiario.id");
  mapField(query, "filterStatus", dto, "filter.status");

  return query;
});

export const toCreateInput = createMapper<EstagioCreateInputRestDto, EstagioCreateCommand>(
  (dto) => ({
    empresa: dto.empresa,
    estagiario: dto.estagiario,
    cargaHoraria: dto.cargaHoraria,
    dataInicio: dto.dataInicio,
    dataFim: dto.dataFim,
    status: dto.status as EstagioStatus | undefined,
    horariosEstagio: dto.horariosEstagio,
  }),
);

export const toUpdateInput = createMapper<EstagioUpdateInputRestDto, EstagioUpdateCommand>(
  (dto) => ({
    empresa: dto.empresa,
    estagiario: dto.estagiario,
    cargaHoraria: dto.cargaHoraria,
    dataInicio: dto.dataInicio,
    dataFim: dto.dataFim,
    status: dto.status as EstagioStatus | undefined,
    horariosEstagio: dto.horariosEstagio,
  }),
);

// ============================================================================
// Interna → Externa (Output: Core → Presentation)
// ============================================================================

export const toFindOneOutput = createMapper<EstagioFindOneQueryResult, EstagioFindOneOutputRestDto>(
  (data) => ({
    id: data.id,
    empresa: data.empresa,
    estagiario: data.estagiario,
    cargaHoraria: data.cargaHoraria,
    dataInicio: data.dataInicio,
    dataFim: data.dataFim,
    status: data.status,
    horariosEstagio: data.horariosEstagio,
    ativo: data.ativo,
    dateCreated: data.dateCreated,
    dateUpdated: data.dateUpdated,
  }),
);

export const toListOutput = createMapper<EstagioListQueryResult, EstagioListOutputRestDto>(
  (data) => ({
    data: toFindOneOutput.mapArray(data.data),
    total: data.total,
    page: data.page,
    limit: data.limit,
  }),
);

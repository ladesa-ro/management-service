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
import {
  EstagioCreateInputRestDto,
  EstagioFindOneInputRestDto,
  EstagioFindOneOutputRestDto,
  EstagioListInputRestDto,
  EstagioListOutputRestDto,
  EstagioUpdateInputRestDto,
} from "./estagio.rest.dto";

export class EstagioRestMapper {
  static toCreateInput(dto: EstagioCreateInputRestDto): EstagioCreateCommand {
    return {
      empresa: dto.empresa,
      estagiario: dto.estagiario,
      cargaHoraria: dto.cargaHoraria,
      dataInicio: dto.dataInicio,
      dataFim: dto.dataFim,
      status: dto.status as EstagioStatus | undefined,
      horariosEstagio: dto.horariosEstagio,
    };
  }

  static toUpdateInput(dto: EstagioUpdateInputRestDto): EstagioUpdateCommand {
    return {
      empresa: dto.empresa,
      estagiario: dto.estagiario,
      cargaHoraria: dto.cargaHoraria,
      dataInicio: dto.dataInicio,
      dataFim: dto.dataFim,
      status: dto.status as EstagioStatus | undefined,
      horariosEstagio: dto.horariosEstagio,
    };
  }

  static toFindOneInput(dto: EstagioFindOneInputRestDto): EstagioFindOneQuery {
    return {
      id: dto.id,
    };
  }

  static toListInput(dto: EstagioListInputRestDto): EstagioListQuery {
    // Após validação Zod (coerceFilterArray), os filtros já são string[] | undefined
    return {
      page: dto.page,
      limit: dto.limit,
      search: dto.search,
      filterEmpresaId: dto["filter.empresa.id"] as string[] | undefined,
      filterEstagiarioId: dto["filter.estagiario.id"] as string[] | undefined,
      filterStatus: dto["filter.status"] as EstagioStatus[] | undefined,
    };
  }

  static toFindOneOutputDto(data: EstagioFindOneQueryResult): EstagioFindOneOutputRestDto {
    return {
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
    };
  }

  static toListOutputDto(data: EstagioListQueryResult): EstagioListOutputRestDto {
    return {
      data: data.data.map((item) => this.toFindOneOutputDto(item)),
      total: data.total,
      page: data.page,
      limit: data.limit,
    };
  }
}

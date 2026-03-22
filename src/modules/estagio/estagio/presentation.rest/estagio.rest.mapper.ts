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
    const normalizeArray = <T>(value: T | T[] | undefined): T[] | undefined => {
      if (!value) return undefined;
      const arr = Array.isArray(value) ? value : [value];
      return arr.length > 0 ? arr : undefined;
    };

    const normalizeStringArray = (value: string | string[] | undefined): string[] | undefined => {
      if (!value) return undefined;
      const arr = Array.isArray(value) ? value : [value];
      const filtered = arr.filter((item) => item && item.trim());
      return filtered.length > 0 ? filtered : undefined;
    };

    return {
      page: dto.page,
      limit: dto.limit,
      search: dto.search,
      filterEmpresaId: normalizeStringArray(dto["filter.empresa.id"]),
      filterEstagiarioId: normalizeStringArray(dto["filter.estagiario.id"]),
      filterStatus: normalizeArray(dto["filter.status"]) as EstagioStatus[] | undefined,
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

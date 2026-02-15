import {
  DiaCalendarioCreateInputDto,
  DiaCalendarioFindOneInputDto,
  DiaCalendarioFindOneOutputDto,
  DiaCalendarioListInputDto,
  DiaCalendarioListOutputDto,
  DiaCalendarioUpdateInputDto,
} from "@/modules/sisgha/dia-calendario";
import { CalendarioLetivoGraphqlMapper } from "@/server/nest/modules/calendario-letivo/graphql/calendario-letivo.graphql.mapper";
import { mapPaginationMeta } from "@/server/nest/shared/mappers";
import {
  DiaCalendarioCreateInputGraphQlDto,
  DiaCalendarioFindOneOutputGraphQlDto,
  DiaCalendarioListInputGraphQlDto,
  DiaCalendarioListOutputGraphQlDto,
  DiaCalendarioUpdateInputGraphQlDto,
} from "./dia-calendario.graphql.dto";

export class DiaCalendarioGraphqlMapper {
  static toListInput(
    dto: DiaCalendarioListInputGraphQlDto | null,
  ): DiaCalendarioListInputDto | null {
    if (!dto) {
      return null;
    }

    const input = new DiaCalendarioListInputDto();
    input.page = dto.page;
    input.limit = dto.limit;
    input.search = dto.search;
    input.sortBy = dto.sortBy;
    input["filter.id"] = dto.filterId;
    input["filter.calendario.id"] = dto.filterCalendarioId;
    return input;
  }

  static toFindOneInput(id: string, selection?: string[]): DiaCalendarioFindOneInputDto {
    const input = new DiaCalendarioFindOneInputDto();
    input.id = id;
    input.selection = selection;
    return input;
  }

  static toCreateInput(dto: DiaCalendarioCreateInputGraphQlDto): DiaCalendarioCreateInputDto {
    const input = new DiaCalendarioCreateInputDto();
    input.data = dto.data;
    input.diaLetivo = dto.diaLetivo;
    input.feriado = dto.feriado;
    input.diaPresencial = dto.diaPresencial;
    input.tipo = dto.tipo;
    input.extraCurricular = dto.extraCurricular;
    input.calendario = { id: dto.calendario.id };
    return input;
  }

  static toUpdateInput(
    id: string,
    dto: DiaCalendarioUpdateInputGraphQlDto,
  ): DiaCalendarioFindOneInputDto & DiaCalendarioUpdateInputDto {
    const input = new DiaCalendarioFindOneInputDto() as DiaCalendarioFindOneInputDto &
      DiaCalendarioUpdateInputDto;
    input.id = id;
    if (dto.data !== undefined) {
      input.data = dto.data;
    }
    if (dto.diaLetivo !== undefined) {
      input.diaLetivo = dto.diaLetivo;
    }
    if (dto.feriado !== undefined) {
      input.feriado = dto.feriado;
    }
    if (dto.diaPresencial !== undefined) {
      input.diaPresencial = dto.diaPresencial;
    }
    if (dto.tipo !== undefined) {
      input.tipo = dto.tipo;
    }
    if (dto.extraCurricular !== undefined) {
      input.extraCurricular = dto.extraCurricular;
    }
    if (dto.calendario !== undefined) {
      input.calendario = { id: dto.calendario.id };
    }
    return input;
  }

  static toFindOneOutputDto(
    output: DiaCalendarioFindOneOutputDto,
  ): DiaCalendarioFindOneOutputGraphQlDto {
    const dto = new DiaCalendarioFindOneOutputGraphQlDto();
    dto.id = output.id;
    dto.data = output.data as string;
    dto.diaLetivo = output.diaLetivo;
    dto.feriado = output.feriado;
    dto.diaPresencial = output.diaPresencial;
    dto.tipo = output.tipo;
    dto.extraCurricular = output.extraCurricular;
    dto.calendario = CalendarioLetivoGraphqlMapper.toFindOneOutputDto(output.calendario);
    dto.dateCreated = output.dateCreated as unknown as Date;
    dto.dateUpdated = output.dateUpdated as unknown as Date;
    dto.dateDeleted = output.dateDeleted as unknown as Date | null;
    return dto;
  }

  static toListOutputDto(output: DiaCalendarioListOutputDto): DiaCalendarioListOutputGraphQlDto {
    const dto = new DiaCalendarioListOutputGraphQlDto();
    dto.meta = mapPaginationMeta(output.meta);
    dto.data = output.data.map((item) => this.toFindOneOutputDto(item));
    return dto;
  }
}

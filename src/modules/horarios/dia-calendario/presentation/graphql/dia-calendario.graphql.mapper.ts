import { createListOutputMapper, mapDatedFields } from "@/modules/@shared/application/mappers";
import { CalendarioLetivoGraphqlMapper } from "@/modules/horarios/calendario-letivo/presentation/graphql/calendario-letivo.graphql.mapper";
import {
  DiaCalendarioCreateCommand,
  DiaCalendarioFindOneQuery,
  DiaCalendarioFindOneQueryResult,
  DiaCalendarioListQuery,
  DiaCalendarioUpdateCommand,
} from "@/modules/horarios/dia-calendario";
import {
  DiaCalendarioCreateInputGraphQlDto,
  DiaCalendarioFindOneOutputGraphQlDto,
  DiaCalendarioListInputGraphQlDto,
  DiaCalendarioListOutputGraphQlDto,
  DiaCalendarioUpdateInputGraphQlDto,
} from "./dia-calendario.graphql.dto";

export class DiaCalendarioGraphqlMapper {
  static toListInput(dto: DiaCalendarioListInputGraphQlDto | null): DiaCalendarioListQuery | null {
    if (!dto) {
      return null;
    }

    const input = new DiaCalendarioListQuery();
    input.page = dto.page;
    input.limit = dto.limit;
    input.search = dto.search;
    input.sortBy = dto.sortBy;
    input["filter.id"] = dto.filterId;
    input["filter.calendario.id"] = dto.filterCalendarioId;
    return input;
  }

  static toFindOneInput(id: string, selection?: string[]): DiaCalendarioFindOneQuery {
    const input = new DiaCalendarioFindOneQuery();
    input.id = id;
    input.selection = selection;
    return input;
  }

  static toCreateInput(dto: DiaCalendarioCreateInputGraphQlDto): DiaCalendarioCreateCommand {
    const input = new DiaCalendarioCreateCommand();
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
  ): DiaCalendarioFindOneQuery & DiaCalendarioUpdateCommand {
    const input = new DiaCalendarioFindOneQuery() as DiaCalendarioFindOneQuery &
      DiaCalendarioUpdateCommand;
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
    output: DiaCalendarioFindOneQueryResult,
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
    mapDatedFields(dto, output);
    return dto;
  }

  static toListOutputDto = createListOutputMapper(
    DiaCalendarioListOutputGraphQlDto,
    DiaCalendarioGraphqlMapper.toFindOneOutputDto,
  );
}

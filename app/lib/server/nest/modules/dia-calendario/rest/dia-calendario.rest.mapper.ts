import {
  DiaCalendarioCreateInput,
  DiaCalendarioFindOneInput,
  DiaCalendarioFindOneOutput,
  DiaCalendarioListInput,
  DiaCalendarioListOutput,
  DiaCalendarioUpdateInput,
} from "@/modules/dia-calendario";
import { mapPaginationMeta } from "@/server/nest/shared/mappers";
import {
  DiaCalendarioCreateInputDto,
  DiaCalendarioFindOneInputDto,
  DiaCalendarioFindOneOutputDto,
  DiaCalendarioListInputDto,
  DiaCalendarioListOutputDto,
  DiaCalendarioUpdateInputDto,
} from "./dia-calendario.rest.dto";

export class DiaCalendarioRestMapper {
  static toFindOneInput(dto: DiaCalendarioFindOneInputDto): DiaCalendarioFindOneInput {
    const input = new DiaCalendarioFindOneInput();
    input.id = dto.id;
    return input;
  }

  static toListInput(dto: DiaCalendarioListInputDto | null): DiaCalendarioListInput | null {
    if (!dto) {
      return null;
    }

    const input = new DiaCalendarioListInput();
    input.page = dto.page;
    input.limit = dto.limit;
    input.search = dto.search;
    input.sortBy = dto.sortBy;
    input.selection = dto.selection;
    input["filter.id"] = dto["filter.id"];
    input["filter.calendario.id"] = dto["filter.calendario.id"];
    return input;
  }

  static toCreateInput(dto: DiaCalendarioCreateInputDto): DiaCalendarioCreateInput {
    const input = new DiaCalendarioCreateInput();
    input.data = dto.data;
    input.diaLetivo = dto.diaLetivo;
    input.feriado = dto.feriado ?? "";
    input.diaPresencial = dto.diaPresencial;
    input.tipo = dto.tipo;
    input.extraCurricular = dto.extraCurricular;
    input.calendario = { id: dto.calendario.id };
    return input;
  }

  static toUpdateInput(
    params: DiaCalendarioFindOneInputDto,
    dto: DiaCalendarioUpdateInputDto,
  ): DiaCalendarioFindOneInput & DiaCalendarioUpdateInput {
    const input = new DiaCalendarioFindOneInput() as DiaCalendarioFindOneInput &
      DiaCalendarioUpdateInput;
    input.id = params.id;
    if (dto.data !== undefined) {
      input.data = dto.data;
    }
    if (dto.diaLetivo !== undefined) {
      input.diaLetivo = dto.diaLetivo;
    }
    if (dto.feriado !== undefined) {
      input.feriado = dto.feriado ?? "";
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

  static toFindOneOutputDto(output: DiaCalendarioFindOneOutput): DiaCalendarioFindOneOutputDto {
    const dto = new DiaCalendarioFindOneOutputDto();
    dto.id = output.id;
    dto.data = output.data;
    dto.diaLetivo = output.diaLetivo;
    dto.feriado = output.feriado;
    dto.diaPresencial = output.diaPresencial;
    dto.tipo = output.tipo as any;
    dto.extraCurricular = output.extraCurricular;
    dto.calendario = output.calendario as any;
    dto.dateCreated = output.dateCreated ? new Date(output.dateCreated) : new Date();
    dto.dateUpdated = output.dateUpdated ? new Date(output.dateUpdated) : new Date();
    dto.dateDeleted = output.dateDeleted ? new Date(output.dateDeleted) : null;
    return dto;
  }

  static toListOutputDto(output: DiaCalendarioListOutput): DiaCalendarioListOutputDto {
    const dto = new DiaCalendarioListOutputDto();
    dto.meta = mapPaginationMeta(output.meta);
    dto.data = output.data.map((item) => this.toFindOneOutputDto(item));
    return dto;
  }
}

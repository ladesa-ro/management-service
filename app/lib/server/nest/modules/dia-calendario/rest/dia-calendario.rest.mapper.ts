import {
  DiaCalendarioCreateInputDto,
  DiaCalendarioFindOneInputDto,
  DiaCalendarioFindOneOutputDto,
  DiaCalendarioListInputDto,
  DiaCalendarioUpdateInputDto,
} from "@/modules/sisgha/dia-calendario";
import { CalendarioLetivoRestMapper } from "@/server/nest/modules/calendario-letivo/rest";
import {
  createFindOneInputMapper,
  createListInputMapper,
  createListOutputMapper,
} from "@/server/nest/shared/mappers";
import {
  DiaCalendarioCreateInputRestDto,
  DiaCalendarioFindOneInputRestDto,
  DiaCalendarioFindOneOutputRestDto,
  DiaCalendarioListOutputRestDto,
  DiaCalendarioUpdateInputRestDto,
  type TipoDiaCalendario,
} from "./dia-calendario.rest.dto";

export class DiaCalendarioRestMapper {
  static toFindOneInput = createFindOneInputMapper(DiaCalendarioFindOneInputDto);

  static toListInput = createListInputMapper(DiaCalendarioListInputDto, [
    "filter.id",
    "filter.calendario.id",
  ]);

  static toCreateInput(dto: DiaCalendarioCreateInputRestDto): DiaCalendarioCreateInputDto {
    const input = new DiaCalendarioCreateInputDto();
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
    params: DiaCalendarioFindOneInputRestDto,
    dto: DiaCalendarioUpdateInputRestDto,
  ): DiaCalendarioFindOneInputDto & DiaCalendarioUpdateInputDto {
    const input = new DiaCalendarioFindOneInputDto() as DiaCalendarioFindOneInputDto &
      DiaCalendarioUpdateInputDto;
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

  static toFindOneOutputDto(
    output: DiaCalendarioFindOneOutputDto,
  ): DiaCalendarioFindOneOutputRestDto {
    const dto = new DiaCalendarioFindOneOutputRestDto();
    dto.id = output.id;
    dto.data = output.data;
    dto.diaLetivo = output.diaLetivo;
    dto.feriado = output.feriado;
    dto.diaPresencial = output.diaPresencial;
    dto.tipo = output.tipo as TipoDiaCalendario;
    dto.extraCurricular = output.extraCurricular;
    dto.calendario = CalendarioLetivoRestMapper.toFindOneOutputDto(output.calendario);
    dto.dateCreated = output.dateCreated ? new Date(output.dateCreated) : new Date();
    dto.dateUpdated = output.dateUpdated ? new Date(output.dateUpdated) : new Date();
    dto.dateDeleted = output.dateDeleted ? new Date(output.dateDeleted) : null;
    return dto;
  }

  static toListOutputDto = createListOutputMapper(
    DiaCalendarioListOutputRestDto,
    DiaCalendarioRestMapper.toFindOneOutputDto,
  );
}

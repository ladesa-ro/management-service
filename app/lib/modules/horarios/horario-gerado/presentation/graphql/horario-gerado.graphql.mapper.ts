import { CalendarioLetivoGraphqlMapper } from "@/modules/horarios/calendario-letivo/presentation/graphql/calendario-letivo.graphql.mapper";
import {
  HorarioGeradoCreateInputDto,
  HorarioGeradoFindOneInputDto,
  HorarioGeradoFindOneOutputDto,
  HorarioGeradoListInputDto,
  HorarioGeradoUpdateInputDto,
} from "@/modules/horarios/horario-gerado";
import {
  createFindOneInputMapper,
  createListOutputMapper,
  mapDatedFields,
} from "@/modules/@shared/application/mappers";
import {
  HorarioGeradoCreateInputGraphQlDto,
  HorarioGeradoFindOneOutputGraphQlDto,
  HorarioGeradoListInputGraphQlDto,
  HorarioGeradoListOutputGraphQlDto,
  HorarioGeradoUpdateInputGraphQlDto,
} from "./horario-gerado.graphql.dto";

export class HorarioGeradoGraphqlMapper {
  static toListInput(
    dto: HorarioGeradoListInputGraphQlDto | null,
  ): HorarioGeradoListInputDto | null {
    if (!dto) {
      return null;
    }

    const input = new HorarioGeradoListInputDto();
    input.page = dto.page;
    input.limit = dto.limit;
    input.search = dto.search;
    input.sortBy = dto.sortBy;
    input["filter.id"] = dto.filterId;
    input["filter.calendario.id"] = dto.filterCalendarioId;
    return input;
  }

  static toFindOneInput = createFindOneInputMapper(HorarioGeradoFindOneInputDto);

  static toCreateInput(dto: HorarioGeradoCreateInputGraphQlDto): HorarioGeradoCreateInputDto {
    const input = new HorarioGeradoCreateInputDto();
    input.status = dto.status ?? null;
    input.tipo = dto.tipo ?? null;
    input.dataGeracao = dto.dataGeracao ?? null;
    input.vigenciaInicio = dto.vigenciaInicio ?? null;
    input.vigenciaFim = dto.vigenciaFim ?? null;
    input.calendario = { id: dto.calendario.id };
    return input;
  }

  static toUpdateInput(
    id: string,
    dto: HorarioGeradoUpdateInputGraphQlDto,
  ): HorarioGeradoFindOneInputDto & HorarioGeradoUpdateInputDto {
    const input = new HorarioGeradoFindOneInputDto() as HorarioGeradoFindOneInputDto &
      HorarioGeradoUpdateInputDto;
    input.id = id;
    if (dto.status !== undefined) {
      input.status = dto.status;
    }
    if (dto.tipo !== undefined) {
      input.tipo = dto.tipo;
    }
    if (dto.dataGeracao !== undefined) {
      input.dataGeracao = dto.dataGeracao;
    }
    if (dto.vigenciaInicio !== undefined) {
      input.vigenciaInicio = dto.vigenciaInicio;
    }
    if (dto.vigenciaFim !== undefined) {
      input.vigenciaFim = dto.vigenciaFim;
    }
    if (dto.calendario !== undefined) {
      input.calendario = { id: dto.calendario.id };
    }
    return input;
  }

  static toFindOneOutputDto(
    output: HorarioGeradoFindOneOutputDto,
  ): HorarioGeradoFindOneOutputGraphQlDto {
    const dto = new HorarioGeradoFindOneOutputGraphQlDto();
    dto.id = output.id;
    dto.status = output.status;
    dto.tipo = output.tipo;
    dto.dataGeracao = output.dataGeracao as string | null;
    dto.vigenciaInicio = output.vigenciaInicio as string | null;
    dto.vigenciaFim = output.vigenciaFim as string | null;
    dto.calendario = CalendarioLetivoGraphqlMapper.toFindOneOutputDto(output.calendario);
    mapDatedFields(dto, output);
    return dto;
  }

  static toListOutputDto = createListOutputMapper(
    HorarioGeradoListOutputGraphQlDto,
    HorarioGeradoGraphqlMapper.toFindOneOutputDto,
  );
}

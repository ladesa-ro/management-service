import {
  createFindOneInputMapper,
  createListOutputMapper,
  mapDatedFields,
} from "@/Ladesa.Management.Application/@shared/application/mappers";
import {
  HorarioGeradoCreateInputDto,
  HorarioGeradoFindOneInputDto,
  HorarioGeradoFindOneOutputDto,
  HorarioGeradoListInputDto,
  HorarioGeradoUpdateInputDto,
} from "@/Ladesa.Management.Application/horarios/horario-gerado";
import {
  HorarioGeradoCreateInputGraphQlDto,
  HorarioGeradoFindOneOutputGraphQlDto,
  HorarioGeradoListInputGraphQlDto,
  HorarioGeradoListOutputGraphQlDto,
  HorarioGeradoUpdateInputGraphQlDto,
} from "@/Ladesa.Management.Server.Api/Apis/GraphQl/Dtos/HorarioGeradoGraphqlDto";
import { CalendarioLetivoGraphqlMapper } from "@/Ladesa.Management.Server.Api/Apis/GraphQl/Mappers/CalendarioLetivoGraphqlMapper";

export class HorarioGeradoGraphqlMapper {
  static toFindOneInput = createFindOneInputMapper(HorarioGeradoFindOneInputDto);
  static toListOutputDto = createListOutputMapper(
    HorarioGeradoListOutputGraphQlDto,
    HorarioGeradoGraphqlMapper.toFindOneOutputDto,
  );

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
}

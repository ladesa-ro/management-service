import {
  HorarioGeradoCreateInput,
  HorarioGeradoFindOneInput,
  HorarioGeradoFindOneOutput,
  HorarioGeradoListInput,
  HorarioGeradoListOutput,
  HorarioGeradoUpdateInput,
} from "@/modules/horario-gerado";
import { mapPaginationMeta } from "@/server/nest/shared/mappers";
import {
  HorarioGeradoCreateInputRestDto,
  HorarioGeradoFindOneOutputRestDto,
  HorarioGeradoUpdateInputRestDto,
} from "../rest/horario-gerado.rest.dto";
import {
  HorarioGeradoListInputGqlDto,
  HorarioGeradoListOutputGqlDto,
} from "./horario-gerado.graphql.dto";

export class HorarioGeradoGraphqlMapper {
  static toListInput(dto: HorarioGeradoListInputGqlDto | null): HorarioGeradoListInput | null {
    if (!dto) {
      return null;
    }

    const input = new HorarioGeradoListInput();
    input.page = dto.page;
    input.limit = dto.limit;
    input.search = dto.search;
    input.sortBy = dto.sortBy;
    input["filter.id"] = dto.filterId;
    input["filter.calendario.id"] = dto.filterCalendarioId;
    return input;
  }

  static toFindOneInput(id: string, selection?: string[]): HorarioGeradoFindOneInput {
    const input = new HorarioGeradoFindOneInput();
    input.id = id;
    input.selection = selection;
    return input;
  }

  private static dateToString(date: Date | null | undefined): string | null | undefined {
    if (date === undefined) return undefined;
    if (date === null) return null;
    return date instanceof Date ? date.toISOString() : date;
  }

  static toCreateInput(dto: HorarioGeradoCreateInputRestDto): HorarioGeradoCreateInput {
    const input = new HorarioGeradoCreateInput();
    input.status = dto.status;
    input.tipo = dto.tipo;
    input.dataGeracao = this.dateToString(dto.dataGeracao);
    input.vigenciaInicio = this.dateToString(dto.vigenciaInicio);
    input.vigenciaFim = this.dateToString(dto.vigenciaFim);
    input.calendario = dto.calendario;
    return input;
  }

  static toUpdateInput(
    id: string,
    dto: HorarioGeradoUpdateInputRestDto,
  ): HorarioGeradoFindOneInput & HorarioGeradoUpdateInput {
    const input = new HorarioGeradoFindOneInput() as HorarioGeradoFindOneInput &
      HorarioGeradoUpdateInput;
    input.id = id;
    if (dto.status !== undefined) {
      input.status = dto.status;
    }
    if (dto.tipo !== undefined) {
      input.tipo = dto.tipo;
    }
    if (dto.dataGeracao !== undefined) {
      input.dataGeracao = this.dateToString(dto.dataGeracao);
    }
    if (dto.vigenciaInicio !== undefined) {
      input.vigenciaInicio = this.dateToString(dto.vigenciaInicio);
    }
    if (dto.vigenciaFim !== undefined) {
      input.vigenciaFim = this.dateToString(dto.vigenciaFim);
    }
    if (dto.calendario !== undefined) {
      input.calendario = dto.calendario;
    }
    return input;
  }

  static toFindOneOutputDto(output: HorarioGeradoFindOneOutput): HorarioGeradoFindOneOutputRestDto {
    return output as unknown as HorarioGeradoFindOneOutputRestDto;
  }

  static toListOutputDto(output: HorarioGeradoListOutput): HorarioGeradoListOutputGqlDto {
    const dto = new HorarioGeradoListOutputGqlDto();
    dto.meta = mapPaginationMeta(output.meta);
    dto.data = output.data.map((item) => this.toFindOneOutputDto(item));
    return dto;
  }
}

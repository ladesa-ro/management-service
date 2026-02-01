import {
  HorarioGeradoAulaCreateInput,
  HorarioGeradoAulaFindOneInput,
  HorarioGeradoAulaFindOneOutput,
  HorarioGeradoAulaListInput,
  HorarioGeradoAulaListOutput,
  HorarioGeradoAulaUpdateInput,
} from "@/modules/horario-gerado-aula";
import {
  HorarioGeradoAulaCreateInputRestDto,
  HorarioGeradoAulaFindOneOutputRestDto,
  HorarioGeradoAulaUpdateInputRestDto,
} from "../rest/horario-gerado-aula.rest.dto";
import {
  HorarioGeradoAulaListInputGqlDto,
  HorarioGeradoAulaListOutputGqlDto,
} from "./horario-gerado-aula.graphql.dto";

export class HorarioGeradoAulaGraphqlMapper {
  static toListInput(
    dto: HorarioGeradoAulaListInputGqlDto | null,
  ): HorarioGeradoAulaListInput | null {
    if (!dto) {
      return null;
    }

    const input = new HorarioGeradoAulaListInput();
    input.page = dto.page;
    input.limit = dto.limit;
    input.search = dto.search;
    input.sortBy = dto.sortBy;
    input["filter.id"] = dto.filterId;
    input["filter.horarioGerado.id"] = dto.filterHorarioGeradoId;
    return input;
  }

  static toFindOneInput(id: string, selection?: string[]): HorarioGeradoAulaFindOneInput {
    const input = new HorarioGeradoAulaFindOneInput();
    input.id = id;
    input.selection = selection;
    return input;
  }

  private static dateToString(date: Date | string | undefined): string | undefined {
    if (date === undefined) return undefined;
    return date instanceof Date ? date.toISOString() : date;
  }

  static toCreateInput(dto: HorarioGeradoAulaCreateInputRestDto): HorarioGeradoAulaCreateInput {
    const input = new HorarioGeradoAulaCreateInput();
    input.data = this.dateToString(dto.data) as string;
    input.intervaloDeTempo = dto.intervaloDeTempo;
    input.diarioProfessor = dto.diarioProfessor;
    input.horarioGerado = dto.horarioGerado;
    return input;
  }

  static toUpdateInput(
    id: string,
    dto: HorarioGeradoAulaUpdateInputRestDto,
  ): HorarioGeradoAulaFindOneInput & HorarioGeradoAulaUpdateInput {
    const input = new HorarioGeradoAulaFindOneInput() as HorarioGeradoAulaFindOneInput &
      HorarioGeradoAulaUpdateInput;
    input.id = id;
    if (dto.data !== undefined) {
      input.data = this.dateToString(dto.data);
    }
    if (dto.intervaloDeTempo !== undefined) {
      input.intervaloDeTempo = dto.intervaloDeTempo;
    }
    if (dto.diarioProfessor !== undefined) {
      input.diarioProfessor = dto.diarioProfessor;
    }
    if (dto.horarioGerado !== undefined) {
      input.horarioGerado = dto.horarioGerado;
    }
    return input;
  }

  static toFindOneOutputDto(
    output: HorarioGeradoAulaFindOneOutput,
  ): HorarioGeradoAulaFindOneOutputRestDto {
    return output as any;
  }

  static toListOutputDto(output: HorarioGeradoAulaListOutput): HorarioGeradoAulaListOutputGqlDto {
    const dto = new HorarioGeradoAulaListOutputGqlDto();
    dto.meta = {
      currentPage: output.meta.currentPage,
      totalPages: output.meta.totalPages,
      itemsPerPage: output.meta.itemsPerPage,
      totalItems: output.meta.totalItems,
      sortBy: output.meta.sortBy,
      filter: output.meta.filter,
      search: output.meta.search,
    };
    dto.data = output.data.map((item) => this.toFindOneOutputDto(item));
    return dto;
  }
}

import {
  HorarioGeradoAulaCreateInputDto,
  HorarioGeradoAulaFindOneInputDto,
  HorarioGeradoAulaFindOneOutputDto,
  HorarioGeradoAulaListInputDto,
  HorarioGeradoAulaListOutputDto,
  HorarioGeradoAulaUpdateInputDto,
} from "@/modules/horario-gerado-aula";
import { IntervaloDeTempoGraphqlMapper } from "@/server/nest/modules/intervalo-de-tempo/graphql/intervalo-de-tempo.graphql.mapper";
import { mapPaginationMeta } from "@/server/nest/shared/mappers";
import {
  HorarioGeradoAulaCreateInputGraphQlDto,
  HorarioGeradoAulaDiarioProfessorOutputGraphQlDto,
  HorarioGeradoAulaFindOneOutputGraphQlDto,
  HorarioGeradoAulaHorarioGeradoOutputGraphQlDto,
  HorarioGeradoAulaListInputGraphQlDto,
  HorarioGeradoAulaListOutputGraphQlDto,
  HorarioGeradoAulaUpdateInputGraphQlDto,
} from "./horario-gerado-aula.graphql.dto";

export class HorarioGeradoAulaGraphqlMapper {
  static toListInput(
    dto: HorarioGeradoAulaListInputGraphQlDto | null,
  ): HorarioGeradoAulaListInputDto | null {
    if (!dto) {
      return null;
    }

    const input = new HorarioGeradoAulaListInputDto();
    input.page = dto.page;
    input.limit = dto.limit;
    input.search = dto.search;
    input.sortBy = dto.sortBy;
    input["filter.id"] = dto.filterId;
    input["filter.horarioGerado.id"] = dto.filterHorarioGeradoId;
    return input;
  }

  static toFindOneInput(id: string, selection?: string[]): HorarioGeradoAulaFindOneInputDto {
    const input = new HorarioGeradoAulaFindOneInputDto();
    input.id = id;
    input.selection = selection;
    return input;
  }

  private static dateToString(date: Date | string | undefined): string | undefined {
    if (date === undefined) return undefined;
    return date instanceof Date ? date.toISOString() : date;
  }

  static toCreateInput(
    dto: HorarioGeradoAulaCreateInputGraphQlDto,
  ): HorarioGeradoAulaCreateInputDto {
    const input = new HorarioGeradoAulaCreateInputDto();
    input.data = this.dateToString(dto.data) as string;
    input.intervaloDeTempo = { id: dto.intervaloDeTempo.id };
    input.diarioProfessor = { id: dto.diarioProfessor.id };
    input.horarioGerado = { id: dto.horarioGerado.id };
    return input;
  }

  static toUpdateInput(
    id: string,
    dto: HorarioGeradoAulaUpdateInputGraphQlDto,
  ): HorarioGeradoAulaFindOneInputDto & HorarioGeradoAulaUpdateInputDto {
    const input = new HorarioGeradoAulaFindOneInputDto() as HorarioGeradoAulaFindOneInputDto &
      HorarioGeradoAulaUpdateInputDto;
    input.id = id;
    if (dto.data !== undefined) {
      input.data = this.dateToString(dto.data);
    }
    if (dto.intervaloDeTempo !== undefined) {
      input.intervaloDeTempo = { id: dto.intervaloDeTempo.id };
    }
    if (dto.diarioProfessor !== undefined) {
      input.diarioProfessor = { id: dto.diarioProfessor.id };
    }
    if (dto.horarioGerado !== undefined) {
      input.horarioGerado = { id: dto.horarioGerado.id };
    }
    return input;
  }

  static toFindOneOutputDto(
    output: HorarioGeradoAulaFindOneOutputDto,
  ): HorarioGeradoAulaFindOneOutputGraphQlDto {
    const dto = new HorarioGeradoAulaFindOneOutputGraphQlDto();
    dto.id = output.id;
    dto.data = output.data as unknown as Date;
    dto.diarioProfessor =
      output.diarioProfessor as unknown as HorarioGeradoAulaDiarioProfessorOutputGraphQlDto;
    dto.horarioGerado =
      output.horarioGerado as unknown as HorarioGeradoAulaHorarioGeradoOutputGraphQlDto;
    dto.intervaloDeTempo = IntervaloDeTempoGraphqlMapper.toFindOneOutputDto(
      output.intervaloDeTempo,
    );
    dto.dateCreated = output.dateCreated as unknown as Date;
    dto.dateUpdated = output.dateUpdated as unknown as Date;
    dto.dateDeleted = output.dateDeleted as unknown as Date | null;
    return dto;
  }

  static toListOutputDto(
    output: HorarioGeradoAulaListOutputDto,
  ): HorarioGeradoAulaListOutputGraphQlDto {
    const dto = new HorarioGeradoAulaListOutputGraphQlDto();
    dto.meta = mapPaginationMeta(output.meta);
    dto.data = output.data.map((item) => this.toFindOneOutputDto(item));
    return dto;
  }
}

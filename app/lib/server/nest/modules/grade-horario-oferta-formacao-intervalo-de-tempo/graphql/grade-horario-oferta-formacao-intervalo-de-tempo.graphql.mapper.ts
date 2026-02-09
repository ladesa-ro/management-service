import {
  GradeHorarioOfertaFormacaoIntervaloDeTempoCreateInputDto,
  GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneInputDto,
  GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputDto,
  GradeHorarioOfertaFormacaoIntervaloDeTempoListInputDto,
  GradeHorarioOfertaFormacaoIntervaloDeTempoListOutputDto,
  GradeHorarioOfertaFormacaoIntervaloDeTempoUpdateInputDto,
} from "@/modules/grade-horario-oferta-formacao-intervalo-de-tempo";
import { IntervaloDeTempoGraphqlMapper } from "@/server/nest/modules/intervalo-de-tempo/graphql/intervalo-de-tempo.graphql.mapper";
import { mapPaginationMeta } from "@/server/nest/shared/mappers";
import {
  GradeHorarioOfertaFormacaoIntervaloDeTempoCreateInputGraphQlDto,
  GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputGraphQlDto,
  GradeHorarioOfertaFormacaoIntervaloDeTempoGradeHorarioOfertaFormacaoOutputGraphQlDto,
  GradeHorarioOfertaFormacaoIntervaloDeTempoListInputGraphQlDto,
  GradeHorarioOfertaFormacaoIntervaloDeTempoListOutputGraphQlDto,
  GradeHorarioOfertaFormacaoIntervaloDeTempoUpdateInputGraphQlDto,
} from "./grade-horario-oferta-formacao-intervalo-de-tempo.graphql.dto";

export class GradeHorarioOfertaFormacaoIntervaloDeTempoGraphqlMapper {
  static toListInput(
    dto: GradeHorarioOfertaFormacaoIntervaloDeTempoListInputGraphQlDto | null,
  ): GradeHorarioOfertaFormacaoIntervaloDeTempoListInputDto | null {
    if (!dto) {
      return null;
    }

    const input = new GradeHorarioOfertaFormacaoIntervaloDeTempoListInputDto();
    input.page = dto.page;
    input.limit = dto.limit;
    input.search = dto.search;
    input.sortBy = dto.sortBy;
    input["filter.id"] = dto.filterId;
    return input;
  }

  static toFindOneInput(
    id: string,
    selection?: string[],
  ): GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneInputDto {
    const input = new GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneInputDto();
    input.id = id;
    input.selection = selection;
    return input;
  }

  static toCreateInput(
    dto: GradeHorarioOfertaFormacaoIntervaloDeTempoCreateInputGraphQlDto,
  ): GradeHorarioOfertaFormacaoIntervaloDeTempoCreateInputDto {
    const input = new GradeHorarioOfertaFormacaoIntervaloDeTempoCreateInputDto();
    input.intervaloDeTempo = { id: dto.intervaloDeTempo.id };
    input.gradeHorarioOfertaFormacao = { id: dto.gradeHorarioOfertaFormacao.id };
    return input;
  }

  static toUpdateInput(
    dto: GradeHorarioOfertaFormacaoIntervaloDeTempoUpdateInputGraphQlDto,
  ): GradeHorarioOfertaFormacaoIntervaloDeTempoUpdateInputDto {
    const input: GradeHorarioOfertaFormacaoIntervaloDeTempoUpdateInputDto = {};
    if (dto.intervaloDeTempo !== undefined) {
      input.intervaloDeTempo = { id: dto.intervaloDeTempo.id };
    }
    if (dto.gradeHorarioOfertaFormacao !== undefined) {
      input.gradeHorarioOfertaFormacao = { id: dto.gradeHorarioOfertaFormacao.id };
    }
    return input;
  }

  static toFindOneOutputDto(
    output: GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputDto,
  ): GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputGraphQlDto {
    const dto = new GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputGraphQlDto();
    dto.id = output.id;
    dto.intervaloDeTempo = IntervaloDeTempoGraphqlMapper.toFindOneOutputDto(
      output.intervaloDeTempo,
    );
    dto.gradeHorarioOfertaFormacao =
      output.gradeHorarioOfertaFormacao as unknown as GradeHorarioOfertaFormacaoIntervaloDeTempoGradeHorarioOfertaFormacaoOutputGraphQlDto;
    dto.dateCreated = output.dateCreated as unknown as Date;
    dto.dateUpdated = output.dateUpdated as unknown as Date;
    dto.dateDeleted = output.dateDeleted as unknown as Date | null;
    return dto;
  }

  static toListOutputDto(
    output: GradeHorarioOfertaFormacaoIntervaloDeTempoListOutputDto,
  ): GradeHorarioOfertaFormacaoIntervaloDeTempoListOutputGraphQlDto {
    const dto = new GradeHorarioOfertaFormacaoIntervaloDeTempoListOutputGraphQlDto();
    dto.meta = mapPaginationMeta(output.meta);
    dto.data = output.data.map((item) => this.toFindOneOutputDto(item));
    return dto;
  }
}

import {
  createFindOneInputMapper,
  createListOutputMapper,
  mapDatedFields,
} from "@/modules/@shared/application/mappers";
import {
  GradeHorarioOfertaFormacaoIntervaloDeTempoCreateInputDto,
  GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneInputDto,
  GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputDto,
  GradeHorarioOfertaFormacaoIntervaloDeTempoListInputDto,
  GradeHorarioOfertaFormacaoIntervaloDeTempoUpdateInputDto,
} from "@/modules/horarios/grade-horario-oferta-formacao-intervalo-de-tempo";
import { IntervaloDeTempoGraphqlMapper } from "@/modules/horarios/intervalo-de-tempo/presentation/graphql/intervalo-de-tempo.graphql.mapper";
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

  static toFindOneInput = createFindOneInputMapper(
    GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneInputDto,
  );

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
    mapDatedFields(dto, output);
    return dto;
  }

  static toListOutputDto = createListOutputMapper(
    GradeHorarioOfertaFormacaoIntervaloDeTempoListOutputGraphQlDto,
    GradeHorarioOfertaFormacaoIntervaloDeTempoGraphqlMapper.toFindOneOutputDto,
  );
}

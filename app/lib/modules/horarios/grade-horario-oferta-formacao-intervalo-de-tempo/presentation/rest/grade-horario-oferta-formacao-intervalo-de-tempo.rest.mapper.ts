import { GradeHorarioOfertaFormacaoRestMapper } from "@/modules/horarios/grade-horario-oferta-formacao/presentation/rest";
import {
  GradeHorarioOfertaFormacaoIntervaloDeTempoCreateInputDto,
  GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneInputDto,
  GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputDto,
  GradeHorarioOfertaFormacaoIntervaloDeTempoListInputDto,
  GradeHorarioOfertaFormacaoIntervaloDeTempoUpdateInputDto,
} from "@/modules/horarios/grade-horario-oferta-formacao-intervalo-de-tempo";
import { IntervaloDeTempoRestMapper } from "@/modules/horarios/intervalo-de-tempo/presentation/rest";
import {
  createFindOneInputMapper,
  createListInputMapper,
  createListOutputMapper,
  mapDatedFields,
} from "@/modules/@shared/application/mappers";
import {
  GradeHorarioOfertaFormacaoIntervaloDeTempoCreateInputRestDto,
  GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneInputRestDto,
  GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputRestDto,
  GradeHorarioOfertaFormacaoIntervaloDeTempoListOutputRestDto,
  GradeHorarioOfertaFormacaoIntervaloDeTempoUpdateInputRestDto,
} from "./grade-horario-oferta-formacao-intervalo-de-tempo.rest.dto";

export class GradeHorarioOfertaFormacaoIntervaloDeTempoRestMapper {
  // ============================================================================
  // Input: Server DTO -> Core DTO
  // ============================================================================

  static toFindOneInput = createFindOneInputMapper(
    GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneInputDto,
  );

  static toListInput = createListInputMapper(
    GradeHorarioOfertaFormacaoIntervaloDeTempoListInputDto,
    ["filter.id"],
  );

  static toCreateInput(
    dto: GradeHorarioOfertaFormacaoIntervaloDeTempoCreateInputRestDto,
  ): GradeHorarioOfertaFormacaoIntervaloDeTempoCreateInputDto {
    const input = new GradeHorarioOfertaFormacaoIntervaloDeTempoCreateInputDto();
    input.gradeHorarioOfertaFormacao = { id: dto.gradeHorarioOfertaFormacao.id };
    input.intervaloDeTempo = { id: dto.intervaloDeTempo.id };
    return input;
  }

  static toUpdateInput(
    params: GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneInputRestDto,
    dto: GradeHorarioOfertaFormacaoIntervaloDeTempoUpdateInputRestDto,
  ): GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneInputDto &
    GradeHorarioOfertaFormacaoIntervaloDeTempoUpdateInputDto {
    const input =
      new GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneInputDto() as GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneInputDto &
        GradeHorarioOfertaFormacaoIntervaloDeTempoUpdateInputDto;
    input.id = params.id;
    if (dto.gradeHorarioOfertaFormacao !== undefined) {
      input.gradeHorarioOfertaFormacao = { id: dto.gradeHorarioOfertaFormacao.id };
    }
    if (dto.intervaloDeTempo !== undefined) {
      input.intervaloDeTempo = { id: dto.intervaloDeTempo.id };
    }
    return input;
  }

  // ============================================================================
  // Output: Core DTO -> Server DTO
  // ============================================================================

  static toFindOneOutputDto(
    output: GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputDto,
  ): GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputRestDto {
    const dto = new GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputRestDto();
    dto.id = output.id;
    dto.gradeHorarioOfertaFormacao = GradeHorarioOfertaFormacaoRestMapper.toFindOneOutputDto(
      output.gradeHorarioOfertaFormacao,
    );
    dto.intervaloDeTempo = IntervaloDeTempoRestMapper.toFindOneOutputDto(output.intervaloDeTempo);
    mapDatedFields(dto, output);
    return dto;
  }

  static toListOutputDto = createListOutputMapper(
    GradeHorarioOfertaFormacaoIntervaloDeTempoListOutputRestDto,
    GradeHorarioOfertaFormacaoIntervaloDeTempoRestMapper.toFindOneOutputDto,
  );
}

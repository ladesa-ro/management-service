import {
  GradeHorarioOfertaFormacaoIntervaloDeTempoCreateInput,
  GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneInput,
  GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutput,
  GradeHorarioOfertaFormacaoIntervaloDeTempoListInput,
  GradeHorarioOfertaFormacaoIntervaloDeTempoListOutput,
  GradeHorarioOfertaFormacaoIntervaloDeTempoUpdateInput,
} from "@/modules/grade-horario-oferta-formacao-intervalo-de-tempo";
import { GradeHorarioOfertaFormacaoRestMapper } from "@/server/nest/modules/grade-horario-oferta-formacao/rest";
import { IntervaloDeTempoRestMapper } from "@/server/nest/modules/intervalo-de-tempo/rest";
import { mapPaginationMeta } from "@/server/nest/shared/mappers";
import {
  GradeHorarioOfertaFormacaoIntervaloDeTempoCreateInputRestDto,
  GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneInputRestDto,
  GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputRestDto,
  GradeHorarioOfertaFormacaoIntervaloDeTempoListInputRestDto,
  GradeHorarioOfertaFormacaoIntervaloDeTempoListOutputRestDto,
  GradeHorarioOfertaFormacaoIntervaloDeTempoUpdateInputRestDto,
} from "./grade-horario-oferta-formacao-intervalo-de-tempo.rest.dto";

export class GradeHorarioOfertaFormacaoIntervaloDeTempoRestMapper {
  // ============================================================================
  // Input: Server DTO -> Core DTO
  // ============================================================================

  static toFindOneInput(
    dto: GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneInputRestDto,
  ): GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneInput {
    const input = new GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneInput();
    input.id = dto.id;
    return input;
  }

  static toListInput(
    dto: GradeHorarioOfertaFormacaoIntervaloDeTempoListInputRestDto | null,
  ): GradeHorarioOfertaFormacaoIntervaloDeTempoListInput | null {
    if (!dto) {
      return null;
    }

    const input = new GradeHorarioOfertaFormacaoIntervaloDeTempoListInput();
    input.page = dto.page;
    input.limit = dto.limit;
    input.search = dto.search;
    input.sortBy = dto.sortBy;
    input.selection = dto.selection;
    input["filter.id"] = dto["filter.id"];
    return input;
  }

  static toCreateInput(
    dto: GradeHorarioOfertaFormacaoIntervaloDeTempoCreateInputRestDto,
  ): GradeHorarioOfertaFormacaoIntervaloDeTempoCreateInput {
    const input = new GradeHorarioOfertaFormacaoIntervaloDeTempoCreateInput();
    input.gradeHorarioOfertaFormacao = { id: dto.gradeHorarioOfertaFormacao.id };
    input.intervaloDeTempo = { id: dto.intervaloDeTempo.id };
    return input;
  }

  static toUpdateInput(
    params: GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneInputRestDto,
    dto: GradeHorarioOfertaFormacaoIntervaloDeTempoUpdateInputRestDto,
  ): GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneInput &
    GradeHorarioOfertaFormacaoIntervaloDeTempoUpdateInput {
    const input =
      new GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneInput() as GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneInput &
        GradeHorarioOfertaFormacaoIntervaloDeTempoUpdateInput;
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
    output: GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutput,
  ): GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputRestDto {
    const dto = new GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputRestDto();
    dto.id = output.id;
    dto.gradeHorarioOfertaFormacao = GradeHorarioOfertaFormacaoRestMapper.toFindOneOutputDto(
      output.gradeHorarioOfertaFormacao,
    );
    dto.intervaloDeTempo = IntervaloDeTempoRestMapper.toFindOneOutputDto(output.intervaloDeTempo);
    dto.dateCreated = new Date(output.dateCreated);
    dto.dateUpdated = new Date(output.dateUpdated);
    dto.dateDeleted = output.dateDeleted ? new Date(output.dateDeleted) : null;
    return dto;
  }

  static toListOutputDto(
    output: GradeHorarioOfertaFormacaoIntervaloDeTempoListOutput,
  ): GradeHorarioOfertaFormacaoIntervaloDeTempoListOutputRestDto {
    const dto = new GradeHorarioOfertaFormacaoIntervaloDeTempoListOutputRestDto();
    dto.meta = mapPaginationMeta(output.meta);
    dto.data = output.data.map((item) => this.toFindOneOutputDto(item));
    return dto;
  }
}

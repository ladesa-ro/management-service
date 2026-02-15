import {
  GradeHorarioOfertaFormacaoIntervaloDeTempoCreateInputDto,
  GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneInputDto,
  GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputDto,
  GradeHorarioOfertaFormacaoIntervaloDeTempoListInputDto,
  GradeHorarioOfertaFormacaoIntervaloDeTempoListOutputDto,
  GradeHorarioOfertaFormacaoIntervaloDeTempoUpdateInputDto,
} from "@/modules/sisgha/grade-horario-oferta-formacao-intervalo-de-tempo";
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
  ): GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneInputDto {
    const input = new GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneInputDto();
    input.id = dto.id;
    return input;
  }

  static toListInput(
    dto: GradeHorarioOfertaFormacaoIntervaloDeTempoListInputRestDto | null,
  ): GradeHorarioOfertaFormacaoIntervaloDeTempoListInputDto | null {
    if (!dto) {
      return null;
    }

    const input = new GradeHorarioOfertaFormacaoIntervaloDeTempoListInputDto();
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
    dto.dateCreated = new Date(output.dateCreated);
    dto.dateUpdated = new Date(output.dateUpdated);
    dto.dateDeleted = output.dateDeleted ? new Date(output.dateDeleted) : null;
    return dto;
  }

  static toListOutputDto(
    output: GradeHorarioOfertaFormacaoIntervaloDeTempoListOutputDto,
  ): GradeHorarioOfertaFormacaoIntervaloDeTempoListOutputRestDto {
    const dto = new GradeHorarioOfertaFormacaoIntervaloDeTempoListOutputRestDto();
    dto.meta = mapPaginationMeta(output.meta);
    dto.data = output.data.map((item) => this.toFindOneOutputDto(item));
    return dto;
  }
}

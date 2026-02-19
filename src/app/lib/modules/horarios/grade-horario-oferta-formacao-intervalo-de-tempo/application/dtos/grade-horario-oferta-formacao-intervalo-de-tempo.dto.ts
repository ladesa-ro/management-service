import {
  EntityOutputDto,
  FindOneInputDto,
  IFilterAcceptableValues,
  ObjectUuidRefDto,
  PaginationInputDto,
  PaginationResultDto,
} from "@/modules/@shared";
import {
  GradeHorarioOfertaFormacaoFindOneOutputDto,
  GradeHorarioOfertaFormacaoInputRefDto,
} from "@/modules/horarios/grade-horario-oferta-formacao";
import {
  IntervaloDeTempoFindOneOutputDto,
  IntervaloDeTempoInputRefDto,
} from "@/modules/horarios/intervalo-de-tempo";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneInputDto extends FindOneInputDto {}

export class GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputDto extends EntityOutputDto {
  intervaloDeTempo!: IntervaloDeTempoFindOneOutputDto;
  gradeHorarioOfertaFormacao!: GradeHorarioOfertaFormacaoFindOneOutputDto;
}

// ============================================================================
// List Input/Output
// ============================================================================

export class GradeHorarioOfertaFormacaoIntervaloDeTempoListInputDto extends PaginationInputDto {
  "filter.id"?: IFilterAcceptableValues;
  "filter.gradeHorarioOfertaFormacao.id"?: IFilterAcceptableValues;
}

export class GradeHorarioOfertaFormacaoIntervaloDeTempoListOutputDto extends PaginationResultDto<GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputDto> {}

// ============================================================================
// Create/Update Input
// ============================================================================

export class GradeHorarioOfertaFormacaoIntervaloDeTempoCreateInputDto {
  intervaloDeTempo!: IntervaloDeTempoInputRefDto;
  gradeHorarioOfertaFormacao!: GradeHorarioOfertaFormacaoInputRefDto;
}

export class GradeHorarioOfertaFormacaoIntervaloDeTempoUpdateInputDto {
  intervaloDeTempo?: IntervaloDeTempoInputRefDto;
  gradeHorarioOfertaFormacao?: GradeHorarioOfertaFormacaoInputRefDto;
}

// ============================================================================
// Input Ref
// ============================================================================

export type GradeHorarioOfertaFormacaoIntervaloDeTempoInputRefDto = ObjectUuidRefDto;

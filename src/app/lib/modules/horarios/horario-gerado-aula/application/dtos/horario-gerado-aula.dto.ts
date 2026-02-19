import {
  EntityOutputDto,
  FindOneInputDto,
  IFilterAcceptableValues,
  ObjectUuidRefDto,
  PaginationInputDto,
  PaginationResultDto,
  ScalarDate,
} from "@/modules/@shared";
import {
  DiarioProfessorFindOneOutputDto,
  DiarioProfessorInputRefDto,
} from "@/modules/ensino/diario-professor/application/dtos";
import {
  HorarioGeradoFindOneOutputDto,
  HorarioGeradoInputRefDto,
} from "@/modules/horarios/horario-gerado";
import {
  IntervaloDeTempoFindOneOutputDto,
  IntervaloDeTempoInputRefDto,
} from "@/modules/horarios/intervalo-de-tempo";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class HorarioGeradoAulaFindOneInputDto extends FindOneInputDto {}

export class HorarioGeradoAulaFindOneOutputDto extends EntityOutputDto {
  data!: ScalarDate;
  diarioProfessor!: DiarioProfessorFindOneOutputDto;
  horarioGerado!: HorarioGeradoFindOneOutputDto;
  intervaloDeTempo!: IntervaloDeTempoFindOneOutputDto;
}

// ============================================================================
// List Input/Output
// ============================================================================

export class HorarioGeradoAulaListInputDto extends PaginationInputDto {
  "filter.id"?: IFilterAcceptableValues;
  "filter.horarioGerado.id"?: IFilterAcceptableValues;
}

export class HorarioGeradoAulaListOutputDto extends PaginationResultDto<HorarioGeradoAulaFindOneOutputDto> {}

// ============================================================================
// Create/Update Input
// ============================================================================

export class HorarioGeradoAulaCreateInputDto {
  data!: ScalarDate;
  diarioProfessor!: DiarioProfessorInputRefDto;
  horarioGerado!: HorarioGeradoInputRefDto;
  intervaloDeTempo!: IntervaloDeTempoInputRefDto;
}

export class HorarioGeradoAulaUpdateInputDto {
  data?: ScalarDate;
  diarioProfessor?: DiarioProfessorInputRefDto;
  horarioGerado?: HorarioGeradoInputRefDto;
  intervaloDeTempo?: IntervaloDeTempoInputRefDto;
}

// ============================================================================
// Input Ref
// ============================================================================

export type HorarioGeradoAulaInputRefDto = ObjectUuidRefDto;

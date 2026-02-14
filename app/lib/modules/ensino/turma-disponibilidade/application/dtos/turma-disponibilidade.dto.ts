import {
  EntityOutputDto,
  FindOneInputDto,
  IFilterAcceptableValues,
  ObjectUuidRefDto,
  PaginationInputDto,
  PaginationResultDto,
} from "@/modules/@shared";
import {
  DisponibilidadeFindOneOutputDto,
  DisponibilidadeInputRefDto,
} from "@/modules/ensino/disponibilidade";
import { TurmaFindOneOutputDto, TurmaInputRefDto } from "@/modules/ensino/turma";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class TurmaDisponibilidadeFindOneInputDto extends FindOneInputDto {}

export class TurmaDisponibilidadeFindOneOutputDto extends EntityOutputDto {
  turma!: TurmaFindOneOutputDto;
  disponibilidade!: DisponibilidadeFindOneOutputDto;
}

// ============================================================================
// List Input/Output
// ============================================================================

export class TurmaDisponibilidadeListInputDto extends PaginationInputDto {
  "filter.id"?: IFilterAcceptableValues;
  "filter.turma.id"?: IFilterAcceptableValues;
}

export class TurmaDisponibilidadeListOutputDto extends PaginationResultDto<TurmaDisponibilidadeFindOneOutputDto> {}

// ============================================================================
// Create/Update Input
// ============================================================================

export class TurmaDisponibilidadeCreateInputDto {
  turma!: TurmaInputRefDto;
  disponibilidade!: DisponibilidadeInputRefDto;
}

export class TurmaDisponibilidadeUpdateInputDto {
  turma?: TurmaInputRefDto;
  disponibilidade?: DisponibilidadeInputRefDto;
}

// ============================================================================
// Input Ref
// ============================================================================

export type TurmaDisponibilidadeInputRefDto = ObjectUuidRefDto;

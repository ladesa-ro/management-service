import { ArgsType, Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsOptional, IsString, ValidateNested } from "class-validator";
import { decorate } from "ts-mixer";
import {
  EntityBaseGraphQlDto,
  PaginatedFilterByIdGraphQlDto,
  PaginationMetaGraphQlDto,
} from "@/modules/@shared/infrastructure/graphql/dtos";
import { IntervaloDeTempoFindOneOutputGraphQlDto } from "@/modules/sisgha/intervalo-de-tempo/presentation/graphql/intervalo-de-tempo.graphql.dto";

// ============================================================================
// GradeHorarioOfertaFormacao nested output (not yet refactored to GraphQL)
// ============================================================================

@decorate(ObjectType("GradeHorarioOfertaFormacaoIntervaloDeTempoGradeHorarioOfertaFormacaoOutput"))
export class GradeHorarioOfertaFormacaoIntervaloDeTempoGradeHorarioOfertaFormacaoOutputGraphQlDto extends EntityBaseGraphQlDto {}

// ============================================================================
// Ref Input DTOs for cross-module references
// ============================================================================

@decorate(
  InputType("GradeHorarioOfertaFormacaoIntervaloDeTempoGradeHorarioOfertaFormacaoRefInputDto"),
)
export class GradeHorarioOfertaFormacaoIntervaloDeTempoGradeHorarioOfertaFormacaoRefInputGraphQlDto {
  @decorate(Field(() => String)) @decorate(IsString()) id: string;
}

@decorate(InputType("GradeHorarioOfertaFormacaoIntervaloDeTempoIntervaloDeTempoRefInputDto"))
export class GradeHorarioOfertaFormacaoIntervaloDeTempoIntervaloDeTempoRefInputGraphQlDto {
  @decorate(Field(() => String)) @decorate(IsString()) id: string;
}

// ============================================================================
// FindOne Output
// ============================================================================

@decorate(ObjectType("GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputDto"))
export class GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputGraphQlDto extends EntityBaseGraphQlDto {
  @decorate(Field(() => IntervaloDeTempoFindOneOutputGraphQlDto))
  intervaloDeTempo: IntervaloDeTempoFindOneOutputGraphQlDto;
  @decorate(
    Field(
      () => GradeHorarioOfertaFormacaoIntervaloDeTempoGradeHorarioOfertaFormacaoOutputGraphQlDto,
    ),
  )
  gradeHorarioOfertaFormacao: GradeHorarioOfertaFormacaoIntervaloDeTempoGradeHorarioOfertaFormacaoOutputGraphQlDto;
}

// ============================================================================
// Create Input
// ============================================================================

@decorate(InputType("GradeHorarioOfertaFormacaoIntervaloDeTempoCreateInputDto"))
export class GradeHorarioOfertaFormacaoIntervaloDeTempoCreateInputGraphQlDto {
  @decorate(
    Field(() => GradeHorarioOfertaFormacaoIntervaloDeTempoIntervaloDeTempoRefInputGraphQlDto),
  )
  @decorate(ValidateNested())
  intervaloDeTempo: GradeHorarioOfertaFormacaoIntervaloDeTempoIntervaloDeTempoRefInputGraphQlDto;
  @decorate(
    Field(
      () => GradeHorarioOfertaFormacaoIntervaloDeTempoGradeHorarioOfertaFormacaoRefInputGraphQlDto,
    ),
  )
  @decorate(ValidateNested())
  gradeHorarioOfertaFormacao: GradeHorarioOfertaFormacaoIntervaloDeTempoGradeHorarioOfertaFormacaoRefInputGraphQlDto;
}

// ============================================================================
// Update Input
// ============================================================================

@decorate(InputType("GradeHorarioOfertaFormacaoIntervaloDeTempoUpdateInputDto"))
export class GradeHorarioOfertaFormacaoIntervaloDeTempoUpdateInputGraphQlDto {
  @decorate(
    Field(() => GradeHorarioOfertaFormacaoIntervaloDeTempoIntervaloDeTempoRefInputGraphQlDto, {
      nullable: true,
    }),
  )
  @decorate(IsOptional())
  @decorate(ValidateNested())
  intervaloDeTempo?: GradeHorarioOfertaFormacaoIntervaloDeTempoIntervaloDeTempoRefInputGraphQlDto;
  @decorate(
    Field(
      () => GradeHorarioOfertaFormacaoIntervaloDeTempoGradeHorarioOfertaFormacaoRefInputGraphQlDto,
      { nullable: true },
    ),
  )
  @decorate(IsOptional())
  @decorate(ValidateNested())
  gradeHorarioOfertaFormacao?: GradeHorarioOfertaFormacaoIntervaloDeTempoGradeHorarioOfertaFormacaoRefInputGraphQlDto;
}

// ============================================================================
// List Input (GraphQL-compatible - no dots in field names)
// ============================================================================

@decorate(ArgsType())
export class GradeHorarioOfertaFormacaoIntervaloDeTempoListInputGraphQlDto extends PaginatedFilterByIdGraphQlDto {}

// ============================================================================
// List Output
// ============================================================================

@decorate(ObjectType("GradeHorarioOfertaFormacaoIntervaloDeTempoListResult"))
export class GradeHorarioOfertaFormacaoIntervaloDeTempoListOutputGraphQlDto {
  @decorate(Field(() => PaginationMetaGraphQlDto))
  meta: PaginationMetaGraphQlDto;

  @decorate(Field(() => [GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputGraphQlDto]))
  data: GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputGraphQlDto[];
}

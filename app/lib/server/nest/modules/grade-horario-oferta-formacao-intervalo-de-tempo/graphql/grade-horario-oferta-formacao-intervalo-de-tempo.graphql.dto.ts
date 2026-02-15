import { ArgsType, Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsArray, IsOptional, IsString, IsUUID, ValidateNested } from "class-validator";
import {
  EntityBaseGraphQlDto,
  PaginationMetaGraphQlDto,
} from "@/modules/@shared/infrastructure/graphql/dtos";
import { PaginationInputGraphQlDto } from "@/modules/@shared/infrastructure/graphql/dtos/pagination-graphql.dto";
import { IntervaloDeTempoFindOneOutputGraphQlDto } from "@/server/nest/modules/intervalo-de-tempo/graphql/intervalo-de-tempo.graphql.dto";

// ============================================================================
// GradeHorarioOfertaFormacao nested output (not yet refactored to GraphQL)
// ============================================================================

@ObjectType("GradeHorarioOfertaFormacaoIntervaloDeTempoGradeHorarioOfertaFormacaoOutput")
export class GradeHorarioOfertaFormacaoIntervaloDeTempoGradeHorarioOfertaFormacaoOutputGraphQlDto extends EntityBaseGraphQlDto {}

// ============================================================================
// Ref Input DTOs for cross-module references
// ============================================================================

@InputType("GradeHorarioOfertaFormacaoIntervaloDeTempoGradeHorarioOfertaFormacaoRefInputDto")
export class GradeHorarioOfertaFormacaoIntervaloDeTempoGradeHorarioOfertaFormacaoRefInputGraphQlDto {
  @Field() @IsString() id: string;
}

@InputType("GradeHorarioOfertaFormacaoIntervaloDeTempoIntervaloDeTempoRefInputDto")
export class GradeHorarioOfertaFormacaoIntervaloDeTempoIntervaloDeTempoRefInputGraphQlDto {
  @Field() @IsString() id: string;
}

// ============================================================================
// FindOne Output
// ============================================================================

@ObjectType("GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputDto")
export class GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputGraphQlDto extends EntityBaseGraphQlDto {
  @Field(() => IntervaloDeTempoFindOneOutputGraphQlDto)
  intervaloDeTempo: IntervaloDeTempoFindOneOutputGraphQlDto;
  @Field(() => GradeHorarioOfertaFormacaoIntervaloDeTempoGradeHorarioOfertaFormacaoOutputGraphQlDto)
  gradeHorarioOfertaFormacao: GradeHorarioOfertaFormacaoIntervaloDeTempoGradeHorarioOfertaFormacaoOutputGraphQlDto;
}

// ============================================================================
// Create Input
// ============================================================================

@InputType("GradeHorarioOfertaFormacaoIntervaloDeTempoCreateInputDto")
export class GradeHorarioOfertaFormacaoIntervaloDeTempoCreateInputGraphQlDto {
  @Field(() => GradeHorarioOfertaFormacaoIntervaloDeTempoIntervaloDeTempoRefInputGraphQlDto)
  @ValidateNested()
  intervaloDeTempo: GradeHorarioOfertaFormacaoIntervaloDeTempoIntervaloDeTempoRefInputGraphQlDto;
  @Field(
    () => GradeHorarioOfertaFormacaoIntervaloDeTempoGradeHorarioOfertaFormacaoRefInputGraphQlDto,
  )
  @ValidateNested()
  gradeHorarioOfertaFormacao: GradeHorarioOfertaFormacaoIntervaloDeTempoGradeHorarioOfertaFormacaoRefInputGraphQlDto;
}

// ============================================================================
// Update Input
// ============================================================================

@InputType("GradeHorarioOfertaFormacaoIntervaloDeTempoUpdateInputDto")
export class GradeHorarioOfertaFormacaoIntervaloDeTempoUpdateInputGraphQlDto {
  @Field(() => GradeHorarioOfertaFormacaoIntervaloDeTempoIntervaloDeTempoRefInputGraphQlDto, {
    nullable: true,
  })
  @IsOptional()
  @ValidateNested()
  intervaloDeTempo?: GradeHorarioOfertaFormacaoIntervaloDeTempoIntervaloDeTempoRefInputGraphQlDto;
  @Field(
    () => GradeHorarioOfertaFormacaoIntervaloDeTempoGradeHorarioOfertaFormacaoRefInputGraphQlDto,
    { nullable: true },
  )
  @IsOptional()
  @ValidateNested()
  gradeHorarioOfertaFormacao?: GradeHorarioOfertaFormacaoIntervaloDeTempoGradeHorarioOfertaFormacaoRefInputGraphQlDto;
}

// ============================================================================
// List Input (GraphQL-compatible - no dots in field names)
// ============================================================================

@ArgsType()
export class GradeHorarioOfertaFormacaoIntervaloDeTempoListInputGraphQlDto extends PaginationInputGraphQlDto {
  @Field(() => [String], { nullable: true, description: "Filtro por ID" })
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  filterId?: string[];
}

// ============================================================================
// List Output
// ============================================================================

@ObjectType("GradeHorarioOfertaFormacaoIntervaloDeTempoListResult")
export class GradeHorarioOfertaFormacaoIntervaloDeTempoListOutputGraphQlDto {
  @Field(() => PaginationMetaGraphQlDto)
  meta: PaginationMetaGraphQlDto;

  @Field(() => [GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputGraphQlDto])
  data: GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputGraphQlDto[];
}

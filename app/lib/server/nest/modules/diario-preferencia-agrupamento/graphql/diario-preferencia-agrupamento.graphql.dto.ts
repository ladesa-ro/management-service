import { ArgsType, Field, InputType, Int, ObjectType } from "@nestjs/graphql";
import {
  IsArray,
  IsDateString,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Min,
  ValidateNested,
} from "class-validator";
import {
  EntityBaseGraphQlDto,
  PaginationMetaGraphQlDto,
} from "@/modules/@shared/infrastructure/graphql/dtos";
import { IntervaloDeTempoFindOneOutputGraphQlDto } from "@/server/nest/modules/intervalo-de-tempo/graphql/intervalo-de-tempo.graphql.dto";

// ============================================================================
// Ref Input DTOs for cross-module references
// ============================================================================

@InputType("DiarioPreferenciaAgrupamentoDiarioRefInputDto")
export class DiarioPreferenciaAgrupamentoDiarioRefInputGraphQlDto {
  @Field() @IsString() id: string;
}

@InputType("DiarioPreferenciaAgrupamentoIntervaloDeTempoRefInputDto")
export class DiarioPreferenciaAgrupamentoIntervaloDeTempoRefInputGraphQlDto {
  @Field() @IsString() id: string;
}

// ============================================================================
// Diario nested output (diario module not yet refactored to GraphQL)
// ============================================================================

@ObjectType("DiarioPreferenciaAgrupamentoDiarioOutput")
export class DiarioPreferenciaAgrupamentoDiarioOutputGraphQlDto extends EntityBaseGraphQlDto {
  @Field() ativo: boolean;
}

// ============================================================================
// FindOne Output
// ============================================================================

@ObjectType("DiarioPreferenciaAgrupamentoFindOneOutputDto")
export class DiarioPreferenciaAgrupamentoFindOneOutputGraphQlDto extends EntityBaseGraphQlDto {
  @Field() dataInicio: Date;
  @Field(() => Date, { nullable: true }) dataFim: Date | null;
  @Field(() => Int) diaSemanaIso: number;
  @Field(() => Int) aulasSeguidas: number;
  @Field(() => IntervaloDeTempoFindOneOutputGraphQlDto)
  intervaloDeTempo: IntervaloDeTempoFindOneOutputGraphQlDto;
  @Field(() => DiarioPreferenciaAgrupamentoDiarioOutputGraphQlDto)
  diario: DiarioPreferenciaAgrupamentoDiarioOutputGraphQlDto;
}

// ============================================================================
// Create Input
// ============================================================================

@InputType("DiarioPreferenciaAgrupamentoCreateInputDto")
export class DiarioPreferenciaAgrupamentoCreateInputGraphQlDto {
  @Field() @IsDateString() dataInicio: Date;
  @Field(() => Date, { nullable: true }) @IsOptional() @IsDateString() dataFim?: Date | null;
  @Field(() => Int) @IsInt() diaSemanaIso: number;
  @Field(() => Int) @IsInt() aulasSeguidas: number;
  @Field(() => DiarioPreferenciaAgrupamentoIntervaloDeTempoRefInputGraphQlDto)
  @ValidateNested()
  intervaloDeTempo: DiarioPreferenciaAgrupamentoIntervaloDeTempoRefInputGraphQlDto;
  @Field(() => DiarioPreferenciaAgrupamentoDiarioRefInputGraphQlDto)
  @ValidateNested()
  diario: DiarioPreferenciaAgrupamentoDiarioRefInputGraphQlDto;
}

// ============================================================================
// Update Input
// ============================================================================

@InputType("DiarioPreferenciaAgrupamentoUpdateInputDto")
export class DiarioPreferenciaAgrupamentoUpdateInputGraphQlDto {
  @Field({ nullable: true }) @IsOptional() @IsDateString() dataInicio?: Date;
  @Field(() => Date, { nullable: true }) @IsOptional() @IsDateString() dataFim?: Date | null;
  @Field(() => Int, { nullable: true }) @IsOptional() @IsInt() diaSemanaIso?: number;
  @Field(() => Int, { nullable: true }) @IsOptional() @IsInt() aulasSeguidas?: number;
  @Field(() => DiarioPreferenciaAgrupamentoIntervaloDeTempoRefInputGraphQlDto, { nullable: true })
  @IsOptional()
  @ValidateNested()
  intervaloDeTempo?: DiarioPreferenciaAgrupamentoIntervaloDeTempoRefInputGraphQlDto;
  @Field(() => DiarioPreferenciaAgrupamentoDiarioRefInputGraphQlDto, { nullable: true })
  @IsOptional()
  @ValidateNested()
  diario?: DiarioPreferenciaAgrupamentoDiarioRefInputGraphQlDto;
}

// ============================================================================
// List Input (GraphQL-compatible - no dots in field names)
// ============================================================================

@ArgsType()
export class DiarioPreferenciaAgrupamentoListInputGraphQlDto {
  @Field(() => Int, { nullable: true, defaultValue: 1 })
  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number = 1;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(1)
  limit?: number;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  search?: string;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  sortBy?: string[];

  @Field(() => [String], { nullable: true, description: "Filtro por ID" })
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  filterId?: string[];

  @Field(() => [String], { nullable: true, description: "Filtro por ID do Diario" })
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  filterDiarioId?: string[];
}

// ============================================================================
// List Output
// ============================================================================

@ObjectType("DiarioPreferenciaAgrupamentoListResult")
export class DiarioPreferenciaAgrupamentoListOutputGraphQlDto {
  @Field(() => PaginationMetaGraphQlDto)
  meta: PaginationMetaGraphQlDto;

  @Field(() => [DiarioPreferenciaAgrupamentoFindOneOutputGraphQlDto])
  data: DiarioPreferenciaAgrupamentoFindOneOutputGraphQlDto[];
}

import { ArgsType, Field, InputType, Int, ObjectType } from "@nestjs/graphql";
import {
  IsArray,
  IsDateString,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from "class-validator";
import { decorate } from "ts-mixer";
import {
  EntityBaseGraphQlDto,
  PaginatedFilterByIdGraphQlDto,
  PaginationMetaGraphQlDto,
} from "@/modules/@shared/infrastructure/graphql/dtos";
import { DiarioPreferenciaAgrupamentoFieldsMixin } from "@/server/nest/modules/diario-preferencia-agrupamento/diario-preferencia-agrupamento.validation-mixin";
import { IntervaloDeTempoFindOneOutputGraphQlDto } from "@/server/nest/modules/intervalo-de-tempo/graphql/intervalo-de-tempo.graphql.dto";

// ============================================================================
// Ref Input DTOs for cross-module references
// ============================================================================

@decorate(InputType("DiarioPreferenciaAgrupamentoDiarioRefInputDto"))
export class DiarioPreferenciaAgrupamentoDiarioRefInputGraphQlDto {
  @decorate(Field(() => String)) @decorate(IsString()) id: string;
}

@decorate(InputType("DiarioPreferenciaAgrupamentoIntervaloDeTempoRefInputDto"))
export class DiarioPreferenciaAgrupamentoIntervaloDeTempoRefInputGraphQlDto {
  @decorate(Field(() => String)) @decorate(IsString()) id: string;
}

// ============================================================================
// Diario nested output (diario module not yet refactored to GraphQL)
// ============================================================================

@decorate(ObjectType("DiarioPreferenciaAgrupamentoDiarioOutput"))
export class DiarioPreferenciaAgrupamentoDiarioOutputGraphQlDto extends EntityBaseGraphQlDto {
  @decorate(Field(() => Boolean)) ativo: boolean;
}

// ============================================================================
// FindOne Output
// ============================================================================

@decorate(ObjectType("DiarioPreferenciaAgrupamentoFindOneOutputDto"))
export class DiarioPreferenciaAgrupamentoFindOneOutputGraphQlDto extends EntityBaseGraphQlDto {
  @decorate(Field(() => Date)) dataInicio: Date;
  @decorate(Field(() => Date, { nullable: true })) dataFim: Date | null;
  @decorate(Field(() => Int)) diaSemanaIso: number;
  @decorate(Field(() => Int)) aulasSeguidas: number;
  @decorate(Field(() => IntervaloDeTempoFindOneOutputGraphQlDto))
  intervaloDeTempo: IntervaloDeTempoFindOneOutputGraphQlDto;
  @decorate(Field(() => DiarioPreferenciaAgrupamentoDiarioOutputGraphQlDto))
  diario: DiarioPreferenciaAgrupamentoDiarioOutputGraphQlDto;
}

// ============================================================================
// Create Input
// ============================================================================

@decorate(InputType("DiarioPreferenciaAgrupamentoCreateInputDto"))
export class DiarioPreferenciaAgrupamentoCreateInputGraphQlDto extends DiarioPreferenciaAgrupamentoFieldsMixin {
  @decorate(Field(() => Date)) declare dataInicio: Date;
  @decorate(Field(() => Date, { nullable: true })) declare dataFim?: Date | null;
  @decorate(Field(() => Int)) declare diaSemanaIso: number;
  @decorate(Field(() => Int)) declare aulasSeguidas: number;
  @decorate(Field(() => DiarioPreferenciaAgrupamentoIntervaloDeTempoRefInputGraphQlDto))
  @decorate(ValidateNested())
  intervaloDeTempo: DiarioPreferenciaAgrupamentoIntervaloDeTempoRefInputGraphQlDto;
  @decorate(Field(() => DiarioPreferenciaAgrupamentoDiarioRefInputGraphQlDto))
  @decorate(ValidateNested())
  diario: DiarioPreferenciaAgrupamentoDiarioRefInputGraphQlDto;
}

// ============================================================================
// Update Input
// ============================================================================

@decorate(InputType("DiarioPreferenciaAgrupamentoUpdateInputDto"))
export class DiarioPreferenciaAgrupamentoUpdateInputGraphQlDto {
  @decorate(Field(() => Date, { nullable: true }))
  @decorate(IsOptional())
  @decorate(IsDateString())
  dataInicio?: Date;
  @decorate(Field(() => Date, { nullable: true }))
  @decorate(IsOptional())
  @decorate(IsDateString())
  dataFim?: Date | null;
  @decorate(Field(() => Int, { nullable: true }))
  @decorate(IsOptional())
  @decorate(IsInt())
  diaSemanaIso?: number;
  @decorate(Field(() => Int, { nullable: true }))
  @decorate(IsOptional())
  @decorate(IsInt())
  aulasSeguidas?: number;
  @decorate(
    Field(() => DiarioPreferenciaAgrupamentoIntervaloDeTempoRefInputGraphQlDto, { nullable: true }),
  )
  @decorate(IsOptional())
  @decorate(ValidateNested())
  intervaloDeTempo?: DiarioPreferenciaAgrupamentoIntervaloDeTempoRefInputGraphQlDto;
  @decorate(Field(() => DiarioPreferenciaAgrupamentoDiarioRefInputGraphQlDto, { nullable: true }))
  @decorate(IsOptional())
  @decorate(ValidateNested())
  diario?: DiarioPreferenciaAgrupamentoDiarioRefInputGraphQlDto;
}

// ============================================================================
// List Input (GraphQL-compatible - no dots in field names)
// ============================================================================

@decorate(ArgsType())
export class DiarioPreferenciaAgrupamentoListInputGraphQlDto extends PaginatedFilterByIdGraphQlDto {
  @decorate(Field(() => [String], { nullable: true, description: "Filtro por ID do Diario" }))
  @decorate(IsOptional())
  @decorate(IsArray())
  @decorate(IsUUID(undefined, { each: true }))
  filterDiarioId?: string[];
}

// ============================================================================
// List Output
// ============================================================================

@decorate(ObjectType("DiarioPreferenciaAgrupamentoListResult"))
export class DiarioPreferenciaAgrupamentoListOutputGraphQlDto {
  @decorate(Field(() => PaginationMetaGraphQlDto))
  meta: PaginationMetaGraphQlDto;

  @decorate(Field(() => [DiarioPreferenciaAgrupamentoFindOneOutputGraphQlDto]))
  data: DiarioPreferenciaAgrupamentoFindOneOutputGraphQlDto[];
}

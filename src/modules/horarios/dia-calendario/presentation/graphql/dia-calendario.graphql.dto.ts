import { ArgsType, Field, InputType, ObjectType } from "@nestjs/graphql";
import {
  IsArray,
  IsBoolean,
  IsDateString,
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
import { CalendarioLetivoFindOneOutputGraphQlDto } from "@/modules/horarios/calendario-letivo/presentation/graphql/calendario-letivo.graphql.dto";
import { DiaCalendarioFieldsMixin } from "../dia-calendario.validation-mixin";

// ============================================================================
// FindOne Output
// ============================================================================

@decorate(ObjectType("DiaCalendarioFindOneOutputDto"))
export class DiaCalendarioFindOneOutputGraphQlDto extends EntityBaseGraphQlDto {
  @decorate(Field(() => String)) data: string;
  @decorate(Field(() => Boolean)) diaLetivo: boolean;
  @decorate(Field(() => String)) feriado: string;
  @decorate(Field(() => Boolean)) diaPresencial: boolean;
  @decorate(Field(() => String)) tipo: string;
  @decorate(Field(() => Boolean)) extraCurricular: boolean;
  @decorate(Field(() => CalendarioLetivoFindOneOutputGraphQlDto))
  calendario: CalendarioLetivoFindOneOutputGraphQlDto;
}

// ============================================================================
// Create Input
// ============================================================================

@decorate(InputType("CalendarioLetivoRefInputForDiaCalendarioDto"))
export class CalendarioLetivoRefInputForDiaCalendarioGraphQlDto {
  @decorate(Field(() => String)) @decorate(IsString()) id: string;
}

@decorate(InputType("DiaCalendarioCreateInputDto"))
export class DiaCalendarioCreateInputGraphQlDto extends DiaCalendarioFieldsMixin {
  @decorate(Field(() => String)) declare data: string;
  @decorate(Field(() => Boolean)) declare diaLetivo: boolean;
  @decorate(Field(() => String)) declare feriado: string;
  @decorate(Field(() => Boolean)) declare diaPresencial: boolean;
  @decorate(Field(() => String)) declare tipo: string;
  @decorate(Field(() => Boolean)) declare extraCurricular: boolean;

  @decorate(Field(() => CalendarioLetivoRefInputForDiaCalendarioGraphQlDto))
  @decorate(ValidateNested())
  calendario: CalendarioLetivoRefInputForDiaCalendarioGraphQlDto;
}

// ============================================================================
// Update Input
// ============================================================================

@decorate(InputType("DiaCalendarioUpdateInputDto"))
export class DiaCalendarioUpdateInputGraphQlDto {
  @decorate(Field(() => String, { nullable: true }))
  @decorate(IsOptional())
  @decorate(IsDateString())
  data?: string;
  @decorate(Field(() => Boolean, { nullable: true }))
  @decorate(IsOptional())
  @decorate(IsBoolean())
  diaLetivo?: boolean;
  @decorate(Field(() => String, { nullable: true }))
  @decorate(IsOptional())
  @decorate(IsString())
  feriado?: string;
  @decorate(Field(() => Boolean, { nullable: true }))
  @decorate(IsOptional())
  @decorate(IsBoolean())
  diaPresencial?: boolean;
  @decorate(Field(() => String, { nullable: true }))
  @decorate(IsOptional())
  @decorate(IsString())
  tipo?: string;
  @decorate(Field(() => Boolean, { nullable: true }))
  @decorate(IsOptional())
  @decorate(IsBoolean())
  extraCurricular?: boolean;

  @decorate(Field(() => CalendarioLetivoRefInputForDiaCalendarioGraphQlDto, { nullable: true }))
  @decorate(IsOptional())
  @decorate(ValidateNested())
  calendario?: CalendarioLetivoRefInputForDiaCalendarioGraphQlDto;
}

// ============================================================================
// List Input
// ============================================================================

@decorate(ArgsType())
export class DiaCalendarioListInputGraphQlDto extends PaginatedFilterByIdGraphQlDto {
  @decorate(Field(() => [String], { nullable: true, description: "Filtro por ID do Calendario" }))
  @decorate(IsOptional())
  @decorate(IsArray())
  @decorate(IsUUID(undefined, { each: true }))
  filterCalendarioId?: string[];
}

// ============================================================================
// List Output
// ============================================================================

@decorate(ObjectType("DiaCalendarioListResult"))
export class DiaCalendarioListOutputGraphQlDto {
  @decorate(Field(() => PaginationMetaGraphQlDto))
  meta: PaginationMetaGraphQlDto;

  @decorate(Field(() => [DiaCalendarioFindOneOutputGraphQlDto]))
  data: DiaCalendarioFindOneOutputGraphQlDto[];
}

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
import {
  EntityBaseGraphQlDto,
  PaginationMetaGraphQlDto,
} from "@/modules/@shared/infrastructure/graphql/dtos";
import { PaginationArgsGraphQlDto } from "@/modules/@shared/infrastructure/graphql/dtos/pagination-graphql.dto";
import { CalendarioLetivoFindOneOutputGraphQlDto } from "@/server/nest/modules/calendario-letivo/graphql/calendario-letivo.graphql.dto";

// ============================================================================
// FindOne Output
// ============================================================================

@ObjectType("DiaCalendarioFindOneOutputDto")
export class DiaCalendarioFindOneOutputGraphQlDto extends EntityBaseGraphQlDto {
  @Field() data: string;
  @Field() diaLetivo: boolean;
  @Field() feriado: string;
  @Field() diaPresencial: boolean;
  @Field() tipo: string;
  @Field() extraCurricular: boolean;
  @Field(() => CalendarioLetivoFindOneOutputGraphQlDto)
  calendario: CalendarioLetivoFindOneOutputGraphQlDto;
}

// ============================================================================
// Create Input
// ============================================================================

@InputType("CalendarioLetivoRefInputForDiaCalendarioDto")
export class CalendarioLetivoRefInputForDiaCalendarioGraphQlDto {
  @Field() @IsString() id: string;
}

@InputType("DiaCalendarioCreateInputDto")
export class DiaCalendarioCreateInputGraphQlDto {
  @Field() @IsDateString() data: string;
  @Field() @IsBoolean() diaLetivo: boolean;
  @Field() @IsString() feriado: string;
  @Field() @IsBoolean() diaPresencial: boolean;
  @Field() @IsString() tipo: string;
  @Field() @IsBoolean() extraCurricular: boolean;

  @Field(() => CalendarioLetivoRefInputForDiaCalendarioGraphQlDto)
  @ValidateNested()
  calendario: CalendarioLetivoRefInputForDiaCalendarioGraphQlDto;
}

// ============================================================================
// Update Input
// ============================================================================

@InputType("DiaCalendarioUpdateInputDto")
export class DiaCalendarioUpdateInputGraphQlDto {
  @Field({ nullable: true }) @IsOptional() @IsDateString() data?: string;
  @Field({ nullable: true }) @IsOptional() @IsBoolean() diaLetivo?: boolean;
  @Field({ nullable: true }) @IsOptional() @IsString() feriado?: string;
  @Field({ nullable: true }) @IsOptional() @IsBoolean() diaPresencial?: boolean;
  @Field({ nullable: true }) @IsOptional() @IsString() tipo?: string;
  @Field({ nullable: true }) @IsOptional() @IsBoolean() extraCurricular?: boolean;

  @Field(() => CalendarioLetivoRefInputForDiaCalendarioGraphQlDto, { nullable: true })
  @IsOptional()
  @ValidateNested()
  calendario?: CalendarioLetivoRefInputForDiaCalendarioGraphQlDto;
}

// ============================================================================
// List Input
// ============================================================================

@ArgsType()
export class DiaCalendarioListInputGraphQlDto extends PaginationArgsGraphQlDto {
  @Field(() => [String], { nullable: true, description: "Filtro por ID" })
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  filterId?: string[];

  @Field(() => [String], { nullable: true, description: "Filtro por ID do Calendario" })
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  filterCalendarioId?: string[];
}

// ============================================================================
// List Output
// ============================================================================

@ObjectType("DiaCalendarioListResult")
export class DiaCalendarioListOutputGraphQlDto {
  @Field(() => PaginationMetaGraphQlDto)
  meta: PaginationMetaGraphQlDto;

  @Field(() => [DiaCalendarioFindOneOutputGraphQlDto])
  data: DiaCalendarioFindOneOutputGraphQlDto[];
}

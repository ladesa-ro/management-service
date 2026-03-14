import {
  EntityBaseGraphQlDto,
  PaginatedFilterByIdGraphQlDto,
  PaginationMetaGraphQlDto,
} from "@/modules/@shared/infrastructure/graphql/dtos";
import { ArgsType, Field, InputType, ObjectType } from "@/modules/@shared/presentation/graphql";
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from "@/modules/@shared/presentation/shared";
import { CalendarioLetivoFindOneOutputGraphQlDto } from "@/modules/horarios/calendario-letivo/presentation/graphql/calendario-letivo.graphql.dto";
import { DiaCalendarioFieldsMixin } from "../dia-calendario.validation-mixin";

// ============================================================================
// FindOne Output
// ============================================================================

@ObjectType("DiaCalendarioFindOneOutputDto")
export class DiaCalendarioFindOneOutputGraphQlDto extends EntityBaseGraphQlDto {
  @Field(() => String) data: string;
  @Field(() => Boolean) diaLetivo: boolean;
  @Field(() => String) feriado: string;
  @Field(() => Boolean) diaPresencial: boolean;
  @Field(() => String) tipo: string;
  @Field(() => Boolean) extraCurricular: boolean;
  @Field(() => CalendarioLetivoFindOneOutputGraphQlDto)
  calendario: CalendarioLetivoFindOneOutputGraphQlDto;
}

// ============================================================================
// Create Input
// ============================================================================

@InputType("CalendarioLetivoRefInputForDiaCalendarioDto")
export class CalendarioLetivoRefInputForDiaCalendarioGraphQlDto {
  @Field(() => String) @IsString() id: string;
}

@InputType("DiaCalendarioCreateInputDto")
export class DiaCalendarioCreateInputGraphQlDto extends DiaCalendarioFieldsMixin {
  @Field(() => String) declare data: string;
  @Field(() => Boolean) declare diaLetivo: boolean;
  @Field(() => String) declare feriado: string;
  @Field(() => Boolean) declare diaPresencial: boolean;
  @Field(() => String) declare tipo: string;
  @Field(() => Boolean) declare extraCurricular: boolean;

  @Field(() => CalendarioLetivoRefInputForDiaCalendarioGraphQlDto)
  @ValidateNested()
  calendario: CalendarioLetivoRefInputForDiaCalendarioGraphQlDto;
}

// ============================================================================
// Update Input
// ============================================================================

@InputType("DiaCalendarioUpdateInputDto")
export class DiaCalendarioUpdateInputGraphQlDto {
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsDateString()
  data?: string;
  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean()
  diaLetivo?: boolean;
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  feriado?: string;
  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean()
  diaPresencial?: boolean;
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  tipo?: string;
  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean()
  extraCurricular?: boolean;

  @Field(() => CalendarioLetivoRefInputForDiaCalendarioGraphQlDto, { nullable: true })
  @IsOptional()
  @ValidateNested()
  calendario?: CalendarioLetivoRefInputForDiaCalendarioGraphQlDto;
}

// ============================================================================
// List Input
// ============================================================================

@ArgsType()
export class DiaCalendarioListInputGraphQlDto extends PaginatedFilterByIdGraphQlDto {
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

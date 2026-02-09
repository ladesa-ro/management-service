import { ArgsType, Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsArray, IsOptional, IsString, IsUUID, ValidateNested } from "class-validator";
import {
  EntityBaseGraphQlDto,
  PaginationMetaGraphQlDto,
} from "@/modules/@shared/infrastructure/graphql/dtos";
import { PaginationArgsGraphQlDto } from "@/modules/@shared/infrastructure/graphql/dtos/pagination-graphql.dto";
import { CalendarioLetivoFindOneOutputGraphQlDto } from "@/server/nest/modules/calendario-letivo/graphql/calendario-letivo.graphql.dto";

// ============================================================================
// FindOne Output
// ============================================================================

@ObjectType("HorarioGeradoFindOneOutputDto")
export class HorarioGeradoFindOneOutputGraphQlDto extends EntityBaseGraphQlDto {
  @Field(() => String, { nullable: true }) status: string | null;
  @Field(() => String, { nullable: true }) tipo: string | null;
  @Field(() => String, { nullable: true }) dataGeracao: string | null;
  @Field(() => String, { nullable: true }) vigenciaInicio: string | null;
  @Field(() => String, { nullable: true }) vigenciaFim: string | null;
  @Field(() => CalendarioLetivoFindOneOutputGraphQlDto)
  calendario: CalendarioLetivoFindOneOutputGraphQlDto;
}

// ============================================================================
// Ref Input DTOs
// ============================================================================

@InputType("CalendarioLetivoRefInputForHorarioGeradoDto")
export class CalendarioLetivoRefInputForHorarioGeradoGraphQlDto {
  @Field() @IsString() id: string;
}

// ============================================================================
// Create Input
// ============================================================================

@InputType("HorarioGeradoCreateInputDto")
export class HorarioGeradoCreateInputGraphQlDto {
  @Field({ nullable: true }) @IsOptional() @IsString() status?: string | null;
  @Field({ nullable: true }) @IsOptional() @IsString() tipo?: string | null;
  @Field({ nullable: true }) @IsOptional() @IsString() dataGeracao?: string | null;
  @Field({ nullable: true }) @IsOptional() @IsString() vigenciaInicio?: string | null;
  @Field({ nullable: true }) @IsOptional() @IsString() vigenciaFim?: string | null;

  @Field(() => CalendarioLetivoRefInputForHorarioGeradoGraphQlDto)
  @ValidateNested()
  calendario: CalendarioLetivoRefInputForHorarioGeradoGraphQlDto;
}

// ============================================================================
// Update Input
// ============================================================================

@InputType("HorarioGeradoUpdateInputDto")
export class HorarioGeradoUpdateInputGraphQlDto {
  @Field({ nullable: true }) @IsOptional() @IsString() status?: string | null;
  @Field({ nullable: true }) @IsOptional() @IsString() tipo?: string | null;
  @Field({ nullable: true }) @IsOptional() @IsString() dataGeracao?: string | null;
  @Field({ nullable: true }) @IsOptional() @IsString() vigenciaInicio?: string | null;
  @Field({ nullable: true }) @IsOptional() @IsString() vigenciaFim?: string | null;

  @Field(() => CalendarioLetivoRefInputForHorarioGeradoGraphQlDto, { nullable: true })
  @IsOptional()
  @ValidateNested()
  calendario?: CalendarioLetivoRefInputForHorarioGeradoGraphQlDto;
}

// ============================================================================
// List Input
// ============================================================================

@ArgsType()
export class HorarioGeradoListInputGraphQlDto extends PaginationArgsGraphQlDto {
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

@ObjectType("HorarioGeradoListResult")
export class HorarioGeradoListOutputGraphQlDto {
  @Field(() => PaginationMetaGraphQlDto)
  meta: PaginationMetaGraphQlDto;

  @Field(() => [HorarioGeradoFindOneOutputGraphQlDto])
  data: HorarioGeradoFindOneOutputGraphQlDto[];
}

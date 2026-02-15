import { ArgsType, Field, InputType, Int, ObjectType } from "@nestjs/graphql";
import { IsArray, IsOptional, IsString, IsUUID, ValidateNested } from "class-validator";
import {
  EntityBaseGraphQlDto,
  PaginationMetaGraphQlDto,
} from "@/modules/@shared/infrastructure/graphql/dtos";
import { PaginationInputGraphQlDto } from "@/modules/@shared/infrastructure/graphql/dtos/pagination-graphql.dto";
import { CalendarioLetivoFindOneOutputGraphQlDto } from "@/server/nest/modules/calendario-letivo/graphql/calendario-letivo.graphql.dto";

// ============================================================================
// Nested ref output DTOs
// ============================================================================

@ObjectType("AmbienteFindOneOutputForEventoDto")
export class AmbienteFindOneOutputForEventoGraphQlDto extends EntityBaseGraphQlDto {
  @Field() nome: string;
  @Field(() => String, { nullable: true }) descricao: string | null;
  @Field() codigo: string;
  @Field(() => Int, { nullable: true }) capacidade: number | null;
  @Field(() => String, { nullable: true }) tipo: string | null;
}

// ============================================================================
// FindOne Output
// ============================================================================

@ObjectType("EventoFindOneOutputDto")
export class EventoFindOneOutputGraphQlDto extends EntityBaseGraphQlDto {
  @Field(() => String, { nullable: true }) nome: string | null;
  @Field() rrule: string;
  @Field(() => String, { nullable: true }) cor: string | null;
  @Field(() => String, { nullable: true }) dataInicio: string | null;
  @Field(() => String, { nullable: true }) dataFim: string | null;
  @Field(() => CalendarioLetivoFindOneOutputGraphQlDto)
  calendario: CalendarioLetivoFindOneOutputGraphQlDto;
  @Field(() => AmbienteFindOneOutputForEventoGraphQlDto, { nullable: true })
  ambiente: AmbienteFindOneOutputForEventoGraphQlDto | null;
}

// ============================================================================
// Ref Input DTOs
// ============================================================================

@InputType("CalendarioLetivoRefInputForEventoDto")
export class CalendarioLetivoRefInputForEventoGraphQlDto {
  @Field() @IsString() id: string;
}

@InputType("AmbienteRefInputForEventoDto")
export class AmbienteRefInputForEventoGraphQlDto {
  @Field() @IsString() id: string;
}

// ============================================================================
// Create Input
// ============================================================================

@InputType("EventoCreateInputDto")
export class EventoCreateInputGraphQlDto {
  @Field({ nullable: true }) @IsOptional() @IsString() nome?: string | null;
  @Field() @IsString() rrule: string;
  @Field({ nullable: true }) @IsOptional() @IsString() cor?: string | null;
  @Field({ nullable: true }) @IsOptional() @IsString() dataInicio?: string | null;
  @Field({ nullable: true }) @IsOptional() @IsString() dataFim?: string | null;

  @Field(() => CalendarioLetivoRefInputForEventoGraphQlDto)
  @ValidateNested()
  calendario: CalendarioLetivoRefInputForEventoGraphQlDto;

  @Field(() => AmbienteRefInputForEventoGraphQlDto, { nullable: true })
  @IsOptional()
  @ValidateNested()
  ambiente?: AmbienteRefInputForEventoGraphQlDto | null;
}

// ============================================================================
// Update Input
// ============================================================================

@InputType("EventoUpdateInputDto")
export class EventoUpdateInputGraphQlDto {
  @Field({ nullable: true }) @IsOptional() @IsString() nome?: string | null;
  @Field({ nullable: true }) @IsOptional() @IsString() rrule?: string;
  @Field({ nullable: true }) @IsOptional() @IsString() cor?: string | null;
  @Field({ nullable: true }) @IsOptional() @IsString() dataInicio?: string | null;
  @Field({ nullable: true }) @IsOptional() @IsString() dataFim?: string | null;

  @Field(() => CalendarioLetivoRefInputForEventoGraphQlDto, { nullable: true })
  @IsOptional()
  @ValidateNested()
  calendario?: CalendarioLetivoRefInputForEventoGraphQlDto;

  @Field(() => AmbienteRefInputForEventoGraphQlDto, { nullable: true })
  @IsOptional()
  @ValidateNested()
  ambiente?: AmbienteRefInputForEventoGraphQlDto | null;
}

// ============================================================================
// List Input
// ============================================================================

@ArgsType()
export class EventoListInputGraphQlDto extends PaginationInputGraphQlDto {
  @Field(() => [String], { nullable: true, description: "Filtro por ID" })
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  filterId?: string[];

  @Field(() => [String], { nullable: true, description: "Filtro por ID do Calendario Letivo" })
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  filterCalendarioId?: string[];
}

// ============================================================================
// List Output
// ============================================================================

@ObjectType("EventoListResult")
export class EventoListOutputGraphQlDto {
  @Field(() => PaginationMetaGraphQlDto)
  meta: PaginationMetaGraphQlDto;

  @Field(() => [EventoFindOneOutputGraphQlDto])
  data: EventoFindOneOutputGraphQlDto[];
}

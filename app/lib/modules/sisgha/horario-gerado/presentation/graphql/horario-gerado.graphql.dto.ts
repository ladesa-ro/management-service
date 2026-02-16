import { ArgsType, Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsArray, IsOptional, IsString, IsUUID, ValidateNested } from "class-validator";
import { decorate } from "ts-mixer";
import {
  EntityBaseGraphQlDto,
  PaginatedFilterByIdGraphQlDto,
  PaginationMetaGraphQlDto,
} from "@/modules/@shared/infrastructure/graphql/dtos";
import { CalendarioLetivoFindOneOutputGraphQlDto } from "@/modules/sisgha/calendario-letivo/presentation/graphql/calendario-letivo.graphql.dto";
import { HorarioGeradoFieldsMixin } from "@/modules/sisgha/horario-gerado/presentation/horario-gerado.validation-mixin";

// ============================================================================
// FindOne Output
// ============================================================================

@decorate(ObjectType("HorarioGeradoFindOneOutputDto"))
export class HorarioGeradoFindOneOutputGraphQlDto extends EntityBaseGraphQlDto {
  @decorate(Field(() => String, { nullable: true })) status: string | null;
  @decorate(Field(() => String, { nullable: true })) tipo: string | null;
  @decorate(Field(() => String, { nullable: true })) dataGeracao: string | null;
  @decorate(Field(() => String, { nullable: true })) vigenciaInicio: string | null;
  @decorate(Field(() => String, { nullable: true })) vigenciaFim: string | null;
  @decorate(Field(() => CalendarioLetivoFindOneOutputGraphQlDto))
  calendario: CalendarioLetivoFindOneOutputGraphQlDto;
}

// ============================================================================
// Ref Input DTOs
// ============================================================================

@decorate(InputType("CalendarioLetivoRefInputForHorarioGeradoDto"))
export class CalendarioLetivoRefInputForHorarioGeradoGraphQlDto {
  @decorate(Field(() => String)) @decorate(IsString()) id: string;
}

// ============================================================================
// Create Input
// ============================================================================

@decorate(InputType("HorarioGeradoCreateInputDto"))
export class HorarioGeradoCreateInputGraphQlDto extends HorarioGeradoFieldsMixin {
  @decorate(Field(() => String, { nullable: true })) declare status?: string | null;
  @decorate(Field(() => String, { nullable: true })) declare tipo?: string | null;
  @decorate(Field(() => String, { nullable: true })) declare dataGeracao?: string | null;
  @decorate(Field(() => String, { nullable: true })) declare vigenciaInicio?: string | null;
  @decorate(Field(() => String, { nullable: true })) declare vigenciaFim?: string | null;

  @decorate(Field(() => CalendarioLetivoRefInputForHorarioGeradoGraphQlDto))
  @decorate(ValidateNested())
  calendario: CalendarioLetivoRefInputForHorarioGeradoGraphQlDto;
}

// ============================================================================
// Update Input
// ============================================================================

@decorate(InputType("HorarioGeradoUpdateInputDto"))
export class HorarioGeradoUpdateInputGraphQlDto {
  @decorate(Field(() => String, { nullable: true }))
  @decorate(IsOptional())
  @decorate(IsString())
  status?: string | null;
  @decorate(Field(() => String, { nullable: true }))
  @decorate(IsOptional())
  @decorate(IsString())
  tipo?: string | null;
  @decorate(Field(() => String, { nullable: true }))
  @decorate(IsOptional())
  @decorate(IsString())
  dataGeracao?: string | null;
  @decorate(Field(() => String, { nullable: true }))
  @decorate(IsOptional())
  @decorate(IsString())
  vigenciaInicio?: string | null;
  @decorate(Field(() => String, { nullable: true }))
  @decorate(IsOptional())
  @decorate(IsString())
  vigenciaFim?: string | null;

  @decorate(Field(() => CalendarioLetivoRefInputForHorarioGeradoGraphQlDto, { nullable: true }))
  @decorate(IsOptional())
  @decorate(ValidateNested())
  calendario?: CalendarioLetivoRefInputForHorarioGeradoGraphQlDto;
}

// ============================================================================
// List Input
// ============================================================================

@decorate(ArgsType())
export class HorarioGeradoListInputGraphQlDto extends PaginatedFilterByIdGraphQlDto {
  @decorate(Field(() => [String], { nullable: true, description: "Filtro por ID do Calendario" }))
  @decorate(IsOptional())
  @decorate(IsArray())
  @decorate(IsUUID(undefined, { each: true }))
  filterCalendarioId?: string[];
}

// ============================================================================
// List Output
// ============================================================================

@decorate(ObjectType("HorarioGeradoListResult"))
export class HorarioGeradoListOutputGraphQlDto {
  @decorate(Field(() => PaginationMetaGraphQlDto))
  meta: PaginationMetaGraphQlDto;

  @decorate(Field(() => [HorarioGeradoFindOneOutputGraphQlDto]))
  data: HorarioGeradoFindOneOutputGraphQlDto[];
}

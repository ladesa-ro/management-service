import { ArgsType, Field, InputType, Int, ObjectType } from "@nestjs/graphql";
import { IsArray, IsOptional, IsString, IsUUID, ValidateNested } from "class-validator";
import { decorate } from "ts-mixer";
import {
  EntityBaseGraphQlDto,
  PaginatedFilterByIdGraphQlDto,
  PaginationMetaGraphQlDto,
} from "@/modules/@shared/infrastructure/graphql/dtos";
import { CalendarioLetivoFindOneOutputGraphQlDto } from "@/modules/horarios/calendario-letivo/presentation/graphql/calendario-letivo.graphql.dto";
import { EventoFieldsMixin } from "../evento.validation-mixin";

// ============================================================================
// Nested ref output DTOs
// ============================================================================

@decorate(ObjectType("AmbienteFindOneOutputForEventoDto"))
export class AmbienteFindOneOutputForEventoGraphQlDto extends EntityBaseGraphQlDto {
  @decorate(Field(() => String)) nome: string;
  @decorate(Field(() => String, { nullable: true })) descricao: string | null;
  @decorate(Field(() => String)) codigo: string;
  @decorate(Field(() => Int, { nullable: true })) capacidade: number | null;
  @decorate(Field(() => String, { nullable: true })) tipo: string | null;
}

// ============================================================================
// FindOne Output
// ============================================================================

@decorate(ObjectType("EventoFindOneOutputDto"))
export class EventoFindOneOutputGraphQlDto extends EntityBaseGraphQlDto {
  @decorate(Field(() => String, { nullable: true })) nome: string | null;
  @decorate(Field(() => String)) rrule: string;
  @decorate(Field(() => String, { nullable: true })) cor: string | null;
  @decorate(Field(() => String, { nullable: true })) dataInicio: string | null;
  @decorate(Field(() => String, { nullable: true })) dataFim: string | null;
  @decorate(Field(() => CalendarioLetivoFindOneOutputGraphQlDto))
  calendario: CalendarioLetivoFindOneOutputGraphQlDto;
  @decorate(Field(() => AmbienteFindOneOutputForEventoGraphQlDto, { nullable: true }))
  ambiente: AmbienteFindOneOutputForEventoGraphQlDto | null;
}

// ============================================================================
// Ref Input DTOs
// ============================================================================

@decorate(InputType("CalendarioLetivoRefInputForEventoDto"))
export class CalendarioLetivoRefInputForEventoGraphQlDto {
  @decorate(Field(() => String)) @decorate(IsString()) id: string;
}

@decorate(InputType("AmbienteRefInputForEventoDto"))
export class AmbienteRefInputForEventoGraphQlDto {
  @decorate(Field(() => String)) @decorate(IsString()) id: string;
}

// ============================================================================
// Create Input
// ============================================================================

@decorate(InputType("EventoCreateInputDto"))
export class EventoCreateInputGraphQlDto extends EventoFieldsMixin {
  @decorate(Field(() => String, { nullable: true })) declare nome?: string | null;
  @decorate(Field(() => String)) declare rrule: string;
  @decorate(Field(() => String, { nullable: true })) declare cor?: string | null;
  @decorate(Field(() => String, { nullable: true })) declare dataInicio?: string | null;
  @decorate(Field(() => String, { nullable: true })) declare dataFim?: string | null;

  @decorate(Field(() => CalendarioLetivoRefInputForEventoGraphQlDto))
  @decorate(ValidateNested())
  calendario: CalendarioLetivoRefInputForEventoGraphQlDto;

  @decorate(Field(() => AmbienteRefInputForEventoGraphQlDto, { nullable: true }))
  @decorate(IsOptional())
  @decorate(ValidateNested())
  ambiente?: AmbienteRefInputForEventoGraphQlDto | null;
}

// ============================================================================
// Update Input
// ============================================================================

@decorate(InputType("EventoUpdateInputDto"))
export class EventoUpdateInputGraphQlDto {
  @decorate(Field(() => String, { nullable: true }))
  @decorate(IsOptional())
  @decorate(IsString())
  nome?: string | null;
  @decorate(Field(() => String, { nullable: true }))
  @decorate(IsOptional())
  @decorate(IsString())
  rrule?: string;
  @decorate(Field(() => String, { nullable: true }))
  @decorate(IsOptional())
  @decorate(IsString())
  cor?: string | null;
  @decorate(Field(() => String, { nullable: true }))
  @decorate(IsOptional())
  @decorate(IsString())
  dataInicio?: string | null;
  @decorate(Field(() => String, { nullable: true }))
  @decorate(IsOptional())
  @decorate(IsString())
  dataFim?: string | null;

  @decorate(Field(() => CalendarioLetivoRefInputForEventoGraphQlDto, { nullable: true }))
  @decorate(IsOptional())
  @decorate(ValidateNested())
  calendario?: CalendarioLetivoRefInputForEventoGraphQlDto;

  @decorate(Field(() => AmbienteRefInputForEventoGraphQlDto, { nullable: true }))
  @decorate(IsOptional())
  @decorate(ValidateNested())
  ambiente?: AmbienteRefInputForEventoGraphQlDto | null;
}

// ============================================================================
// List Input
// ============================================================================

@decorate(ArgsType())
export class EventoListInputGraphQlDto extends PaginatedFilterByIdGraphQlDto {
  @decorate(
    Field(() => [String], { nullable: true, description: "Filtro por ID do Calendario Letivo" }),
  )
  @decorate(IsOptional())
  @decorate(IsArray())
  @decorate(IsUUID(undefined, { each: true }))
  filterCalendarioId?: string[];
}

// ============================================================================
// List Output
// ============================================================================

@decorate(ObjectType("EventoListResult"))
export class EventoListOutputGraphQlDto {
  @decorate(Field(() => PaginationMetaGraphQlDto))
  meta: PaginationMetaGraphQlDto;

  @decorate(Field(() => [EventoFindOneOutputGraphQlDto]))
  data: EventoFindOneOutputGraphQlDto[];
}

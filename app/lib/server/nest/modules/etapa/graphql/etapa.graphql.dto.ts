import { ArgsType, Field, InputType, Int, ObjectType } from "@nestjs/graphql";
import {
  IsArray,
  IsDateString,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min,
  ValidateNested,
} from "class-validator";
import { decorate } from "ts-mixer";
import {
  EntityBaseGraphQlDto,
  PaginatedFilterByIdGraphQlDto,
  PaginationMetaGraphQlDto,
} from "@/modules/@shared/infrastructure/graphql/dtos";
import { CalendarioLetivoFindOneOutputGraphQlDto } from "@/server/nest/modules/calendario-letivo/graphql/calendario-letivo.graphql.dto";
import { EtapaFieldsMixin } from "../etapa.validation-mixin";

// ============================================================================
// FindOne Output
// ============================================================================

@decorate(ObjectType("EtapaFindOneOutputDto"))
export class EtapaFindOneOutputGraphQlDto extends EntityBaseGraphQlDto {
  @decorate(Field(() => Int, { nullable: true })) numero: number | null;
  @decorate(Field(() => String)) dataInicio: string;
  @decorate(Field(() => String)) dataTermino: string;
  @decorate(Field(() => String, { nullable: true })) cor: string | null;
  @decorate(Field(() => CalendarioLetivoFindOneOutputGraphQlDto))
  calendario: CalendarioLetivoFindOneOutputGraphQlDto;
}

// ============================================================================
// Create Input
// ============================================================================

@decorate(InputType("CalendarioLetivoRefInputForEtapaDto"))
export class CalendarioLetivoRefInputForEtapaGraphQlDto {
  @decorate(Field(() => String)) @decorate(IsString()) id: string;
}

@decorate(InputType("EtapaCreateInputDto"))
export class EtapaCreateInputGraphQlDto extends EtapaFieldsMixin {
  @decorate(Field(() => Int, { nullable: true }))
  declare numero: number | null;

  @decorate(Field(() => String)) declare dataInicio: string;
  @decorate(Field(() => String)) declare dataTermino: string;

  @decorate(Field(() => String, { nullable: true })) declare cor: string | null;

  @decorate(Field(() => CalendarioLetivoRefInputForEtapaGraphQlDto))
  @decorate(ValidateNested())
  calendario: CalendarioLetivoRefInputForEtapaGraphQlDto;
}

// ============================================================================
// Update Input
// ============================================================================

@decorate(InputType("EtapaUpdateInputDto"))
export class EtapaUpdateInputGraphQlDto {
  @decorate(Field(() => Int, { nullable: true }))
  @decorate(IsOptional())
  @decorate(IsInt())
  @decorate(Min(0))
  @decorate(Max(255))
  numero?: number | null;

  @decorate(Field(() => String, { nullable: true }))
  @decorate(IsOptional())
  @decorate(IsDateString())
  dataInicio?: string;
  @decorate(Field(() => String, { nullable: true }))
  @decorate(IsOptional())
  @decorate(IsDateString())
  dataTermino?: string;
  @decorate(Field(() => String, { nullable: true }))
  @decorate(IsOptional())
  @decorate(IsString())
  cor?: string | null;

  @decorate(Field(() => CalendarioLetivoRefInputForEtapaGraphQlDto, { nullable: true }))
  @decorate(IsOptional())
  @decorate(ValidateNested())
  calendario?: CalendarioLetivoRefInputForEtapaGraphQlDto;
}

// ============================================================================
// List Input
// ============================================================================

@decorate(ArgsType())
export class EtapaListInputGraphQlDto extends PaginatedFilterByIdGraphQlDto {
  @decorate(Field(() => [String], { nullable: true, description: "Filtro por ID do Calendario" }))
  @decorate(IsOptional())
  @decorate(IsArray())
  @decorate(IsUUID(undefined, { each: true }))
  filterCalendarioId?: string[];
}

// ============================================================================
// List Output
// ============================================================================

@decorate(ObjectType("EtapaListResult"))
export class EtapaListOutputGraphQlDto {
  @decorate(Field(() => PaginationMetaGraphQlDto))
  meta: PaginationMetaGraphQlDto;

  @decorate(Field(() => [EtapaFindOneOutputGraphQlDto]))
  data: EtapaFindOneOutputGraphQlDto[];
}

import { ArgsType, Field, InputType, Int, ObjectType } from "@nestjs/graphql";
import {
  IsArray,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
  ValidateNested,
} from "class-validator";
import { decorate } from "ts-mixer";
import {
  EntityBaseGraphQlDto,
  PaginatedFilterByIdGraphQlDto,
  PaginationMetaGraphQlDto,
} from "@/modules/@shared/infrastructure/graphql/dtos";
import { CampusFindOneOutputGraphQlDto } from "@/server/nest/modules/campus/graphql/campus.graphql.dto";
import { OfertaFormacaoFindOneOutputGraphQlDto } from "@/server/nest/modules/oferta-formacao/graphql/oferta-formacao.graphql.dto";

// ============================================================================
// FindOne Output
// ============================================================================

@decorate(ObjectType("CalendarioLetivoFindOneOutputDto"))
export class CalendarioLetivoFindOneOutputGraphQlDto extends EntityBaseGraphQlDto {
  @decorate(Field(() => String)) nome: string;
  @decorate(Field(() => Int)) ano: number;
  @decorate(Field(() => CampusFindOneOutputGraphQlDto)) campus: CampusFindOneOutputGraphQlDto;
  @decorate(Field(() => OfertaFormacaoFindOneOutputGraphQlDto))
  ofertaFormacao: OfertaFormacaoFindOneOutputGraphQlDto;
}

// ============================================================================
// Ref Inputs
// ============================================================================

@decorate(InputType("CalendarioLetivoCampusRefInputDto"))
export class CalendarioLetivoCampusRefInputGraphQlDto {
  @decorate(Field(() => String)) @decorate(IsString()) id: string;
}

@decorate(InputType("CalendarioLetivoOfertaFormacaoRefInputDto"))
export class CalendarioLetivoOfertaFormacaoRefInputGraphQlDto {
  @decorate(Field(() => String)) @decorate(IsString()) id: string;
}

// ============================================================================
// Create Input
// ============================================================================

@decorate(InputType("CalendarioLetivoCreateInputDto"))
export class CalendarioLetivoCreateInputGraphQlDto {
  @decorate(Field(() => String)) @decorate(IsString()) @decorate(MinLength(1)) nome: string;
  @decorate(Field(() => Int)) @decorate(IsInt()) ano: number;
  @decorate(Field(() => CalendarioLetivoCampusRefInputGraphQlDto))
  @decorate(ValidateNested())
  campus: CalendarioLetivoCampusRefInputGraphQlDto;
  @decorate(Field(() => CalendarioLetivoOfertaFormacaoRefInputGraphQlDto))
  @decorate(ValidateNested())
  ofertaFormacao: CalendarioLetivoOfertaFormacaoRefInputGraphQlDto;
}

// ============================================================================
// Update Input
// ============================================================================

@decorate(InputType("CalendarioLetivoUpdateInputDto"))
export class CalendarioLetivoUpdateInputGraphQlDto {
  @decorate(Field(() => String, { nullable: true }))
  @decorate(IsOptional())
  @decorate(IsString())
  @decorate(MinLength(1))
  nome?: string;
  @decorate(Field(() => Int, { nullable: true }))
  @decorate(IsOptional())
  @decorate(IsInt())
  ano?: number;
  @decorate(Field(() => CalendarioLetivoCampusRefInputGraphQlDto, { nullable: true }))
  @decorate(IsOptional())
  @decorate(ValidateNested())
  campus?: CalendarioLetivoCampusRefInputGraphQlDto;
  @decorate(Field(() => CalendarioLetivoOfertaFormacaoRefInputGraphQlDto, { nullable: true }))
  @decorate(IsOptional())
  @decorate(ValidateNested())
  ofertaFormacao?: CalendarioLetivoOfertaFormacaoRefInputGraphQlDto;
}

// ============================================================================
// List Input (GraphQL-compatible - no dots in field names)
// ============================================================================

@decorate(ArgsType())
export class CalendarioLetivoListInputGraphQlDto extends PaginatedFilterByIdGraphQlDto {
  @decorate(Field(() => [String], { nullable: true, description: "Filtro por ID do Campus" }))
  @decorate(IsOptional())
  @decorate(IsArray())
  @decorate(IsUUID(undefined, { each: true }))
  filterCampusId?: string[];

  @decorate(
    Field(() => [String], { nullable: true, description: "Filtro por ID da Oferta de Formacao" }),
  )
  @decorate(IsOptional())
  @decorate(IsArray())
  @decorate(IsUUID(undefined, { each: true }))
  filterOfertaFormacaoId?: string[];
}

// ============================================================================
// List Output
// ============================================================================

@decorate(ObjectType("CalendarioLetivoListResult"))
export class CalendarioLetivoListOutputGraphQlDto {
  @decorate(Field(() => PaginationMetaGraphQlDto))
  meta: PaginationMetaGraphQlDto;

  @decorate(Field(() => [CalendarioLetivoFindOneOutputGraphQlDto]))
  data: CalendarioLetivoFindOneOutputGraphQlDto[];
}

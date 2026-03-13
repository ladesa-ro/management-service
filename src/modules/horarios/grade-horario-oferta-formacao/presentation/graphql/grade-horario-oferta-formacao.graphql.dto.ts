import { ArgsType, Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsArray, IsOptional, IsString, IsUUID, ValidateNested } from "class-validator";
import { decorate } from "ts-mixer";
import {
  EntityBaseGraphQlDto,
  PaginatedFilterByIdGraphQlDto,
  PaginationMetaGraphQlDto,
} from "@/modules/@shared/infrastructure/graphql/dtos";
import { CampusFindOneOutputGraphQlDto } from "@/modules/ambientes/campus/presentation/graphql/campus.graphql.dto";
import { OfertaFormacaoFindOneOutputGraphQlDto } from "@/modules/ensino/oferta-formacao/presentation/graphql/oferta-formacao.graphql.dto";

// ============================================================================
// FindOne Output
// ============================================================================

@decorate(ObjectType("GradeHorarioOfertaFormacaoFindOneOutputDto"))
export class GradeHorarioOfertaFormacaoFindOneOutputGraphQlDto extends EntityBaseGraphQlDto {
  @decorate(Field(() => CampusFindOneOutputGraphQlDto))
  campus: CampusFindOneOutputGraphQlDto;
  @decorate(Field(() => OfertaFormacaoFindOneOutputGraphQlDto))
  ofertaFormacao: OfertaFormacaoFindOneOutputGraphQlDto;
}

// ============================================================================
// Ref Input DTOs
// ============================================================================

@decorate(InputType("CampusRefInputForGradeHorarioOfertaFormacaoDto"))
export class CampusRefInputForGradeHorarioOfertaFormacaoGraphQlDto {
  @decorate(Field(() => String)) @decorate(IsString()) id: string;
}

@decorate(InputType("OfertaFormacaoRefInputForGradeHorarioOfertaFormacaoDto"))
export class OfertaFormacaoRefInputForGradeHorarioOfertaFormacaoGraphQlDto {
  @decorate(Field(() => String)) @decorate(IsString()) id: string;
}

// ============================================================================
// Create Input
// ============================================================================

@decorate(InputType("GradeHorarioOfertaFormacaoCreateInputDto"))
export class GradeHorarioOfertaFormacaoCreateInputGraphQlDto {
  @decorate(Field(() => CampusRefInputForGradeHorarioOfertaFormacaoGraphQlDto))
  @decorate(ValidateNested())
  campus: CampusRefInputForGradeHorarioOfertaFormacaoGraphQlDto;

  @decorate(Field(() => OfertaFormacaoRefInputForGradeHorarioOfertaFormacaoGraphQlDto))
  @decorate(ValidateNested())
  ofertaFormacao: OfertaFormacaoRefInputForGradeHorarioOfertaFormacaoGraphQlDto;
}

// ============================================================================
// Update Input
// ============================================================================

@decorate(InputType("GradeHorarioOfertaFormacaoUpdateInputDto"))
export class GradeHorarioOfertaFormacaoUpdateInputGraphQlDto {
  @decorate(Field(() => CampusRefInputForGradeHorarioOfertaFormacaoGraphQlDto, { nullable: true }))
  @decorate(IsOptional())
  @decorate(ValidateNested())
  campus?: CampusRefInputForGradeHorarioOfertaFormacaoGraphQlDto;

  @decorate(
    Field(() => OfertaFormacaoRefInputForGradeHorarioOfertaFormacaoGraphQlDto, { nullable: true }),
  )
  @decorate(IsOptional())
  @decorate(ValidateNested())
  ofertaFormacao?: OfertaFormacaoRefInputForGradeHorarioOfertaFormacaoGraphQlDto;
}

// ============================================================================
// List Input
// ============================================================================

@decorate(ArgsType())
export class GradeHorarioOfertaFormacaoListInputGraphQlDto extends PaginatedFilterByIdGraphQlDto {
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

@decorate(ObjectType("GradeHorarioOfertaFormacaoListResult"))
export class GradeHorarioOfertaFormacaoListOutputGraphQlDto {
  @decorate(Field(() => PaginationMetaGraphQlDto))
  meta: PaginationMetaGraphQlDto;

  @decorate(Field(() => [GradeHorarioOfertaFormacaoFindOneOutputGraphQlDto]))
  data: GradeHorarioOfertaFormacaoFindOneOutputGraphQlDto[];
}

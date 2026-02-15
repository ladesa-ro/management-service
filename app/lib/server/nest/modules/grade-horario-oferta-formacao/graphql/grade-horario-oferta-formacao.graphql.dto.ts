import { ArgsType, Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsArray, IsOptional, IsString, IsUUID, ValidateNested } from "class-validator";
import {
  EntityBaseGraphQlDto,
  PaginationMetaGraphQlDto,
} from "@/modules/@shared/infrastructure/graphql/dtos";
import { PaginationInputGraphQlDto } from "@/modules/@shared/infrastructure/graphql/dtos/pagination-graphql.dto";
import { CampusFindOneOutputGraphQlDto } from "@/server/nest/modules/campus/graphql/campus.graphql.dto";
import { OfertaFormacaoFindOneOutputGraphQlDto } from "@/server/nest/modules/oferta-formacao/graphql/oferta-formacao.graphql.dto";

// ============================================================================
// FindOne Output
// ============================================================================

@ObjectType("GradeHorarioOfertaFormacaoFindOneOutputDto")
export class GradeHorarioOfertaFormacaoFindOneOutputGraphQlDto extends EntityBaseGraphQlDto {
  @Field(() => CampusFindOneOutputGraphQlDto)
  campus: CampusFindOneOutputGraphQlDto;
  @Field(() => OfertaFormacaoFindOneOutputGraphQlDto)
  ofertaFormacao: OfertaFormacaoFindOneOutputGraphQlDto;
}

// ============================================================================
// Ref Input DTOs
// ============================================================================

@InputType("CampusRefInputForGradeHorarioOfertaFormacaoDto")
export class CampusRefInputForGradeHorarioOfertaFormacaoGraphQlDto {
  @Field() @IsString() id: string;
}

@InputType("OfertaFormacaoRefInputForGradeHorarioOfertaFormacaoDto")
export class OfertaFormacaoRefInputForGradeHorarioOfertaFormacaoGraphQlDto {
  @Field() @IsString() id: string;
}

// ============================================================================
// Create Input
// ============================================================================

@InputType("GradeHorarioOfertaFormacaoCreateInputDto")
export class GradeHorarioOfertaFormacaoCreateInputGraphQlDto {
  @Field(() => CampusRefInputForGradeHorarioOfertaFormacaoGraphQlDto)
  @ValidateNested()
  campus: CampusRefInputForGradeHorarioOfertaFormacaoGraphQlDto;

  @Field(() => OfertaFormacaoRefInputForGradeHorarioOfertaFormacaoGraphQlDto)
  @ValidateNested()
  ofertaFormacao: OfertaFormacaoRefInputForGradeHorarioOfertaFormacaoGraphQlDto;
}

// ============================================================================
// Update Input
// ============================================================================

@InputType("GradeHorarioOfertaFormacaoUpdateInputDto")
export class GradeHorarioOfertaFormacaoUpdateInputGraphQlDto {
  @Field(() => CampusRefInputForGradeHorarioOfertaFormacaoGraphQlDto, { nullable: true })
  @IsOptional()
  @ValidateNested()
  campus?: CampusRefInputForGradeHorarioOfertaFormacaoGraphQlDto;

  @Field(() => OfertaFormacaoRefInputForGradeHorarioOfertaFormacaoGraphQlDto, { nullable: true })
  @IsOptional()
  @ValidateNested()
  ofertaFormacao?: OfertaFormacaoRefInputForGradeHorarioOfertaFormacaoGraphQlDto;
}

// ============================================================================
// List Input
// ============================================================================

@ArgsType()
export class GradeHorarioOfertaFormacaoListInputGraphQlDto extends PaginationInputGraphQlDto {
  @Field(() => [String], { nullable: true, description: "Filtro por ID" })
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  filterId?: string[];

  @Field(() => [String], { nullable: true, description: "Filtro por ID do Campus" })
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  filterCampusId?: string[];

  @Field(() => [String], { nullable: true, description: "Filtro por ID da Oferta de Formacao" })
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  filterOfertaFormacaoId?: string[];
}

// ============================================================================
// List Output
// ============================================================================

@ObjectType("GradeHorarioOfertaFormacaoListResult")
export class GradeHorarioOfertaFormacaoListOutputGraphQlDto {
  @Field(() => PaginationMetaGraphQlDto)
  meta: PaginationMetaGraphQlDto;

  @Field(() => [GradeHorarioOfertaFormacaoFindOneOutputGraphQlDto])
  data: GradeHorarioOfertaFormacaoFindOneOutputGraphQlDto[];
}

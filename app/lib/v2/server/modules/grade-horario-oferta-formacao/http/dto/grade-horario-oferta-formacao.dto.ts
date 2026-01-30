import { ArgsType, Field, ID, InputType, ObjectType } from "@nestjs/graphql";
import { ApiProperty, ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsArray,
  IsDateString,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from "class-validator";
import { PaginationInputDto, PaginationMetaDto, TransformToArray } from "@/v2/old/shared/dto";
import {
  commonProperties,
  RegisterModel,
  referenceProperty,
  simpleProperty,
} from "@/v2/old/shared/metadata";
import { CampusFindOneInputDto, CampusFindOneOutputDto } from "@/v2/server/modules/campus/http/dto";
import {
  OfertaFormacaoFindOneInputDto,
  OfertaFormacaoFindOneOutputDto,
} from "@/v2/server/modules/oferta-formacao/http/dto";

// ============================================================================
// FindOne Output
// ============================================================================

@ObjectType("GradeHorarioOfertaFormacao")
@RegisterModel({
  name: "GradeHorarioOfertaFormacaoFindOneOutput",
  properties: [
    simpleProperty("id"),
    referenceProperty("campus", "CampusFindOneOutput"),
    referenceProperty("ofertaFormacao", "OfertaFormacaoFindOneOutput"),
    ...commonProperties.dated,
  ],
})
export class GradeHorarioOfertaFormacaoFindOneOutputDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @Field(() => ID)
  @IsUUID()
  id: string;

  @ApiProperty({ type: () => CampusFindOneOutputDto, description: "Campus da grade horaria" })
  @Field(() => CampusFindOneOutputDto)
  @ValidateNested()
  @Type(() => CampusFindOneOutputDto)
  campus: CampusFindOneOutputDto;

  @ApiProperty({
    type: () => OfertaFormacaoFindOneOutputDto,
    description: "Oferta de formacao da grade horaria",
  })
  @Field(() => OfertaFormacaoFindOneOutputDto)
  @ValidateNested()
  @Type(() => OfertaFormacaoFindOneOutputDto)
  ofertaFormacao: OfertaFormacaoFindOneOutputDto;

  @ApiProperty({ description: "Data e hora da criacao do registro" })
  @Field()
  @IsDateString()
  dateCreated: Date;

  @ApiProperty({ description: "Data e hora da alteracao do registro" })
  @Field()
  @IsDateString()
  dateUpdated: Date;

  @ApiPropertyOptional({ description: "Data e hora da exclusao do registro", nullable: true })
  @Field({ nullable: true })
  @IsOptional()
  @IsDateString()
  dateDeleted: Date | null;
}

// ============================================================================
// List Input/Output
// ============================================================================

@ArgsType()
@InputType("GradeHorarioOfertaFormacaoListInput")
export class GradeHorarioOfertaFormacaoListInputDto extends PaginationInputDto {
  @ApiPropertyOptional({
    description: "Filtro por ID",
    type: [String],
  })
  @TransformToArray()
  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.id"?: string[];
}

@ObjectType("GradeHorarioOfertaFormacaoListOutput")
export class GradeHorarioOfertaFormacaoListOutputDto {
  @ApiProperty({ type: () => PaginationMetaDto, description: "Metadados da busca" })
  @Field(() => PaginationMetaDto)
  meta: PaginationMetaDto;

  @ApiProperty({
    type: () => [GradeHorarioOfertaFormacaoFindOneOutputDto],
    description: "Resultados da busca",
  })
  @Field(() => [GradeHorarioOfertaFormacaoFindOneOutputDto])
  data: GradeHorarioOfertaFormacaoFindOneOutputDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@InputType("GradeHorarioOfertaFormacaoCreateInput")
export class GradeHorarioOfertaFormacaoCreateInputDto {
  @ApiProperty({ type: () => CampusFindOneInputDto, description: "Campus da grade horaria" })
  @Field(() => CampusFindOneInputDto)
  @ValidateNested()
  @Type(() => CampusFindOneInputDto)
  campus: CampusFindOneInputDto;

  @ApiProperty({
    type: () => OfertaFormacaoFindOneInputDto,
    description: "Oferta de formacao da grade horaria",
  })
  @Field(() => OfertaFormacaoFindOneInputDto)
  @ValidateNested()
  @Type(() => OfertaFormacaoFindOneInputDto)
  ofertaFormacao: OfertaFormacaoFindOneInputDto;
}

@InputType("GradeHorarioOfertaFormacaoUpdateInput")
export class GradeHorarioOfertaFormacaoUpdateInputDto extends PartialType(
  GradeHorarioOfertaFormacaoCreateInputDto,
) {}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@ArgsType()
@InputType("GradeHorarioOfertaFormacaoFindOneInput")
export class GradeHorarioOfertaFormacaoFindOneInputDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @Field(() => ID)
  @IsUUID()
  id: string;
}

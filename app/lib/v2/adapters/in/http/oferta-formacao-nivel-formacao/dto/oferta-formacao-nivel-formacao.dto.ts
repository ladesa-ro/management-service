import { ApiProperty, ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import { ArgsType, Field, ID, InputType, ObjectType } from "@nestjs/graphql";
import { IsArray, IsDateString, IsOptional, IsString, IsUUID, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { PaginationInputDto, PaginationMetaDto } from "@/shared/dto";
import { commonProperties, referenceProperty, RegisterModel, simpleProperty, } from "@/shared/metadata";
import {
  OfertaFormacaoFindOneInputDto,
  OfertaFormacaoFindOneOutputDto
} from "@/v2/adapters/in/http/oferta-formacao/dto";
import { NivelFormacaoFindOneInputDto, NivelFormacaoFindOneOutputDto } from "@/v2/adapters/in/http/nivel-formacao/dto";

// ============================================================================
// FindOne Output
// ============================================================================

@ObjectType("OfertaFormacaoNivelFormacao")
@RegisterModel({
  name: "OfertaFormacaoNivelFormacaoFindOneOutput",
  properties: [
    simpleProperty("id"),
    referenceProperty("ofertaFormacao", "OfertaFormacaoFindOneOutput"),
    referenceProperty("nivelFormacao", "NivelFormacaoFindOneOutput"),
    ...commonProperties.dated,
  ],
})
export class OfertaFormacaoNivelFormacaoFindOneOutputDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @Field(() => ID)
  @IsUUID()
  id: string;

  @ApiProperty({ type: () => OfertaFormacaoFindOneOutputDto, description: "Oferta de formacao" })
  @Field(() => OfertaFormacaoFindOneOutputDto)
  @ValidateNested()
  @Type(() => OfertaFormacaoFindOneOutputDto)
  ofertaFormacao: OfertaFormacaoFindOneOutputDto;

  @ApiProperty({ type: () => NivelFormacaoFindOneOutputDto, description: "Nivel de formacao" })
  @Field(() => NivelFormacaoFindOneOutputDto)
  @ValidateNested()
  @Type(() => NivelFormacaoFindOneOutputDto)
  nivelFormacao: NivelFormacaoFindOneOutputDto;

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
@InputType("OfertaFormacaoNivelFormacaoListInput")
export class OfertaFormacaoNivelFormacaoListInputDto extends PaginationInputDto {
  @ApiPropertyOptional({
    description: "Filtro por ID",
    type: [String],
  })
  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.id"?: string[];
}

@ObjectType("OfertaFormacaoNivelFormacaoListOutput")
export class OfertaFormacaoNivelFormacaoListOutputDto {
  @ApiProperty({ type: () => PaginationMetaDto, description: "Metadados da busca" })
  @Field(() => PaginationMetaDto)
  meta: PaginationMetaDto;

  @ApiProperty({ type: () => [OfertaFormacaoNivelFormacaoFindOneOutputDto], description: "Resultados da busca" })
  @Field(() => [OfertaFormacaoNivelFormacaoFindOneOutputDto])
  data: OfertaFormacaoNivelFormacaoFindOneOutputDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@InputType("OfertaFormacaoNivelFormacaoCreateInput")
export class OfertaFormacaoNivelFormacaoCreateInputDto {
  @ApiProperty({ type: () => OfertaFormacaoFindOneInputDto, description: "Oferta de formacao" })
  @Field(() => OfertaFormacaoFindOneInputDto)
  @ValidateNested()
  @Type(() => OfertaFormacaoFindOneInputDto)
  ofertaFormacao: OfertaFormacaoFindOneInputDto;

  @ApiProperty({ type: () => NivelFormacaoFindOneInputDto, description: "Nivel de formacao" })
  @Field(() => NivelFormacaoFindOneInputDto)
  @ValidateNested()
  @Type(() => NivelFormacaoFindOneInputDto)
  nivelFormacao: NivelFormacaoFindOneInputDto;
}

@InputType("OfertaFormacaoNivelFormacaoUpdateInput")
export class OfertaFormacaoNivelFormacaoUpdateInputDto extends PartialType(OfertaFormacaoNivelFormacaoCreateInputDto) {}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@ArgsType()
@InputType("OfertaFormacaoNivelFormacaoFindOneInput")
export class OfertaFormacaoNivelFormacaoFindOneInputDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @Field(() => ID)
  @IsUUID()
  id: string;
}

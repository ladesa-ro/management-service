import { ApiProperty, ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import { ArgsType, Field, ID, ObjectType, InputType } from "@nestjs/graphql";
import { IsUUID, IsString, MinLength, IsDateString, IsOptional, IsArray, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { PaginationInputDto, PaginationMetaDto } from "@/shared/dto";
import {
  RegisterModel,
  simpleProperty,
  referenceProperty,
  commonProperties,
} from "@/shared/metadata";
import { ModalidadeFindOneOutputDto, ModalidadeFindOneInputDto } from "@/v2/core/modalidade/dto";

// ============================================================================
// FindOne Output
// ============================================================================

@ObjectType("OfertaFormacao")
@RegisterModel({
  name: "OfertaFormacaoFindOneOutput",
  properties: [
    simpleProperty("id"),
    simpleProperty("nome"),
    simpleProperty("slug"),
    referenceProperty("modalidade", "ModalidadeFindOneOutput"),
    ...commonProperties.dated,
  ],
})
export class OfertaFormacaoFindOneOutputDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @Field(() => ID)
  @IsUUID()
  id: string;

  @ApiProperty({ description: "Nome da oferta de formacao", minLength: 1 })
  @Field()
  @IsString()
  @MinLength(1)
  nome: string;

  @ApiProperty({ description: "Apelido da oferta de formacao", minLength: 1 })
  @Field()
  @IsString()
  @MinLength(1)
  slug: string;

  @ApiProperty({ type: () => ModalidadeFindOneOutputDto, description: "Modalidade da oferta de formacao" })
  @Field(() => ModalidadeFindOneOutputDto)
  @ValidateNested()
  @Type(() => ModalidadeFindOneOutputDto)
  modalidade: ModalidadeFindOneOutputDto;

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
@InputType("OfertaFormacaoListInput")
export class OfertaFormacaoListInputDto extends PaginationInputDto {
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

@ObjectType("OfertaFormacaoListOutput")
export class OfertaFormacaoListOutputDto {
  @ApiProperty({ type: () => PaginationMetaDto, description: "Metadados da busca" })
  @Field(() => PaginationMetaDto)
  meta: PaginationMetaDto;

  @ApiProperty({ type: () => [OfertaFormacaoFindOneOutputDto], description: "Resultados da busca" })
  @Field(() => [OfertaFormacaoFindOneOutputDto])
  data: OfertaFormacaoFindOneOutputDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@InputType("OfertaFormacaoCreateInput")
export class OfertaFormacaoCreateInputDto {
  @ApiProperty({ description: "Nome da oferta de formacao", minLength: 1 })
  @Field()
  @IsString()
  @MinLength(1)
  nome: string;

  @ApiProperty({ description: "Apelido da oferta de formacao", minLength: 1 })
  @Field()
  @IsString()
  @MinLength(1)
  slug: string;

  @ApiProperty({ type: () => ModalidadeFindOneInputDto, description: "Modalidade da oferta de formacao" })
  @Field(() => ModalidadeFindOneInputDto)
  @ValidateNested()
  @Type(() => ModalidadeFindOneInputDto)
  modalidade: ModalidadeFindOneInputDto;
}

@InputType("OfertaFormacaoUpdateInput")
export class OfertaFormacaoUpdateInputDto extends PartialType(OfertaFormacaoCreateInputDto) {}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@ArgsType()
@InputType("OfertaFormacaoFindOneInput")
export class OfertaFormacaoFindOneInputDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @Field(() => ID)
  @IsUUID()
  id: string;
}

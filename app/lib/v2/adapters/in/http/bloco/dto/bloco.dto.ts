import { ApiProperty, ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import { ArgsType, Field, ID, InputType, ObjectType } from "@nestjs/graphql";
import { IsArray, IsDateString, IsOptional, IsString, IsUUID, MinLength, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { PaginationInputDto, PaginationMetaDto } from "@/shared/dto";
import { commonProperties, referenceProperty, RegisterModel, simpleProperty, } from "@/shared/metadata";
import { CampusFindOneInputDto, CampusFindOneOutputDto } from "@/v2/adapters/in/http/campus/dto";

// ============================================================================
// Imagem Stub DTOs (forward reference until imagem module has DTOs)
// ============================================================================

@ObjectType("ImagemFindOneOutputFromBloco")
export class ImagemFindOneOutputDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @Field(() => ID)
  @IsUUID()
  id: string;

  @ApiPropertyOptional({ description: "Descricao da imagem", nullable: true })
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  descricao: string | null;

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
// FindOne Output
// ============================================================================

@ObjectType("Bloco")
@RegisterModel({
  name: "BlocoFindOneOutput",
  properties: [
    simpleProperty("id"),
    simpleProperty("nome"),
    simpleProperty("codigo"),
    referenceProperty("campus", "CampusFindOneOutput"),
    referenceProperty("imagemCapa", "ImagemFindOneOutput", { nullable: true }),
    ...commonProperties.dated,
  ],
})
export class BlocoFindOneOutputDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @Field(() => ID)
  @IsUUID()
  id: string;

  @ApiProperty({ description: "Nome do bloco", minLength: 1 })
  @Field()
  @IsString()
  @MinLength(1)
  nome: string;

  @ApiProperty({ description: "Codigo do bloco", minLength: 1 })
  @Field()
  @IsString()
  @MinLength(1)
  codigo: string;

  @ApiProperty({ type: () => CampusFindOneOutputDto, description: "Campus do bloco" })
  @Field(() => CampusFindOneOutputDto)
  @ValidateNested()
  @Type(() => CampusFindOneOutputDto)
  campus: CampusFindOneOutputDto;

  @ApiPropertyOptional({ type: () => ImagemFindOneOutputDto, description: "Imagem de capa do bloco", nullable: true })
  @Field(() => ImagemFindOneOutputDto, { nullable: true })
  @IsOptional()
  @ValidateNested()
  @Type(() => ImagemFindOneOutputDto)
  imagemCapa: ImagemFindOneOutputDto | null;

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
@InputType("BlocoListInput")
export class BlocoListInputDto extends PaginationInputDto {
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

@ObjectType("BlocoListOutput")
export class BlocoListOutputDto {
  @ApiProperty({ type: () => PaginationMetaDto, description: "Metadados da busca" })
  @Field(() => PaginationMetaDto)
  meta: PaginationMetaDto;

  @ApiProperty({ type: () => [BlocoFindOneOutputDto], description: "Resultados da busca" })
  @Field(() => [BlocoFindOneOutputDto])
  data: BlocoFindOneOutputDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@InputType("BlocoCreateInput")
export class BlocoCreateInputDto {
  @ApiProperty({ description: "Nome do bloco", minLength: 1 })
  @Field()
  @IsString()
  @MinLength(1)
  nome: string;

  @ApiProperty({ description: "Codigo do bloco", minLength: 1 })
  @Field()
  @IsString()
  @MinLength(1)
  codigo: string;

  @ApiProperty({ type: () => CampusFindOneInputDto, description: "Campus do bloco" })
  @Field(() => CampusFindOneInputDto)
  @ValidateNested()
  @Type(() => CampusFindOneInputDto)
  campus: CampusFindOneInputDto;
}

@InputType("BlocoUpdateInput")
export class BlocoUpdateInputDto extends PartialType(BlocoCreateInputDto) {}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@ArgsType()
@InputType("BlocoFindOneInput")
export class BlocoFindOneInputDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @Field(() => ID)
  @IsUUID()
  id: string;
}

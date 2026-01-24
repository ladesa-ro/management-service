import { ApiProperty, ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import { ArgsType, Field, ID, Int, ObjectType, InputType } from "@nestjs/graphql";
import { IsUUID, IsString, MinLength, IsDateString, IsOptional, IsArray, IsInt, Min, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { PaginationInputDto, PaginationMetaDto } from "@/shared/dto";
import {
  RegisterModel,
  simpleProperty,
  referenceProperty,
  commonProperties,
} from "@/shared/metadata";
import { BlocoFindOneOutputDto, BlocoFindOneInputDto, ImagemFindOneOutputDto } from "@/v2/core/bloco/dto";

// ============================================================================
// FindOne Output
// ============================================================================

@ObjectType("Ambiente")
@RegisterModel({
  name: "AmbienteFindOneOutput",
  properties: [
    simpleProperty("id"),
    simpleProperty("nome"),
    simpleProperty("descricao", { nullable: true }),
    simpleProperty("codigo"),
    simpleProperty("capacidade", { nullable: true }),
    simpleProperty("tipo", { nullable: true }),
    referenceProperty("bloco", "BlocoFindOneOutput"),
    referenceProperty("imagemCapa", "ImagemFindOneOutput", { nullable: true }),
    ...commonProperties.dated,
  ],
})
export class AmbienteFindOneOutputDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @Field(() => ID)
  @IsUUID()
  id: string;

  @ApiProperty({ description: "Nome do ambiente/sala", minLength: 1 })
  @Field()
  @IsString()
  @MinLength(1)
  nome: string;

  @ApiPropertyOptional({ description: "Descricao do ambiente/sala", nullable: true })
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  descricao: string | null;

  @ApiProperty({ description: "Codigo do ambiente/sala", minLength: 1 })
  @Field()
  @IsString()
  @MinLength(1)
  codigo: string;

  @ApiPropertyOptional({ description: "Capacidade do ambiente/sala", nullable: true })
  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(0)
  capacidade: number | null;

  @ApiPropertyOptional({ description: "Tipo do ambiente/sala. Ex.: sala aula, auditorio, laboratorio de quimica", nullable: true })
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  tipo: string | null;

  @ApiProperty({ type: () => BlocoFindOneOutputDto, description: "Bloco que o ambiente/sala pertence" })
  @Field(() => BlocoFindOneOutputDto)
  @ValidateNested()
  @Type(() => BlocoFindOneOutputDto)
  bloco: BlocoFindOneOutputDto;

  @ApiPropertyOptional({ type: () => ImagemFindOneOutputDto, description: "Imagem de capa do ambiente", nullable: true })
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
@InputType("AmbienteListInput")
export class AmbienteListInputDto extends PaginationInputDto {
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

@ObjectType("AmbienteListOutput")
export class AmbienteListOutputDto {
  @ApiProperty({ type: () => PaginationMetaDto, description: "Metadados da busca" })
  @Field(() => PaginationMetaDto)
  meta: PaginationMetaDto;

  @ApiProperty({ type: () => [AmbienteFindOneOutputDto], description: "Resultados da busca" })
  @Field(() => [AmbienteFindOneOutputDto])
  data: AmbienteFindOneOutputDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@InputType("AmbienteCreateInput")
export class AmbienteCreateInputDto {
  @ApiProperty({ description: "Nome do ambiente/sala", minLength: 1 })
  @Field()
  @IsString()
  @MinLength(1)
  nome: string;

  @ApiPropertyOptional({ description: "Descricao do ambiente/sala", nullable: true })
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  descricao?: string | null;

  @ApiProperty({ description: "Codigo do ambiente/sala", minLength: 1 })
  @Field()
  @IsString()
  @MinLength(1)
  codigo: string;

  @ApiPropertyOptional({ description: "Capacidade do ambiente/sala", nullable: true })
  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(0)
  capacidade?: number | null;

  @ApiPropertyOptional({ description: "Tipo do ambiente/sala. Ex.: sala aula, auditorio, laboratorio de quimica", nullable: true })
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  tipo?: string | null;

  @ApiProperty({ type: () => BlocoFindOneInputDto, description: "Bloco que o ambiente/sala pertence" })
  @Field(() => BlocoFindOneInputDto)
  @ValidateNested()
  @Type(() => BlocoFindOneInputDto)
  bloco: BlocoFindOneInputDto;
}

@InputType("AmbienteUpdateInput")
export class AmbienteUpdateInputDto extends PartialType(AmbienteCreateInputDto) {}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@ArgsType()
@InputType("AmbienteFindOneInput")
export class AmbienteFindOneInputDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @Field(() => ID)
  @IsUUID()
  id: string;
}

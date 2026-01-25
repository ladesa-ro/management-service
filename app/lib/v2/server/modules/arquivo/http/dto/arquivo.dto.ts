import { ArgsType, Field, ID, InputType, Int, ObjectType } from "@nestjs/graphql";
import { ApiProperty, ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import {
  IsArray,
  IsDateString,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Min,
  MinLength,
} from "class-validator";
import { PaginationInputDto, PaginationMetaDto } from "@/shared/dto";
import { commonProperties, RegisterModel, simpleProperty } from "@/shared/metadata";

// ============================================================================
// FindOne Output
// ============================================================================

@ObjectType("Arquivo")
@RegisterModel({
  name: "ArquivoFindOneOutput",
  properties: [
    simpleProperty("id"),
    simpleProperty("name"),
    simpleProperty("mimeType"),
    simpleProperty("sizeBytes"),
    simpleProperty("storageType"),
    ...commonProperties.dated,
  ],
})
export class ArquivoFindOneOutputDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @Field(() => ID)
  @IsUUID()
  id: string;

  @ApiPropertyOptional({ description: "Nome do arquivo", nullable: true, minLength: 1 })
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MinLength(1)
  name: string | null;

  @ApiPropertyOptional({ description: "Formato do arquivo", nullable: true, minLength: 1 })
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MinLength(1)
  mimeType: string | null;

  @ApiPropertyOptional({ description: "Tamanho do arquivo (em bytes)", nullable: true })
  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(0)
  sizeBytes: number | null;

  @ApiProperty({ description: "Estratégia de armazenamento do conteúdo", minLength: 1 })
  @Field()
  @IsString()
  @MinLength(1)
  storageType: string;

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
@InputType("ArquivoListInput")
export class ArquivoListInputDto extends PaginationInputDto {
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

@ObjectType("ArquivoListOutput")
export class ArquivoListOutputDto {
  @ApiProperty({ type: () => PaginationMetaDto, description: "Metadados da busca" })
  @Field(() => PaginationMetaDto)
  meta: PaginationMetaDto;

  @ApiProperty({ type: () => [ArquivoFindOneOutputDto], description: "Resultados da busca" })
  @Field(() => [ArquivoFindOneOutputDto])
  data: ArquivoFindOneOutputDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@InputType("ArquivoCreateInput")
export class ArquivoCreateInputDto {
  @ApiPropertyOptional({ description: "Nome do arquivo", nullable: true, minLength: 1 })
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MinLength(1)
  name?: string | null;

  @ApiPropertyOptional({ description: "Formato do arquivo", nullable: true, minLength: 1 })
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MinLength(1)
  mimeType?: string | null;

  @ApiPropertyOptional({ description: "Tamanho do arquivo (em bytes)", nullable: true })
  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(0)
  sizeBytes?: number | null;

  @ApiProperty({ description: "Estratégia de armazenamento do conteúdo", minLength: 1 })
  @Field()
  @IsString()
  @MinLength(1)
  storageType: string;
}

@InputType("ArquivoUpdateInput")
export class ArquivoUpdateInputDto extends PartialType(ArquivoCreateInputDto) {}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@ArgsType()
export class ArquivoFindOneInputDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @Field(() => ID)
  @IsUUID()
  id: string;
}

// ============================================================================
// GetFile Query Input
// ============================================================================

@ArgsType()
export class ArquivoGetFileQueryInputDto {
  @ApiPropertyOptional({ description: "ID do recurso de acesso (uuid)", format: "uuid" })
  @Field({ nullable: true })
  @IsOptional()
  @IsUUID()
  "acesso.recurso.id"?: string;

  @ApiPropertyOptional({ description: "Nome do recurso de acesso" })
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  "acesso.recurso.nome"?: string;
}

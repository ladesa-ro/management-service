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
import { ImagemFindOneOutputDto } from "@/v2/core/bloco/dto";

// ============================================================================
// FindOne Output
// ============================================================================

@ObjectType("Disciplina")
@RegisterModel({
  name: "DisciplinaFindOneOutput",
  properties: [
    simpleProperty("id"),
    simpleProperty("nome"),
    simpleProperty("nomeAbreviado"),
    simpleProperty("cargaHoraria"),
    referenceProperty("imagemCapa", "ImagemFindOneOutput", { nullable: true }),
    ...commonProperties.dated,
  ],
})
export class DisciplinaFindOneOutputDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @Field(() => ID)
  @IsUUID()
  id: string;

  @ApiProperty({ description: "Nome da disciplina", minLength: 1 })
  @Field()
  @IsString()
  @MinLength(1)
  nome: string;

  @ApiProperty({ description: "Nome abreviado da disciplina", minLength: 1 })
  @Field()
  @IsString()
  @MinLength(1)
  nomeAbreviado: string;

  @ApiProperty({ description: "Carga horaria da disciplina", minimum: 1 })
  @Field(() => Int)
  @IsInt()
  @Min(1)
  cargaHoraria: number;

  @ApiPropertyOptional({ type: () => ImagemFindOneOutputDto, description: "Imagem de capa da disciplina", nullable: true })
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
@InputType("DisciplinaListInput")
export class DisciplinaListInputDto extends PaginationInputDto {
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

@ObjectType("DisciplinaListOutput")
export class DisciplinaListOutputDto {
  @ApiProperty({ type: () => PaginationMetaDto, description: "Metadados da busca" })
  @Field(() => PaginationMetaDto)
  meta: PaginationMetaDto;

  @ApiProperty({ type: () => [DisciplinaFindOneOutputDto], description: "Resultados da busca" })
  @Field(() => [DisciplinaFindOneOutputDto])
  data: DisciplinaFindOneOutputDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@InputType("DisciplinaCreateInput")
export class DisciplinaCreateInputDto {
  @ApiProperty({ description: "Nome da disciplina", minLength: 1 })
  @Field()
  @IsString()
  @MinLength(1)
  nome: string;

  @ApiProperty({ description: "Nome abreviado da disciplina", minLength: 1 })
  @Field()
  @IsString()
  @MinLength(1)
  nomeAbreviado: string;

  @ApiProperty({ description: "Carga horaria da disciplina", minimum: 1 })
  @Field(() => Int)
  @IsInt()
  @Min(1)
  cargaHoraria: number;
}

@InputType("DisciplinaUpdateInput")
export class DisciplinaUpdateInputDto extends PartialType(DisciplinaCreateInputDto) {}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@ArgsType()
@InputType("DisciplinaFindOneInput")
export class DisciplinaFindOneInputDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @Field(() => ID)
  @IsUUID()
  id: string;
}

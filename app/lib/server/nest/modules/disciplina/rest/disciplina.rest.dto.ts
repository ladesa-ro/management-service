import { ArgsType, Field, ID, InputType, Int, ObjectType, PartialType } from "@nestjs/graphql";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsArray,
  IsDateString,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Min,
  MinLength,
  ValidateNested,
} from "class-validator";
import {
  commonProperties,
  RegisterModel,
  referenceProperty,
  simpleProperty,
} from "@/modules/@shared/infrastructure/persistence/typeorm/metadata";
import {
  PaginationInputDto,
  PaginationMetaDto,
  TransformToArray,
} from "@/modules/@shared/infrastructure/presentation/rest/dtos";
import { ImagemFindOneOutputDto } from "@/server/nest/modules/bloco/rest";

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

  @ApiPropertyOptional({
    type: () => ImagemFindOneOutputDto,
    description: "Imagem de capa da disciplina",
    nullable: true,
  })
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
  @Field(() => Date, { nullable: true })
  @IsOptional()
  @IsDateString()
  dateDeleted: Date | null;
}

// ============================================================================
// List Input/Output
// ============================================================================

@ArgsType()
export class DisciplinaListInputDto extends PaginationInputDto {
  @ApiPropertyOptional({
    description: "Filtro por ID",
    type: [String],
  })
  @TransformToArray()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.id"?: string[];

  @ApiPropertyOptional({
    description: "Filtro por ID dos Diarios",
    type: [String],
  })
  @TransformToArray()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.diarios.id"?: string[];
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

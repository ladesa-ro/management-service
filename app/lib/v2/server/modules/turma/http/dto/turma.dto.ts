import { ArgsType, Field, ID, InputType, ObjectType } from "@nestjs/graphql";
import { ApiProperty, ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsArray,
  IsDateString,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
  ValidateNested,
} from "class-validator";
import { PaginationInputDto, PaginationMetaDto } from "@/shared/dto";
import {
  commonProperties,
  RegisterModel,
  referenceProperty,
  simpleProperty,
} from "@/shared/metadata";
import {
  AmbienteFindOneInputDto,
  AmbienteFindOneOutputDto,
} from "@/v2/server/modules/ambiente/http/dto";
import { ImagemFindOneOutputDto } from "@/v2/server/modules/bloco/http/dto";
import { CursoFindOneInputDto, CursoFindOneOutputDto } from "@/v2/server/modules/curso/http/dto";

// ============================================================================
// FindOne Output
// ============================================================================

@ObjectType("Turma")
@RegisterModel({
  name: "TurmaFindOneOutput",
  properties: [
    simpleProperty("id"),
    simpleProperty("periodo"),
    referenceProperty("curso", "CursoFindOneOutput"),
    referenceProperty("ambientePadraoAula", "AmbienteFindOneOutput", { nullable: true }),
    referenceProperty("imagemCapa", "ImagemFindOneOutput", { nullable: true }),
    ...commonProperties.dated,
  ],
})
export class TurmaFindOneOutputDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @Field(() => ID)
  @IsUUID()
  id: string;

  @ApiProperty({ description: "Periodo da turma", minLength: 1 })
  @Field()
  @IsString()
  @MinLength(1)
  periodo: string;

  @ApiProperty({ type: () => CursoFindOneOutputDto, description: "Curso da turma" })
  @Field(() => CursoFindOneOutputDto)
  @ValidateNested()
  @Type(() => CursoFindOneOutputDto)
  curso: CursoFindOneOutputDto;

  @ApiPropertyOptional({
    type: () => AmbienteFindOneOutputDto,
    description: "Ambiente padrao da sala de aula",
    nullable: true,
  })
  @Field(() => AmbienteFindOneOutputDto, { nullable: true })
  @IsOptional()
  @ValidateNested()
  @Type(() => AmbienteFindOneOutputDto)
  ambientePadraoAula: AmbienteFindOneOutputDto | null;

  @ApiPropertyOptional({
    type: () => ImagemFindOneOutputDto,
    description: "Imagem de capa da turma",
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
  @Field({ nullable: true })
  @IsOptional()
  @IsDateString()
  dateDeleted: Date | null;
}

// ============================================================================
// List Input/Output
// ============================================================================

@ArgsType()
@InputType("TurmaListInput")
export class TurmaListInputDto extends PaginationInputDto {
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

@ObjectType("TurmaListOutput")
export class TurmaListOutputDto {
  @ApiProperty({ type: () => PaginationMetaDto, description: "Metadados da busca" })
  @Field(() => PaginationMetaDto)
  meta: PaginationMetaDto;

  @ApiProperty({ type: () => [TurmaFindOneOutputDto], description: "Resultados da busca" })
  @Field(() => [TurmaFindOneOutputDto])
  data: TurmaFindOneOutputDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@InputType("TurmaCreateInput")
export class TurmaCreateInputDto {
  @ApiProperty({ description: "Periodo da turma", minLength: 1 })
  @Field()
  @IsString()
  @MinLength(1)
  periodo: string;

  @ApiProperty({ type: () => CursoFindOneInputDto, description: "Curso da turma" })
  @Field(() => CursoFindOneInputDto)
  @ValidateNested()
  @Type(() => CursoFindOneInputDto)
  curso: CursoFindOneInputDto;

  @ApiPropertyOptional({
    type: () => AmbienteFindOneInputDto,
    description: "Ambiente padrao da sala de aula",
    nullable: true,
  })
  @Field(() => AmbienteFindOneInputDto, { nullable: true })
  @IsOptional()
  @ValidateNested()
  @Type(() => AmbienteFindOneInputDto)
  ambientePadraoAula?: AmbienteFindOneInputDto | null;
}

@InputType("TurmaUpdateInput")
export class TurmaUpdateInputDto extends PartialType(TurmaCreateInputDto) {}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@ArgsType()
@InputType("TurmaFindOneInput")
export class TurmaFindOneInputDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @Field(() => ID)
  @IsUUID()
  id: string;
}

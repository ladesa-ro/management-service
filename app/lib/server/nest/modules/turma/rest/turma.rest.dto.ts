import { ApiProperty, ApiPropertyOptional, ApiSchema, PartialType } from "@nestjs/swagger";
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
import {
  commonProperties,
  RegisterModel,
  referenceProperty,
  simpleProperty,
} from "@/modules/@shared/infrastructure/persistence/typeorm/metadata";
import {
  PaginationInputRestDto,
  PaginationMetaRestDto,
  TransformToArray,
} from "@/modules/@shared/infrastructure/presentation/rest/dtos";
import {
  AmbienteFindOneInputRestDto,
  AmbienteFindOneOutputRestDto,
} from "@/server/nest/modules/ambiente/rest";
import { ImagemFindOneOutputRestDto } from "@/server/nest/modules/bloco/rest";
import {
  CursoFindOneInputRestDto,
  CursoFindOneOutputRestDto,
} from "@/server/nest/modules/curso/rest";

// ============================================================================
// FindOne Output
// ============================================================================

@ApiSchema({ name: "TurmaFindOneOutputDto" })
@RegisterModel({
  name: "TurmaFindOneOutputDto",
  properties: [
    simpleProperty("id"),
    simpleProperty("periodo"),
    referenceProperty("curso", "CursoFindOneOutputDto"),
    referenceProperty("ambientePadraoAula", "AmbienteFindOneOutputDto", { nullable: true }),
    referenceProperty("imagemCapa", "ImagemFindOneOutputDto", { nullable: true }),
    ...commonProperties.dated,
  ],
})
export class TurmaFindOneOutputRestDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @IsUUID()
  id: string;

  @ApiProperty({ description: "Periodo da turma", minLength: 1 })
  @IsString()
  @MinLength(1)
  periodo: string;

  @ApiProperty({ type: () => CursoFindOneOutputRestDto, description: "Curso da turma" })
  @ValidateNested()
  @Type(() => CursoFindOneOutputRestDto)
  curso: CursoFindOneOutputRestDto;

  @ApiPropertyOptional({
    type: () => AmbienteFindOneOutputRestDto,
    description: "Ambiente padrao da sala de aula",
    nullable: true,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => AmbienteFindOneOutputRestDto)
  ambientePadraoAula: AmbienteFindOneOutputRestDto | null;

  @ApiPropertyOptional({
    type: () => ImagemFindOneOutputRestDto,
    description: "Imagem de capa da turma",
    nullable: true,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => ImagemFindOneOutputRestDto)
  imagemCapa: ImagemFindOneOutputRestDto | null;

  @ApiProperty({ description: "Data e hora da criacao do registro" })
  @IsDateString()
  dateCreated: Date;

  @ApiProperty({ description: "Data e hora da alteracao do registro" })
  @IsDateString()
  dateUpdated: Date;

  @ApiPropertyOptional({ description: "Data e hora da exclusao do registro", nullable: true })
  @IsOptional()
  @IsDateString()
  dateDeleted: Date | null;
}

// ============================================================================
// List Input/Output
// ============================================================================

@ApiSchema({ name: "TurmaListInputDto" })
export class TurmaListInputRestDto extends PaginationInputRestDto {
  @ApiPropertyOptional({
    description: "Filtro por ID",
    type: [String],
  })
  @TransformToArray()
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  "filter.id"?: string[];

  @ApiPropertyOptional({
    description: "Filtro por nome do Ambiente Padrao de Aula",
    type: [String],
  })
  @TransformToArray()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.ambientePadraoAula.nome"?: string[];

  @ApiPropertyOptional({
    description: "Filtro por codigo do Ambiente Padrao de Aula",
    type: [String],
  })
  @TransformToArray()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.ambientePadraoAula.codigo"?: string[];

  @ApiPropertyOptional({
    description: "Filtro por capacidade do Ambiente Padrao de Aula",
    type: [String],
  })
  @TransformToArray()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.ambientePadraoAula.capacidade"?: string[];

  @ApiPropertyOptional({
    description: "Filtro por tipo do Ambiente Padrao de Aula",
    type: [String],
  })
  @TransformToArray()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.ambientePadraoAula.tipo"?: string[];

  @ApiPropertyOptional({
    description: "Filtro por ID do Curso",
    type: [String],
  })
  @TransformToArray()
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  "filter.curso.id"?: string[];

  @ApiPropertyOptional({
    description: "Filtro por nome do Curso",
    type: [String],
  })
  @TransformToArray()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.curso.nome"?: string[];

  @ApiPropertyOptional({
    description: "Filtro por nome abreviado do Curso",
    type: [String],
  })
  @TransformToArray()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.curso.nomeAbreviado"?: string[];

  @ApiPropertyOptional({
    description: "Filtro por ID do Campus do Curso",
    type: [String],
  })
  @TransformToArray()
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  "filter.curso.campus.id"?: string[];

  @ApiPropertyOptional({
    description: "Filtro por ID da Oferta de Formacao do Curso",
    type: [String],
  })
  @TransformToArray()
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  "filter.curso.ofertaFormacao.id"?: string[];

  @ApiPropertyOptional({
    description: "Filtro por nome da Oferta de Formacao do Curso",
    type: [String],
  })
  @TransformToArray()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.curso.ofertaFormacao.nome"?: string[];

  @ApiPropertyOptional({
    description: "Filtro por slug da Oferta de Formacao do Curso",
    type: [String],
  })
  @TransformToArray()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.curso.ofertaFormacao.slug"?: string[];
}

@ApiSchema({ name: "TurmaListOutputDto" })
export class TurmaListOutputRestDto {
  @ApiProperty({ type: () => PaginationMetaRestDto, description: "Metadados da busca" })
  meta: PaginationMetaRestDto;

  @ApiProperty({ type: () => [TurmaFindOneOutputRestDto], description: "Resultados da busca" })
  data: TurmaFindOneOutputRestDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@ApiSchema({ name: "TurmaCreateInputDto" })
export class TurmaCreateInputRestDto {
  @ApiProperty({ description: "Periodo da turma", minLength: 1 })
  @IsString()
  @MinLength(1)
  periodo: string;

  @ApiProperty({ type: () => CursoFindOneInputRestDto, description: "Curso da turma" })
  @ValidateNested()
  @Type(() => CursoFindOneInputRestDto)
  curso: CursoFindOneInputRestDto;

  @ApiPropertyOptional({
    type: () => AmbienteFindOneInputRestDto,
    description: "Ambiente padrao da sala de aula",
    nullable: true,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => AmbienteFindOneInputRestDto)
  ambientePadraoAula?: AmbienteFindOneInputRestDto | null;
}

@ApiSchema({ name: "TurmaUpdateInputDto" })
export class TurmaUpdateInputRestDto extends PartialType(TurmaCreateInputRestDto) {}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@ApiSchema({ name: "TurmaFindOneInputDto" })
export class TurmaFindOneInputRestDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @IsUUID()
  id: string;
}

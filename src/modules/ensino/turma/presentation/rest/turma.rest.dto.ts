import { Mixin } from "ts-mixer";
import {
  EntityBaseRestDto,
  PaginatedFilterByIdRestDto,
  PaginationMetaRestDto,
} from "@/modules/@shared/infrastructure/presentation/rest/dtos";
import {
  ApiProperty,
  ApiPropertyOptional,
  ApiSchema,
  commonProperties,
  PartialType,
  RegisterModel,
  referenceProperty,
  simpleProperty,
  TransformToArray,
} from "@/modules/@shared/presentation/rest";
import {
  IsArray,
  IsOptional,
  IsString,
  IsUUID,
  Type,
  ValidateNested,
} from "@/modules/@shared/presentation/shared";
import {
  AmbienteFindOneInputRestDto,
  AmbienteFindOneOutputRestDto,
} from "@/modules/ambientes/ambiente/presentation/rest";
import { ImagemFindOneOutputRestDto } from "@/modules/ambientes/bloco/presentation/rest";
import {
  CursoFindOneInputRestDto,
  CursoFindOneOutputRestDto,
} from "@/modules/ensino/curso/presentation/rest";
import { TurmaFieldsMixin } from "@/modules/ensino/turma/presentation/turma.validation-mixin";

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
export class TurmaFindOneOutputRestDto extends Mixin(EntityBaseRestDto, TurmaFieldsMixin) {
  @ApiProperty({ type: "string", description: "Periodo da turma", minLength: 1 })
  declare periodo: string;

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
}

// ============================================================================
// List Input/Output
// ============================================================================

@ApiSchema({ name: "TurmaListInputDto" })
export class TurmaListInputRestDto extends PaginatedFilterByIdRestDto {
  @ApiPropertyOptional({
    type: "string",
    isArray: true,
    description: "Filtro por nome do Ambiente Padrao de Aula",
  })
  @TransformToArray()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.ambientePadraoAula.nome"?: string[];

  @ApiPropertyOptional({
    type: "string",
    isArray: true,
    description: "Filtro por codigo do Ambiente Padrao de Aula",
  })
  @TransformToArray()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.ambientePadraoAula.codigo"?: string[];

  @ApiPropertyOptional({
    type: "string",
    isArray: true,
    description: "Filtro por capacidade do Ambiente Padrao de Aula",
  })
  @TransformToArray()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.ambientePadraoAula.capacidade"?: string[];

  @ApiPropertyOptional({
    type: "string",
    isArray: true,
    description: "Filtro por tipo do Ambiente Padrao de Aula",
  })
  @TransformToArray()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.ambientePadraoAula.tipo"?: string[];

  @ApiPropertyOptional({
    type: "string",
    isArray: true,
    description: "Filtro por ID do Curso",
  })
  @TransformToArray()
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  "filter.curso.id"?: string[];

  @ApiPropertyOptional({
    type: "string",
    isArray: true,
    description: "Filtro por nome do Curso",
  })
  @TransformToArray()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.curso.nome"?: string[];

  @ApiPropertyOptional({
    type: "string",
    isArray: true,
    description: "Filtro por nome abreviado do Curso",
  })
  @TransformToArray()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.curso.nomeAbreviado"?: string[];

  @ApiPropertyOptional({
    type: "string",
    isArray: true,
    description: "Filtro por ID do Campus do Curso",
  })
  @TransformToArray()
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  "filter.curso.campus.id"?: string[];

  @ApiPropertyOptional({
    type: "string",
    isArray: true,
    description: "Filtro por ID da Oferta de Formacao do Curso",
  })
  @TransformToArray()
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  "filter.curso.ofertaFormacao.id"?: string[];

  @ApiPropertyOptional({
    type: "string",
    isArray: true,
    description: "Filtro por nome da Oferta de Formacao do Curso",
  })
  @TransformToArray()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.curso.ofertaFormacao.nome"?: string[];

  @ApiPropertyOptional({
    type: "string",
    isArray: true,
    description: "Filtro por slug da Oferta de Formacao do Curso",
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
export class TurmaCreateInputRestDto extends TurmaFieldsMixin {
  @ApiProperty({ type: "string", description: "Periodo da turma", minLength: 1 })
  declare periodo: string;

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
  @ApiProperty({
    type: "string",
    description: "Identificador do registro (uuid)",
    format: "uuid",
  })
  @IsUUID()
  id: string;
}

import { ApiProperty, ApiPropertyOptional, ApiSchema, PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsOptional, IsString, IsUUID, ValidateNested } from "class-validator";
import { decorate, Mixin } from "ts-mixer";
import {
  commonProperties,
  RegisterModel,
  referenceProperty,
  simpleProperty,
} from "@/modules/@shared/infrastructure/persistence/typeorm/metadata";
import {
  EntityBaseRestDto,
  PaginatedFilterByIdRestDto,
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
import { TurmaFieldsMixin } from "@/server/nest/modules/turma/turma.validation-mixin";

// ============================================================================
// FindOne Output
// ============================================================================

@decorate(ApiSchema({ name: "TurmaFindOneOutputDto" }))
@decorate(
  RegisterModel({
    name: "TurmaFindOneOutputDto",
    properties: [
      simpleProperty("id"),
      simpleProperty("periodo"),
      referenceProperty("curso", "CursoFindOneOutputDto"),
      referenceProperty("ambientePadraoAula", "AmbienteFindOneOutputDto", { nullable: true }),
      referenceProperty("imagemCapa", "ImagemFindOneOutputDto", { nullable: true }),
      ...commonProperties.dated,
    ],
  }),
)
export class TurmaFindOneOutputRestDto extends Mixin(EntityBaseRestDto, TurmaFieldsMixin) {
  @decorate(ApiProperty({ type: "string", description: "Periodo da turma", minLength: 1 }))
  declare periodo: string;

  @decorate(ApiProperty({ type: () => CursoFindOneOutputRestDto, description: "Curso da turma" }))
  @decorate(ValidateNested())
  @decorate(Type(() => CursoFindOneOutputRestDto))
  curso: CursoFindOneOutputRestDto;

  @decorate(
    ApiPropertyOptional({
      type: () => AmbienteFindOneOutputRestDto,
      description: "Ambiente padrao da sala de aula",
      nullable: true,
    }),
  )
  @decorate(IsOptional())
  @decorate(ValidateNested())
  @decorate(Type(() => AmbienteFindOneOutputRestDto))
  ambientePadraoAula: AmbienteFindOneOutputRestDto | null;

  @decorate(
    ApiPropertyOptional({
      type: () => ImagemFindOneOutputRestDto,
      description: "Imagem de capa da turma",
      nullable: true,
    }),
  )
  @decorate(IsOptional())
  @decorate(ValidateNested())
  @decorate(Type(() => ImagemFindOneOutputRestDto))
  imagemCapa: ImagemFindOneOutputRestDto | null;
}

// ============================================================================
// List Input/Output
// ============================================================================

@decorate(ApiSchema({ name: "TurmaListInputDto" }))
export class TurmaListInputRestDto extends PaginatedFilterByIdRestDto {
  @decorate(
    ApiPropertyOptional({
      type: "string",
      isArray: true,
      description: "Filtro por nome do Ambiente Padrao de Aula",
    }),
  )
  @decorate(TransformToArray())
  @decorate(IsOptional())
  @decorate(IsArray())
  @decorate(IsString({ each: true }))
  "filter.ambientePadraoAula.nome"?: string[];

  @decorate(
    ApiPropertyOptional({
      type: "string",
      isArray: true,
      description: "Filtro por codigo do Ambiente Padrao de Aula",
    }),
  )
  @decorate(TransformToArray())
  @decorate(IsOptional())
  @decorate(IsArray())
  @decorate(IsString({ each: true }))
  "filter.ambientePadraoAula.codigo"?: string[];

  @decorate(
    ApiPropertyOptional({
      type: "string",
      isArray: true,
      description: "Filtro por capacidade do Ambiente Padrao de Aula",
    }),
  )
  @decorate(TransformToArray())
  @decorate(IsOptional())
  @decorate(IsArray())
  @decorate(IsString({ each: true }))
  "filter.ambientePadraoAula.capacidade"?: string[];

  @decorate(
    ApiPropertyOptional({
      type: "string",
      isArray: true,
      description: "Filtro por tipo do Ambiente Padrao de Aula",
    }),
  )
  @decorate(TransformToArray())
  @decorate(IsOptional())
  @decorate(IsArray())
  @decorate(IsString({ each: true }))
  "filter.ambientePadraoAula.tipo"?: string[];

  @decorate(
    ApiPropertyOptional({
      type: "string",
      isArray: true,
      description: "Filtro por ID do Curso",
    }),
  )
  @decorate(TransformToArray())
  @decorate(IsOptional())
  @decorate(IsArray())
  @decorate(IsUUID(undefined, { each: true }))
  "filter.curso.id"?: string[];

  @decorate(
    ApiPropertyOptional({
      type: "string",
      isArray: true,
      description: "Filtro por nome do Curso",
    }),
  )
  @decorate(TransformToArray())
  @decorate(IsOptional())
  @decorate(IsArray())
  @decorate(IsString({ each: true }))
  "filter.curso.nome"?: string[];

  @decorate(
    ApiPropertyOptional({
      type: "string",
      isArray: true,
      description: "Filtro por nome abreviado do Curso",
    }),
  )
  @decorate(TransformToArray())
  @decorate(IsOptional())
  @decorate(IsArray())
  @decorate(IsString({ each: true }))
  "filter.curso.nomeAbreviado"?: string[];

  @decorate(
    ApiPropertyOptional({
      type: "string",
      isArray: true,
      description: "Filtro por ID do Campus do Curso",
    }),
  )
  @decorate(TransformToArray())
  @decorate(IsOptional())
  @decorate(IsArray())
  @decorate(IsUUID(undefined, { each: true }))
  "filter.curso.campus.id"?: string[];

  @decorate(
    ApiPropertyOptional({
      type: "string",
      isArray: true,
      description: "Filtro por ID da Oferta de Formacao do Curso",
    }),
  )
  @decorate(TransformToArray())
  @decorate(IsOptional())
  @decorate(IsArray())
  @decorate(IsUUID(undefined, { each: true }))
  "filter.curso.ofertaFormacao.id"?: string[];

  @decorate(
    ApiPropertyOptional({
      type: "string",
      isArray: true,
      description: "Filtro por nome da Oferta de Formacao do Curso",
    }),
  )
  @decorate(TransformToArray())
  @decorate(IsOptional())
  @decorate(IsArray())
  @decorate(IsString({ each: true }))
  "filter.curso.ofertaFormacao.nome"?: string[];

  @decorate(
    ApiPropertyOptional({
      type: "string",
      isArray: true,
      description: "Filtro por slug da Oferta de Formacao do Curso",
    }),
  )
  @decorate(TransformToArray())
  @decorate(IsOptional())
  @decorate(IsArray())
  @decorate(IsString({ each: true }))
  "filter.curso.ofertaFormacao.slug"?: string[];
}

@decorate(ApiSchema({ name: "TurmaListOutputDto" }))
export class TurmaListOutputRestDto {
  @decorate(ApiProperty({ type: () => PaginationMetaRestDto, description: "Metadados da busca" }))
  meta: PaginationMetaRestDto;

  @decorate(
    ApiProperty({ type: () => [TurmaFindOneOutputRestDto], description: "Resultados da busca" }),
  )
  data: TurmaFindOneOutputRestDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@decorate(ApiSchema({ name: "TurmaCreateInputDto" }))
export class TurmaCreateInputRestDto extends TurmaFieldsMixin {
  @decorate(ApiProperty({ type: "string", description: "Periodo da turma", minLength: 1 }))
  declare periodo: string;

  @decorate(ApiProperty({ type: () => CursoFindOneInputRestDto, description: "Curso da turma" }))
  @decorate(ValidateNested())
  @decorate(Type(() => CursoFindOneInputRestDto))
  curso: CursoFindOneInputRestDto;

  @decorate(
    ApiPropertyOptional({
      type: () => AmbienteFindOneInputRestDto,
      description: "Ambiente padrao da sala de aula",
      nullable: true,
    }),
  )
  @decorate(IsOptional())
  @decorate(ValidateNested())
  @decorate(Type(() => AmbienteFindOneInputRestDto))
  ambientePadraoAula?: AmbienteFindOneInputRestDto | null;
}

@decorate(ApiSchema({ name: "TurmaUpdateInputDto" }))
export class TurmaUpdateInputRestDto extends PartialType(TurmaCreateInputRestDto) {}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@decorate(ApiSchema({ name: "TurmaFindOneInputDto" }))
export class TurmaFindOneInputRestDto {
  @decorate(
    ApiProperty({
      type: "string",
      description: "Identificador do registro (uuid)",
      format: "uuid",
    }),
  )
  @decorate(IsUUID())
  id: string;
}

import { AmbienteFindOneOutputRestDto } from "@/modules/ambientes/ambiente/presentation.rest";
import { ImagemFindOneOutputRestDto } from "@/modules/ambientes/bloco/presentation.rest";
import { CursoFindOneOutputRestDto } from "@/modules/ensino/curso/presentation.rest";
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
} from "@/shared/presentation/rest";
import {
  EntityBaseRestDto,
  PaginatedFilterByIdRestDto,
  PaginationMetaRestDto,
} from "@/shared/presentation/rest/dtos";
import {
  turmaCreateSchema,
  turmaFindOneInputSchema,
  turmaPaginationInputSchema,
} from "../domain/turma.schemas";

// ============================================================================
// FindOne Output
// ============================================================================

@ApiSchema({ name: "TurmaFindOneOutputDto" })
@RegisterModel({
  name: "TurmaFindOneQueryResult",
  properties: [
    simpleProperty("id"),
    simpleProperty("periodo"),
    referenceProperty("curso", "CursoFindOneQueryResult"),
    referenceProperty("ambientePadraoAula", "AmbienteFindOneQueryResult", { nullable: true }),
    referenceProperty("imagemCapa", "ImagemFindOneQueryResult", { nullable: true }),
    ...commonProperties.dated,
  ],
})
export class TurmaFindOneOutputRestDto extends EntityBaseRestDto {
  @ApiProperty({ type: "string", description: "Periodo da turma", minLength: 1 })
  periodo: string;

  @ApiPropertyOptional({ type: "string", description: "Nome da turma", nullable: true })
  nome: string | null;

  @ApiProperty({ type: () => CursoFindOneOutputRestDto, description: "Curso da turma" })
  curso: CursoFindOneOutputRestDto;

  @ApiPropertyOptional({
    type: () => AmbienteFindOneOutputRestDto,
    description: "Ambiente padrao da sala de aula",
    nullable: true,
  })
  ambientePadraoAula: AmbienteFindOneOutputRestDto | null;

  @ApiPropertyOptional({
    type: () => ImagemFindOneOutputRestDto,
    description: "Imagem de capa da turma",
    nullable: true,
  })
  imagemCapa: ImagemFindOneOutputRestDto | null;
}

// ============================================================================
// List Input/Output
// ============================================================================

@ApiSchema({ name: "TurmaListInputDto" })
export class TurmaListInputRestDto extends PaginatedFilterByIdRestDto {
  static schema = turmaPaginationInputSchema;

  @ApiPropertyOptional({
    type: "string",
    isArray: true,
    description: "Filtro por periodo da turma",
  })
  @TransformToArray()
  "filter.periodo"?: string[];

  @ApiPropertyOptional({
    type: "string",
    isArray: true,
    description: "Filtro por nome do Ambiente Padrao de Aula",
  })
  @TransformToArray()
  "filter.ambientePadraoAula.nome"?: string[];

  @ApiPropertyOptional({
    type: "string",
    isArray: true,
    description: "Filtro por codigo do Ambiente Padrao de Aula",
  })
  @TransformToArray()
  "filter.ambientePadraoAula.codigo"?: string[];

  @ApiPropertyOptional({
    type: "string",
    isArray: true,
    description: "Filtro por capacidade do Ambiente Padrao de Aula",
  })
  @TransformToArray()
  "filter.ambientePadraoAula.capacidade"?: string[];

  @ApiPropertyOptional({
    type: "string",
    isArray: true,
    description: "Filtro por tipo do Ambiente Padrao de Aula",
  })
  @TransformToArray()
  "filter.ambientePadraoAula.tipo"?: string[];

  @ApiPropertyOptional({
    type: "string",
    isArray: true,
    description: "Filtro por ID do Curso",
  })
  @TransformToArray()
  "filter.curso.id"?: string[];

  @ApiPropertyOptional({
    type: "string",
    isArray: true,
    description: "Filtro por nome do Curso",
  })
  @TransformToArray()
  "filter.curso.nome"?: string[];

  @ApiPropertyOptional({
    type: "string",
    isArray: true,
    description: "Filtro por nome abreviado do Curso",
  })
  @TransformToArray()
  "filter.curso.nomeAbreviado"?: string[];

  @ApiPropertyOptional({
    type: "string",
    isArray: true,
    description: "Filtro por ID do Campus do Curso",
  })
  @TransformToArray()
  "filter.curso.campus.id"?: string[];

  @ApiPropertyOptional({
    type: "string",
    isArray: true,
    description: "Filtro por ID da Oferta de Formacao do Curso",
  })
  @TransformToArray()
  "filter.curso.ofertaFormacao.id"?: string[];

  @ApiPropertyOptional({
    type: "string",
    isArray: true,
    description: "Filtro por nome da Oferta de Formacao do Curso",
  })
  @TransformToArray()
  "filter.curso.ofertaFormacao.nome"?: string[];

  @ApiPropertyOptional({
    type: "string",
    isArray: true,
    description: "Filtro por slug da Oferta de Formacao do Curso",
  })
  @TransformToArray()
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
  static readonly schema = turmaCreateSchema;

  @ApiProperty({ type: "string", description: "Periodo da turma", minLength: 1 })
  periodo: string;

  @ApiPropertyOptional({ type: "string", description: "Nome da turma", nullable: true })
  nome?: string | null;

  @ApiProperty({
    type: "object",
    description: "Curso da turma",
    properties: { id: { type: "string", format: "uuid" } },
  })
  curso: { id: string };

  @ApiPropertyOptional({
    type: "object",
    description: "Ambiente padrao da sala de aula",
    nullable: true,
    properties: { id: { type: "string", format: "uuid" } },
  })
  ambientePadraoAula?: { id: string } | null;
}

@ApiSchema({ name: "TurmaUpdateInputDto" })
export class TurmaUpdateInputRestDto extends PartialType(TurmaCreateInputRestDto) {}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@ApiSchema({ name: "TurmaFindOneInputDto" })
export class TurmaFindOneInputRestDto {
  static readonly schema = turmaFindOneInputSchema;

  @ApiProperty({
    type: "string",
    description: "Identificador do registro (uuid)",
    format: "uuid",
  })
  id: string;
}

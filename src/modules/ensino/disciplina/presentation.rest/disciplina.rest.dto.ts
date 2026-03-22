import { ImagemFindOneOutputRestDto } from "@/modules/ambientes/bloco/presentation.rest";
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
  disciplinaCreateSchema,
  disciplinaFindOneInputSchema,
  disciplinaPaginationInputSchema,
} from "../domain/disciplina.schemas";

// ============================================================================
// FindOne Output
// ============================================================================

@ApiSchema({ name: "DisciplinaFindOneOutputDto" })
@RegisterModel({
  name: "DisciplinaFindOneQueryResult",
  properties: [
    simpleProperty("id"),
    simpleProperty("nome"),
    simpleProperty("nomeAbreviado"),
    simpleProperty("cargaHoraria"),
    referenceProperty("imagemCapa", "ImagemFindOneQueryResult", { nullable: true }),
    ...commonProperties.dated,
  ],
})
export class DisciplinaFindOneOutputRestDto extends EntityBaseRestDto {
  @ApiProperty({ type: "string", description: "Nome da disciplina", minLength: 1 })
  nome: string;

  @ApiProperty({ type: "string", description: "Nome abreviado da disciplina", minLength: 1 })
  nomeAbreviado: string;

  @ApiProperty({ type: "integer", description: "Carga horaria da disciplina", minimum: 1 })
  cargaHoraria: number;

  @ApiPropertyOptional({
    type: () => ImagemFindOneOutputRestDto,
    description: "Imagem de capa da disciplina",
    nullable: true,
  })
  imagemCapa: ImagemFindOneOutputRestDto | null;
}

// ============================================================================
// List Input/Output
// ============================================================================

@ApiSchema({ name: "DisciplinaListInputDto" })
export class DisciplinaListInputRestDto extends PaginatedFilterByIdRestDto {
  static schema = disciplinaPaginationInputSchema;

  @ApiPropertyOptional({
    type: "string",
    isArray: true,
    description: "Filtro por ID dos Diarios",
  })
  @TransformToArray()
  "filter.diarios.id"?: string[];
}

@ApiSchema({ name: "DisciplinaListOutputDto" })
export class DisciplinaListOutputRestDto {
  @ApiProperty({ type: () => PaginationMetaRestDto, description: "Metadados da busca" })
  meta: PaginationMetaRestDto;

  @ApiProperty({
    type: () => [DisciplinaFindOneOutputRestDto],
    description: "Resultados da busca",
  })
  data: DisciplinaFindOneOutputRestDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@ApiSchema({ name: "DisciplinaCreateInputDto" })
export class DisciplinaCreateInputRestDto {
  static readonly schema = disciplinaCreateSchema;

  @ApiProperty({ type: "string", description: "Nome da disciplina", minLength: 1 })
  nome: string;

  @ApiProperty({ type: "string", description: "Nome abreviado da disciplina", minLength: 1 })
  nomeAbreviado: string;

  @ApiProperty({ type: "integer", description: "Carga horaria da disciplina", minimum: 1 })
  cargaHoraria: number;
}

@ApiSchema({ name: "DisciplinaUpdateInputDto" })
export class DisciplinaUpdateInputRestDto extends PartialType(DisciplinaCreateInputRestDto) {}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@ApiSchema({ name: "DisciplinaFindOneInputDto" })
export class DisciplinaFindOneInputRestDto {
  static readonly schema = disciplinaFindOneInputSchema;

  @ApiProperty({
    type: "string",
    description: "Identificador do registro (uuid)",
    format: "uuid",
  })
  id: string;
}

import { ImagemFindOneOutputRestDto } from "@/modules/ambientes/bloco/presentation.rest";
import { CampusFindOneOutputRestDto } from "@/modules/ambientes/campus/presentation.rest";
import { OfertaFormacaoFindOneOutputRestDto } from "@/modules/ensino/oferta-formacao/presentation.rest";
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
  cursoCreateSchema,
  cursoFindOneInputSchema,
  cursoPaginationInputSchema,
} from "../domain/curso.schemas";

// ============================================================================
// FindOne Output
// ============================================================================

@ApiSchema({ name: "CursoFindOneOutputDto" })
@RegisterModel({
  name: "CursoFindOneQueryResult",
  properties: [
    simpleProperty("id"),
    simpleProperty("nome"),
    simpleProperty("nomeAbreviado"),
    referenceProperty("campus", "CampusFindOneQueryResult"),
    referenceProperty("ofertaFormacao", "OfertaFormacaoFindOneQueryResult"),
    referenceProperty("imagemCapa", "ImagemFindOneQueryResult", { nullable: true }),
    ...commonProperties.dated,
  ],
})
export class CursoFindOneOutputRestDto extends EntityBaseRestDto {
  @ApiProperty({ type: "string", description: "Nome do curso", minLength: 1 })
  nome: string;

  @ApiProperty({ type: "string", description: "Nome abreviado do curso", minLength: 1 })
  nomeAbreviado: string;

  @ApiProperty({
    type: () => CampusFindOneOutputRestDto,
    description: "Campus que o curso pertence",
  })
  campus: CampusFindOneOutputRestDto;

  @ApiProperty({
    type: () => OfertaFormacaoFindOneOutputRestDto,
    description: "Oferta de formacao do curso",
  })
  ofertaFormacao: OfertaFormacaoFindOneOutputRestDto;

  @ApiPropertyOptional({
    type: () => ImagemFindOneOutputRestDto,
    description: "Imagem de capa do curso",
    nullable: true,
  })
  imagemCapa: ImagemFindOneOutputRestDto | null;
}

// ============================================================================
// List Input/Output
// ============================================================================

@ApiSchema({ name: "CursoListInputDto" })
export class CursoListInputRestDto extends PaginatedFilterByIdRestDto {
  static schema = cursoPaginationInputSchema;

  @ApiPropertyOptional({
    type: "string",
    isArray: true,
    description: "Filtro por ID do Campus",
  })
  @TransformToArray()
  "filter.campus.id"?: string[];

  @ApiPropertyOptional({
    type: "string",
    isArray: true,
    description: "Filtro por ID da Oferta de Formacao",
  })
  @TransformToArray()
  "filter.ofertaFormacao.id"?: string[];
}

@ApiSchema({ name: "CursoListOutputDto" })
export class CursoListOutputRestDto {
  @ApiProperty({ type: () => PaginationMetaRestDto, description: "Metadados da busca" })
  meta: PaginationMetaRestDto;

  @ApiProperty({ type: () => [CursoFindOneOutputRestDto], description: "Resultados da busca" })
  data: CursoFindOneOutputRestDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@ApiSchema({ name: "CursoCreateInputDto" })
export class CursoCreateInputRestDto {
  static readonly schema = cursoCreateSchema;

  @ApiProperty({ type: "string", description: "Nome do curso", minLength: 1 })
  nome: string;

  @ApiProperty({ type: "string", description: "Nome abreviado do curso", minLength: 1 })
  nomeAbreviado: string;

  @ApiProperty({
    type: "object",
    description: "Campus que o curso pertence",
    properties: { id: { type: "string", format: "uuid" } },
  })
  campus: { id: string };

  @ApiProperty({
    type: "object",
    description: "Oferta de formacao do curso",
    properties: { id: { type: "string", format: "uuid" } },
  })
  ofertaFormacao: { id: string };
}

@ApiSchema({ name: "CursoUpdateInputDto" })
export class CursoUpdateInputRestDto extends PartialType(CursoCreateInputRestDto) {}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@ApiSchema({ name: "CursoFindOneInputDto" })
export class CursoFindOneInputRestDto {
  static readonly schema = cursoFindOneInputSchema;

  @ApiProperty({
    type: "string",
    description: "Identificador do registro (uuid)",
    format: "uuid",
  })
  id: string;
}

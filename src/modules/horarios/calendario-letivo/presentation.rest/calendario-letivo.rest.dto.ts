import {
  CampusFindOneInputRestDto,
  CampusFindOneOutputRestDto,
} from "@/modules/ambientes/campus/presentation.rest";
import {
  OfertaFormacaoFindOneInputRestDto,
  OfertaFormacaoFindOneOutputRestDto,
} from "@/modules/ensino/oferta-formacao/presentation.rest";
import {
  calendarioLetivoCreateSchema,
  calendarioLetivoFindOneInputSchema,
  calendarioLetivoPaginationInputSchema,
  calendarioLetivoUpdateSchema,
} from "@/modules/horarios/calendario-letivo/domain/calendario-letivo.schemas";
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

// ============================================================================
// FindOne Output
// ============================================================================

@ApiSchema({ name: "CalendarioLetivoFindOneOutputDto" })
@RegisterModel({
  name: "CalendarioLetivoFindOneQueryResult",
  properties: [
    simpleProperty("id"),
    simpleProperty("nome"),
    simpleProperty("ano"),
    referenceProperty("campus", "CampusFindOneQueryResult"),
    referenceProperty("ofertaFormacao", "OfertaFormacaoFindOneQueryResult"),
    ...commonProperties.dated,
  ],
})
export class CalendarioLetivoFindOneOutputRestDto extends EntityBaseRestDto {
  @ApiProperty({ type: "string", description: "Nome do calendario letivo", minLength: 1 })
  nome: string;

  @ApiProperty({
    type: "integer",
    description: "Ano do calendario letivo",
    minimum: 0,
    maximum: 65535,
  })
  ano: number;

  @ApiProperty({
    type: () => CampusFindOneOutputRestDto,
    description: "Campus ao qual o calendario letivo pertence",
  })
  campus: CampusFindOneOutputRestDto;

  @ApiProperty({
    type: () => OfertaFormacaoFindOneOutputRestDto,
    description: "Oferta de formacao do calendario letivo",
  })
  ofertaFormacao: OfertaFormacaoFindOneOutputRestDto;
}

// ============================================================================
// List Input/Output
// ============================================================================

@ApiSchema({ name: "CalendarioLetivoListInputDto" })
export class CalendarioLetivoListInputRestDto extends PaginatedFilterByIdRestDto {
  static schema = calendarioLetivoPaginationInputSchema;

  @ApiPropertyOptional({
    type: "string",
    isArray: true,
    description: "Filtro por ano letivo",
  })
  @TransformToArray()
  "filter.ano"?: string[];

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

@ApiSchema({ name: "CalendarioLetivoListOutputDto" })
export class CalendarioLetivoListOutputRestDto {
  @ApiProperty({ type: () => PaginationMetaRestDto, description: "Metadados da busca" })
  meta: PaginationMetaRestDto;

  @ApiProperty({
    type: () => [CalendarioLetivoFindOneOutputRestDto],
    description: "Resultados da busca",
  })
  data: CalendarioLetivoFindOneOutputRestDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@ApiSchema({ name: "CalendarioLetivoCreateInputDto" })
export class CalendarioLetivoCreateInputRestDto {
  static schema = calendarioLetivoCreateSchema;

  @ApiProperty({ type: "string", description: "Nome do calendario letivo", minLength: 1 })
  nome: string;

  @ApiProperty({
    type: "integer",
    description: "Ano do calendario letivo",
    minimum: 0,
    maximum: 65535,
  })
  ano: number;

  @ApiProperty({
    type: () => CampusFindOneInputRestDto,
    description: "Campus ao qual o calendario letivo pertence",
  })
  campus: CampusFindOneInputRestDto;

  @ApiProperty({
    type: () => OfertaFormacaoFindOneInputRestDto,
    description: "Oferta de formacao do calendario letivo",
  })
  ofertaFormacao: OfertaFormacaoFindOneInputRestDto;
}

@ApiSchema({ name: "CalendarioLetivoUpdateInputDto" })
export class CalendarioLetivoUpdateInputRestDto extends PartialType(
  CalendarioLetivoCreateInputRestDto,
) {
  static schema = calendarioLetivoUpdateSchema;
}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@ApiSchema({ name: "CalendarioLetivoFindOneInputDto" })
export class CalendarioLetivoFindOneInputRestDto {
  static schema = calendarioLetivoFindOneInputSchema;

  @ApiProperty({
    type: "string",
    description: "Identificador do registro (uuid)",
    format: "uuid",
  })
  id: string;
}

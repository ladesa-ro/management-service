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
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min,
  MinLength,
  Type,
  ValidateNested,
} from "@/modules/@shared/presentation/shared";
import {
  CampusFindOneInputRestDto,
  CampusFindOneOutputRestDto,
} from "@/modules/ambientes/campus/presentation/rest";
import {
  OfertaFormacaoFindOneInputRestDto,
  OfertaFormacaoFindOneOutputRestDto,
} from "@/modules/ensino/oferta-formacao/presentation/rest";

// ============================================================================
// FindOne Output
// ============================================================================

@ApiSchema({ name: "CalendarioLetivoFindOneOutputDto" })
@RegisterModel({
  name: "CalendarioLetivoFindOneOutputDto",
  properties: [
    simpleProperty("id"),
    simpleProperty("nome"),
    simpleProperty("ano"),
    referenceProperty("campus", "CampusFindOneOutputDto"),
    referenceProperty("ofertaFormacao", "OfertaFormacaoFindOneOutputDto"),
    ...commonProperties.dated,
  ],
})
export class CalendarioLetivoFindOneOutputRestDto extends EntityBaseRestDto {
  @ApiProperty({ type: "string", description: "Nome do calendario letivo", minLength: 1 })
  @IsString()
  @MinLength(1)
  nome: string;

  @ApiProperty({
    type: "integer",
    description: "Ano do calendario letivo",
    minimum: 0,
    maximum: 65535,
  })
  @IsInt()
  @Min(0)
  @Max(65535)
  ano: number;

  @ApiProperty({
    type: () => CampusFindOneOutputRestDto,
    description: "Campus ao qual o calendario letivo pertence",
  })
  @ValidateNested()
  @Type(() => CampusFindOneOutputRestDto)
  campus: CampusFindOneOutputRestDto;

  @ApiProperty({
    type: () => OfertaFormacaoFindOneOutputRestDto,
    description: "Oferta de formacao do calendario letivo",
  })
  @ValidateNested()
  @Type(() => OfertaFormacaoFindOneOutputRestDto)
  ofertaFormacao: OfertaFormacaoFindOneOutputRestDto;
}

// ============================================================================
// List Input/Output
// ============================================================================

@ApiSchema({ name: "CalendarioLetivoListInputDto" })
export class CalendarioLetivoListInputRestDto extends PaginatedFilterByIdRestDto {
  @ApiPropertyOptional({
    type: "string",
    isArray: true,
    description: "Filtro por ID do Campus",
  })
  @TransformToArray()
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  "filter.campus.id"?: string[];

  @ApiPropertyOptional({
    type: "string",
    isArray: true,
    description: "Filtro por ID da Oferta de Formacao",
  })
  @TransformToArray()
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
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
  @ApiProperty({ type: "string", description: "Nome do calendario letivo", minLength: 1 })
  @IsString()
  @MinLength(1)
  nome: string;

  @ApiProperty({
    type: "integer",
    description: "Ano do calendario letivo",
    minimum: 0,
    maximum: 65535,
  })
  @IsInt()
  @Min(0)
  @Max(65535)
  ano: number;

  @ApiProperty({
    type: () => CampusFindOneInputRestDto,
    description: "Campus ao qual o calendario letivo pertence",
  })
  @ValidateNested()
  @Type(() => CampusFindOneInputRestDto)
  campus: CampusFindOneInputRestDto;

  @ApiProperty({
    type: () => OfertaFormacaoFindOneInputRestDto,
    description: "Oferta de formacao do calendario letivo",
  })
  @ValidateNested()
  @Type(() => OfertaFormacaoFindOneInputRestDto)
  ofertaFormacao: OfertaFormacaoFindOneInputRestDto;
}

@ApiSchema({ name: "CalendarioLetivoUpdateInputDto" })
export class CalendarioLetivoUpdateInputRestDto extends PartialType(
  CalendarioLetivoCreateInputRestDto,
) {}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@ApiSchema({ name: "CalendarioLetivoFindOneInputDto" })
export class CalendarioLetivoFindOneInputRestDto {
  @ApiProperty({
    type: "string",
    description: "Identificador do registro (uuid)",
    format: "uuid",
  })
  @IsUUID()
  id: string;
}

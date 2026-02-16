import { ApiProperty, ApiPropertyOptional, ApiSchema, PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsArray,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min,
  MinLength,
  ValidateNested,
} from "class-validator";
import { decorate } from "ts-mixer";
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
  CampusFindOneInputRestDto,
  CampusFindOneOutputRestDto,
} from "@/server/nest/modules/campus/rest";
import {
  OfertaFormacaoFindOneInputRestDto,
  OfertaFormacaoFindOneOutputRestDto,
} from "@/server/nest/modules/oferta-formacao/rest";

// ============================================================================
// FindOne Output
// ============================================================================

@decorate(ApiSchema({ name: "CalendarioLetivoFindOneOutputDto" }))
@decorate(
  RegisterModel({
    name: "CalendarioLetivoFindOneOutputDto",
    properties: [
      simpleProperty("id"),
      simpleProperty("nome"),
      simpleProperty("ano"),
      referenceProperty("campus", "CampusFindOneOutputDto"),
      referenceProperty("ofertaFormacao", "OfertaFormacaoFindOneOutputDto"),
      ...commonProperties.dated,
    ],
  }),
)
export class CalendarioLetivoFindOneOutputRestDto extends EntityBaseRestDto {
  @decorate(ApiProperty({ type: "string", description: "Nome do calendario letivo", minLength: 1 }))
  @decorate(IsString())
  @decorate(MinLength(1))
  nome: string;

  @decorate(
    ApiProperty({
      type: "integer",
      description: "Ano do calendario letivo",
      minimum: 0,
      maximum: 65535,
    }),
  )
  @decorate(IsInt())
  @decorate(Min(0))
  @decorate(Max(65535))
  ano: number;

  @decorate(
    ApiProperty({
      type: () => CampusFindOneOutputRestDto,
      description: "Campus ao qual o calendario letivo pertence",
    }),
  )
  @decorate(ValidateNested())
  @decorate(Type(() => CampusFindOneOutputRestDto))
  campus: CampusFindOneOutputRestDto;

  @decorate(
    ApiProperty({
      type: () => OfertaFormacaoFindOneOutputRestDto,
      description: "Oferta de formacao do calendario letivo",
    }),
  )
  @decorate(ValidateNested())
  @decorate(Type(() => OfertaFormacaoFindOneOutputRestDto))
  ofertaFormacao: OfertaFormacaoFindOneOutputRestDto;
}

// ============================================================================
// List Input/Output
// ============================================================================

@decorate(ApiSchema({ name: "CalendarioLetivoListInputDto" }))
export class CalendarioLetivoListInputRestDto extends PaginatedFilterByIdRestDto {
  @decorate(
    ApiPropertyOptional({
      type: "string",
      isArray: true,
      description: "Filtro por ID do Campus",
    }),
  )
  @decorate(TransformToArray())
  @decorate(IsOptional())
  @decorate(IsArray())
  @decorate(IsUUID(undefined, { each: true }))
  "filter.campus.id"?: string[];

  @decorate(
    ApiPropertyOptional({
      type: "string",
      isArray: true,
      description: "Filtro por ID da Oferta de Formacao",
    }),
  )
  @decorate(TransformToArray())
  @decorate(IsOptional())
  @decorate(IsArray())
  @decorate(IsUUID(undefined, { each: true }))
  "filter.ofertaFormacao.id"?: string[];
}

@decorate(ApiSchema({ name: "CalendarioLetivoListOutputDto" }))
export class CalendarioLetivoListOutputRestDto {
  @decorate(ApiProperty({ type: () => PaginationMetaRestDto, description: "Metadados da busca" }))
  meta: PaginationMetaRestDto;

  @decorate(
    ApiProperty({
      type: () => [CalendarioLetivoFindOneOutputRestDto],
      description: "Resultados da busca",
    }),
  )
  data: CalendarioLetivoFindOneOutputRestDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@decorate(ApiSchema({ name: "CalendarioLetivoCreateInputDto" }))
export class CalendarioLetivoCreateInputRestDto {
  @decorate(ApiProperty({ type: "string", description: "Nome do calendario letivo", minLength: 1 }))
  @decorate(IsString())
  @decorate(MinLength(1))
  nome: string;

  @decorate(
    ApiProperty({
      type: "integer",
      description: "Ano do calendario letivo",
      minimum: 0,
      maximum: 65535,
    }),
  )
  @decorate(IsInt())
  @decorate(Min(0))
  @decorate(Max(65535))
  ano: number;

  @decorate(
    ApiProperty({
      type: () => CampusFindOneInputRestDto,
      description: "Campus ao qual o calendario letivo pertence",
    }),
  )
  @decorate(ValidateNested())
  @decorate(Type(() => CampusFindOneInputRestDto))
  campus: CampusFindOneInputRestDto;

  @decorate(
    ApiProperty({
      type: () => OfertaFormacaoFindOneInputRestDto,
      description: "Oferta de formacao do calendario letivo",
    }),
  )
  @decorate(ValidateNested())
  @decorate(Type(() => OfertaFormacaoFindOneInputRestDto))
  ofertaFormacao: OfertaFormacaoFindOneInputRestDto;
}

@decorate(ApiSchema({ name: "CalendarioLetivoUpdateInputDto" }))
export class CalendarioLetivoUpdateInputRestDto extends PartialType(
  CalendarioLetivoCreateInputRestDto,
) {}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@decorate(ApiSchema({ name: "CalendarioLetivoFindOneInputDto" }))
export class CalendarioLetivoFindOneInputRestDto {
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

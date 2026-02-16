import { ApiProperty, ApiPropertyOptional, ApiSchema, PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsIn, IsOptional, IsString, IsUUID, ValidateNested } from "class-validator";
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
  TIPO_DIA_CALENDARIO_VALUES,
  type TipoDiaCalendario,
} from "@/modules/sisgha/dia-calendario/domain/dia-calendario.types";
import {
  CalendarioLetivoFindOneInputRestDto,
  CalendarioLetivoFindOneOutputRestDto,
} from "@/server/nest/modules/calendario-letivo/rest";
import { DiaCalendarioFieldsMixin } from "../dia-calendario.validation-mixin";

export { TIPO_DIA_CALENDARIO_VALUES, type TipoDiaCalendario };

// ============================================================================
// FindOne Output
// ============================================================================

@decorate(ApiSchema({ name: "DiaCalendarioFindOneOutputDto" }))
@decorate(
  RegisterModel({
    name: "DiaCalendarioFindOneOutputDto",
    properties: [
      simpleProperty("id"),
      simpleProperty("data"),
      simpleProperty("diaLetivo"),
      simpleProperty("diaPresencial"),
      simpleProperty("tipo"),
      simpleProperty("feriado", { nullable: true }),
      simpleProperty("extraCurricular"),
      referenceProperty("calendario", "CalendarioLetivoFindOneOutputDto"),
      ...commonProperties.dated,
    ],
  }),
)
export class DiaCalendarioFindOneOutputRestDto extends Mixin(
  EntityBaseRestDto,
  DiaCalendarioFieldsMixin,
) {
  @decorate(
    ApiProperty({ type: "string", description: "Data do dia no calendario", format: "date" }),
  )
  declare data: string;

  @decorate(ApiProperty({ type: "boolean", description: "Indica se o dia e letivo" }))
  declare diaLetivo: boolean;

  @decorate(ApiProperty({ type: "boolean", description: "Indica se o dia e presencial" }))
  declare diaPresencial: boolean;

  @decorate(
    ApiProperty({
      type: "string",
      description: "Tipo do dia (presencial, feriado, sabado, etc.)",
      enum: TIPO_DIA_CALENDARIO_VALUES,
    }),
  )
  @decorate(IsIn(TIPO_DIA_CALENDARIO_VALUES))
  declare tipo: TipoDiaCalendario;

  @decorate(
    ApiPropertyOptional({
      type: "string",
      description: "Nome do feriado (ou null se nao for)",
      nullable: true,
    }),
  )
  declare feriado: string | null;

  @decorate(ApiProperty({ type: "boolean", description: "Indica se o dia e extracurricular" }))
  declare extraCurricular: boolean;

  @decorate(
    ApiProperty({
      type: () => CalendarioLetivoFindOneOutputRestDto,
      description: "Calendario letivo ao qual o dia pertence",
    }),
  )
  @decorate(ValidateNested())
  @decorate(Type(() => CalendarioLetivoFindOneOutputRestDto))
  calendario: CalendarioLetivoFindOneOutputRestDto;
}

// ============================================================================
// List Input/Output
// ============================================================================

@decorate(ApiSchema({ name: "DiaCalendarioListInputDto" }))
export class DiaCalendarioListInputRestDto extends PaginatedFilterByIdRestDto {
  @decorate(
    ApiPropertyOptional({
      type: "string",
      isArray: true,
      description: "Filtro por ID do Calendario",
    }),
  )
  @decorate(TransformToArray())
  @decorate(IsOptional())
  @decorate(IsArray())
  @decorate(IsUUID(undefined, { each: true }))
  "filter.calendario.id"?: string[];

  @decorate(
    ApiPropertyOptional({
      type: "string",
      isArray: true,
      description: "Filtro por nome do Calendario",
    }),
  )
  @decorate(TransformToArray())
  @decorate(IsOptional())
  @decorate(IsArray())
  @decorate(IsString({ each: true }))
  "filter.calendario.nome"?: string[];

  @decorate(
    ApiPropertyOptional({
      type: "string",
      isArray: true,
      description: "Filtro por ano do Calendario",
    }),
  )
  @decorate(TransformToArray())
  @decorate(IsOptional())
  @decorate(IsArray())
  @decorate(IsString({ each: true }))
  "filter.calendario.ano"?: string[];
}

@decorate(ApiSchema({ name: "DiaCalendarioListOutputDto" }))
export class DiaCalendarioListOutputRestDto {
  @decorate(ApiProperty({ type: () => PaginationMetaRestDto, description: "Metadados da busca" }))
  meta: PaginationMetaRestDto;

  @decorate(
    ApiProperty({
      type: () => [DiaCalendarioFindOneOutputRestDto],
      description: "Resultados da busca",
    }),
  )
  data: DiaCalendarioFindOneOutputRestDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@decorate(ApiSchema({ name: "DiaCalendarioCreateInputDto" }))
export class DiaCalendarioCreateInputRestDto extends DiaCalendarioFieldsMixin {
  @decorate(
    ApiProperty({ type: "string", description: "Data do dia no calendario", format: "date" }),
  )
  declare data: string;

  @decorate(ApiProperty({ type: "boolean", description: "Indica se o dia e letivo" }))
  declare diaLetivo: boolean;

  @decorate(ApiProperty({ type: "boolean", description: "Indica se o dia e presencial" }))
  declare diaPresencial: boolean;

  @decorate(
    ApiProperty({
      type: "string",
      description: "Tipo do dia (presencial, feriado, sabado, etc.)",
      enum: TIPO_DIA_CALENDARIO_VALUES,
    }),
  )
  @decorate(IsIn(TIPO_DIA_CALENDARIO_VALUES))
  declare tipo: TipoDiaCalendario;

  @decorate(
    ApiPropertyOptional({
      type: "string",
      description: "Nome do feriado (ou null se nao for)",
      nullable: true,
    }),
  )
  declare feriado: string | null;

  @decorate(ApiProperty({ type: "boolean", description: "Indica se o dia e extracurricular" }))
  declare extraCurricular: boolean;

  @decorate(
    ApiProperty({
      type: () => CalendarioLetivoFindOneInputRestDto,
      description: "Calendario letivo ao qual o dia pertence",
    }),
  )
  @decorate(ValidateNested())
  @decorate(Type(() => CalendarioLetivoFindOneInputRestDto))
  calendario: CalendarioLetivoFindOneInputRestDto;
}

@decorate(ApiSchema({ name: "DiaCalendarioUpdateInputDto" }))
export class DiaCalendarioUpdateInputRestDto extends PartialType(DiaCalendarioCreateInputRestDto) {}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@decorate(ApiSchema({ name: "DiaCalendarioFindOneInputDto" }))
export class DiaCalendarioFindOneInputRestDto {
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

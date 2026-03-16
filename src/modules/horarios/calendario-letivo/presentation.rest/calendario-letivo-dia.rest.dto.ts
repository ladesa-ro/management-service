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
  RegisterModel,
  referenceProperty,
  simpleProperty,
  TransformToArray,
} from "@/modules/@shared/presentation/rest";
import {
  IsArray,
  IsBoolean,
  IsIn,
  IsOptional,
  IsString,
  IsUUID,
  Type,
  ValidateNested,
} from "@/modules/@shared/presentation/shared";
import {
  TIPO_CALENDARIO_LETIVO_DIA_VALUES,
  type TipoCalendarioLetivoDia,
} from "../domain/calendario-letivo-dia";
import { CalendarioLetivoFindOneOutputRestDto } from "./calendario-letivo.rest.dto";

export { TIPO_CALENDARIO_LETIVO_DIA_VALUES, type TipoCalendarioLetivoDia };

// ============================================================================
// Parent Route Params
// ============================================================================

@ApiSchema({ name: "CalendarioLetivoDiaParentParamsDto" })
export class CalendarioLetivoDiaParentParamsRestDto {
  @ApiProperty({
    type: "string",
    description: "ID do calendario letivo (uuid)",
    format: "uuid",
  })
  @IsUUID()
  calendarioLetivoId: string;
}

// ============================================================================
// FindByData Params (extends parent)
// ============================================================================

@ApiSchema({ name: "CalendarioLetivoDiaFindByDataParamsDto" })
export class CalendarioLetivoDiaFindByDataParamsRestDto extends CalendarioLetivoDiaParentParamsRestDto {
  @ApiProperty({
    type: "string",
    description: "Data do dia no calendario (YYYY-MM-DD)",
    format: "date",
  })
  @IsString()
  data: string;
}

// ============================================================================
// FindOne Output
// ============================================================================

@ApiSchema({ name: "CalendarioLetivoDiaFindOneOutputDto" })
@RegisterModel({
  name: "CalendarioLetivoDiaFindOneOutputDto",
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
})
export class CalendarioLetivoDiaFindOneOutputRestDto extends EntityBaseRestDto {
  @ApiProperty({ type: "string", description: "Data do dia no calendario", format: "date" })
  data: string;

  @ApiProperty({ type: "boolean", description: "Indica se o dia e letivo" })
  diaLetivo: boolean;

  @ApiProperty({ type: "boolean", description: "Indica se o dia e presencial" })
  diaPresencial: boolean;

  @ApiProperty({
    type: "string",
    description: "Tipo do dia (presencial, feriado, sabado, etc.)",
    enum: TIPO_CALENDARIO_LETIVO_DIA_VALUES,
  })
  @IsIn(TIPO_CALENDARIO_LETIVO_DIA_VALUES)
  tipo: TipoCalendarioLetivoDia;

  @ApiPropertyOptional({
    type: "string",
    description: "Nome do feriado (ou null se nao for)",
    nullable: true,
  })
  feriado: string | null;

  @ApiProperty({ type: "boolean", description: "Indica se o dia e extracurricular" })
  extraCurricular: boolean;

  @ApiProperty({
    type: () => CalendarioLetivoFindOneOutputRestDto,
    description: "Calendario letivo ao qual o dia pertence",
  })
  @ValidateNested()
  @Type(() => CalendarioLetivoFindOneOutputRestDto)
  calendario: CalendarioLetivoFindOneOutputRestDto;
}

// ============================================================================
// List Input/Output
// ============================================================================

@ApiSchema({ name: "CalendarioLetivoDiaListInputDto" })
export class CalendarioLetivoDiaListInputRestDto extends PaginatedFilterByIdRestDto {
  @ApiPropertyOptional({
    type: "string",
    isArray: true,
    description: "Filtro por nome do Calendario",
  })
  @TransformToArray()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.calendario.nome"?: string[];

  @ApiPropertyOptional({
    type: "string",
    isArray: true,
    description: "Filtro por ano do Calendario",
  })
  @TransformToArray()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.calendario.ano"?: string[];
}

@ApiSchema({ name: "CalendarioLetivoDiaListOutputDto" })
export class CalendarioLetivoDiaListOutputRestDto {
  @ApiProperty({ type: () => PaginationMetaRestDto, description: "Metadados da busca" })
  meta: PaginationMetaRestDto;

  @ApiProperty({
    type: () => [CalendarioLetivoDiaFindOneOutputRestDto],
    description: "Resultados da busca",
  })
  data: CalendarioLetivoDiaFindOneOutputRestDto[];
}

// ============================================================================
// Update Input
// ============================================================================

@ApiSchema({ name: "CalendarioLetivoDiaUpdateInputDto" })
export class CalendarioLetivoDiaUpdateInputRestDto {
  @ApiPropertyOptional({ type: "boolean", description: "Indica se o dia e letivo" })
  @IsOptional()
  @IsBoolean()
  diaLetivo?: boolean;

  @ApiPropertyOptional({ type: "boolean", description: "Indica se o dia e presencial" })
  @IsOptional()
  @IsBoolean()
  diaPresencial?: boolean;

  @ApiPropertyOptional({
    type: "string",
    description: "Tipo do dia (presencial, feriado, sabado, etc.)",
    enum: TIPO_CALENDARIO_LETIVO_DIA_VALUES,
  })
  @IsOptional()
  @IsIn(TIPO_CALENDARIO_LETIVO_DIA_VALUES)
  tipo?: TipoCalendarioLetivoDia;

  @ApiPropertyOptional({
    type: "string",
    description: "Nome do feriado (ou null se nao for)",
    nullable: true,
  })
  @IsOptional()
  @IsString()
  feriado?: string | null;

  @ApiPropertyOptional({ type: "boolean", description: "Indica se o dia e extracurricular" })
  @IsOptional()
  @IsBoolean()
  extraCurricular?: boolean;
}

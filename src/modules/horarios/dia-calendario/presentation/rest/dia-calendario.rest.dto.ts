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
  IsIn,
  IsOptional,
  IsString,
  IsUUID,
  Type,
  ValidateNested,
} from "@/modules/@shared/presentation/shared";
import {
  CalendarioLetivoFindOneInputRestDto,
  CalendarioLetivoFindOneOutputRestDto,
} from "@/modules/horarios/calendario-letivo/presentation/rest";
import {
  TIPO_DIA_CALENDARIO_VALUES,
  type TipoDiaCalendario,
} from "@/modules/horarios/dia-calendario/domain/dia-calendario.types";
import { DiaCalendarioFieldsMixin } from "../dia-calendario.validation-mixin";

export { TIPO_DIA_CALENDARIO_VALUES, type TipoDiaCalendario };

// ============================================================================
// FindOne Output
// ============================================================================

@ApiSchema({ name: "DiaCalendarioFindOneOutputDto" })
@RegisterModel({
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
})
export class DiaCalendarioFindOneOutputRestDto extends Mixin(
  EntityBaseRestDto,
  DiaCalendarioFieldsMixin,
) {
  @ApiProperty({ type: "string", description: "Data do dia no calendario", format: "date" })
  declare data: string;

  @ApiProperty({ type: "boolean", description: "Indica se o dia e letivo" })
  declare diaLetivo: boolean;

  @ApiProperty({ type: "boolean", description: "Indica se o dia e presencial" })
  declare diaPresencial: boolean;

  @ApiProperty({
    type: "string",
    description: "Tipo do dia (presencial, feriado, sabado, etc.)",
    enum: TIPO_DIA_CALENDARIO_VALUES,
  })
  @IsIn(TIPO_DIA_CALENDARIO_VALUES)
  declare tipo: TipoDiaCalendario;

  @ApiPropertyOptional({
    type: "string",
    description: "Nome do feriado (ou null se nao for)",
    nullable: true,
  })
  declare feriado: string | null;

  @ApiProperty({ type: "boolean", description: "Indica se o dia e extracurricular" })
  declare extraCurricular: boolean;

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

@ApiSchema({ name: "DiaCalendarioListInputDto" })
export class DiaCalendarioListInputRestDto extends PaginatedFilterByIdRestDto {
  @ApiPropertyOptional({
    type: "string",
    isArray: true,
    description: "Filtro por ID do Calendario",
  })
  @TransformToArray()
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  "filter.calendario.id"?: string[];

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

@ApiSchema({ name: "DiaCalendarioListOutputDto" })
export class DiaCalendarioListOutputRestDto {
  @ApiProperty({ type: () => PaginationMetaRestDto, description: "Metadados da busca" })
  meta: PaginationMetaRestDto;

  @ApiProperty({
    type: () => [DiaCalendarioFindOneOutputRestDto],
    description: "Resultados da busca",
  })
  data: DiaCalendarioFindOneOutputRestDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@ApiSchema({ name: "DiaCalendarioCreateInputDto" })
export class DiaCalendarioCreateInputRestDto extends DiaCalendarioFieldsMixin {
  @ApiProperty({ type: "string", description: "Data do dia no calendario", format: "date" })
  declare data: string;

  @ApiProperty({ type: "boolean", description: "Indica se o dia e letivo" })
  declare diaLetivo: boolean;

  @ApiProperty({ type: "boolean", description: "Indica se o dia e presencial" })
  declare diaPresencial: boolean;

  @ApiProperty({
    type: "string",
    description: "Tipo do dia (presencial, feriado, sabado, etc.)",
    enum: TIPO_DIA_CALENDARIO_VALUES,
  })
  @IsIn(TIPO_DIA_CALENDARIO_VALUES)
  declare tipo: TipoDiaCalendario;

  @ApiPropertyOptional({
    type: "string",
    description: "Nome do feriado (ou null se nao for)",
    nullable: true,
  })
  declare feriado: string | null;

  @ApiProperty({ type: "boolean", description: "Indica se o dia e extracurricular" })
  declare extraCurricular: boolean;

  @ApiProperty({
    type: () => CalendarioLetivoFindOneInputRestDto,
    description: "Calendario letivo ao qual o dia pertence",
  })
  @ValidateNested()
  @Type(() => CalendarioLetivoFindOneInputRestDto)
  calendario: CalendarioLetivoFindOneInputRestDto;
}

@ApiSchema({ name: "DiaCalendarioUpdateInputDto" })
export class DiaCalendarioUpdateInputRestDto extends PartialType(DiaCalendarioCreateInputRestDto) {}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@ApiSchema({ name: "DiaCalendarioFindOneInputDto" })
export class DiaCalendarioFindOneInputRestDto {
  @ApiProperty({
    type: "string",
    description: "Identificador do registro (uuid)",
    format: "uuid",
  })
  @IsUUID()
  id: string;
}

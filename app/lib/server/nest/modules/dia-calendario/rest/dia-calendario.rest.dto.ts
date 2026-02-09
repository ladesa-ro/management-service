import { ApiProperty, ApiPropertyOptional, ApiSchema, PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsIn,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from "class-validator";
import {
  commonProperties,
  RegisterModel,
  referenceProperty,
  simpleProperty,
} from "@/modules/@shared/infrastructure/persistence/typeorm/metadata";
import {
  PaginationInputRestDto,
  PaginationMetaRestDto,
  TransformToArray,
} from "@/modules/@shared/infrastructure/presentation/rest/dtos";
import {
  TIPO_DIA_CALENDARIO_VALUES,
  type TipoDiaCalendario,
} from "@/modules/dia-calendario/domain/dia-calendario.types";
import {
  CalendarioLetivoFindOneInputRestDto,
  CalendarioLetivoFindOneOutputRestDto,
} from "@/server/nest/modules/calendario-letivo/rest";

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
export class DiaCalendarioFindOneOutputRestDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @IsUUID()
  id: string;

  @ApiProperty({ description: "Data do dia no calendario", format: "date" })
  @IsDateString()
  data: string;

  @ApiProperty({ description: "Indica se o dia e letivo" })
  @IsBoolean()
  diaLetivo: boolean;

  @ApiProperty({ description: "Indica se o dia e presencial" })
  @IsBoolean()
  diaPresencial: boolean;

  @ApiProperty({
    description: "Tipo do dia (presencial, feriado, sabado, etc.)",
    enum: TIPO_DIA_CALENDARIO_VALUES,
  })
  @IsString()
  @IsIn(TIPO_DIA_CALENDARIO_VALUES)
  tipo!: TipoDiaCalendario;

  @ApiPropertyOptional({ description: "Nome do feriado (ou null se nao for)", nullable: true })
  @IsOptional()
  @IsString()
  feriado: string | null;

  @ApiProperty({ description: "Indica se o dia e extracurricular" })
  @IsBoolean()
  extraCurricular: boolean;

  @ApiProperty({
    type: () => CalendarioLetivoFindOneOutputRestDto,
    description: "Calendario letivo ao qual o dia pertence",
  })
  @ValidateNested()
  @Type(() => CalendarioLetivoFindOneOutputRestDto)
  calendario: CalendarioLetivoFindOneOutputRestDto;

  @ApiProperty({ description: "Data e hora da criacao do registro" })
  @IsDateString()
  dateCreated: Date;

  @ApiProperty({ description: "Data e hora da alteracao do registro" })
  @IsDateString()
  dateUpdated: Date;

  @ApiPropertyOptional({ description: "Data e hora da exclusao do registro", nullable: true })
  @IsOptional()
  @IsDateString()
  dateDeleted: Date | null;
}

// ============================================================================
// List Input/Output
// ============================================================================

@ApiSchema({ name: "DiaCalendarioListInputDto" })
export class DiaCalendarioListInputRestDto extends PaginationInputRestDto {
  @ApiPropertyOptional({
    description: "Filtro por ID",
    type: [String],
  })
  @TransformToArray()
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  "filter.id"?: string[];

  @ApiPropertyOptional({
    description: "Filtro por ID do Calendario",
    type: [String],
  })
  @TransformToArray()
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  "filter.calendario.id"?: string[];

  @ApiPropertyOptional({
    description: "Filtro por nome do Calendario",
    type: [String],
  })
  @TransformToArray()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.calendario.nome"?: string[];

  @ApiPropertyOptional({
    description: "Filtro por ano do Calendario",
    type: [String],
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
export class DiaCalendarioCreateInputRestDto {
  @ApiProperty({ description: "Data do dia no calendario", format: "date" })
  @IsDateString()
  data: string;

  @ApiProperty({ description: "Indica se o dia e letivo" })
  @IsBoolean()
  diaLetivo: boolean;

  @ApiProperty({ description: "Indica se o dia e presencial" })
  @IsBoolean()
  diaPresencial: boolean;

  @ApiProperty({
    description: "Tipo do dia (presencial, feriado, sabado, etc.)",
    enum: TIPO_DIA_CALENDARIO_VALUES,
  })
  @IsString()
  @IsIn(TIPO_DIA_CALENDARIO_VALUES)
  tipo: TipoDiaCalendario;

  @ApiPropertyOptional({ description: "Nome do feriado (ou null se nao for)", nullable: true })
  @IsOptional()
  @IsString()
  feriado?: string | null;

  @ApiProperty({ description: "Indica se o dia e extracurricular" })
  @IsBoolean()
  extraCurricular: boolean;

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
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @IsUUID()
  id: string;
}

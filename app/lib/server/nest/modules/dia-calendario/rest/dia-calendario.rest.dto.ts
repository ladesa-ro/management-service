import { ArgsType, Field, ID, InputType, ObjectType } from "@nestjs/graphql";
import { ApiProperty, ApiPropertyOptional, PartialType } from "@nestjs/swagger";
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
  PaginationInputDto,
  PaginationMetaDto,
  TransformToArray,
} from "@/modules/@shared/infrastructure/presentation/rest/dtos";
import {
  CalendarioLetivoFindOneInputDto,
  CalendarioLetivoFindOneOutputDto,
} from "@/server/nest/modules/calendario-letivo/rest";

// ============================================================================
// Constants
// ============================================================================

export const TIPO_DIA_CALENDARIO_VALUES = [
  "Aula Presencial",
  "Aula Não Presencial (Letiva)",
  "Feriado",
  "Sábado",
  "Domingo",
  "Outro",
] as const;

export type TipoDiaCalendario = (typeof TIPO_DIA_CALENDARIO_VALUES)[number];

// ============================================================================
// FindOne Output
// ============================================================================

@ObjectType("DiaCalendario")
@RegisterModel({
  name: "DiaCalendarioFindOneOutput",
  properties: [
    simpleProperty("id"),
    simpleProperty("data"),
    simpleProperty("diaLetivo"),
    simpleProperty("diaPresencial"),
    simpleProperty("tipo"),
    simpleProperty("feriado", { nullable: true }),
    simpleProperty("extraCurricular"),
    referenceProperty("calendario", "CalendarioLetivoFindOneOutput"),
    ...commonProperties.dated,
  ],
})
export class DiaCalendarioFindOneOutputDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @Field(() => ID)
  @IsUUID()
  id: string;

  @ApiProperty({ description: "Data do dia no calendario", format: "date" })
  @Field()
  @IsDateString()
  data: string;

  @ApiProperty({ description: "Indica se o dia e letivo" })
  @Field()
  @IsBoolean()
  diaLetivo: boolean;

  @ApiProperty({ description: "Indica se o dia e presencial" })
  @Field()
  @IsBoolean()
  diaPresencial: boolean;

  @ApiProperty({
    description: "Tipo do dia (presencial, feriado, sabado, etc.)",
    enum: TIPO_DIA_CALENDARIO_VALUES,
  })
  @Field(() => String)
  @IsString()
  @IsIn(TIPO_DIA_CALENDARIO_VALUES)
  tipo!: TipoDiaCalendario;

  @ApiPropertyOptional({ description: "Nome do feriado (ou null se nao for)", nullable: true })
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  feriado: string | null;

  @ApiProperty({ description: "Indica se o dia e extracurricular" })
  @Field()
  @IsBoolean()
  extraCurricular: boolean;

  @ApiProperty({
    type: () => CalendarioLetivoFindOneOutputDto,
    description: "Calendario letivo ao qual o dia pertence",
  })
  @Field(() => CalendarioLetivoFindOneOutputDto)
  @ValidateNested()
  @Type(() => CalendarioLetivoFindOneOutputDto)
  calendario: CalendarioLetivoFindOneOutputDto;

  @ApiProperty({ description: "Data e hora da criacao do registro" })
  @Field()
  @IsDateString()
  dateCreated: Date;

  @ApiProperty({ description: "Data e hora da alteracao do registro" })
  @Field()
  @IsDateString()
  dateUpdated: Date;

  @ApiPropertyOptional({ description: "Data e hora da exclusao do registro", nullable: true })
  @Field({ nullable: true })
  @IsOptional()
  @IsDateString()
  dateDeleted: Date | null;
}

// ============================================================================
// List Input/Output
// ============================================================================

@ArgsType()
@InputType("DiaCalendarioListInput")
export class DiaCalendarioListInputDto extends PaginationInputDto {
  @ApiPropertyOptional({
    description: "Filtro por ID",
    type: [String],
  })
  @TransformToArray()
  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.id"?: string[];

  @ApiPropertyOptional({
    description: "Filtro por ID do Calendario",
    type: [String],
  })
  @TransformToArray()
  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.calendario.id"?: string[];

  @ApiPropertyOptional({
    description: "Filtro por nome do Calendario",
    type: [String],
  })
  @TransformToArray()
  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.calendario.nome"?: string[];

  @ApiPropertyOptional({
    description: "Filtro por ano do Calendario",
    type: [String],
  })
  @TransformToArray()
  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.calendario.ano"?: string[];
}

@ObjectType("DiaCalendarioListOutput")
export class DiaCalendarioListOutputDto {
  @ApiProperty({ type: () => PaginationMetaDto, description: "Metadados da busca" })
  @Field(() => PaginationMetaDto)
  meta: PaginationMetaDto;

  @ApiProperty({ type: () => [DiaCalendarioFindOneOutputDto], description: "Resultados da busca" })
  @Field(() => [DiaCalendarioFindOneOutputDto])
  data: DiaCalendarioFindOneOutputDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@InputType("DiaCalendarioCreateInput")
export class DiaCalendarioCreateInputDto {
  @ApiProperty({ description: "Data do dia no calendario", format: "date" })
  @Field()
  @IsDateString()
  data: string;

  @ApiProperty({ description: "Indica se o dia e letivo" })
  @Field()
  @IsBoolean()
  diaLetivo: boolean;

  @ApiProperty({ description: "Indica se o dia e presencial" })
  @Field()
  @IsBoolean()
  diaPresencial: boolean;

  @ApiProperty({
    description: "Tipo do dia (presencial, feriado, sabado, etc.)",
    enum: TIPO_DIA_CALENDARIO_VALUES,
  })
  @Field(() => String)
  @IsString()
  @IsIn(TIPO_DIA_CALENDARIO_VALUES)
  tipo: TipoDiaCalendario;

  @ApiPropertyOptional({ description: "Nome do feriado (ou null se nao for)", nullable: true })
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  feriado?: string | null;

  @ApiProperty({ description: "Indica se o dia e extracurricular" })
  @Field()
  @IsBoolean()
  extraCurricular: boolean;

  @ApiProperty({
    type: () => CalendarioLetivoFindOneInputDto,
    description: "Calendario letivo ao qual o dia pertence",
  })
  @Field(() => CalendarioLetivoFindOneInputDto)
  @ValidateNested()
  @Type(() => CalendarioLetivoFindOneInputDto)
  calendario: CalendarioLetivoFindOneInputDto;
}

@InputType("DiaCalendarioUpdateInput")
export class DiaCalendarioUpdateInputDto extends PartialType(DiaCalendarioCreateInputDto) {}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@ArgsType()
@InputType("DiaCalendarioFindOneInput")
export class DiaCalendarioFindOneInputDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @Field(() => ID)
  @IsUUID()
  id: string;
}

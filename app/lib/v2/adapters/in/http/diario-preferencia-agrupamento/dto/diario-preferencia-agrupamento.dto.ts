import { ArgsType, Field, ID, InputType, Int, ObjectType } from "@nestjs/graphql";
import { ApiProperty, ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsArray,
  IsDateString,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min,
  ValidateNested,
} from "class-validator";
import { PaginationInputDto, PaginationMetaDto } from "@/shared/dto";
import {
  commonProperties,
  RegisterModel,
  referenceProperty,
  simpleProperty,
} from "@/shared/metadata";
import { DiarioFindOneInputDto, DiarioFindOneOutputDto } from "@/v2/adapters/in/http/diario/dto";

// ============================================================================
// IntervaloDeTempo Stub DTOs (forward reference until intervalo-de-tempo module has DTOs)
// ============================================================================

@ObjectType("IntervaloDeTempoFindOneOutputFromDiarioPreferenciaAgrupamento")
export class IntervaloDeTempoFindOneOutputDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @Field(() => ID)
  @IsUUID()
  id: string;

  @ApiProperty({ description: "Horario que o intervalo de tempo inicia" })
  @Field()
  @IsString()
  periodoInicio: string;

  @ApiProperty({ description: "Horario que o intervalo de tempo termina" })
  @Field()
  @IsString()
  periodoFim: string;

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

@InputType("IntervaloDeTempoFindOneInputFromDiarioPreferenciaAgrupamento")
export class IntervaloDeTempoFindOneInputDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @Field(() => ID)
  @IsUUID()
  id: string;
}

// ============================================================================
// FindOne Output
// ============================================================================

@ObjectType("DiarioPreferenciaAgrupamento")
@RegisterModel({
  name: "DiarioPreferenciaAgrupamentoFindOneOutput",
  properties: [
    simpleProperty("id"),
    simpleProperty("dataInicio"),
    simpleProperty("dataFim", { nullable: true }),
    simpleProperty("diaSemanaIso"),
    simpleProperty("aulasSeguidas"),
    referenceProperty("intervaloDeTempo", "IntervaloDeTempoFindOneOutput"),
    referenceProperty("diario", "DiarioFindOneOutput"),
    ...commonProperties.dated,
  ],
})
export class DiarioPreferenciaAgrupamentoFindOneOutputDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @Field(() => ID)
  @IsUUID()
  id: string;

  @ApiProperty({ description: "Inicio da vigencia da preferencia de agrupamento" })
  @Field()
  @IsDateString()
  dataInicio: string;

  @ApiPropertyOptional({
    description: "Fim da vigencia da preferencia de agrupamento",
    nullable: true,
  })
  @Field({ nullable: true })
  @IsOptional()
  @IsDateString()
  dataFim: string | null;

  @ApiProperty({
    description: "Dia da semana (ISO 8601: 1=Segunda, 7=Domingo)",
    minimum: 1,
    maximum: 7,
  })
  @Field(() => Int)
  @IsInt()
  @Min(1)
  @Max(7)
  diaSemanaIso: number;

  @ApiProperty({ description: "Quantidade de aulas seguidas", minimum: 1 })
  @Field(() => Int)
  @IsInt()
  @Min(1)
  aulasSeguidas: number;

  @ApiProperty({ type: () => IntervaloDeTempoFindOneOutputDto, description: "Intervalo de tempo" })
  @Field(() => IntervaloDeTempoFindOneOutputDto)
  @ValidateNested()
  @Type(() => IntervaloDeTempoFindOneOutputDto)
  intervaloDeTempo: IntervaloDeTempoFindOneOutputDto;

  @ApiProperty({ type: () => DiarioFindOneOutputDto, description: "Diario vinculado" })
  @Field(() => DiarioFindOneOutputDto)
  @ValidateNested()
  @Type(() => DiarioFindOneOutputDto)
  diario: DiarioFindOneOutputDto;

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
@InputType("DiarioPreferenciaAgrupamentoListInput")
export class DiarioPreferenciaAgrupamentoListInputDto extends PaginationInputDto {
  @ApiPropertyOptional({
    description: "Filtro por ID",
    type: [String],
  })
  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.id"?: string[];
}

@ObjectType("DiarioPreferenciaAgrupamentoListOutput")
export class DiarioPreferenciaAgrupamentoListOutputDto {
  @ApiProperty({ type: () => PaginationMetaDto, description: "Metadados da busca" })
  @Field(() => PaginationMetaDto)
  meta: PaginationMetaDto;

  @ApiProperty({
    type: () => [DiarioPreferenciaAgrupamentoFindOneOutputDto],
    description: "Resultados da busca",
  })
  @Field(() => [DiarioPreferenciaAgrupamentoFindOneOutputDto])
  data: DiarioPreferenciaAgrupamentoFindOneOutputDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@InputType("DiarioPreferenciaAgrupamentoCreateInput")
export class DiarioPreferenciaAgrupamentoCreateInputDto {
  @ApiProperty({ description: "Inicio da vigencia da preferencia de agrupamento" })
  @Field()
  @IsDateString()
  dataInicio: string;

  @ApiPropertyOptional({
    description: "Fim da vigencia da preferencia de agrupamento",
    nullable: true,
  })
  @Field({ nullable: true })
  @IsOptional()
  @IsDateString()
  dataFim?: string | null;

  @ApiProperty({
    description: "Dia da semana (ISO 8601: 1=Segunda, 7=Domingo)",
    minimum: 1,
    maximum: 7,
  })
  @Field(() => Int)
  @IsInt()
  @Min(1)
  @Max(7)
  diaSemanaIso: number;

  @ApiProperty({ description: "Quantidade de aulas seguidas", minimum: 1 })
  @Field(() => Int)
  @IsInt()
  @Min(1)
  aulasSeguidas: number;

  @ApiProperty({ type: () => IntervaloDeTempoFindOneInputDto, description: "Intervalo de tempo" })
  @Field(() => IntervaloDeTempoFindOneInputDto)
  @ValidateNested()
  @Type(() => IntervaloDeTempoFindOneInputDto)
  intervaloDeTempo: IntervaloDeTempoFindOneInputDto;

  @ApiProperty({ type: () => DiarioFindOneInputDto, description: "Diario vinculado" })
  @Field(() => DiarioFindOneInputDto)
  @ValidateNested()
  @Type(() => DiarioFindOneInputDto)
  diario: DiarioFindOneInputDto;
}

@InputType("DiarioPreferenciaAgrupamentoUpdateInput")
export class DiarioPreferenciaAgrupamentoUpdateInputDto extends PartialType(
  DiarioPreferenciaAgrupamentoCreateInputDto,
) {}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@ArgsType()
@InputType("DiarioPreferenciaAgrupamentoFindOneInput")
export class DiarioPreferenciaAgrupamentoFindOneInputDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @Field(() => ID)
  @IsUUID()
  id: string;
}

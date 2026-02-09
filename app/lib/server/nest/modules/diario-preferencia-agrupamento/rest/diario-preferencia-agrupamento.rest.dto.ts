import { ApiProperty, ApiPropertyOptional, ApiSchema, PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsArray,
  IsDateString,
  IsInt,
  IsOptional,
  IsUUID,
  Max,
  Min,
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
  DiarioFindOneInputRestDto,
  DiarioFindOneOutputRestDto,
} from "@/server/nest/modules/diario/rest";
import {
  IntervaloDeTempoFindOneInputRestDto,
  IntervaloDeTempoFindOneOutputRestDto,
} from "@/server/nest/modules/intervalo-de-tempo/rest";

// ============================================================================
// FindOne Output
// ============================================================================

@ApiSchema({ name: "DiarioPreferenciaAgrupamentoFindOneOutputDto" })
@RegisterModel({
  name: "DiarioPreferenciaAgrupamentoFindOneOutputDto",
  properties: [
    simpleProperty("id"),
    simpleProperty("dataInicio"),
    simpleProperty("dataFim", { nullable: true }),
    simpleProperty("diaSemanaIso"),
    simpleProperty("aulasSeguidas"),
    referenceProperty("intervaloDeTempo", "IntervaloDeTempoFindOneOutputDto"),
    referenceProperty("diario", "DiarioFindOneOutputDto"),
    ...commonProperties.dated,
  ],
})
export class DiarioPreferenciaAgrupamentoFindOneOutputRestDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @IsUUID()
  id: string;

  @ApiProperty({ description: "Inicio da vigencia da preferencia de agrupamento" })
  @IsDateString()
  dataInicio: string;

  @ApiPropertyOptional({
    description: "Fim da vigencia da preferencia de agrupamento",
    nullable: true,
  })
  @IsOptional()
  @IsDateString()
  dataFim: string | null;

  @ApiProperty({
    description: "Dia da semana (ISO 8601: 1=Segunda, 7=Domingo)",
    minimum: 1,
    maximum: 7,
  })
  @IsInt()
  @Min(1)
  @Max(7)
  diaSemanaIso: number;

  @ApiProperty({ description: "Quantidade de aulas seguidas", minimum: 1 })
  @IsInt()
  @Min(1)
  aulasSeguidas: number;

  @ApiProperty({
    type: () => IntervaloDeTempoFindOneOutputRestDto,
    description: "Intervalo de tempo",
  })
  @ValidateNested()
  @Type(() => IntervaloDeTempoFindOneOutputRestDto)
  intervaloDeTempo: IntervaloDeTempoFindOneOutputRestDto;

  @ApiProperty({ type: () => DiarioFindOneOutputRestDto, description: "Diario vinculado" })
  @ValidateNested()
  @Type(() => DiarioFindOneOutputRestDto)
  diario: DiarioFindOneOutputRestDto;

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

@ApiSchema({ name: "DiarioPreferenciaAgrupamentoListInputDto" })
export class DiarioPreferenciaAgrupamentoListInputRestDto extends PaginationInputRestDto {
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
    description: "Filtro por ID do Diario",
    type: [String],
  })
  @TransformToArray()
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  "filter.diario.id"?: string[];
}

@ApiSchema({ name: "DiarioPreferenciaAgrupamentoListOutputDto" })
export class DiarioPreferenciaAgrupamentoListOutputRestDto {
  @ApiProperty({ type: () => PaginationMetaRestDto, description: "Metadados da busca" })
  meta: PaginationMetaRestDto;

  @ApiProperty({
    type: () => [DiarioPreferenciaAgrupamentoFindOneOutputRestDto],
    description: "Resultados da busca",
  })
  data: DiarioPreferenciaAgrupamentoFindOneOutputRestDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@ApiSchema({ name: "DiarioPreferenciaAgrupamentoCreateInputDto" })
export class DiarioPreferenciaAgrupamentoCreateInputRestDto {
  @ApiProperty({ description: "Inicio da vigencia da preferencia de agrupamento" })
  @IsDateString()
  dataInicio: string;

  @ApiPropertyOptional({
    description: "Fim da vigencia da preferencia de agrupamento",
    nullable: true,
  })
  @IsOptional()
  @IsDateString()
  dataFim?: string | null;

  @ApiProperty({
    description: "Dia da semana (ISO 8601: 1=Segunda, 7=Domingo)",
    minimum: 1,
    maximum: 7,
  })
  @IsInt()
  @Min(1)
  @Max(7)
  diaSemanaIso: number;

  @ApiProperty({ description: "Quantidade de aulas seguidas", minimum: 1 })
  @IsInt()
  @Min(1)
  aulasSeguidas: number;

  @ApiProperty({
    type: () => IntervaloDeTempoFindOneInputRestDto,
    description: "Intervalo de tempo",
  })
  @ValidateNested()
  @Type(() => IntervaloDeTempoFindOneInputRestDto)
  intervaloDeTempo: IntervaloDeTempoFindOneInputRestDto;

  @ApiProperty({ type: () => DiarioFindOneInputRestDto, description: "Diario vinculado" })
  @ValidateNested()
  @Type(() => DiarioFindOneInputRestDto)
  diario: DiarioFindOneInputRestDto;
}

@ApiSchema({ name: "DiarioPreferenciaAgrupamentoUpdateInputDto" })
export class DiarioPreferenciaAgrupamentoUpdateInputRestDto extends PartialType(
  DiarioPreferenciaAgrupamentoCreateInputRestDto,
) {}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@ApiSchema({ name: "DiarioPreferenciaAgrupamentoFindOneInputDto" })
export class DiarioPreferenciaAgrupamentoFindOneInputRestDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @IsUUID()
  id: string;
}

import { ArgsType, Field, ID, InputType, Int, ObjectType, PartialType } from "@nestjs/graphql";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
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
import { DiarioFindOneInputDto, DiarioFindOneOutputDto } from "@/server/nest/modules/diario/rest";
import {
  IntervaloDeTempoFindOneInputDto,
  IntervaloDeTempoFindOneOutputDto,
} from "@/server/nest/modules/intervalo-de-tempo/rest";

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
  @Field(() => Date, { nullable: true })
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
  @Field(() => Date, { nullable: true })
  @IsOptional()
  @IsDateString()
  dateDeleted: Date | null;
}

// ============================================================================
// List Input/Output
// ============================================================================

@ArgsType()
export class DiarioPreferenciaAgrupamentoListInputDto extends PaginationInputDto {
  @ApiPropertyOptional({
    description: "Filtro por ID",
    type: [String],
  })
  @TransformToArray()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.id"?: string[];

  @ApiPropertyOptional({
    description: "Filtro por ID do Diario",
    type: [String],
  })
  @TransformToArray()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.diario.id"?: string[];
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
  @Field(() => Date, { nullable: true })
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

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
import {
  CalendarioLetivoFindOneInputDto,
  CalendarioLetivoFindOneOutputDto,
} from "@/v2/server/modules/calendario-letivo/http/dto";

// ============================================================================
// FindOne Output
// ============================================================================

@ObjectType("Etapa")
@RegisterModel({
  name: "EtapaFindOneOutput",
  properties: [
    simpleProperty("id"),
    simpleProperty("numero", { nullable: true }),
    simpleProperty("dataInicio"),
    simpleProperty("dataTermino"),
    simpleProperty("cor", { nullable: true }),
    referenceProperty("calendario", "CalendarioLetivoFindOneOutput"),
    ...commonProperties.dated,
  ],
})
export class EtapaFindOneOutputDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @Field(() => ID)
  @IsUUID()
  id: string;

  @ApiPropertyOptional({ description: "Numero da etapa", nullable: true, minimum: 0, maximum: 255 })
  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(255)
  numero: number | null;

  @ApiProperty({ description: "Data de inicio da etapa", format: "date" })
  @Field()
  @IsDateString()
  dataInicio: string;

  @ApiProperty({ description: "Data de termino da etapa", format: "date" })
  @Field()
  @IsDateString()
  dataTermino: string;

  @ApiPropertyOptional({ description: "Cor da etapa", nullable: true })
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  cor: string | null;

  @ApiProperty({
    type: () => CalendarioLetivoFindOneOutputDto,
    description: "Calendario letivo ao qual a etapa pertence",
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
@InputType("EtapaListInput")
export class EtapaListInputDto extends PaginationInputDto {
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

@ObjectType("EtapaListOutput")
export class EtapaListOutputDto {
  @ApiProperty({ type: () => PaginationMetaDto, description: "Metadados da busca" })
  @Field(() => PaginationMetaDto)
  meta: PaginationMetaDto;

  @ApiProperty({ type: () => [EtapaFindOneOutputDto], description: "Resultados da busca" })
  @Field(() => [EtapaFindOneOutputDto])
  data: EtapaFindOneOutputDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@InputType("EtapaCreateInput")
export class EtapaCreateInputDto {
  @ApiPropertyOptional({ description: "Numero da etapa", nullable: true, minimum: 0, maximum: 255 })
  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(255)
  numero?: number | null;

  @ApiProperty({ description: "Data de inicio da etapa", format: "date" })
  @Field()
  @IsDateString()
  dataInicio: string;

  @ApiProperty({ description: "Data de termino da etapa", format: "date" })
  @Field()
  @IsDateString()
  dataTermino: string;

  @ApiPropertyOptional({ description: "Cor da etapa", nullable: true })
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  cor?: string | null;

  @ApiProperty({
    type: () => CalendarioLetivoFindOneInputDto,
    description: "Calendario letivo ao qual a etapa pertence",
  })
  @Field(() => CalendarioLetivoFindOneInputDto)
  @ValidateNested()
  @Type(() => CalendarioLetivoFindOneInputDto)
  calendario: CalendarioLetivoFindOneInputDto;
}

@InputType("EtapaUpdateInput")
export class EtapaUpdateInputDto extends PartialType(EtapaCreateInputDto) {}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@ArgsType()
@InputType("EtapaFindOneInput")
export class EtapaFindOneInputDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @Field(() => ID)
  @IsUUID()
  id: string;
}

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
import {
  CalendarioLetivoFindOneInputDto,
  CalendarioLetivoFindOneOutputDto,
} from "@/server/nest/modules/calendario-letivo/rest";

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
export class EtapaFindOneOutputRestDto {
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
  @Field(() => String, { nullable: true })
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
  @Field(() => Date, { nullable: true })
  @IsOptional()
  @IsDateString()
  dateDeleted: Date | null;
}

// ============================================================================
// List Input/Output
// ============================================================================

@ArgsType()
export class EtapaListInputRestDto extends PaginationInputDto {
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
    description: "Filtro por ID do Calendario",
    type: [String],
  })
  @TransformToArray()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
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

@ObjectType("EtapaListOutput")
export class EtapaListOutputRestDto {
  @ApiProperty({ type: () => PaginationMetaDto, description: "Metadados da busca" })
  @Field(() => PaginationMetaDto)
  meta: PaginationMetaDto;

  @ApiProperty({ type: () => [EtapaFindOneOutputRestDto], description: "Resultados da busca" })
  @Field(() => [EtapaFindOneOutputRestDto])
  data: EtapaFindOneOutputRestDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@InputType("EtapaCreateInput")
export class EtapaCreateInputRestDto {
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
  @Field(() => String, { nullable: true })
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
export class EtapaUpdateInputRestDto extends PartialType(EtapaCreateInputRestDto) {}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@ArgsType()
@InputType("EtapaFindOneInput")
export class EtapaFindOneInputRestDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @Field(() => ID)
  @IsUUID()
  id: string;
}

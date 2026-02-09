import { ApiProperty, ApiPropertyOptional, ApiSchema, PartialType } from "@nestjs/swagger";
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
  PaginationInputRestDto,
  PaginationMetaRestDto,
  TransformToArray,
} from "@/modules/@shared/infrastructure/presentation/rest/dtos";
import {
  CalendarioLetivoFindOneInputRestDto,
  CalendarioLetivoFindOneOutputRestDto,
} from "@/server/nest/modules/calendario-letivo/rest";

// ============================================================================
// FindOne Output
// ============================================================================

@ApiSchema({ name: "EtapaFindOneOutputDto" })
@RegisterModel({
  name: "EtapaFindOneOutputDto",
  properties: [
    simpleProperty("id"),
    simpleProperty("numero", { nullable: true }),
    simpleProperty("dataInicio"),
    simpleProperty("dataTermino"),
    simpleProperty("cor", { nullable: true }),
    referenceProperty("calendario", "CalendarioLetivoFindOneOutputDto"),
    ...commonProperties.dated,
  ],
})
export class EtapaFindOneOutputRestDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @IsUUID()
  id: string;

  @ApiPropertyOptional({ description: "Numero da etapa", nullable: true, minimum: 0, maximum: 255 })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(255)
  numero: number | null;

  @ApiProperty({ description: "Data de inicio da etapa", format: "date" })
  @IsDateString()
  dataInicio: string;

  @ApiProperty({ description: "Data de termino da etapa", format: "date" })
  @IsDateString()
  dataTermino: string;

  @ApiPropertyOptional({ description: "Cor da etapa", nullable: true })
  @IsOptional()
  @IsString()
  cor: string | null;

  @ApiProperty({
    type: () => CalendarioLetivoFindOneOutputRestDto,
    description: "Calendario letivo ao qual a etapa pertence",
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

@ApiSchema({ name: "EtapaListInputDto" })
export class EtapaListInputRestDto extends PaginationInputRestDto {
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

@ApiSchema({ name: "EtapaListOutputDto" })
export class EtapaListOutputRestDto {
  @ApiProperty({ type: () => PaginationMetaRestDto, description: "Metadados da busca" })
  meta: PaginationMetaRestDto;

  @ApiProperty({ type: () => [EtapaFindOneOutputRestDto], description: "Resultados da busca" })
  data: EtapaFindOneOutputRestDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@ApiSchema({ name: "EtapaCreateInputDto" })
export class EtapaCreateInputRestDto {
  @ApiPropertyOptional({ description: "Numero da etapa", nullable: true, minimum: 0, maximum: 255 })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(255)
  numero?: number | null;

  @ApiProperty({ description: "Data de inicio da etapa", format: "date" })
  @IsDateString()
  dataInicio: string;

  @ApiProperty({ description: "Data de termino da etapa", format: "date" })
  @IsDateString()
  dataTermino: string;

  @ApiPropertyOptional({ description: "Cor da etapa", nullable: true })
  @IsOptional()
  @IsString()
  cor?: string | null;

  @ApiProperty({
    type: () => CalendarioLetivoFindOneInputRestDto,
    description: "Calendario letivo ao qual a etapa pertence",
  })
  @ValidateNested()
  @Type(() => CalendarioLetivoFindOneInputRestDto)
  calendario: CalendarioLetivoFindOneInputRestDto;
}

@ApiSchema({ name: "EtapaUpdateInputDto" })
export class EtapaUpdateInputRestDto extends PartialType(EtapaCreateInputRestDto) {}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@ApiSchema({ name: "EtapaFindOneInputDto" })
export class EtapaFindOneInputRestDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @IsUUID()
  id: string;
}

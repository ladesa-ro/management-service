import { ApiProperty, ApiPropertyOptional, ApiSchema, PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsArray,
  IsDateString,
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
  CalendarioLetivoFindOneInputRestDto,
  CalendarioLetivoFindOneOutputRestDto,
} from "@/server/nest/modules/calendario-letivo/rest";

// ============================================================================
// FindOne Output
// ============================================================================

@ApiSchema({ name: "HorarioGeradoFindOneOutputDto" })
@RegisterModel({
  name: "HorarioGeradoFindOneOutputDto",
  properties: [
    simpleProperty("id"),
    simpleProperty("status", { nullable: true }),
    simpleProperty("tipo", { nullable: true }),
    simpleProperty("dataGeracao", { nullable: true }),
    simpleProperty("vigenciaInicio", { nullable: true }),
    simpleProperty("vigenciaFim", { nullable: true }),
    referenceProperty("calendario", "CalendarioLetivoFindOneOutputDto"),
    ...commonProperties.dated,
  ],
})
export class HorarioGeradoFindOneOutputRestDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @IsUUID()
  id: string;

  @ApiPropertyOptional({ description: "Status do horario gerado", nullable: true })
  @IsOptional()
  @IsString()
  status: string | null;

  @ApiPropertyOptional({ description: "Tipo do horario gerado", nullable: true })
  @IsOptional()
  @IsString()
  tipo: string | null;

  @ApiPropertyOptional({ description: "Data em que o horario foi gerado", nullable: true })
  @IsOptional()
  @IsDateString()
  dataGeracao: Date | null;

  @ApiPropertyOptional({ description: "Inicio da vigencia do horario gerado", nullable: true })
  @IsOptional()
  @IsDateString()
  vigenciaInicio: Date | null;

  @ApiPropertyOptional({ description: "Fim da vigencia do horario gerado", nullable: true })
  @IsOptional()
  @IsDateString()
  vigenciaFim: Date | null;

  @ApiProperty({
    type: () => CalendarioLetivoFindOneOutputRestDto,
    description: "Calendario letivo",
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

@ApiSchema({ name: "HorarioGeradoListInputDto" })
export class HorarioGeradoListInputRestDto extends PaginationInputRestDto {
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

@ApiSchema({ name: "HorarioGeradoListOutputDto" })
export class HorarioGeradoListOutputRestDto {
  @ApiProperty({ type: () => PaginationMetaRestDto, description: "Metadados da busca" })
  meta: PaginationMetaRestDto;

  @ApiProperty({
    type: () => [HorarioGeradoFindOneOutputRestDto],
    description: "Resultados da busca",
  })
  data: HorarioGeradoFindOneOutputRestDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@ApiSchema({ name: "HorarioGeradoCreateInputDto" })
export class HorarioGeradoCreateInputRestDto {
  @ApiPropertyOptional({ description: "Status do horario gerado", nullable: true })
  @IsOptional()
  @IsString()
  status?: string | null;

  @ApiPropertyOptional({ description: "Tipo do horario gerado", nullable: true })
  @IsOptional()
  @IsString()
  tipo?: string | null;

  @ApiPropertyOptional({ description: "Data em que o horario foi gerado", nullable: true })
  @IsOptional()
  @IsDateString()
  dataGeracao?: Date | null;

  @ApiPropertyOptional({ description: "Inicio da vigencia do horario gerado", nullable: true })
  @IsOptional()
  @IsDateString()
  vigenciaInicio?: Date | null;

  @ApiPropertyOptional({ description: "Fim da vigencia do horario gerado", nullable: true })
  @IsOptional()
  @IsDateString()
  vigenciaFim?: Date | null;

  @ApiProperty({
    type: () => CalendarioLetivoFindOneInputRestDto,
    description: "Calendario letivo",
  })
  @ValidateNested()
  @Type(() => CalendarioLetivoFindOneInputRestDto)
  calendario: CalendarioLetivoFindOneInputRestDto;
}

@ApiSchema({ name: "HorarioGeradoUpdateInputDto" })
export class HorarioGeradoUpdateInputRestDto extends PartialType(HorarioGeradoCreateInputRestDto) {}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@ApiSchema({ name: "HorarioGeradoFindOneInputDto" })
export class HorarioGeradoFindOneInputRestDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @IsUUID()
  id: string;
}

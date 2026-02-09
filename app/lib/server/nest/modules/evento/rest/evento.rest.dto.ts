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
  AmbienteFindOneInputRestDto,
  AmbienteFindOneOutputRestDto,
} from "@/server/nest/modules/ambiente/rest";
import {
  CalendarioLetivoFindOneInputRestDto,
  CalendarioLetivoFindOneOutputRestDto,
} from "@/server/nest/modules/calendario-letivo/rest";

// ============================================================================
// FindOne Output
// ============================================================================

@ApiSchema({ name: "EventoFindOneOutputDto" })
@RegisterModel({
  name: "EventoFindOneOutputDto",
  properties: [
    simpleProperty("id"),
    simpleProperty("nome", { nullable: true }),
    simpleProperty("rrule"),
    simpleProperty("cor", { nullable: true }),
    simpleProperty("dataInicio", { nullable: true }),
    simpleProperty("dataFim", { nullable: true }),
    referenceProperty("calendario", "CalendarioLetivoFindOneOutputDto"),
    referenceProperty("ambiente", "AmbienteFindOneOutputDto", { nullable: true }),
    ...commonProperties.dated,
  ],
})
export class EventoFindOneOutputRestDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @IsUUID()
  id: string;

  @ApiPropertyOptional({ description: "Nome do evento", nullable: true })
  @IsOptional()
  @IsString()
  nome: string | null;

  @ApiProperty({
    description: "Regra RRule para a recorrencia do evento. Segue a RFC 5545 do iCalendar",
  })
  @IsString()
  rrule: string;

  @ApiPropertyOptional({ description: "Cor do evento", nullable: true })
  @IsOptional()
  @IsString()
  cor: string | null;

  @ApiPropertyOptional({ description: "Data de inicio do evento", format: "date", nullable: true })
  @IsOptional()
  @IsDateString()
  dataInicio: string | null;

  @ApiPropertyOptional({ description: "Data de termino do evento", format: "date", nullable: true })
  @IsOptional()
  @IsDateString()
  dataFim: string | null;

  @ApiProperty({
    type: () => CalendarioLetivoFindOneOutputRestDto,
    description: "Calendario letivo ao qual o evento pertence",
  })
  @ValidateNested()
  @Type(() => CalendarioLetivoFindOneOutputRestDto)
  calendario: CalendarioLetivoFindOneOutputRestDto;

  @ApiPropertyOptional({
    type: () => AmbienteFindOneOutputRestDto,
    description: "Ambiente de ocorrencia do evento",
    nullable: true,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => AmbienteFindOneOutputRestDto)
  ambiente: AmbienteFindOneOutputRestDto | null;

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

@ApiSchema({ name: "EventoListInputDto" })
export class EventoListInputRestDto extends PaginationInputRestDto {
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
    description: "Filtro por ID do Calendario Letivo",
    type: [String],
  })
  @TransformToArray()
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  "filter.calendario.id"?: string[];
}

@ApiSchema({ name: "EventoListOutputDto" })
export class EventoListOutputRestDto {
  @ApiProperty({ type: () => PaginationMetaRestDto, description: "Metadados da busca" })
  meta: PaginationMetaRestDto;

  @ApiProperty({ type: () => [EventoFindOneOutputRestDto], description: "Resultados da busca" })
  data: EventoFindOneOutputRestDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@ApiSchema({ name: "EventoCreateInputDto" })
export class EventoCreateInputRestDto {
  @ApiPropertyOptional({ description: "Nome do evento", nullable: true })
  @IsOptional()
  @IsString()
  nome?: string | null;

  @ApiProperty({
    description: "Regra RRule para a recorrencia do evento. Segue a RFC 5545 do iCalendar",
  })
  @IsString()
  rrule: string;

  @ApiPropertyOptional({ description: "Cor do evento", nullable: true })
  @IsOptional()
  @IsString()
  cor?: string | null;

  @ApiPropertyOptional({ description: "Data de inicio do evento", format: "date", nullable: true })
  @IsOptional()
  @IsDateString()
  dataInicio?: string | null;

  @ApiPropertyOptional({ description: "Data de termino do evento", format: "date", nullable: true })
  @IsOptional()
  @IsDateString()
  dataFim?: string | null;

  @ApiProperty({
    type: () => CalendarioLetivoFindOneInputRestDto,
    description: "Calendario letivo ao qual o evento pertence",
  })
  @ValidateNested()
  @Type(() => CalendarioLetivoFindOneInputRestDto)
  calendario: CalendarioLetivoFindOneInputRestDto;

  @ApiPropertyOptional({
    type: () => AmbienteFindOneInputRestDto,
    description: "Ambiente de ocorrencia do evento",
    nullable: true,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => AmbienteFindOneInputRestDto)
  ambiente?: AmbienteFindOneInputRestDto | null;
}

@ApiSchema({ name: "EventoUpdateInputDto" })
export class EventoUpdateInputRestDto extends PartialType(EventoCreateInputRestDto) {}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@ApiSchema({ name: "EventoFindOneInputDto" })
export class EventoFindOneInputRestDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @IsUUID()
  id: string;
}

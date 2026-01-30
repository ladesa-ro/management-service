import { ArgsType, Field, ID, InputType, ObjectType } from "@nestjs/graphql";
import { ApiProperty, ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsArray,
  IsDateString,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from "class-validator";
import { PaginationInputDto, PaginationMetaDto, TransformToArray } from "@/v2/old/shared/dto";
import {
  commonProperties,
  RegisterModel,
  referenceProperty,
  simpleProperty,
} from "@/v2/old/shared/metadata";
import {
  AmbienteFindOneInputDto,
  AmbienteFindOneOutputDto,
} from "@/server/nest/modules/ambiente/rest";
import {
  CalendarioLetivoFindOneInputDto,
  CalendarioLetivoFindOneOutputDto,
} from "@/server/nest/modules/calendario-letivo/rest";

// ============================================================================
// FindOne Output
// ============================================================================

@ObjectType("Evento")
@RegisterModel({
  name: "EventoFindOneOutput",
  properties: [
    simpleProperty("id"),
    simpleProperty("nome", { nullable: true }),
    simpleProperty("rrule"),
    simpleProperty("cor", { nullable: true }),
    simpleProperty("dataInicio", { nullable: true }),
    simpleProperty("dataFim", { nullable: true }),
    referenceProperty("calendario", "CalendarioLetivoFindOneOutput"),
    referenceProperty("ambiente", "AmbienteFindOneOutput", { nullable: true }),
    ...commonProperties.dated,
  ],
})
export class EventoFindOneOutputDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @Field(() => ID)
  @IsUUID()
  id: string;

  @ApiPropertyOptional({ description: "Nome do evento", nullable: true })
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  nome: string | null;

  @ApiProperty({
    description: "Regra RRule para a recorrencia do evento. Segue a RFC 5545 do iCalendar",
  })
  @Field()
  @IsString()
  rrule: string;

  @ApiPropertyOptional({ description: "Cor do evento", nullable: true })
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  cor: string | null;

  @ApiPropertyOptional({ description: "Data de inicio do evento", format: "date", nullable: true })
  @Field({ nullable: true })
  @IsOptional()
  @IsDateString()
  dataInicio: string | null;

  @ApiPropertyOptional({ description: "Data de termino do evento", format: "date", nullable: true })
  @Field({ nullable: true })
  @IsOptional()
  @IsDateString()
  dataFim: string | null;

  @ApiProperty({
    type: () => CalendarioLetivoFindOneOutputDto,
    description: "Calendario letivo ao qual o evento pertence",
  })
  @Field(() => CalendarioLetivoFindOneOutputDto)
  @ValidateNested()
  @Type(() => CalendarioLetivoFindOneOutputDto)
  calendario: CalendarioLetivoFindOneOutputDto;

  @ApiPropertyOptional({
    type: () => AmbienteFindOneOutputDto,
    description: "Ambiente de ocorrencia do evento",
    nullable: true,
  })
  @Field(() => AmbienteFindOneOutputDto, { nullable: true })
  @IsOptional()
  @ValidateNested()
  @Type(() => AmbienteFindOneOutputDto)
  ambiente: AmbienteFindOneOutputDto | null;

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
@InputType("EventoListInput")
export class EventoListInputDto extends PaginationInputDto {
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
}

@ObjectType("EventoListOutput")
export class EventoListOutputDto {
  @ApiProperty({ type: () => PaginationMetaDto, description: "Metadados da busca" })
  @Field(() => PaginationMetaDto)
  meta: PaginationMetaDto;

  @ApiProperty({ type: () => [EventoFindOneOutputDto], description: "Resultados da busca" })
  @Field(() => [EventoFindOneOutputDto])
  data: EventoFindOneOutputDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@InputType("EventoCreateInput")
export class EventoCreateInputDto {
  @ApiPropertyOptional({ description: "Nome do evento", nullable: true })
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  nome?: string | null;

  @ApiProperty({
    description: "Regra RRule para a recorrencia do evento. Segue a RFC 5545 do iCalendar",
  })
  @Field()
  @IsString()
  rrule: string;

  @ApiPropertyOptional({ description: "Cor do evento", nullable: true })
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  cor?: string | null;

  @ApiPropertyOptional({ description: "Data de inicio do evento", format: "date", nullable: true })
  @Field({ nullable: true })
  @IsOptional()
  @IsDateString()
  dataInicio?: string | null;

  @ApiPropertyOptional({ description: "Data de termino do evento", format: "date", nullable: true })
  @Field({ nullable: true })
  @IsOptional()
  @IsDateString()
  dataFim?: string | null;

  @ApiProperty({
    type: () => CalendarioLetivoFindOneInputDto,
    description: "Calendario letivo ao qual o evento pertence",
  })
  @Field(() => CalendarioLetivoFindOneInputDto)
  @ValidateNested()
  @Type(() => CalendarioLetivoFindOneInputDto)
  calendario: CalendarioLetivoFindOneInputDto;

  @ApiPropertyOptional({
    type: () => AmbienteFindOneInputDto,
    description: "Ambiente de ocorrencia do evento",
    nullable: true,
  })
  @Field(() => AmbienteFindOneInputDto, { nullable: true })
  @IsOptional()
  @ValidateNested()
  @Type(() => AmbienteFindOneInputDto)
  ambiente?: AmbienteFindOneInputDto | null;
}

@InputType("EventoUpdateInput")
export class EventoUpdateInputDto extends PartialType(EventoCreateInputDto) {}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@ArgsType()
@InputType("EventoFindOneInput")
export class EventoFindOneInputDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @Field(() => ID)
  @IsUUID()
  id: string;
}

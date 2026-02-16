import { ApiProperty, ApiPropertyOptional, ApiSchema, PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsOptional, IsUUID, ValidateNested } from "class-validator";
import { decorate, Mixin } from "ts-mixer";
import {
  commonProperties,
  RegisterModel,
  referenceProperty,
  simpleProperty,
} from "@/modules/@shared/infrastructure/persistence/typeorm/metadata";
import {
  EntityBaseRestDto,
  PaginatedFilterByIdRestDto,
  PaginationMetaRestDto,
  TransformToArray,
} from "@/modules/@shared/infrastructure/presentation/rest/dtos";
import {
  AmbienteFindOneInputRestDto,
  AmbienteFindOneOutputRestDto,
} from "@/modules/sisgea/ambiente/presentation/rest";
import {
  CalendarioLetivoFindOneInputRestDto,
  CalendarioLetivoFindOneOutputRestDto,
} from "@/modules/sisgha/calendario-letivo/presentation/rest";
import { EventoFieldsMixin } from "../evento.validation-mixin";

// ============================================================================
// FindOne Output
// ============================================================================

@decorate(ApiSchema({ name: "EventoFindOneOutputDto" }))
@decorate(
  RegisterModel({
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
  }),
)
export class EventoFindOneOutputRestDto extends Mixin(EntityBaseRestDto, EventoFieldsMixin) {
  @decorate(ApiPropertyOptional({ type: "string", description: "Nome do evento", nullable: true }))
  declare nome: string | null;

  @decorate(
    ApiProperty({
      type: "string",
      description: "Regra RRule para a recorrencia do evento. Segue a RFC 5545 do iCalendar",
    }),
  )
  declare rrule: string;

  @decorate(ApiPropertyOptional({ type: "string", description: "Cor do evento", nullable: true }))
  declare cor: string | null;

  @decorate(
    ApiPropertyOptional({
      type: "string",
      description: "Data de inicio do evento",
      format: "date",
      nullable: true,
    }),
  )
  declare dataInicio: string | null;

  @decorate(
    ApiPropertyOptional({
      type: "string",
      description: "Data de termino do evento",
      format: "date",
      nullable: true,
    }),
  )
  declare dataFim: string | null;

  @decorate(
    ApiProperty({
      type: () => CalendarioLetivoFindOneOutputRestDto,
      description: "Calendario letivo ao qual o evento pertence",
    }),
  )
  @decorate(ValidateNested())
  @decorate(Type(() => CalendarioLetivoFindOneOutputRestDto))
  calendario: CalendarioLetivoFindOneOutputRestDto;

  @decorate(
    ApiPropertyOptional({
      type: () => AmbienteFindOneOutputRestDto,
      description: "Ambiente de ocorrencia do evento",
      nullable: true,
    }),
  )
  @decorate(IsOptional())
  @decorate(ValidateNested())
  @decorate(Type(() => AmbienteFindOneOutputRestDto))
  ambiente: AmbienteFindOneOutputRestDto | null;
}

// ============================================================================
// List Input/Output
// ============================================================================

@decorate(ApiSchema({ name: "EventoListInputDto" }))
export class EventoListInputRestDto extends PaginatedFilterByIdRestDto {
  @decorate(
    ApiPropertyOptional({
      type: "string",
      isArray: true,
      description: "Filtro por ID do Calendario Letivo",
    }),
  )
  @decorate(TransformToArray())
  @decorate(IsOptional())
  @decorate(IsArray())
  @decorate(IsUUID(undefined, { each: true }))
  "filter.calendario.id"?: string[];
}

@decorate(ApiSchema({ name: "EventoListOutputDto" }))
export class EventoListOutputRestDto {
  @decorate(ApiProperty({ type: () => PaginationMetaRestDto, description: "Metadados da busca" }))
  meta: PaginationMetaRestDto;

  @decorate(
    ApiProperty({ type: () => [EventoFindOneOutputRestDto], description: "Resultados da busca" }),
  )
  data: EventoFindOneOutputRestDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@decorate(ApiSchema({ name: "EventoCreateInputDto" }))
export class EventoCreateInputRestDto extends EventoFieldsMixin {
  @decorate(ApiPropertyOptional({ type: "string", description: "Nome do evento", nullable: true }))
  declare nome?: string | null;

  @decorate(
    ApiProperty({
      type: "string",
      description: "Regra RRule para a recorrencia do evento. Segue a RFC 5545 do iCalendar",
    }),
  )
  declare rrule: string;

  @decorate(ApiPropertyOptional({ type: "string", description: "Cor do evento", nullable: true }))
  declare cor?: string | null;

  @decorate(
    ApiPropertyOptional({
      type: "string",
      description: "Data de inicio do evento",
      format: "date",
      nullable: true,
    }),
  )
  declare dataInicio?: string | null;

  @decorate(
    ApiPropertyOptional({
      type: "string",
      description: "Data de termino do evento",
      format: "date",
      nullable: true,
    }),
  )
  declare dataFim?: string | null;

  @decorate(
    ApiProperty({
      type: () => CalendarioLetivoFindOneInputRestDto,
      description: "Calendario letivo ao qual o evento pertence",
    }),
  )
  @decorate(ValidateNested())
  @decorate(Type(() => CalendarioLetivoFindOneInputRestDto))
  calendario: CalendarioLetivoFindOneInputRestDto;

  @decorate(
    ApiPropertyOptional({
      type: () => AmbienteFindOneInputRestDto,
      description: "Ambiente de ocorrencia do evento",
      nullable: true,
    }),
  )
  @decorate(IsOptional())
  @decorate(ValidateNested())
  @decorate(Type(() => AmbienteFindOneInputRestDto))
  ambiente?: AmbienteFindOneInputRestDto | null;
}

@decorate(ApiSchema({ name: "EventoUpdateInputDto" }))
export class EventoUpdateInputRestDto extends PartialType(EventoCreateInputRestDto) {}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@decorate(ApiSchema({ name: "EventoFindOneInputDto" }))
export class EventoFindOneInputRestDto {
  @decorate(
    ApiProperty({
      type: "string",
      description: "Identificador do registro (uuid)",
      format: "uuid",
    }),
  )
  @decorate(IsUUID())
  id: string;
}

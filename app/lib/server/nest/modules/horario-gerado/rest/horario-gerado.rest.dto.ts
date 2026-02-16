import { ApiProperty, ApiPropertyOptional, ApiSchema, PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsOptional, IsString, IsUUID, ValidateNested } from "class-validator";
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
  CalendarioLetivoFindOneInputRestDto,
  CalendarioLetivoFindOneOutputRestDto,
} from "@/server/nest/modules/calendario-letivo/rest";
import { HorarioGeradoFieldsMixin } from "@/server/nest/modules/horario-gerado/horario-gerado.validation-mixin";

// ============================================================================
// FindOne Output
// ============================================================================

@decorate(ApiSchema({ name: "HorarioGeradoFindOneOutputDto" }))
@decorate(
  RegisterModel({
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
  }),
)
export class HorarioGeradoFindOneOutputRestDto extends Mixin(
  EntityBaseRestDto,
  HorarioGeradoFieldsMixin,
) {
  @decorate(
    ApiPropertyOptional({
      type: "string",
      description: "Status do horario gerado",
      nullable: true,
    }),
  )
  declare status: string | null;

  @decorate(
    ApiPropertyOptional({ type: "string", description: "Tipo do horario gerado", nullable: true }),
  )
  declare tipo: string | null;

  @decorate(
    ApiPropertyOptional({
      type: "string",
      description: "Data em que o horario foi gerado",
      nullable: true,
    }),
  )
  declare dataGeracao: Date | null;

  @decorate(
    ApiPropertyOptional({
      type: "string",
      description: "Inicio da vigencia do horario gerado",
      nullable: true,
    }),
  )
  declare vigenciaInicio: Date | null;

  @decorate(
    ApiPropertyOptional({
      type: "string",
      description: "Fim da vigencia do horario gerado",
      nullable: true,
    }),
  )
  declare vigenciaFim: Date | null;

  @decorate(
    ApiProperty({
      type: () => CalendarioLetivoFindOneOutputRestDto,
      description: "Calendario letivo",
    }),
  )
  @decorate(ValidateNested())
  @decorate(Type(() => CalendarioLetivoFindOneOutputRestDto))
  calendario: CalendarioLetivoFindOneOutputRestDto;
}

// ============================================================================
// List Input/Output
// ============================================================================

@decorate(ApiSchema({ name: "HorarioGeradoListInputDto" }))
export class HorarioGeradoListInputRestDto extends PaginatedFilterByIdRestDto {
  @decorate(
    ApiPropertyOptional({
      type: "string",
      isArray: true,
      description: "Filtro por ID do Calendario",
    }),
  )
  @decorate(TransformToArray())
  @decorate(IsOptional())
  @decorate(IsArray())
  @decorate(IsUUID(undefined, { each: true }))
  "filter.calendario.id"?: string[];

  @decorate(
    ApiPropertyOptional({
      type: "string",
      isArray: true,
      description: "Filtro por nome do Calendario",
    }),
  )
  @decorate(TransformToArray())
  @decorate(IsOptional())
  @decorate(IsArray())
  @decorate(IsString({ each: true }))
  "filter.calendario.nome"?: string[];

  @decorate(
    ApiPropertyOptional({
      type: "string",
      isArray: true,
      description: "Filtro por ano do Calendario",
    }),
  )
  @decorate(TransformToArray())
  @decorate(IsOptional())
  @decorate(IsArray())
  @decorate(IsString({ each: true }))
  "filter.calendario.ano"?: string[];
}

@decorate(ApiSchema({ name: "HorarioGeradoListOutputDto" }))
export class HorarioGeradoListOutputRestDto {
  @decorate(ApiProperty({ type: () => PaginationMetaRestDto, description: "Metadados da busca" }))
  meta: PaginationMetaRestDto;

  @decorate(
    ApiProperty({
      type: () => [HorarioGeradoFindOneOutputRestDto],
      description: "Resultados da busca",
    }),
  )
  data: HorarioGeradoFindOneOutputRestDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@decorate(ApiSchema({ name: "HorarioGeradoCreateInputDto" }))
export class HorarioGeradoCreateInputRestDto extends HorarioGeradoFieldsMixin {
  @decorate(
    ApiPropertyOptional({
      type: "string",
      description: "Status do horario gerado",
      nullable: true,
    }),
  )
  declare status?: string | null;

  @decorate(
    ApiPropertyOptional({ type: "string", description: "Tipo do horario gerado", nullable: true }),
  )
  declare tipo?: string | null;

  @decorate(
    ApiPropertyOptional({
      type: "string",
      description: "Data em que o horario foi gerado",
      nullable: true,
    }),
  )
  declare dataGeracao?: Date | null;

  @decorate(
    ApiPropertyOptional({
      type: "string",
      description: "Inicio da vigencia do horario gerado",
      nullable: true,
    }),
  )
  declare vigenciaInicio?: Date | null;

  @decorate(
    ApiPropertyOptional({
      type: "string",
      description: "Fim da vigencia do horario gerado",
      nullable: true,
    }),
  )
  declare vigenciaFim?: Date | null;

  @decorate(
    ApiProperty({
      type: () => CalendarioLetivoFindOneInputRestDto,
      description: "Calendario letivo",
    }),
  )
  @decorate(ValidateNested())
  @decorate(Type(() => CalendarioLetivoFindOneInputRestDto))
  calendario: CalendarioLetivoFindOneInputRestDto;
}

@decorate(ApiSchema({ name: "HorarioGeradoUpdateInputDto" }))
export class HorarioGeradoUpdateInputRestDto extends PartialType(HorarioGeradoCreateInputRestDto) {}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@decorate(ApiSchema({ name: "HorarioGeradoFindOneInputDto" }))
export class HorarioGeradoFindOneInputRestDto {
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

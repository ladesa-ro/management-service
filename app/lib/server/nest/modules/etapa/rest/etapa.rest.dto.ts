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
import { EtapaFieldsMixin } from "../etapa.validation-mixin";

// ============================================================================
// FindOne Output
// ============================================================================

@decorate(ApiSchema({ name: "EtapaFindOneOutputDto" }))
@decorate(
  RegisterModel({
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
  }),
)
export class EtapaFindOneOutputRestDto extends Mixin(EntityBaseRestDto, EtapaFieldsMixin) {
  @decorate(
    ApiPropertyOptional({
      type: "integer",
      description: "Numero da etapa",
      nullable: true,
      minimum: 0,
      maximum: 255,
    }),
  )
  declare numero: number | null;

  @decorate(ApiProperty({ type: "string", description: "Data de inicio da etapa", format: "date" }))
  declare dataInicio: string;

  @decorate(
    ApiProperty({ type: "string", description: "Data de termino da etapa", format: "date" }),
  )
  declare dataTermino: string;

  @decorate(ApiPropertyOptional({ type: "string", description: "Cor da etapa", nullable: true }))
  declare cor: string | null;

  @decorate(
    ApiProperty({
      type: () => CalendarioLetivoFindOneOutputRestDto,
      description: "Calendario letivo ao qual a etapa pertence",
    }),
  )
  @decorate(ValidateNested())
  @decorate(Type(() => CalendarioLetivoFindOneOutputRestDto))
  calendario: CalendarioLetivoFindOneOutputRestDto;
}

// ============================================================================
// List Input/Output
// ============================================================================

@decorate(ApiSchema({ name: "EtapaListInputDto" }))
export class EtapaListInputRestDto extends PaginatedFilterByIdRestDto {
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

@decorate(ApiSchema({ name: "EtapaListOutputDto" }))
export class EtapaListOutputRestDto {
  @decorate(ApiProperty({ type: () => PaginationMetaRestDto, description: "Metadados da busca" }))
  meta: PaginationMetaRestDto;

  @decorate(
    ApiProperty({ type: () => [EtapaFindOneOutputRestDto], description: "Resultados da busca" }),
  )
  data: EtapaFindOneOutputRestDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@decorate(ApiSchema({ name: "EtapaCreateInputDto" }))
export class EtapaCreateInputRestDto extends EtapaFieldsMixin {
  @decorate(
    ApiPropertyOptional({
      type: "integer",
      description: "Numero da etapa",
      nullable: true,
      minimum: 0,
      maximum: 255,
    }),
  )
  declare numero: number | null;

  @decorate(ApiProperty({ type: "string", description: "Data de inicio da etapa", format: "date" }))
  declare dataInicio: string;

  @decorate(
    ApiProperty({ type: "string", description: "Data de termino da etapa", format: "date" }),
  )
  declare dataTermino: string;

  @decorate(ApiPropertyOptional({ type: "string", description: "Cor da etapa", nullable: true }))
  declare cor: string | null;

  @decorate(
    ApiProperty({
      type: () => CalendarioLetivoFindOneInputRestDto,
      description: "Calendario letivo ao qual a etapa pertence",
    }),
  )
  @decorate(ValidateNested())
  @decorate(Type(() => CalendarioLetivoFindOneInputRestDto))
  calendario: CalendarioLetivoFindOneInputRestDto;
}

@decorate(ApiSchema({ name: "EtapaUpdateInputDto" }))
export class EtapaUpdateInputRestDto extends PartialType(EtapaCreateInputRestDto) {}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@decorate(ApiSchema({ name: "EtapaFindOneInputDto" }))
export class EtapaFindOneInputRestDto {
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

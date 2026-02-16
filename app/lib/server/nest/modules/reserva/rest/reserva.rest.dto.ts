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
  AmbienteFindOneInputRestDto,
  AmbienteFindOneOutputRestDto,
} from "@/server/nest/modules/ambiente/rest";
import {
  UsuarioFindOneInputRestDto,
  UsuarioFindOneOutputRestDto,
} from "@/server/nest/modules/usuario/rest";
import { ReservaFieldsMixin } from "../reserva.validation-mixin";

// ============================================================================
// FindOne Output
// ============================================================================

@decorate(ApiSchema({ name: "ReservaFindOneOutputDto" }))
@decorate(
  RegisterModel({
    name: "ReservaFindOneOutputDto",
    properties: [
      simpleProperty("id"),
      simpleProperty("situacao"),
      simpleProperty("motivo", { nullable: true }),
      simpleProperty("tipo", { nullable: true }),
      simpleProperty("rrule"),
      referenceProperty("usuario", "UsuarioFindOneOutputDto"),
      referenceProperty("ambiente", "AmbienteFindOneOutputDto"),
      ...commonProperties.dated,
    ],
  }),
)
export class ReservaFindOneOutputRestDto extends Mixin(EntityBaseRestDto, ReservaFieldsMixin) {
  @decorate(ApiProperty({ type: "string", description: "Situacao da reserva", minLength: 1 }))
  declare situacao: string;

  @decorate(
    ApiPropertyOptional({ type: "string", description: "Motivo da reserva", nullable: true }),
  )
  declare motivo: string | null;

  @decorate(ApiPropertyOptional({ type: "string", description: "Tipo da reserva", nullable: true }))
  declare tipo: string | null;

  @decorate(
    ApiProperty({
      type: "string",
      description: "Regra RRule para a recorrencia da reserva. Segue a RFC 5545 do iCalendar",
    }),
  )
  declare rrule: string;

  @decorate(
    ApiProperty({
      type: () => UsuarioFindOneOutputRestDto,
      description: "Usuario que fez a reserva",
    }),
  )
  @decorate(ValidateNested())
  @decorate(Type(() => UsuarioFindOneOutputRestDto))
  usuario: UsuarioFindOneOutputRestDto;

  @decorate(
    ApiProperty({ type: () => AmbienteFindOneOutputRestDto, description: "Ambiente reservado" }),
  )
  @decorate(ValidateNested())
  @decorate(Type(() => AmbienteFindOneOutputRestDto))
  ambiente: AmbienteFindOneOutputRestDto;
}

// ============================================================================
// List Input/Output
// ============================================================================

@decorate(ApiSchema({ name: "ReservaListInputDto" }))
export class ReservaListInputRestDto extends PaginatedFilterByIdRestDto {
  @decorate(
    ApiPropertyOptional({
      type: "string",
      isArray: true,
      description: "Filtro por situacao",
    }),
  )
  @decorate(TransformToArray())
  @decorate(IsOptional())
  @decorate(IsArray())
  @decorate(IsString({ each: true }))
  "filter.situacao"?: string[];

  @decorate(
    ApiPropertyOptional({
      type: "string",
      isArray: true,
      description: "Filtro por tipo",
    }),
  )
  @decorate(TransformToArray())
  @decorate(IsOptional())
  @decorate(IsArray())
  @decorate(IsString({ each: true }))
  "filter.tipo"?: string[];

  @decorate(
    ApiPropertyOptional({
      type: "string",
      isArray: true,
      description: "Filtro por ID do Ambiente",
    }),
  )
  @decorate(TransformToArray())
  @decorate(IsOptional())
  @decorate(IsArray())
  @decorate(IsUUID(undefined, { each: true }))
  "filter.ambiente.id"?: string[];

  @decorate(
    ApiPropertyOptional({
      type: "string",
      isArray: true,
      description: "Filtro por ID do Bloco do Ambiente",
    }),
  )
  @decorate(TransformToArray())
  @decorate(IsOptional())
  @decorate(IsArray())
  @decorate(IsUUID(undefined, { each: true }))
  "filter.ambiente.bloco.id"?: string[];

  @decorate(
    ApiPropertyOptional({
      type: "string",
      isArray: true,
      description: "Filtro por ID do Campus do Bloco do Ambiente",
    }),
  )
  @decorate(TransformToArray())
  @decorate(IsOptional())
  @decorate(IsArray())
  @decorate(IsUUID(undefined, { each: true }))
  "filter.ambiente.bloco.campus.id"?: string[];
}

@decorate(ApiSchema({ name: "ReservaListOutputDto" }))
export class ReservaListOutputRestDto {
  @decorate(ApiProperty({ type: () => PaginationMetaRestDto, description: "Metadados da busca" }))
  meta: PaginationMetaRestDto;

  @decorate(
    ApiProperty({ type: () => [ReservaFindOneOutputRestDto], description: "Resultados da busca" }),
  )
  data: ReservaFindOneOutputRestDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@decorate(ApiSchema({ name: "ReservaCreateInputDto" }))
export class ReservaCreateInputRestDto extends ReservaFieldsMixin {
  @decorate(ApiProperty({ type: "string", description: "Situacao da reserva", minLength: 1 }))
  declare situacao: string;

  @decorate(
    ApiPropertyOptional({ type: "string", description: "Motivo da reserva", nullable: true }),
  )
  declare motivo: string | null;

  @decorate(ApiPropertyOptional({ type: "string", description: "Tipo da reserva", nullable: true }))
  declare tipo: string | null;

  @decorate(
    ApiProperty({
      type: "string",
      description: "Regra RRule para a recorrencia da reserva. Segue a RFC 5545 do iCalendar",
    }),
  )
  declare rrule: string;

  @decorate(
    ApiProperty({
      type: () => UsuarioFindOneInputRestDto,
      description: "Usuario que fez a reserva",
    }),
  )
  @decorate(ValidateNested())
  @decorate(Type(() => UsuarioFindOneInputRestDto))
  usuario: UsuarioFindOneInputRestDto;

  @decorate(
    ApiProperty({ type: () => AmbienteFindOneInputRestDto, description: "Ambiente reservado" }),
  )
  @decorate(ValidateNested())
  @decorate(Type(() => AmbienteFindOneInputRestDto))
  ambiente: AmbienteFindOneInputRestDto;
}

@decorate(ApiSchema({ name: "ReservaUpdateInputDto" }))
export class ReservaUpdateInputRestDto extends PartialType(ReservaCreateInputRestDto) {}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@decorate(ApiSchema({ name: "ReservaFindOneInputDto" }))
export class ReservaFindOneInputRestDto {
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

import { ApiProperty, ApiPropertyOptional, ApiSchema, PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsArray,
  IsDateString,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
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
  UsuarioFindOneInputRestDto,
  UsuarioFindOneOutputRestDto,
} from "@/server/nest/modules/usuario/rest";

// ============================================================================
// FindOne Output
// ============================================================================

@ApiSchema({ name: "ReservaFindOneOutputDto" })
@RegisterModel({
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
})
export class ReservaFindOneOutputRestDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @IsUUID()
  id: string;

  @ApiProperty({ description: "Situacao da reserva", minLength: 1 })
  @IsString()
  @MinLength(1)
  situacao: string;

  @ApiPropertyOptional({ description: "Motivo da reserva", nullable: true })
  @IsOptional()
  @IsString()
  @MinLength(1)
  motivo: string | null;

  @ApiPropertyOptional({ description: "Tipo da reserva", nullable: true })
  @IsOptional()
  @IsString()
  @MinLength(1)
  tipo: string | null;

  @ApiProperty({
    description: "Regra RRule para a recorrencia da reserva. Segue a RFC 5545 do iCalendar",
  })
  @IsString()
  rrule: string;

  @ApiProperty({
    type: () => UsuarioFindOneOutputRestDto,
    description: "Usuario que fez a reserva",
  })
  @ValidateNested()
  @Type(() => UsuarioFindOneOutputRestDto)
  usuario: UsuarioFindOneOutputRestDto;

  @ApiProperty({ type: () => AmbienteFindOneOutputRestDto, description: "Ambiente reservado" })
  @ValidateNested()
  @Type(() => AmbienteFindOneOutputRestDto)
  ambiente: AmbienteFindOneOutputRestDto;

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

@ApiSchema({ name: "ReservaListInputDto" })
export class ReservaListInputRestDto extends PaginationInputRestDto {
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
    description: "Filtro por situacao",
    type: [String],
  })
  @TransformToArray()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.situacao"?: string[];

  @ApiPropertyOptional({
    description: "Filtro por tipo",
    type: [String],
  })
  @TransformToArray()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.tipo"?: string[];

  @ApiPropertyOptional({
    description: "Filtro por ID do Ambiente",
    type: [String],
  })
  @TransformToArray()
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  "filter.ambiente.id"?: string[];

  @ApiPropertyOptional({
    description: "Filtro por ID do Bloco do Ambiente",
    type: [String],
  })
  @TransformToArray()
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  "filter.ambiente.bloco.id"?: string[];

  @ApiPropertyOptional({
    description: "Filtro por ID do Campus do Bloco do Ambiente",
    type: [String],
  })
  @TransformToArray()
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  "filter.ambiente.bloco.campus.id"?: string[];
}

@ApiSchema({ name: "ReservaListOutputDto" })
export class ReservaListOutputRestDto {
  @ApiProperty({ type: () => PaginationMetaRestDto, description: "Metadados da busca" })
  meta: PaginationMetaRestDto;

  @ApiProperty({ type: () => [ReservaFindOneOutputRestDto], description: "Resultados da busca" })
  data: ReservaFindOneOutputRestDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@ApiSchema({ name: "ReservaCreateInputDto" })
export class ReservaCreateInputRestDto {
  @ApiProperty({ description: "Situacao da reserva", minLength: 1 })
  @IsString()
  @MinLength(1)
  situacao: string;

  @ApiPropertyOptional({ description: "Motivo da reserva", nullable: true })
  @IsOptional()
  @IsString()
  @MinLength(1)
  motivo?: string | null;

  @ApiPropertyOptional({ description: "Tipo da reserva", nullable: true })
  @IsOptional()
  @IsString()
  @MinLength(1)
  tipo?: string | null;

  @ApiProperty({
    description: "Regra RRule para a recorrencia da reserva. Segue a RFC 5545 do iCalendar",
  })
  @IsString()
  rrule: string;

  @ApiProperty({ type: () => UsuarioFindOneInputRestDto, description: "Usuario que fez a reserva" })
  @ValidateNested()
  @Type(() => UsuarioFindOneInputRestDto)
  usuario: UsuarioFindOneInputRestDto;

  @ApiProperty({ type: () => AmbienteFindOneInputRestDto, description: "Ambiente reservado" })
  @ValidateNested()
  @Type(() => AmbienteFindOneInputRestDto)
  ambiente: AmbienteFindOneInputRestDto;
}

@ApiSchema({ name: "ReservaUpdateInputDto" })
export class ReservaUpdateInputRestDto extends PartialType(ReservaCreateInputRestDto) {}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@ApiSchema({ name: "ReservaFindOneInputDto" })
export class ReservaFindOneInputRestDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @IsUUID()
  id: string;
}

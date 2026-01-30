import { ArgsType, Field, ID, InputType, ObjectType } from "@nestjs/graphql";
import { ApiProperty, ApiPropertyOptional, PartialType } from "@nestjs/swagger";
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
  AmbienteFindOneInputDto,
  AmbienteFindOneOutputDto,
} from "@/server/nest/modules/ambiente/rest";
import {
  UsuarioFindOneInputDto,
  UsuarioFindOneOutputDto,
} from "@/server/nest/modules/usuario/rest";
import { PaginationInputDto, PaginationMetaDto, TransformToArray } from "@/v2/old/shared/dto";
import {
  commonProperties,
  RegisterModel,
  referenceProperty,
  simpleProperty,
} from "@/v2/old/shared/metadata";

// ============================================================================
// FindOne Output
// ============================================================================

@ObjectType("Reserva")
@RegisterModel({
  name: "ReservaFindOneOutput",
  properties: [
    simpleProperty("id"),
    simpleProperty("situacao"),
    simpleProperty("motivo", { nullable: true }),
    simpleProperty("tipo", { nullable: true }),
    simpleProperty("rrule"),
    referenceProperty("usuario", "UsuarioFindOneOutput"),
    referenceProperty("ambiente", "AmbienteFindOneOutput"),
    ...commonProperties.dated,
  ],
})
export class ReservaFindOneOutputDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @Field(() => ID)
  @IsUUID()
  id: string;

  @ApiProperty({ description: "Situacao da reserva", minLength: 1 })
  @Field()
  @IsString()
  @MinLength(1)
  situacao: string;

  @ApiPropertyOptional({ description: "Motivo da reserva", nullable: true })
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MinLength(1)
  motivo: string | null;

  @ApiPropertyOptional({ description: "Tipo da reserva", nullable: true })
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MinLength(1)
  tipo: string | null;

  @ApiProperty({
    description: "Regra RRule para a recorrencia da reserva. Segue a RFC 5545 do iCalendar",
  })
  @Field()
  @IsString()
  rrule: string;

  @ApiProperty({ type: () => UsuarioFindOneOutputDto, description: "Usuario que fez a reserva" })
  @Field(() => UsuarioFindOneOutputDto)
  @ValidateNested()
  @Type(() => UsuarioFindOneOutputDto)
  usuario: UsuarioFindOneOutputDto;

  @ApiProperty({ type: () => AmbienteFindOneOutputDto, description: "Ambiente reservado" })
  @Field(() => AmbienteFindOneOutputDto)
  @ValidateNested()
  @Type(() => AmbienteFindOneOutputDto)
  ambiente: AmbienteFindOneOutputDto;

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
@InputType("ReservaListInput")
export class ReservaListInputDto extends PaginationInputDto {
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

  @ApiPropertyOptional({
    description: "Filtro por situacao",
    type: [String],
  })
  @TransformToArray()
  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.situacao"?: string[];

  @ApiPropertyOptional({
    description: "Filtro por tipo",
    type: [String],
  })
  @TransformToArray()
  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.tipo"?: string[];

  @ApiPropertyOptional({
    description: "Filtro por ID do Ambiente",
    type: [String],
  })
  @TransformToArray()
  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.ambiente.id"?: string[];

  @ApiPropertyOptional({
    description: "Filtro por ID do Bloco do Ambiente",
    type: [String],
  })
  @TransformToArray()
  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.ambiente.bloco.id"?: string[];

  @ApiPropertyOptional({
    description: "Filtro por ID do Campus do Bloco do Ambiente",
    type: [String],
  })
  @TransformToArray()
  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.ambiente.bloco.campus.id"?: string[];
}

@ObjectType("ReservaListOutput")
export class ReservaListOutputDto {
  @ApiProperty({ type: () => PaginationMetaDto, description: "Metadados da busca" })
  @Field(() => PaginationMetaDto)
  meta: PaginationMetaDto;

  @ApiProperty({ type: () => [ReservaFindOneOutputDto], description: "Resultados da busca" })
  @Field(() => [ReservaFindOneOutputDto])
  data: ReservaFindOneOutputDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@InputType("ReservaCreateInput")
export class ReservaCreateInputDto {
  @ApiProperty({ description: "Situacao da reserva", minLength: 1 })
  @Field()
  @IsString()
  @MinLength(1)
  situacao: string;

  @ApiPropertyOptional({ description: "Motivo da reserva", nullable: true })
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MinLength(1)
  motivo?: string | null;

  @ApiPropertyOptional({ description: "Tipo da reserva", nullable: true })
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MinLength(1)
  tipo?: string | null;

  @ApiProperty({
    description: "Regra RRule para a recorrencia da reserva. Segue a RFC 5545 do iCalendar",
  })
  @Field()
  @IsString()
  rrule: string;

  @ApiProperty({ type: () => UsuarioFindOneInputDto, description: "Usuario que fez a reserva" })
  @Field(() => UsuarioFindOneInputDto)
  @ValidateNested()
  @Type(() => UsuarioFindOneInputDto)
  usuario: UsuarioFindOneInputDto;

  @ApiProperty({ type: () => AmbienteFindOneInputDto, description: "Ambiente reservado" })
  @Field(() => AmbienteFindOneInputDto)
  @ValidateNested()
  @Type(() => AmbienteFindOneInputDto)
  ambiente: AmbienteFindOneInputDto;
}

@InputType("ReservaUpdateInput")
export class ReservaUpdateInputDto extends PartialType(ReservaCreateInputDto) {}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@ArgsType()
@InputType("ReservaFindOneInput")
export class ReservaFindOneInputDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @Field(() => ID)
  @IsUUID()
  id: string;
}

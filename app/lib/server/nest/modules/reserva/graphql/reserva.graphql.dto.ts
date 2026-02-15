import { ArgsType, Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsArray, IsOptional, IsString, IsUUID, MinLength, ValidateNested } from "class-validator";
import {
  EntityBaseGraphQlDto,
  PaginationMetaGraphQlDto,
} from "@/modules/@shared/infrastructure/graphql/dtos";
import { PaginationInputGraphQlDto } from "@/modules/@shared/infrastructure/graphql/dtos/pagination-graphql.dto";
import { AmbienteFindOneOutputGraphQlDto } from "@/server/nest/modules/ambiente/graphql/ambiente.graphql.dto";
import { UsuarioFindOneOutputGraphQlDto } from "@/server/nest/modules/usuario/graphql/usuario.graphql.dto";

// ============================================================================
// FindOne Output
// ============================================================================

@ObjectType("ReservaFindOneOutputDto")
export class ReservaFindOneOutputGraphQlDto extends EntityBaseGraphQlDto {
  @Field() situacao: string;
  @Field(() => String, { nullable: true }) motivo: string | null;
  @Field(() => String, { nullable: true }) tipo: string | null;
  @Field() rrule: string;
  @Field(() => AmbienteFindOneOutputGraphQlDto) ambiente: AmbienteFindOneOutputGraphQlDto;
  @Field(() => UsuarioFindOneOutputGraphQlDto) usuario: UsuarioFindOneOutputGraphQlDto;
}

// ============================================================================
// Ref Inputs
// ============================================================================

@InputType("ReservaAmbienteRefInputDto")
export class ReservaAmbienteRefInputGraphQlDto {
  @Field() @IsString() id: string;
}

@InputType("ReservaUsuarioRefInputDto")
export class ReservaUsuarioRefInputGraphQlDto {
  @Field() @IsString() id: string;
}

// ============================================================================
// Create Input
// ============================================================================

@InputType("ReservaCreateInputDto")
export class ReservaCreateInputGraphQlDto {
  @Field() @IsString() @MinLength(1) situacao: string;
  @Field({ nullable: true }) @IsOptional() @IsString() @MinLength(1) motivo?: string | null;
  @Field({ nullable: true }) @IsOptional() @IsString() @MinLength(1) tipo?: string | null;
  @Field() @IsString() rrule: string;
  @Field(() => ReservaAmbienteRefInputGraphQlDto)
  @ValidateNested()
  ambiente: ReservaAmbienteRefInputGraphQlDto;
  @Field(() => ReservaUsuarioRefInputGraphQlDto)
  @ValidateNested()
  usuario: ReservaUsuarioRefInputGraphQlDto;
}

// ============================================================================
// Update Input
// ============================================================================

@InputType("ReservaUpdateInputDto")
export class ReservaUpdateInputGraphQlDto {
  @Field({ nullable: true }) @IsOptional() @IsString() @MinLength(1) situacao?: string;
  @Field({ nullable: true }) @IsOptional() @IsString() @MinLength(1) motivo?: string | null;
  @Field({ nullable: true }) @IsOptional() @IsString() @MinLength(1) tipo?: string | null;
  @Field({ nullable: true }) @IsOptional() @IsString() rrule?: string;
  @Field(() => ReservaAmbienteRefInputGraphQlDto, { nullable: true })
  @IsOptional()
  @ValidateNested()
  ambiente?: ReservaAmbienteRefInputGraphQlDto;
  @Field(() => ReservaUsuarioRefInputGraphQlDto, { nullable: true })
  @IsOptional()
  @ValidateNested()
  usuario?: ReservaUsuarioRefInputGraphQlDto;
}

// ============================================================================
// List Input (GraphQL-compatible - no dots in field names)
// ============================================================================

@ArgsType()
export class ReservaListInputGraphQlDto extends PaginationInputGraphQlDto {
  @Field(() => [String], { nullable: true, description: "Filtro por ID" })
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  filterId?: string[];

  @Field(() => [String], { nullable: true, description: "Filtro por situacao" })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  filterSituacao?: string[];

  @Field(() => [String], { nullable: true, description: "Filtro por tipo" })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  filterTipo?: string[];

  @Field(() => [String], { nullable: true, description: "Filtro por ID do Ambiente" })
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  filterAmbienteId?: string[];

  @Field(() => [String], { nullable: true, description: "Filtro por ID do Bloco do Ambiente" })
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  filterAmbienteBlocoId?: string[];

  @Field(() => [String], {
    nullable: true,
    description: "Filtro por ID do Campus do Bloco do Ambiente",
  })
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  filterAmbienteBlocoCampusId?: string[];
}

// ============================================================================
// List Output
// ============================================================================

@ObjectType("ReservaListResult")
export class ReservaListOutputGraphQlDto {
  @Field(() => PaginationMetaGraphQlDto)
  meta: PaginationMetaGraphQlDto;

  @Field(() => [ReservaFindOneOutputGraphQlDto])
  data: ReservaFindOneOutputGraphQlDto[];
}

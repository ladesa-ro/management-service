import { ArgsType, Field, ID, InputType, ObjectType } from "@nestjs/graphql";
import { IsArray, IsOptional, IsString, IsUUID, ValidateNested } from "class-validator";
import { PaginationInputGraphQlDto } from "@/modules/@shared/infrastructure/graphql";
import {
  EntityBaseGraphQlDto,
  PaginationMetaGraphQlDto,
} from "@/modules/@shared/infrastructure/graphql/dtos";
import { DisponibilidadeFindOneOutputGraphQlDto } from "@/server/nest/modules/disponibilidade/graphql/disponibilidade.graphql.dto";

// ============================================================================
// Turma nested output (turma module not yet refactored to GraphQL)
// ============================================================================

@ObjectType("TurmaDisponibilidadeTurmaOutput")
export class TurmaDisponibilidadeTurmaOutputGraphQlDto extends EntityBaseGraphQlDto {
  @Field() periodo: string;
}

// ============================================================================
// Ref Input DTOs for cross-module references
// ============================================================================

@InputType("TurmaDisponibilidadeTurmaRefInputDto")
export class TurmaDisponibilidadeTurmaRefInputGraphQlDto {
  @Field() @IsString() id: string;
}

@InputType("TurmaDisponibilidadeDisponibilidadeRefInputDto")
export class TurmaDisponibilidadeDisponibilidadeRefInputGraphQlDto {
  @Field() @IsString() id: string;
}

// ============================================================================
// FindOne Output
// ============================================================================

@ObjectType("TurmaDisponibilidadeFindOneOutputDto")
export class TurmaDisponibilidadeFindOneOutputGraphQlDto extends EntityBaseGraphQlDto {
  @Field(() => TurmaDisponibilidadeTurmaOutputGraphQlDto)
  turma: TurmaDisponibilidadeTurmaOutputGraphQlDto;
  @Field(() => DisponibilidadeFindOneOutputGraphQlDto)
  disponibilidade: DisponibilidadeFindOneOutputGraphQlDto;
}

// ============================================================================
// Create Input
// ============================================================================

@InputType("TurmaDisponibilidadeCreateInputDto")
export class TurmaDisponibilidadeCreateInputGraphQlDto {
  @Field(() => TurmaDisponibilidadeTurmaRefInputGraphQlDto)
  @ValidateNested()
  turma: TurmaDisponibilidadeTurmaRefInputGraphQlDto;
  @Field(() => TurmaDisponibilidadeDisponibilidadeRefInputGraphQlDto)
  @ValidateNested()
  disponibilidade: TurmaDisponibilidadeDisponibilidadeRefInputGraphQlDto;
}

// ============================================================================
// Update Input
// ============================================================================

@InputType("TurmaDisponibilidadeUpdateInputDto")
export class TurmaDisponibilidadeUpdateInputGraphQlDto {
  @Field(() => TurmaDisponibilidadeTurmaRefInputGraphQlDto, { nullable: true })
  @IsOptional()
  @ValidateNested()
  turma?: TurmaDisponibilidadeTurmaRefInputGraphQlDto;
  @Field(() => TurmaDisponibilidadeDisponibilidadeRefInputGraphQlDto, { nullable: true })
  @IsOptional()
  @ValidateNested()
  disponibilidade?: TurmaDisponibilidadeDisponibilidadeRefInputGraphQlDto;
}

// ============================================================================
// List Input (GraphQL-compatible - no dots in field names)
// ============================================================================

@ArgsType()
export class TurmaDisponibilidadeListInputGraphQlDto extends PaginationInputGraphQlDto {
  @Field(() => [String], { nullable: true, description: "Filtro por ID" })
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  filterId?: string[];
}

// ============================================================================
// List Output
// ============================================================================

@ObjectType("TurmaDisponibilidadeListResult")
export class TurmaDisponibilidadeListOutputGraphQlDto {
  @Field(() => PaginationMetaGraphQlDto)
  meta: PaginationMetaGraphQlDto;

  @Field(() => [TurmaDisponibilidadeFindOneOutputGraphQlDto])
  data: TurmaDisponibilidadeFindOneOutputGraphQlDto[];
}

// ============================================================================
// Input DTOs for mutations
// ============================================================================

@ArgsType()
export class TurmaDisponibilidadeFindOneInputGraphQlDto {
  @Field(() => ID, { description: "Identificador do registro (uuid)" })
  @IsString()
  id: string;
}

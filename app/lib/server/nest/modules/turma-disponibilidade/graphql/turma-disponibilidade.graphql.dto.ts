import { ArgsType, Field, ID, InputType, ObjectType } from "@nestjs/graphql";
import { IsOptional, IsString, ValidateNested } from "class-validator";
import { decorate } from "ts-mixer";
import {
  EntityBaseGraphQlDto,
  PaginatedFilterByIdGraphQlDto,
  PaginationMetaGraphQlDto,
} from "@/modules/@shared/infrastructure/graphql/dtos";
import { DisponibilidadeFindOneOutputGraphQlDto } from "@/server/nest/modules/disponibilidade/graphql/disponibilidade.graphql.dto";

// ============================================================================
// Turma nested output (turma module not yet refactored to GraphQL)
// ============================================================================

@decorate(ObjectType("TurmaDisponibilidadeTurmaOutput"))
export class TurmaDisponibilidadeTurmaOutputGraphQlDto extends EntityBaseGraphQlDto {
  @decorate(Field(() => String)) periodo: string;
}

// ============================================================================
// Ref Input DTOs for cross-module references
// ============================================================================

@decorate(InputType("TurmaDisponibilidadeTurmaRefInputDto"))
export class TurmaDisponibilidadeTurmaRefInputGraphQlDto {
  @decorate(Field(() => String)) @decorate(IsString()) id: string;
}

@decorate(InputType("TurmaDisponibilidadeDisponibilidadeRefInputDto"))
export class TurmaDisponibilidadeDisponibilidadeRefInputGraphQlDto {
  @decorate(Field(() => String)) @decorate(IsString()) id: string;
}

// ============================================================================
// FindOne Output
// ============================================================================

@decorate(ObjectType("TurmaDisponibilidadeFindOneOutputDto"))
export class TurmaDisponibilidadeFindOneOutputGraphQlDto extends EntityBaseGraphQlDto {
  @decorate(Field(() => TurmaDisponibilidadeTurmaOutputGraphQlDto))
  turma: TurmaDisponibilidadeTurmaOutputGraphQlDto;
  @decorate(Field(() => DisponibilidadeFindOneOutputGraphQlDto))
  disponibilidade: DisponibilidadeFindOneOutputGraphQlDto;
}

// ============================================================================
// Create Input
// ============================================================================

@decorate(InputType("TurmaDisponibilidadeCreateInputDto"))
export class TurmaDisponibilidadeCreateInputGraphQlDto {
  @decorate(Field(() => TurmaDisponibilidadeTurmaRefInputGraphQlDto))
  @decorate(ValidateNested())
  turma: TurmaDisponibilidadeTurmaRefInputGraphQlDto;
  @decorate(Field(() => TurmaDisponibilidadeDisponibilidadeRefInputGraphQlDto))
  @decorate(ValidateNested())
  disponibilidade: TurmaDisponibilidadeDisponibilidadeRefInputGraphQlDto;
}

// ============================================================================
// Update Input
// ============================================================================

@decorate(InputType("TurmaDisponibilidadeUpdateInputDto"))
export class TurmaDisponibilidadeUpdateInputGraphQlDto {
  @decorate(Field(() => TurmaDisponibilidadeTurmaRefInputGraphQlDto, { nullable: true }))
  @decorate(IsOptional())
  @decorate(ValidateNested())
  turma?: TurmaDisponibilidadeTurmaRefInputGraphQlDto;
  @decorate(Field(() => TurmaDisponibilidadeDisponibilidadeRefInputGraphQlDto, { nullable: true }))
  @decorate(IsOptional())
  @decorate(ValidateNested())
  disponibilidade?: TurmaDisponibilidadeDisponibilidadeRefInputGraphQlDto;
}

// ============================================================================
// List Input (GraphQL-compatible - no dots in field names)
// ============================================================================

@decorate(ArgsType())
export class TurmaDisponibilidadeListInputGraphQlDto extends PaginatedFilterByIdGraphQlDto {}

// ============================================================================
// List Output
// ============================================================================

@decorate(ObjectType("TurmaDisponibilidadeListResult"))
export class TurmaDisponibilidadeListOutputGraphQlDto {
  @decorate(Field(() => PaginationMetaGraphQlDto))
  meta: PaginationMetaGraphQlDto;

  @decorate(Field(() => [TurmaDisponibilidadeFindOneOutputGraphQlDto]))
  data: TurmaDisponibilidadeFindOneOutputGraphQlDto[];
}

// ============================================================================
// Input DTOs for mutations
// ============================================================================

@decorate(ArgsType())
export class TurmaDisponibilidadeFindOneInputGraphQlDto {
  @decorate(Field(() => ID, { description: "Identificador do registro (uuid)" }))
  @decorate(IsString())
  id: string;
}

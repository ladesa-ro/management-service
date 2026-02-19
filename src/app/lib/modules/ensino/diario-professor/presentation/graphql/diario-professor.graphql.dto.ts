import { ArgsType, Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsArray, IsBoolean, IsOptional, IsString, IsUUID, ValidateNested } from "class-validator";
import { decorate } from "ts-mixer";
import { PerfilFindOneOutputGraphQlDto } from "@/modules/@acesso/perfil/presentation/graphql/perfil.graphql.dto";
import {
  EntityBaseGraphQlDto,
  PaginatedFilterByIdGraphQlDto,
  PaginationMetaGraphQlDto,
} from "@/modules/@shared/infrastructure/graphql/dtos";
import { DiarioProfessorFieldsMixin } from "../diario-professor.validation-mixin";

// ============================================================================
// Ref Input DTOs for cross-module references
// ============================================================================

@decorate(InputType("DiarioProfessorDiarioRefInputDto"))
export class DiarioProfessorDiarioRefInputGraphQlDto {
  @decorate(Field(() => String)) @decorate(IsString()) id: string;
}

@decorate(InputType("DiarioProfessorPerfilRefInputDto"))
export class DiarioProfessorPerfilRefInputGraphQlDto {
  @decorate(Field(() => String)) @decorate(IsString()) id: string;
}

// ============================================================================
// Diario nested output (diario module not yet refactored to GraphQL)
// ============================================================================

@decorate(ObjectType("DiarioProfessorDiarioOutput"))
export class DiarioProfessorDiarioOutputGraphQlDto extends EntityBaseGraphQlDto {
  @decorate(Field(() => Boolean)) ativo: boolean;
}

// ============================================================================
// FindOne Output
// ============================================================================

@decorate(ObjectType("DiarioProfessorFindOneOutputDto"))
export class DiarioProfessorFindOneOutputGraphQlDto extends EntityBaseGraphQlDto {
  @decorate(Field(() => Boolean)) situacao: boolean;
  @decorate(Field(() => DiarioProfessorDiarioOutputGraphQlDto))
  diario: DiarioProfessorDiarioOutputGraphQlDto;
  @decorate(Field(() => PerfilFindOneOutputGraphQlDto)) perfil: PerfilFindOneOutputGraphQlDto;
}

// ============================================================================
// Create Input
// ============================================================================

@decorate(InputType("DiarioProfessorCreateInputDto"))
export class DiarioProfessorCreateInputGraphQlDto extends DiarioProfessorFieldsMixin {
  @decorate(Field(() => Boolean)) declare situacao: boolean;
  @decorate(Field(() => DiarioProfessorDiarioRefInputGraphQlDto))
  @decorate(ValidateNested())
  diario: DiarioProfessorDiarioRefInputGraphQlDto;
  @decorate(Field(() => DiarioProfessorPerfilRefInputGraphQlDto))
  @decorate(ValidateNested())
  perfil: DiarioProfessorPerfilRefInputGraphQlDto;
}

// ============================================================================
// Update Input
// ============================================================================

@decorate(InputType("DiarioProfessorUpdateInputDto"))
export class DiarioProfessorUpdateInputGraphQlDto {
  @decorate(Field(() => Boolean, { nullable: true }))
  @decorate(IsOptional())
  @decorate(IsBoolean())
  situacao?: boolean;
  @decorate(Field(() => DiarioProfessorDiarioRefInputGraphQlDto, { nullable: true }))
  @decorate(IsOptional())
  @decorate(ValidateNested())
  diario?: DiarioProfessorDiarioRefInputGraphQlDto;
  @decorate(Field(() => DiarioProfessorPerfilRefInputGraphQlDto, { nullable: true }))
  @decorate(IsOptional())
  @decorate(ValidateNested())
  perfil?: DiarioProfessorPerfilRefInputGraphQlDto;
}

// ============================================================================
// List Input (GraphQL-compatible - no dots in field names)
// ============================================================================

@decorate(ArgsType())
export class DiarioProfessorListInputGraphQlDto extends PaginatedFilterByIdGraphQlDto {
  @decorate(
    Field(() => [String], { nullable: true, description: "Filtro por ID do Usuario do Perfil" }),
  )
  @decorate(IsOptional())
  @decorate(IsArray())
  @decorate(IsUUID(undefined, { each: true }))
  filterPerfilUsuarioId?: string[];

  @decorate(Field(() => [String], { nullable: true, description: "Filtro por ID do Perfil" }))
  @decorate(IsOptional())
  @decorate(IsArray())
  @decorate(IsUUID(undefined, { each: true }))
  filterPerfilId?: string[];

  @decorate(Field(() => [String], { nullable: true, description: "Filtro por ID do Diario" }))
  @decorate(IsOptional())
  @decorate(IsArray())
  @decorate(IsUUID(undefined, { each: true }))
  filterDiarioId?: string[];
}

// ============================================================================
// List Output
// ============================================================================

@decorate(ObjectType("DiarioProfessorListResult"))
export class DiarioProfessorListOutputGraphQlDto {
  @decorate(Field(() => PaginationMetaGraphQlDto))
  meta: PaginationMetaGraphQlDto;

  @decorate(Field(() => [DiarioProfessorFindOneOutputGraphQlDto]))
  data: DiarioProfessorFindOneOutputGraphQlDto[];
}

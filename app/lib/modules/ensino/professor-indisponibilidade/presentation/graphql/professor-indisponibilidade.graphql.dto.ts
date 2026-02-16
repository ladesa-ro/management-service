import { ArgsType, Field, ID, InputType, Int, ObjectType } from "@nestjs/graphql";
import { IsInt, IsOptional, IsString, IsUUID, Max, Min } from "class-validator";
import { decorate } from "ts-mixer";
import { PaginationInputGraphQlDto } from "@/modules/@shared/infrastructure/graphql";
import {
  EntityBaseGraphQlDto,
  PaginationMetaGraphQlDto,
} from "@/modules/@shared/infrastructure/graphql/dtos";
import { ProfessorIndisponibilidadeFieldsMixin } from "../professor-indisponibilidade.validation-mixin";

// ============================================================================
// FindOne Output
// ============================================================================

@decorate(ObjectType("ProfessorIndisponibilidadeFindOneOutputDto"))
export class ProfessorIndisponibilidadeFindOneOutputGraphQlDto extends EntityBaseGraphQlDto {
  @decorate(Field(() => String)) idPerfilFk: string;
  @decorate(Field(() => Int)) diaDaSemana: number;
  @decorate(Field(() => String)) horaInicio: string;
  @decorate(Field(() => String)) horaFim: string;
  @decorate(Field(() => String)) motivo: string;
}

// ============================================================================
// Create Input
// ============================================================================

@decorate(InputType("ProfessorIndisponibilidadeCreateInputDto"))
export class ProfessorIndisponibilidadeCreateInputGraphQlDto extends ProfessorIndisponibilidadeFieldsMixin {
  @decorate(Field(() => String, { nullable: true }))
  @decorate(IsOptional())
  @decorate(IsUUID())
  idPerfilFk?: string;
  @decorate(Field(() => Int)) declare diaDaSemana: number;
  @decorate(Field(() => String)) declare horaInicio: string;
  @decorate(Field(() => String)) declare horaFim: string;
  @decorate(Field(() => String)) declare motivo: string;
}

// ============================================================================
// Update Input
// ============================================================================

@decorate(InputType("ProfessorIndisponibilidadeUpdateInputDto"))
export class ProfessorIndisponibilidadeUpdateInputGraphQlDto {
  @decorate(Field(() => String, { nullable: true }))
  @decorate(IsOptional())
  @decorate(IsUUID())
  idPerfilFk?: string;
  @decorate(Field(() => Int, { nullable: true }))
  @decorate(IsOptional())
  @decorate(IsInt())
  @decorate(Min(0))
  @decorate(Max(6))
  diaDaSemana?: number;
  @decorate(Field(() => String, { nullable: true }))
  @decorate(IsOptional())
  @decorate(IsString())
  horaInicio?: string;
  @decorate(Field(() => String, { nullable: true }))
  @decorate(IsOptional())
  @decorate(IsString())
  horaFim?: string;
  @decorate(Field(() => String, { nullable: true }))
  @decorate(IsOptional())
  @decorate(IsString())
  motivo?: string;
}

// ============================================================================
// List Input (GraphQL-compatible - no dots in field names)
// ============================================================================

@decorate(ArgsType())
export class ProfessorIndisponibilidadeListInputGraphQlDto extends PaginationInputGraphQlDto {
  @decorate(Field(() => ID, { nullable: true, description: "Filtro por ID do perfil" }))
  @decorate(IsOptional())
  @decorate(IsUUID())
  filterPerfilId?: string;
}

// ============================================================================
// List Output
// ============================================================================

@decorate(ObjectType("ProfessorIndisponibilidadeListResult"))
export class ProfessorIndisponibilidadeListOutputGraphQlDto {
  @decorate(Field(() => PaginationMetaGraphQlDto))
  meta: PaginationMetaGraphQlDto;

  @decorate(Field(() => [ProfessorIndisponibilidadeFindOneOutputGraphQlDto]))
  data: ProfessorIndisponibilidadeFindOneOutputGraphQlDto[];
}

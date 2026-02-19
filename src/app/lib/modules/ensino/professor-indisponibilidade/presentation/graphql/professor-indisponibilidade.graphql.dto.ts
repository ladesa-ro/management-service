import { ArgsType, Field, ID, ObjectType } from "@nestjs/graphql";
import { IsOptional, IsUUID } from "class-validator";
import { decorate } from "ts-mixer";
import { PaginationInputGraphQlDto } from "@/modules/@shared/infrastructure/graphql";
import {
  EntityBaseGraphQlDto,
  PaginationMetaGraphQlDto,
} from "@/modules/@shared/infrastructure/graphql/dtos";

// ============================================================================
// FindOne Output
// ============================================================================

@decorate(ObjectType("ProfessorIndisponibilidadeFindOneOutputDto"))
export class ProfessorIndisponibilidadeFindOneOutputGraphQlDto extends EntityBaseGraphQlDto {
  @decorate(Field(() => String)) idPerfilFk: string;
  @decorate(Field(() => Number)) diaDaSemana: number;
  @decorate(Field(() => String)) horaInicio: string;
  @decorate(Field(() => String)) horaFim: string;
  @decorate(Field(() => String)) motivo: string;
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

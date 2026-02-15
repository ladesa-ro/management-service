import { ArgsType, Field, ID, InputType, Int, ObjectType } from "@nestjs/graphql";
import { IsInt, IsOptional, IsString, IsUUID, Max, Min } from "class-validator";
import { PaginationInputGraphQlDto } from "@/modules/@shared/infrastructure/graphql";
import {
  EntityBaseGraphQlDto,
  PaginationMetaGraphQlDto,
} from "@/modules/@shared/infrastructure/graphql/dtos";

// ============================================================================
// FindOne Output
// ============================================================================

@ObjectType("ProfessorIndisponibilidadeFindOneOutputDto")
export class ProfessorIndisponibilidadeFindOneOutputGraphQlDto extends EntityBaseGraphQlDto {
  @Field() idPerfilFk: string;
  @Field(() => Int) diaDaSemana: number;
  @Field() horaInicio: string;
  @Field() horaFim: string;
  @Field() motivo: string;
}

// ============================================================================
// Create Input
// ============================================================================

@InputType("ProfessorIndisponibilidadeCreateInputDto")
export class ProfessorIndisponibilidadeCreateInputGraphQlDto {
  @Field({ nullable: true }) @IsOptional() @IsUUID() idPerfilFk?: string;
  @Field(() => Int) @IsInt() @Min(0) @Max(6) diaDaSemana: number;
  @Field() @IsString() horaInicio: string;
  @Field() @IsString() horaFim: string;
  @Field() @IsString() motivo: string;
}

// ============================================================================
// Update Input
// ============================================================================

@InputType("ProfessorIndisponibilidadeUpdateInputDto")
export class ProfessorIndisponibilidadeUpdateInputGraphQlDto {
  @Field({ nullable: true }) @IsOptional() @IsUUID() idPerfilFk?: string;
  @Field(() => Int, { nullable: true }) @IsOptional() @IsInt() @Min(0) @Max(6) diaDaSemana?: number;
  @Field({ nullable: true }) @IsOptional() @IsString() horaInicio?: string;
  @Field({ nullable: true }) @IsOptional() @IsString() horaFim?: string;
  @Field({ nullable: true }) @IsOptional() @IsString() motivo?: string;
}

// ============================================================================
// List Input (GraphQL-compatible - no dots in field names)
// ============================================================================

@ArgsType()
export class ProfessorIndisponibilidadeListInputGraphQlDto extends PaginationInputGraphQlDto {
  @Field(() => ID, { nullable: true, description: "Filtro por ID do perfil" })
  @IsOptional()
  @IsUUID()
  filterPerfilId?: string;
}

// ============================================================================
// List Output
// ============================================================================

@ObjectType("ProfessorIndisponibilidadeListResult")
export class ProfessorIndisponibilidadeListOutputGraphQlDto {
  @Field(() => PaginationMetaGraphQlDto)
  meta: PaginationMetaGraphQlDto;

  @Field(() => [ProfessorIndisponibilidadeFindOneOutputGraphQlDto])
  data: ProfessorIndisponibilidadeFindOneOutputGraphQlDto[];
}

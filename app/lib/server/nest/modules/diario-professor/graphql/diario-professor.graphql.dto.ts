import { ArgsType, Field, Int, ObjectType } from "@nestjs/graphql";
import { IsArray, IsInt, IsOptional, IsString, Min } from "class-validator";
import { PaginationMetaDto } from "@/modules/@shared/infrastructure/presentation/rest/dtos";
import { DiarioProfessorFindOneOutputDto } from "../rest/diario-professor.rest.dto";

// ============================================================================
// List Input (GraphQL-compatible - no dots in field names)
// ============================================================================

@ArgsType()
export class DiarioProfessorListInputGqlDto {
  @Field(() => Int, { nullable: true, defaultValue: 1 })
  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number = 1;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(1)
  limit?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  search?: string;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  sortBy?: string[];

  @Field(() => [String], { nullable: true, description: "Filtro por ID" })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  filterId?: string[];

  @Field(() => [String], { nullable: true, description: "Filtro por ID do Usuario do Perfil" })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  filterPerfilUsuarioId?: string[];

  @Field(() => [String], { nullable: true, description: "Filtro por ID do Perfil" })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  filterPerfilId?: string[];

  @Field(() => [String], { nullable: true, description: "Filtro por ID do Diario" })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  filterDiarioId?: string[];
}

// ============================================================================
// List Output (reuses the same output DTOs - they're already GraphQL-compatible)
// ============================================================================

@ObjectType("DiarioProfessorListResult")
export class DiarioProfessorListOutputGqlDto {
  @Field(() => PaginationMetaDto)
  meta: PaginationMetaDto;

  @Field(() => [DiarioProfessorFindOneOutputDto])
  data: DiarioProfessorFindOneOutputDto[];
}

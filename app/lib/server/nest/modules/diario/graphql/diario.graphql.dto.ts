import { ArgsType, Field, Int, ObjectType } from "@nestjs/graphql";
import { IsArray, IsInt, IsOptional, IsString, Min } from "class-validator";
import { PaginationMetaDto } from "@/modules/@shared/infrastructure/presentation/rest/dtos";
import { DiarioFindOneOutputDto } from "../rest/diario.rest.dto";

// ============================================================================
// List Input (GraphQL-compatible - no dots in field names)
// ============================================================================

@ArgsType()
export class DiarioListInputGqlDto {
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

  @Field(() => String, { nullable: true })
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

  @Field(() => [String], { nullable: true, description: "Filtro por ID da Turma" })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  filterTurmaId?: string[];

  @Field(() => [String], { nullable: true, description: "Filtro por ID da Disciplina" })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  filterDisciplinaId?: string[];

  @Field(() => [String], { nullable: true, description: "Filtro por ID do Ambiente Padrao" })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  filterAmbientePadraoId?: string[];
}

// ============================================================================
// List Output (reuses the same output DTOs - they're already GraphQL-compatible)
// ============================================================================

@ObjectType("DiarioListResult")
export class DiarioListOutputGqlDto {
  @Field(() => PaginationMetaDto)
  meta: PaginationMetaDto;

  @Field(() => [DiarioFindOneOutputDto])
  data: DiarioFindOneOutputDto[];
}

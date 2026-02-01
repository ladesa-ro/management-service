import { ArgsType, Field, Int, ObjectType } from "@nestjs/graphql";
import { IsArray, IsInt, IsOptional, IsString, Min } from "class-validator";
import { PaginationMetaDto } from "@/modules/@shared/infrastructure/presentation/rest/dtos";
import { DiaCalendarioFindOneOutputDto } from "../rest/dia-calendario.rest.dto";

// ============================================================================
// List Input (GraphQL-compatible - no dots in field names)
// ============================================================================

@ArgsType()
export class DiaCalendarioListInputGqlDto {
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

  @Field(() => [String], { nullable: true, description: "Filtro por ID do Calendario" })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  filterCalendarioId?: string[];

  @Field(() => [String], { nullable: true, description: "Filtro por nome do Calendario" })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  filterCalendarioNome?: string[];

  @Field(() => [String], { nullable: true, description: "Filtro por ano do Calendario" })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  filterCalendarioAno?: string[];
}

// ============================================================================
// List Output (reuses the same output DTOs - they're already GraphQL-compatible)
// ============================================================================

@ObjectType("DiaCalendarioListResult")
export class DiaCalendarioListOutputGqlDto {
  @Field(() => PaginationMetaDto)
  meta: PaginationMetaDto;

  @Field(() => [DiaCalendarioFindOneOutputDto])
  data: DiaCalendarioFindOneOutputDto[];
}

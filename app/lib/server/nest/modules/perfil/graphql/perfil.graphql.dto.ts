import { ArgsType, Field, ObjectType } from "@nestjs/graphql";
import { IsArray, IsOptional, IsString } from "class-validator";
import { PaginationGraphqlArgsDto } from "@/modules/@shared/infrastructure/graphql";
import { PaginationMetaDto } from "@/modules/@shared/infrastructure/presentation/rest/dtos";
import { PerfilFindOneOutputDto } from "../rest/perfil.rest.dto";

// ============================================================================
// List Input (GraphQL-compatible - no dots in field names)
// ============================================================================

@ArgsType()
export class PerfilListInputGqlDto extends PaginationGraphqlArgsDto {
  @Field(() => [String], { nullable: true, description: "Filtro por ID" })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  filterId?: string[];

  @Field(() => [String], { nullable: true, description: "Filtro por ativo" })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  filterAtivo?: string[];

  @Field(() => [String], { nullable: true, description: "Filtro por cargo" })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  filterCargo?: string[];

  @Field(() => [String], { nullable: true, description: "Filtro por ID do Campus" })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  filterCampusId?: string[];

  @Field(() => [String], { nullable: true, description: "Filtro por ID do Usuario" })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  filterUsuarioId?: string[];
}

// ============================================================================
// List Output (reuses the same output DTOs - they're already GraphQL-compatible)
// ============================================================================

@ObjectType("PerfilListResult")
export class PerfilListOutputGqlDto {
  @Field(() => PaginationMetaDto)
  meta: PaginationMetaDto;

  @Field(() => [PerfilFindOneOutputDto])
  data: PerfilFindOneOutputDto[];
}

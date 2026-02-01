import { ArgsType, Field, ID, ObjectType } from "@nestjs/graphql";
import { IsArray, IsOptional, IsString } from "class-validator";
import { PaginationGraphqlArgsDto } from "@/modules/@shared/infrastructure/graphql";
import { PaginationMetaDto } from "@/modules/@shared/infrastructure/presentation/rest/dtos";
import { UsuarioFindOneOutputDto } from "../rest/usuario.rest.dto";

// ============================================================================
// List Input (GraphQL-compatible - no dots in field names)
// ============================================================================

@ArgsType()
export class UsuarioListInputGqlDto extends PaginationGraphqlArgsDto {
  @Field(() => [String], { nullable: true, description: "Filtro por ID" })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  filterId?: string[];
}

// ============================================================================
// List Output (reuses the same output DTOs - they're already GraphQL-compatible)
// ============================================================================

@ObjectType("UsuarioListResult")
export class UsuarioListOutputGqlDto {
  @Field(() => PaginationMetaDto)
  meta: PaginationMetaDto;

  @Field(() => [UsuarioFindOneOutputDto])
  data: UsuarioFindOneOutputDto[];
}

// ============================================================================
// Input DTOs for mutations
// ============================================================================

@ArgsType()
export class UsuarioFindOneInputGqlDto {
  @Field(() => ID, { description: "Identificador do registro (uuid)" })
  @IsString()
  id: string;
}

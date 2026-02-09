import { ArgsType, Field, InputType, Int, ObjectType } from "@nestjs/graphql";
import { IsArray, IsInt, IsOptional, IsString, IsUUID, Min } from "class-validator";
import {
  EntityIdIntGraphQlDto,
  PaginationMetaGraphQlDto,
} from "@/modules/@shared/infrastructure/graphql/dtos";
import { EstadoFindOneOutputGraphQlDto } from "@/server/nest/modules/estado/graphql/estado.graphql.dto";

// ============================================================================
// FindOne Output
// ============================================================================

@ObjectType("CidadeFindOneOutputDto")
export class CidadeFindOneOutputGraphQlDto extends EntityIdIntGraphQlDto {
  @Field() nome: string;
  @Field(() => EstadoFindOneOutputGraphQlDto) estado: EstadoFindOneOutputGraphQlDto;
}

// ============================================================================
// FindOne Input (for nested references)
// ============================================================================

@InputType("CidadeFindOneInputDto")
export class CidadeFindOneInputGraphQlDto {
  @Field(() => Int) @IsInt() id: number;
}

// ============================================================================
// List Input (GraphQL-compatible - no dots in field names)
// ============================================================================

@ArgsType()
export class CidadeListInputGraphQlDto {
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
  @IsUUID(undefined, { each: true })
  filterId?: string[];

  @Field(() => [String], { nullable: true, description: "Filtro por ID do Estado" })
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  filterEstadoId?: string[];

  @Field(() => [String], { nullable: true, description: "Filtro por nome do Estado" })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  filterEstadoNome?: string[];

  @Field(() => [String], { nullable: true, description: "Filtro por sigla do Estado" })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  filterEstadoSigla?: string[];
}

// ============================================================================
// List Output
// ============================================================================

@ObjectType("CidadeListResult")
export class CidadeListOutputGraphQlDto {
  @Field(() => PaginationMetaGraphQlDto)
  meta: PaginationMetaGraphQlDto;

  @Field(() => [CidadeFindOneOutputGraphQlDto])
  data: CidadeFindOneOutputGraphQlDto[];
}

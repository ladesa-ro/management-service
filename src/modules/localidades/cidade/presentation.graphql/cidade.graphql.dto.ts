import { PaginationMetaGraphQlDto } from "@/infrastructure.graphql/dtos";
import {
  cidadeFindOneInputSchema,
  cidadeGraphqlListInputSchema,
} from "@/modules/localidades/cidade/domain/cidade.schemas";
import { EstadoFindOneOutputGraphQlDto } from "@/modules/localidades/estado/presentation.graphql/estado.graphql.dto";
import { ArgsType, Field, InputType, Int, ObjectType } from "@/shared/presentation/graphql";

// ============================================================================
// FindOne Output
// ============================================================================

@ObjectType("CidadeFindOneOutputDto")
export class CidadeFindOneOutputGraphQlDto {
  @Field(() => Int) id: number;
  @Field(() => String) nome: string;
  @Field(() => EstadoFindOneOutputGraphQlDto) estado: EstadoFindOneOutputGraphQlDto;
}

// ============================================================================
// FindOne Input (for nested references)
// ============================================================================

@InputType("CidadeFindOneInputDto")
export class CidadeFindOneInputGraphQlDto {
  static schema = cidadeFindOneInputSchema;

  @Field(() => Int) id: number;
}

// ============================================================================
// List Input (GraphQL-compatible - no dots in field names)
// ============================================================================

@ArgsType()
export class CidadeListInputGraphQlDto {
  static schema = cidadeGraphqlListInputSchema;

  @Field(() => Int, { nullable: true, defaultValue: 1 })
  page?: number = 1;

  @Field(() => Int, { nullable: true })
  limit?: number;

  @Field(() => String, { nullable: true })
  search?: string;

  @Field(() => [String], { nullable: true })
  sortBy?: string[];

  @Field(() => [String], { nullable: true })
  selection?: string[];

  @Field(() => [String], { nullable: true, description: "Filtro por ID" })
  filterId?: string[];

  @Field(() => [String], { nullable: true, description: "Filtro por ID do Estado" })
  filterEstadoId?: string[];

  @Field(() => [String], { nullable: true, description: "Filtro por nome do Estado" })
  filterEstadoNome?: string[];

  @Field(() => [String], { nullable: true, description: "Filtro por sigla do Estado" })
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

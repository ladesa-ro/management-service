import {
  EntityBaseGraphQlDto,
  PaginatedFilterByIdGraphQlDto,
  PaginationMetaGraphQlDto,
} from "@/infrastructure.graphql/dtos";
import {
  empresaCreateSchema,
  empresaGraphqlListInputSchema,
  empresaUpdateSchema,
} from "@/modules/estagio/empresa/domain/empresa.schemas";
import { ArgsType, Field, InputType, ObjectType } from "@/shared/presentation/graphql";

// ============================================================================
// FindOne Output
// ============================================================================

@ObjectType("EmpresaFindOneOutputDto")
export class EmpresaFindOneOutputGraphQlDto extends EntityBaseGraphQlDto {
  @Field(() => String) razaoSocial: string;
  @Field(() => String) nomeFantasia: string;
  @Field(() => String) cnpj: string;
  @Field(() => String) telefone: string;
  @Field(() => String) email: string;
  @Field(() => String) idEnderecoFk: string;
  @Field(() => Boolean) ativo: boolean;
}

// ============================================================================
// Create Input
// ============================================================================

@InputType("EmpresaCreateInputDto")
export class EmpresaCreateInputGraphQlDto {
  static schema = empresaCreateSchema;

  @Field(() => String) razaoSocial: string;
  @Field(() => String) nomeFantasia: string;
  @Field(() => String) cnpj: string;
  @Field(() => String) telefone: string;
  @Field(() => String) email: string;
  @Field(() => String) idEnderecoFk: string;
}

// ============================================================================
// Update Input
// ============================================================================

@InputType("EmpresaUpdateInputDto")
export class EmpresaUpdateInputGraphQlDto {
  static schema = empresaUpdateSchema;

  @Field(() => String, { nullable: true })
  razaoSocial?: string;

  @Field(() => String, { nullable: true })
  nomeFantasia?: string;

  @Field(() => String, { nullable: true })
  cnpj?: string;

  @Field(() => String, { nullable: true })
  telefone?: string;

  @Field(() => String, { nullable: true })
  email?: string;

  @Field(() => String, { nullable: true })
  idEnderecoFk?: string;
}

// ============================================================================
// List Input (GraphQL-compatible - no dots in field names)
// ============================================================================

@ArgsType()
export class EmpresaListInputGraphQlDto extends PaginatedFilterByIdGraphQlDto {
  static schema = empresaGraphqlListInputSchema;

  @Field(() => [String], { nullable: true, description: "Filtro por CNPJ" })
  filterCnpj?: string[];

  @Field(() => [String], { nullable: true, description: "Filtro por nome fantasia" })
  filterNomeFantasia?: string[];

  @Field(() => [String], { nullable: true, description: "Filtro por ID de endereço" })
  filterIdEnderecoFk?: string[];
}

// ============================================================================
// List Output
// ============================================================================

@ObjectType("EmpresaListResult")
export class EmpresaListOutputGraphQlDto {
  @Field(() => PaginationMetaGraphQlDto)
  meta: PaginationMetaGraphQlDto;

  @Field(() => [EmpresaFindOneOutputGraphQlDto])
  data: EmpresaFindOneOutputGraphQlDto[];
}

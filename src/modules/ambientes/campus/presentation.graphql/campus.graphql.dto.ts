import { EntityBaseGraphQlDto, PaginationMetaGraphQlDto } from "@/infrastructure.graphql/dtos";
import {
  EnderecoFindOneOutputGraphQlDto,
  EnderecoInputGraphQlDto,
} from "@/modules/localidades/endereco/presentation.graphql/endereco.graphql.dto";
import { ArgsType, Field, InputType, ObjectType } from "@/shared/presentation/graphql";
import {
  campusGraphqlListInputSchema,
  campusInputCreateSchema,
  campusInputUpdateSchema,
} from "../domain/campus.schemas";

// ============================================================================
// FindOne Output
// ============================================================================

@ObjectType("CampusFindOneOutputDto")
export class CampusFindOneOutputGraphQlDto extends EntityBaseGraphQlDto {
  @Field(() => String) nomeFantasia: string;
  @Field(() => String) razaoSocial: string;
  @Field(() => String) apelido: string;
  @Field(() => String) cnpj: string;
  @Field(() => EnderecoFindOneOutputGraphQlDto) endereco: EnderecoFindOneOutputGraphQlDto;
}

// ============================================================================
// Create Input
// ============================================================================

@InputType("CampusCreateInputDto")
export class CampusCreateInputGraphQlDto {
  static schema = campusInputCreateSchema;

  @Field(() => String) nomeFantasia: string;
  @Field(() => String) razaoSocial: string;
  @Field(() => String) apelido: string;
  @Field(() => String) cnpj: string;
  @Field(() => EnderecoInputGraphQlDto) endereco: EnderecoInputGraphQlDto;
}

// ============================================================================
// Update Input
// ============================================================================

@InputType("CampusUpdateInputDto")
export class CampusUpdateInputGraphQlDto {
  static schema = campusInputUpdateSchema;

  @Field(() => String, { nullable: true }) nomeFantasia?: string;
  @Field(() => String, { nullable: true }) razaoSocial?: string;
  @Field(() => String, { nullable: true }) apelido?: string;
  @Field(() => String, { nullable: true }) cnpj?: string;
  @Field(() => EnderecoInputGraphQlDto, { nullable: true }) endereco?: EnderecoInputGraphQlDto;
}

// ============================================================================
// List Input (GraphQL-compatible - no dots in field names)
// ============================================================================

@ArgsType()
export class CampusListInputGraphQlDto {
  static schema = campusGraphqlListInputSchema;

  @Field(() => Number, { nullable: true, defaultValue: 1 }) page?: number = 1;
  @Field(() => Number, { nullable: true }) limit?: number;
  @Field(() => String, { nullable: true }) search?: string;
  @Field(() => [String], { nullable: true }) sortBy?: string[];
  @Field(() => [String], { nullable: true }) selection?: string[];
  @Field(() => [String], { nullable: true, description: "Filtro por ID" }) filterId?: string[];
}

// ============================================================================
// List Output
// ============================================================================

@ObjectType("CampusListResult")
export class CampusListOutputGraphQlDto {
  @Field(() => PaginationMetaGraphQlDto)
  meta: PaginationMetaGraphQlDto;

  @Field(() => [CampusFindOneOutputGraphQlDto])
  data: CampusFindOneOutputGraphQlDto[];
}

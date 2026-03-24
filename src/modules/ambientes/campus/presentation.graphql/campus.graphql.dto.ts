import { EntityBaseGraphQlDto, PaginationMetaGraphQlDto } from "@/infrastructure.graphql/dtos";
import {
  CampusCreateSchema,
  CampusUpdateSchema,
} from "@/modules/ambientes/campus/domain/campus.schemas";
import { CampusGraphqlListInputSchema } from "@/modules/ambientes/campus/domain/queries/campus-list.query.schemas";
import {
  EnderecoFindOneOutputGraphQlDto,
  EnderecoInputGraphQlDto,
} from "@/modules/localidades/endereco/presentation.graphql/endereco.graphql.dto";
import { ArgsType, Field, InputType, ObjectType } from "@/shared/presentation/graphql";
import { CampusCreateCommandFields } from "../domain/commands/campus-create.command";
import { CampusUpdateCommandFields } from "../domain/commands/campus-update.command";
import { CampusFindOneQueryResultFields } from "../domain/queries/campus-find-one.query.result";
import { CampusListQueryFields } from "../domain/queries/campus-list.query";

// ============================================================================
// FindOne Output
// ============================================================================

@ObjectType("CampusFindOneOutputDto")
export class CampusFindOneOutputGraphQlDto extends EntityBaseGraphQlDto {
  @Field(() => String, CampusFindOneQueryResultFields.nomeFantasia.gqlMetadata)
  nomeFantasia: string;
  @Field(() => String, CampusFindOneQueryResultFields.razaoSocial.gqlMetadata) razaoSocial: string;
  @Field(() => String, CampusFindOneQueryResultFields.apelido.gqlMetadata) apelido: string;
  @Field(() => String, CampusFindOneQueryResultFields.cnpj.gqlMetadata) cnpj: string;
  @Field(() => EnderecoFindOneOutputGraphQlDto, CampusFindOneQueryResultFields.endereco.gqlMetadata)
  endereco: EnderecoFindOneOutputGraphQlDto;
}

// ============================================================================
// Create Input
// ============================================================================

@InputType("CampusCreateInputDto")
export class CampusCreateInputGraphQlDto {
  static schema = CampusCreateSchema.domain;

  @Field(() => String, CampusCreateCommandFields.nomeFantasia.gqlMetadata) nomeFantasia: string;
  @Field(() => String, CampusCreateCommandFields.razaoSocial.gqlMetadata) razaoSocial: string;
  @Field(() => String, CampusCreateCommandFields.apelido.gqlMetadata) apelido: string;
  @Field(() => String, CampusCreateCommandFields.cnpj.gqlMetadata) cnpj: string;
  @Field(() => EnderecoInputGraphQlDto, CampusCreateCommandFields.endereco.gqlMetadata)
  endereco: EnderecoInputGraphQlDto;
}

// ============================================================================
// Update Input
// ============================================================================

@InputType("CampusUpdateInputDto")
export class CampusUpdateInputGraphQlDto {
  static schema = CampusUpdateSchema.domain;

  @Field(() => String, { nullable: true, ...CampusUpdateCommandFields.nomeFantasia.gqlMetadata })
  nomeFantasia?: string;
  @Field(() => String, { nullable: true, ...CampusUpdateCommandFields.razaoSocial.gqlMetadata })
  razaoSocial?: string;
  @Field(() => String, { nullable: true, ...CampusUpdateCommandFields.apelido.gqlMetadata })
  apelido?: string;
  @Field(() => String, { nullable: true, ...CampusUpdateCommandFields.cnpj.gqlMetadata })
  cnpj?: string;
  @Field(() => EnderecoInputGraphQlDto, {
    nullable: true,
    ...CampusUpdateCommandFields.endereco.gqlMetadata,
  })
  endereco?: EnderecoInputGraphQlDto;
}

// ============================================================================
// List Input (GraphQL-compatible - no dots in field names)
// ============================================================================

@ArgsType()
export class CampusListInputGraphQlDto {
  static schema = CampusGraphqlListInputSchema;

  @Field(() => Number, CampusListQueryFields.page.gqlMetadata)
  page?: number;
  @Field(() => Number, CampusListQueryFields.limit.gqlMetadata)
  limit?: number;
  @Field(() => String, CampusListQueryFields.search.gqlMetadata)
  search?: string;
  @Field(() => [String], CampusListQueryFields.sortBy.gqlMetadata)
  sortBy?: string[];
  @Field(() => [String], CampusListQueryFields.filterId.gqlMetadata)
  filterId?: string[];
}

// ============================================================================
// List Output
// ============================================================================

@ObjectType("CampusListResult")
export class CampusListOutputGraphQlDto {
  @Field(() => PaginationMetaGraphQlDto, CampusListQueryFields.meta.gqlMetadata)
  meta: PaginationMetaGraphQlDto;

  @Field(() => [CampusFindOneOutputGraphQlDto], CampusListQueryFields.data.gqlMetadata)
  data: CampusFindOneOutputGraphQlDto[];
}

import {
  EntityBaseGraphQlDto,
  PaginatedFilterByIdGraphQlDto,
  PaginationMetaGraphQlDto,
} from "@/infrastructure.graphql/dtos";
import { EmpresaCreateCommandFields } from "@/modules/estagio/empresa/domain/commands/empresa-create.command";
import { EmpresaUpdateCommandFields } from "@/modules/estagio/empresa/domain/commands/empresa-update.command";
import {
  EmpresaCreateSchema,
  EmpresaUpdateSchema,
} from "@/modules/estagio/empresa/domain/empresa.schemas";
import { EmpresaFindOneQueryResultFields } from "@/modules/estagio/empresa/domain/queries/empresa-find-one.query.result";
import { EmpresaListQueryFields } from "@/modules/estagio/empresa/domain/queries/empresa-list.query";
import { EmpresaGraphqlListInputSchema } from "@/modules/estagio/empresa/domain/queries/empresa-list.query.schemas";
import { EnderecoFindOneOutputGraphQlDto } from "@/modules/localidades/endereco/presentation.graphql/endereco.graphql.dto";
import { ArgsType, Field, InputType, ObjectType } from "@/shared/presentation/graphql";

// ============================================================================
// FindOne Output
// ============================================================================

@ObjectType("EmpresaFindOneOutputDto")
export class EmpresaFindOneOutputGraphQlDto extends EntityBaseGraphQlDto {
  @Field(() => String, EmpresaFindOneQueryResultFields.razaoSocial.gqlMetadata) razaoSocial: string;
  @Field(() => String, EmpresaFindOneQueryResultFields.nomeFantasia.gqlMetadata)
  nomeFantasia: string;
  @Field(() => String, EmpresaFindOneQueryResultFields.cnpj.gqlMetadata) cnpj: string;
  @Field(() => String, EmpresaFindOneQueryResultFields.telefone.gqlMetadata) telefone: string;
  @Field(() => String, EmpresaFindOneQueryResultFields.email.gqlMetadata) email: string;
  @Field(
    () => EnderecoFindOneOutputGraphQlDto,
    EmpresaFindOneQueryResultFields.endereco.gqlMetadata,
  )
  endereco: EnderecoFindOneOutputGraphQlDto;
  @Field(() => Boolean, EmpresaFindOneQueryResultFields.ativo.gqlMetadata) ativo: boolean;
}

// ============================================================================
// Create Input
// ============================================================================

@InputType("EmpresaEnderecoRefInputDto")
export class EmpresaEnderecoRefInputGraphQlDto {
  @Field(() => String) id: string;
}

@InputType("EmpresaCreateInputDto")
export class EmpresaCreateInputGraphQlDto {
  static schema = EmpresaCreateSchema.domain;

  @Field(() => String, EmpresaCreateCommandFields.razaoSocial.gqlMetadata) razaoSocial: string;
  @Field(() => String, EmpresaCreateCommandFields.nomeFantasia.gqlMetadata) nomeFantasia: string;
  @Field(() => String, EmpresaCreateCommandFields.cnpj.gqlMetadata) cnpj: string;
  @Field(() => String, EmpresaCreateCommandFields.telefone.gqlMetadata) telefone: string;
  @Field(() => String, EmpresaCreateCommandFields.email.gqlMetadata) email: string;
  @Field(() => EmpresaEnderecoRefInputGraphQlDto, EmpresaCreateCommandFields.endereco.gqlMetadata)
  endereco: EmpresaEnderecoRefInputGraphQlDto;
}

// ============================================================================
// Update Input
// ============================================================================

@InputType("EmpresaUpdateInputDto")
export class EmpresaUpdateInputGraphQlDto {
  static schema = EmpresaUpdateSchema.domain;

  @Field(() => String, { nullable: true, ...EmpresaUpdateCommandFields.razaoSocial.gqlMetadata })
  razaoSocial?: string;

  @Field(() => String, { nullable: true, ...EmpresaUpdateCommandFields.nomeFantasia.gqlMetadata })
  nomeFantasia?: string;

  @Field(() => String, { nullable: true, ...EmpresaUpdateCommandFields.cnpj.gqlMetadata })
  cnpj?: string;

  @Field(() => String, { nullable: true, ...EmpresaUpdateCommandFields.telefone.gqlMetadata })
  telefone?: string;

  @Field(() => String, { nullable: true, ...EmpresaUpdateCommandFields.email.gqlMetadata })
  email?: string;

  @Field(() => EmpresaEnderecoRefInputGraphQlDto, {
    nullable: true,
    ...EmpresaUpdateCommandFields.endereco.gqlMetadata,
  })
  endereco?: EmpresaEnderecoRefInputGraphQlDto;
}

// ============================================================================
// List Input (GraphQL-compatible - no dots in field names)
// ============================================================================

@ArgsType()
export class EmpresaListInputGraphQlDto extends PaginatedFilterByIdGraphQlDto {
  static schema = EmpresaGraphqlListInputSchema;

  @Field(() => [String], EmpresaListQueryFields.filterCnpj.gqlMetadata)
  filterCnpj?: string[];

  @Field(() => [String], EmpresaListQueryFields.filterNomeFantasia.gqlMetadata)
  filterNomeFantasia?: string[];

  @Field(() => [String], EmpresaListQueryFields.filterEnderecoId.gqlMetadata)
  filterEnderecoId?: string[];
}

// ============================================================================
// List Output
// ============================================================================

@ObjectType("EmpresaListResult")
export class EmpresaListOutputGraphQlDto {
  @Field(() => PaginationMetaGraphQlDto, EmpresaListQueryFields.meta.gqlMetadata)
  meta: PaginationMetaGraphQlDto;

  @Field(() => [EmpresaFindOneOutputGraphQlDto], EmpresaListQueryFields.data.gqlMetadata)
  data: EmpresaFindOneOutputGraphQlDto[];
}

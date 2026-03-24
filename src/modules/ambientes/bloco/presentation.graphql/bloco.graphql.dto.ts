import { EntityBaseGraphQlDto, PaginationMetaGraphQlDto } from "@/infrastructure.graphql/dtos";
import {
  BlocoCreateSchema,
  BlocoUpdateSchema,
} from "@/modules/ambientes/bloco/domain/bloco.schemas";
import { BlocoGraphqlListInputSchema } from "@/modules/ambientes/bloco/domain/queries/bloco-list.query.schemas";
import { CampusFindOneOutputGraphQlDto } from "@/modules/ambientes/campus/presentation.graphql/campus.graphql.dto";
import { ImagemFindOneOutputGraphQlDto } from "@/modules/armazenamento/imagem-arquivo/presentation.graphql/imagem-arquivo.graphql.dto";
import { ArgsType, Field, InputType, ObjectType } from "@/shared/presentation/graphql";
import { BlocoCreateCommandFields } from "../domain/commands/bloco-create.command";
import { BlocoUpdateCommandFields } from "../domain/commands/bloco-update.command";
import { BlocoFindOneQueryResultFields } from "../domain/queries/bloco-find-one.query.result";
import { BlocoListQueryFields } from "../domain/queries/bloco-list.query";

// ============================================================================
// FindOne Output
// ============================================================================

@ObjectType("BlocoFindOneOutputDto")
export class BlocoFindOneOutputGraphQlDto extends EntityBaseGraphQlDto {
  @Field(() => String, BlocoFindOneQueryResultFields.nome.gqlMetadata) nome: string;
  @Field(() => String, BlocoFindOneQueryResultFields.codigo.gqlMetadata) codigo: string;
  @Field(() => CampusFindOneOutputGraphQlDto, BlocoFindOneQueryResultFields.campus.gqlMetadata)
  campus: CampusFindOneOutputGraphQlDto;
  @Field(() => ImagemFindOneOutputGraphQlDto, {
    nullable: true,
    ...BlocoFindOneQueryResultFields.imagemCapa.gqlMetadata,
  })
  imagemCapa: ImagemFindOneOutputGraphQlDto | null;
}

// ============================================================================
// Object UUID Ref Input
// ============================================================================

@InputType("ObjectUuidRefInputDto")
export class ObjectUuidRefInputGraphQlDto {
  @Field(() => String) id: string;
}

// ============================================================================
// Create Input
// ============================================================================

@InputType("BlocoCreateInputDto")
export class BlocoCreateInputGraphQlDto {
  static schema = BlocoCreateSchema.domain;

  @Field(() => String, BlocoCreateCommandFields.nome.gqlMetadata) nome: string;
  @Field(() => String, BlocoCreateCommandFields.codigo.gqlMetadata) codigo: string;
  @Field(() => ObjectUuidRefInputGraphQlDto, BlocoCreateCommandFields.campus.gqlMetadata)
  campus: ObjectUuidRefInputGraphQlDto;
}

// ============================================================================
// Update Input
// ============================================================================

@InputType("BlocoUpdateInputDto")
export class BlocoUpdateInputGraphQlDto {
  static schema = BlocoUpdateSchema.domain;

  @Field(() => String, { nullable: true, ...BlocoUpdateCommandFields.nome.gqlMetadata })
  nome?: string;
  @Field(() => String, { nullable: true, ...BlocoUpdateCommandFields.codigo.gqlMetadata })
  codigo?: string;
  @Field(() => ObjectUuidRefInputGraphQlDto, {
    nullable: true,
    ...BlocoUpdateCommandFields.campus.gqlMetadata,
  })
  campus?: ObjectUuidRefInputGraphQlDto;
}

// ============================================================================
// List Input (GraphQL-compatible - no dots in field names)
// ============================================================================

@ArgsType()
export class BlocoListInputGraphQlDto {
  static schema = BlocoGraphqlListInputSchema;

  @Field(() => Number, BlocoListQueryFields.page.gqlMetadata)
  page?: number;
  @Field(() => Number, BlocoListQueryFields.limit.gqlMetadata)
  limit?: number;
  @Field(() => String, BlocoListQueryFields.search.gqlMetadata)
  search?: string;
  @Field(() => [String], BlocoListQueryFields.sortBy.gqlMetadata)
  sortBy?: string[];
  @Field(() => [String], BlocoListQueryFields.filterId.gqlMetadata)
  filterId?: string[];
  @Field(() => [String], BlocoListQueryFields.filterCampusId.gqlMetadata)
  filterCampusId?: string[];
}

// ============================================================================
// List Output
// ============================================================================

@ObjectType("BlocoListResult")
export class BlocoListOutputGraphQlDto {
  @Field(() => PaginationMetaGraphQlDto, BlocoListQueryFields.meta.gqlMetadata)
  meta: PaginationMetaGraphQlDto;

  @Field(() => [BlocoFindOneOutputGraphQlDto], BlocoListQueryFields.data.gqlMetadata)
  data: BlocoFindOneOutputGraphQlDto[];
}

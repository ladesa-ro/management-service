import { EntityBaseGraphQlDto, PaginationMetaGraphQlDto } from "@/infrastructure.graphql/dtos";
import {
  AmbienteCreateSchema,
  AmbienteUpdateSchema,
} from "@/modules/ambientes/ambiente/domain/ambiente.schemas";
import { AmbienteGraphqlListInputSchema } from "@/modules/ambientes/ambiente/domain/queries/ambiente-list.query.schemas";
import { BlocoFindOneOutputGraphQlDto } from "@/modules/ambientes/bloco/presentation.graphql/bloco.graphql.dto";
import { ImagemFindOneOutputGraphQlDto } from "@/modules/armazenamento/imagem-arquivo/presentation.graphql/imagem-arquivo.graphql.dto";
import { ArgsType, Field, InputType, Int, ObjectType } from "@/shared/presentation/graphql";
import { AmbienteCreateCommandFields } from "../domain/commands/ambiente-create.command";
import { AmbienteUpdateCommandFields } from "../domain/commands/ambiente-update.command";
import { AmbienteFindOneQueryResultFields } from "../domain/queries/ambiente-find-one.query.result";
import { AmbienteListQueryFields } from "../domain/queries/ambiente-list.query";

// ============================================================================
// FindOne Output
// ============================================================================

@ObjectType("AmbienteFindOneOutputDto")
export class AmbienteFindOneOutputGraphQlDto extends EntityBaseGraphQlDto {
  @Field(() => String, AmbienteFindOneQueryResultFields.nome.gqlMetadata) nome: string;
  @Field(() => String, {
    nullable: true,
    ...AmbienteFindOneQueryResultFields.descricao.gqlMetadata,
  })
  descricao: string | null;
  @Field(() => String, AmbienteFindOneQueryResultFields.codigo.gqlMetadata) codigo: string;
  @Field(() => Int, { nullable: true, ...AmbienteFindOneQueryResultFields.capacidade.gqlMetadata })
  capacidade: number | null;
  @Field(() => String, { nullable: true, ...AmbienteFindOneQueryResultFields.tipo.gqlMetadata })
  tipo: string | null;
  @Field(() => BlocoFindOneOutputGraphQlDto, AmbienteFindOneQueryResultFields.bloco.gqlMetadata)
  bloco: BlocoFindOneOutputGraphQlDto;
  @Field(() => ImagemFindOneOutputGraphQlDto, {
    nullable: true,
    ...AmbienteFindOneQueryResultFields.imagemCapa.gqlMetadata,
  })
  imagemCapa: ImagemFindOneOutputGraphQlDto | null;
}

// ============================================================================
// Ref Input
// ============================================================================

@InputType("AmbienteRefInputDto")
export class AmbienteRefInputGraphQlDto {
  @Field(() => String) id: string;
}

// ============================================================================
// Create Input
// ============================================================================

@InputType("AmbienteCreateInputDto")
export class AmbienteCreateInputGraphQlDto {
  static schema = AmbienteCreateSchema;

  @Field(() => String, AmbienteCreateCommandFields.nome.gqlMetadata) nome: string;
  @Field(() => String, { nullable: true, ...AmbienteCreateCommandFields.descricao.gqlMetadata })
  descricao?: string | null;
  @Field(() => String, AmbienteCreateCommandFields.codigo.gqlMetadata) codigo: string;
  @Field(() => Int, { nullable: true, ...AmbienteCreateCommandFields.capacidade.gqlMetadata })
  capacidade?: number | null;
  @Field(() => String, { nullable: true, ...AmbienteCreateCommandFields.tipo.gqlMetadata }) tipo?:
    | string
    | null;
  @Field(() => AmbienteRefInputGraphQlDto, AmbienteCreateCommandFields.bloco.gqlMetadata)
  bloco: AmbienteRefInputGraphQlDto;
}

// ============================================================================
// Update Input
// ============================================================================

@InputType("AmbienteUpdateInputDto")
export class AmbienteUpdateInputGraphQlDto {
  static schema = AmbienteUpdateSchema;

  @Field(() => String, { nullable: true, ...AmbienteUpdateCommandFields.nome.gqlMetadata })
  nome?: string;
  @Field(() => String, { nullable: true, ...AmbienteUpdateCommandFields.descricao.gqlMetadata })
  descricao?: string | null;
  @Field(() => String, { nullable: true, ...AmbienteUpdateCommandFields.codigo.gqlMetadata })
  codigo?: string;
  @Field(() => Int, { nullable: true, ...AmbienteUpdateCommandFields.capacidade.gqlMetadata })
  capacidade?: number | null;
  @Field(() => String, { nullable: true, ...AmbienteUpdateCommandFields.tipo.gqlMetadata }) tipo?:
    | string
    | null;
  @Field(() => AmbienteRefInputGraphQlDto, {
    nullable: true,
    ...AmbienteUpdateCommandFields.bloco.gqlMetadata,
  })
  bloco?: AmbienteRefInputGraphQlDto;
}

// ============================================================================
// List Input (GraphQL-compatible - no dots in field names)
// ============================================================================

@ArgsType()
export class AmbienteListInputGraphQlDto {
  static schema = AmbienteGraphqlListInputSchema;

  @Field(() => Number, AmbienteListQueryFields.page.gqlMetadata)
  page?: number;
  @Field(() => Number, AmbienteListQueryFields.limit.gqlMetadata)
  limit?: number;
  @Field(() => String, AmbienteListQueryFields.search.gqlMetadata)
  search?: string;
  @Field(() => [String], AmbienteListQueryFields.sortBy.gqlMetadata)
  sortBy?: string[];
  @Field(() => [String], AmbienteListQueryFields.selection.gqlMetadata)
  selection?: string[];
  @Field(() => [String], AmbienteListQueryFields.filterId.gqlMetadata)
  filterId?: string[];
  @Field(() => [String], AmbienteListQueryFields.filterBlocoId.gqlMetadata)
  filterBlocoId?: string[];
  @Field(() => [String], AmbienteListQueryFields.filterBlocoCampusId.gqlMetadata)
  filterBlocoCampusId?: string[];
}

// ============================================================================
// List Output
// ============================================================================

@ObjectType("AmbienteListResult")
export class AmbienteListOutputGraphQlDto {
  @Field(() => PaginationMetaGraphQlDto, AmbienteListQueryFields.meta.gqlMetadata)
  meta: PaginationMetaGraphQlDto;

  @Field(() => [AmbienteFindOneOutputGraphQlDto], AmbienteListQueryFields.data.gqlMetadata)
  data: AmbienteFindOneOutputGraphQlDto[];
}

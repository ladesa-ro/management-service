import {
  EntityBaseGraphQlDto,
  PaginatedFilterByIdGraphQlDto,
  PaginationMetaGraphQlDto,
} from "@/infrastructure.graphql/dtos";
import { UsuarioCreateCommandFields } from "@/modules/acesso/usuario/domain/commands/usuario-create.command";
import { UsuarioUpdateCommandFields } from "@/modules/acesso/usuario/domain/commands/usuario-update.command";
import { UsuarioFindOneQueryResultFields } from "@/modules/acesso/usuario/domain/queries/usuario-find-one.query.result";
import { UsuarioListQueryFields } from "@/modules/acesso/usuario/domain/queries/usuario-list.query";
import { UsuarioGraphqlListInputSchema } from "@/modules/acesso/usuario/domain/queries/usuario-list.query.schemas";
import {
  UsuarioCreateSchema,
  UsuarioUpdateSchema,
} from "@/modules/acesso/usuario/domain/usuario.schemas";
import { ImagemFindOneOutputGraphQlDto } from "@/modules/armazenamento/imagem-arquivo/presentation.graphql/imagem-arquivo.graphql.dto";
import { ArgsType, Field, InputType, ObjectType } from "@/shared/presentation/graphql";

// ============================================================================
// FindOne Output
// ============================================================================

@ObjectType("UsuarioFindOneOutputDto")
export class UsuarioFindOneOutputGraphQlDto extends EntityBaseGraphQlDto {
  @Field(() => String, { nullable: true, ...UsuarioFindOneQueryResultFields.nome.gqlMetadata })
  nome: string | null;
  @Field(() => String, { nullable: true, ...UsuarioFindOneQueryResultFields.matricula.gqlMetadata })
  matricula: string | null;
  @Field(() => String, { nullable: true, ...UsuarioFindOneQueryResultFields.email.gqlMetadata })
  email: string | null;
  @Field(() => Boolean, UsuarioFindOneQueryResultFields.isSuperUser.gqlMetadata)
  isSuperUser: boolean;
  @Field(() => ImagemFindOneOutputGraphQlDto, {
    nullable: true,
    ...UsuarioFindOneQueryResultFields.imagemCapa.gqlMetadata,
  })
  imagemCapa: ImagemFindOneOutputGraphQlDto | null;
  @Field(() => ImagemFindOneOutputGraphQlDto, {
    nullable: true,
    ...UsuarioFindOneQueryResultFields.imagemPerfil.gqlMetadata,
  })
  imagemPerfil: ImagemFindOneOutputGraphQlDto | null;
}

// ============================================================================
// Create Input
// ============================================================================

@InputType("UsuarioCreateInputDto")
export class UsuarioCreateInputGraphQlDto {
  static schema = UsuarioCreateSchema;

  @Field(() => String, { nullable: true, ...UsuarioCreateCommandFields.nome.gqlMetadata }) nome?:
    | string
    | null;
  @Field(() => String, { nullable: true, ...UsuarioCreateCommandFields.matricula.gqlMetadata })
  matricula?: string | null;
  @Field(() => String, { nullable: true, ...UsuarioCreateCommandFields.email.gqlMetadata }) email?:
    | string
    | null;
}

// ============================================================================
// Update Input
// ============================================================================

@InputType("UsuarioUpdateInputDto")
export class UsuarioUpdateInputGraphQlDto {
  static schema = UsuarioUpdateSchema;

  @Field(() => String, { nullable: true, ...UsuarioUpdateCommandFields.nome.gqlMetadata })
  nome?: string | null;
  @Field(() => String, { nullable: true, ...UsuarioUpdateCommandFields.matricula.gqlMetadata })
  matricula?: string | null;
  @Field(() => String, { nullable: true, ...UsuarioUpdateCommandFields.email.gqlMetadata })
  email?: string | null;
}

// ============================================================================
// List Input
// ============================================================================

@ArgsType()
export class UsuarioListInputGraphQlDto extends PaginatedFilterByIdGraphQlDto {
  static schema = UsuarioGraphqlListInputSchema;
}

// ============================================================================
// List Output
// ============================================================================

@ObjectType("UsuarioListResult")
export class UsuarioListOutputGraphQlDto {
  @Field(() => PaginationMetaGraphQlDto, UsuarioListQueryFields.meta.gqlMetadata)
  meta: PaginationMetaGraphQlDto;

  @Field(() => [UsuarioFindOneOutputGraphQlDto], UsuarioListQueryFields.data.gqlMetadata)
  data: UsuarioFindOneOutputGraphQlDto[];
}

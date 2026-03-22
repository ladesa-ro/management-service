import {
  EntityBaseGraphQlDto,
  PaginatedFilterByIdGraphQlDto,
  PaginationMetaGraphQlDto,
} from "@/infrastructure.graphql/dtos";
import {
  usuarioCreateSchema,
  usuarioGraphqlListInputSchema,
  usuarioUpdateSchema,
} from "@/modules/acesso/usuario/domain/usuario.schemas";
import { ImagemFindOneOutputGraphQlDto } from "@/modules/armazenamento/imagem-arquivo/presentation.graphql/imagem-arquivo.graphql.dto";
import { ArgsType, Field, InputType, ObjectType } from "@/shared/presentation/graphql";

// ============================================================================
// FindOne Output
// ============================================================================

@ObjectType("UsuarioFindOneOutputDto")
export class UsuarioFindOneOutputGraphQlDto extends EntityBaseGraphQlDto {
  @Field(() => String, { nullable: true }) nome: string | null;
  @Field(() => String, { nullable: true }) matricula: string | null;
  @Field(() => String, { nullable: true }) email: string | null;
  @Field(() => Boolean) isSuperUser: boolean;
  @Field(() => ImagemFindOneOutputGraphQlDto, { nullable: true })
  imagemCapa: ImagemFindOneOutputGraphQlDto | null;
  @Field(() => ImagemFindOneOutputGraphQlDto, { nullable: true })
  imagemPerfil: ImagemFindOneOutputGraphQlDto | null;
}

// ============================================================================
// Create Input
// ============================================================================

@InputType("UsuarioCreateInputDto")
export class UsuarioCreateInputGraphQlDto {
  static schema = usuarioCreateSchema;

  @Field(() => String, { nullable: true }) nome?: string | null;
  @Field(() => String, { nullable: true }) matricula?: string | null;
  @Field(() => String, { nullable: true }) email?: string | null;
}

// ============================================================================
// Update Input
// ============================================================================

@InputType("UsuarioUpdateInputDto")
export class UsuarioUpdateInputGraphQlDto {
  static schema = usuarioUpdateSchema;

  @Field(() => String, { nullable: true })
  nome?: string | null;
  @Field(() => String, { nullable: true })
  matricula?: string | null;
  @Field(() => String, { nullable: true })
  email?: string | null;
}

// ============================================================================
// List Input
// ============================================================================

@ArgsType()
export class UsuarioListInputGraphQlDto extends PaginatedFilterByIdGraphQlDto {
  static schema = usuarioGraphqlListInputSchema;
}

// ============================================================================
// List Output
// ============================================================================

@ObjectType("UsuarioListResult")
export class UsuarioListOutputGraphQlDto {
  @Field(() => PaginationMetaGraphQlDto)
  meta: PaginationMetaGraphQlDto;

  @Field(() => [UsuarioFindOneOutputGraphQlDto])
  data: UsuarioFindOneOutputGraphQlDto[];
}

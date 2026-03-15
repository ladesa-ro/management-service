import {
  EntityBaseGraphQlDto,
  PaginatedFilterByIdGraphQlDto,
  PaginationMetaGraphQlDto,
} from "@/modules/@shared/infrastructure/graphql/dtos";
import { ArgsType, Field, InputType, ObjectType } from "@/modules/@shared/presentation/graphql";
import { IsOptional, IsString, MinLength } from "@/modules/@shared/presentation/shared";
import { UsuarioFieldsMixin } from "@/modules/acesso/usuario/presentation.validations/usuario.validation-mixin";
import { ImagemFindOneOutputGraphQlDto } from "@/modules/armazenamento/imagem-arquivo/presentation.graphql/imagem-arquivo.graphql.dto";

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
export class UsuarioCreateInputGraphQlDto extends UsuarioFieldsMixin {
  @Field(() => String, { nullable: true }) declare nome?: string | null;
  @Field(() => String, { nullable: true }) declare matricula?: string | null;
  @Field(() => String, { nullable: true }) declare email?: string | null;
}

// ============================================================================
// Update Input
// ============================================================================

@InputType("UsuarioUpdateInputDto")
export class UsuarioUpdateInputGraphQlDto {
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @MinLength(1)
  nome?: string | null;
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  matricula?: string | null;
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  email?: string | null;
}

// ============================================================================
// List Input
// ============================================================================

@ArgsType()
export class UsuarioListInputGraphQlDto extends PaginatedFilterByIdGraphQlDto {}

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

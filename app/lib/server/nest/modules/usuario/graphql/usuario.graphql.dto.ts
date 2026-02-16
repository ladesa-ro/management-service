import { ArgsType, Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsOptional, IsString, MinLength } from "class-validator";
import { decorate } from "ts-mixer";
import {
  EntityBaseGraphQlDto,
  PaginatedFilterByIdGraphQlDto,
  PaginationMetaGraphQlDto,
} from "@/modules/@shared/infrastructure/graphql/dtos";
import { ImagemFindOneOutputGraphQlDto } from "@/server/nest/modules/imagem-arquivo/graphql/imagem-arquivo.graphql.dto";
import { UsuarioFieldsMixin } from "@/server/nest/modules/usuario/usuario.validation-mixin";

// ============================================================================
// FindOne Output
// ============================================================================

@decorate(ObjectType("UsuarioFindOneOutputDto"))
export class UsuarioFindOneOutputGraphQlDto extends EntityBaseGraphQlDto {
  @decorate(Field(() => String, { nullable: true })) nome: string | null;
  @decorate(Field(() => String, { nullable: true })) matriculaSiape: string | null;
  @decorate(Field(() => String, { nullable: true })) email: string | null;
  @decorate(Field(() => Boolean)) isSuperUser: boolean;
  @decorate(Field(() => ImagemFindOneOutputGraphQlDto, { nullable: true }))
  imagemCapa: ImagemFindOneOutputGraphQlDto | null;
  @decorate(Field(() => ImagemFindOneOutputGraphQlDto, { nullable: true }))
  imagemPerfil: ImagemFindOneOutputGraphQlDto | null;
}

// ============================================================================
// Create Input
// ============================================================================

@decorate(InputType("UsuarioCreateInputDto"))
export class UsuarioCreateInputGraphQlDto extends UsuarioFieldsMixin {
  @decorate(Field(() => String, { nullable: true })) declare nome?: string | null;
  @decorate(Field(() => String, { nullable: true })) declare matriculaSiape?: string | null;
  @decorate(Field(() => String, { nullable: true })) declare email?: string | null;
}

// ============================================================================
// Update Input
// ============================================================================

@decorate(InputType("UsuarioUpdateInputDto"))
export class UsuarioUpdateInputGraphQlDto {
  @decorate(Field(() => String, { nullable: true }))
  @decorate(IsOptional())
  @decorate(IsString())
  @decorate(MinLength(1))
  nome?: string | null;
  @decorate(Field(() => String, { nullable: true }))
  @decorate(IsOptional())
  @decorate(IsString())
  matriculaSiape?: string | null;
  @decorate(Field(() => String, { nullable: true }))
  @decorate(IsOptional())
  @decorate(IsString())
  email?: string | null;
}

// ============================================================================
// List Input
// ============================================================================

@decorate(ArgsType())
export class UsuarioListInputGraphQlDto extends PaginatedFilterByIdGraphQlDto {}

// ============================================================================
// List Output
// ============================================================================

@decorate(ObjectType("UsuarioListResult"))
export class UsuarioListOutputGraphQlDto {
  @decorate(Field(() => PaginationMetaGraphQlDto))
  meta: PaginationMetaGraphQlDto;

  @decorate(Field(() => [UsuarioFindOneOutputGraphQlDto]))
  data: UsuarioFindOneOutputGraphQlDto[];
}

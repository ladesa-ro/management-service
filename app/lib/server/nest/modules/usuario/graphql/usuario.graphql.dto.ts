import { ArgsType, Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsArray, IsOptional, IsString, IsUUID, MinLength } from "class-validator";
import {
  EntityBaseGraphQlDto,
  PaginationMetaGraphQlDto,
} from "@/modules/@shared/infrastructure/graphql/dtos";
import { PaginationArgsGraphQlDto } from "@/modules/@shared/infrastructure/graphql/dtos/pagination-graphql.dto";
import { ImagemFindOneOutputGraphQlDto } from "@/server/nest/modules/imagem-arquivo/graphql/imagem-arquivo.graphql.dto";

// ============================================================================
// FindOne Output
// ============================================================================

@ObjectType("UsuarioFindOneOutputDto")
export class UsuarioFindOneOutputGraphQlDto extends EntityBaseGraphQlDto {
  @Field(() => String, { nullable: true }) nome: string | null;
  @Field(() => String, { nullable: true }) matriculaSiape: string | null;
  @Field(() => String, { nullable: true }) email: string | null;
  @Field() isSuperUser: boolean;
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
  @Field({ nullable: true }) @IsOptional() @IsString() @MinLength(1) nome?: string | null;
  @Field({ nullable: true }) @IsOptional() @IsString() matriculaSiape?: string | null;
  @Field({ nullable: true }) @IsOptional() @IsString() email?: string | null;
}

// ============================================================================
// Update Input
// ============================================================================

@InputType("UsuarioUpdateInputDto")
export class UsuarioUpdateInputGraphQlDto {
  @Field({ nullable: true }) @IsOptional() @IsString() @MinLength(1) nome?: string | null;
  @Field({ nullable: true }) @IsOptional() @IsString() matriculaSiape?: string | null;
  @Field({ nullable: true }) @IsOptional() @IsString() email?: string | null;
}

// ============================================================================
// List Input
// ============================================================================

@ArgsType()
export class UsuarioListInputGraphQlDto extends PaginationArgsGraphQlDto {
  @Field(() => [String], { nullable: true, description: "Filtro por ID" })
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  filterId?: string[];
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

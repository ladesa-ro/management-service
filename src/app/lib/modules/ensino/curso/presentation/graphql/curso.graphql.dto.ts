import { ArgsType, Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsArray, IsOptional, IsString, IsUUID, MinLength, ValidateNested } from "class-validator";
import { decorate } from "ts-mixer";
import { ImagemFindOneOutputGraphQlDto } from "@/modules/armazenamento/imagem-arquivo/presentation/graphql/imagem-arquivo.graphql.dto";
import {
  EntityBaseGraphQlDto,
  PaginatedFilterByIdGraphQlDto,
  PaginationMetaGraphQlDto,
} from "@/modules/@shared/infrastructure/graphql/dtos";
import { CampusFindOneOutputGraphQlDto } from "@/modules/ambientes/campus/presentation/graphql/campus.graphql.dto";
import { CursoFieldsMixin } from "@/modules/ensino/curso/presentation/curso.validation-mixin";
import { OfertaFormacaoFindOneOutputGraphQlDto } from "@/modules/ensino/oferta-formacao/presentation/graphql/oferta-formacao.graphql.dto";

// ============================================================================
// FindOne Output
// ============================================================================

@decorate(ObjectType("CursoFindOneOutputDto"))
export class CursoFindOneOutputGraphQlDto extends EntityBaseGraphQlDto {
  @decorate(Field(() => String)) nome: string;
  @decorate(Field(() => String)) nomeAbreviado: string;
  @decorate(Field(() => CampusFindOneOutputGraphQlDto)) campus: CampusFindOneOutputGraphQlDto;
  @decorate(Field(() => OfertaFormacaoFindOneOutputGraphQlDto))
  ofertaFormacao: OfertaFormacaoFindOneOutputGraphQlDto;
  @decorate(Field(() => ImagemFindOneOutputGraphQlDto, { nullable: true }))
  imagemCapa: ImagemFindOneOutputGraphQlDto | null;
}

// ============================================================================
// Create Input
// ============================================================================

@decorate(InputType("CursoCampusRefInputDto"))
export class CursoCampusRefInputGraphQlDto {
  @decorate(Field(() => String)) @decorate(IsString()) id: string;
}

@decorate(InputType("CursoOfertaFormacaoRefInputDto"))
export class CursoOfertaFormacaoRefInputGraphQlDto {
  @decorate(Field(() => String)) @decorate(IsString()) id: string;
}

@decorate(InputType("CursoImagemCapaRefInputDto"))
export class CursoImagemCapaRefInputGraphQlDto {
  @decorate(Field(() => String)) @decorate(IsString()) id: string;
}

@decorate(InputType("CursoCreateInputDto"))
export class CursoCreateInputGraphQlDto extends CursoFieldsMixin {
  @decorate(Field(() => String)) declare nome: string;
  @decorate(Field(() => String)) declare nomeAbreviado: string;
  @decorate(Field(() => CursoCampusRefInputGraphQlDto))
  @decorate(ValidateNested())
  campus: CursoCampusRefInputGraphQlDto;
  @decorate(Field(() => CursoOfertaFormacaoRefInputGraphQlDto))
  @decorate(ValidateNested())
  ofertaFormacao: CursoOfertaFormacaoRefInputGraphQlDto;
  @decorate(Field(() => CursoImagemCapaRefInputGraphQlDto, { nullable: true }))
  @decorate(IsOptional())
  @decorate(ValidateNested())
  imagemCapa?: CursoImagemCapaRefInputGraphQlDto | null;
}

// ============================================================================
// Update Input
// ============================================================================

@decorate(InputType("CursoUpdateInputDto"))
export class CursoUpdateInputGraphQlDto {
  @decorate(Field(() => String, { nullable: true }))
  @decorate(IsOptional())
  @decorate(IsString())
  @decorate(MinLength(1))
  nome?: string;
  @decorate(Field(() => String, { nullable: true }))
  @decorate(IsOptional())
  @decorate(IsString())
  @decorate(MinLength(1))
  nomeAbreviado?: string;
  @decorate(Field(() => CursoCampusRefInputGraphQlDto, { nullable: true }))
  @decorate(IsOptional())
  @decorate(ValidateNested())
  campus?: CursoCampusRefInputGraphQlDto;
  @decorate(Field(() => CursoOfertaFormacaoRefInputGraphQlDto, { nullable: true }))
  @decorate(IsOptional())
  @decorate(ValidateNested())
  ofertaFormacao?: CursoOfertaFormacaoRefInputGraphQlDto;
  @decorate(Field(() => CursoImagemCapaRefInputGraphQlDto, { nullable: true }))
  @decorate(IsOptional())
  @decorate(ValidateNested())
  imagemCapa?: CursoImagemCapaRefInputGraphQlDto | null;
}

// ============================================================================
// List Input
// ============================================================================

@decorate(ArgsType())
export class CursoListInputGraphQlDto extends PaginatedFilterByIdGraphQlDto {
  @decorate(Field(() => [String], { nullable: true, description: "Filtro por ID do Campus" }))
  @decorate(IsOptional())
  @decorate(IsArray())
  @decorate(IsUUID(undefined, { each: true }))
  filterCampusId?: string[];

  @decorate(
    Field(() => [String], { nullable: true, description: "Filtro por ID da Oferta de Formacao" }),
  )
  @decorate(IsOptional())
  @decorate(IsArray())
  @decorate(IsUUID(undefined, { each: true }))
  filterOfertaFormacaoId?: string[];
}

// ============================================================================
// List Output
// ============================================================================

@decorate(ObjectType("CursoListResult"))
export class CursoListOutputGraphQlDto {
  @decorate(Field(() => PaginationMetaGraphQlDto))
  meta: PaginationMetaGraphQlDto;

  @decorate(Field(() => [CursoFindOneOutputGraphQlDto]))
  data: CursoFindOneOutputGraphQlDto[];
}

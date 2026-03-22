import {
  EntityBaseGraphQlDto,
  PaginatedFilterByIdGraphQlDto,
  PaginationMetaGraphQlDto,
} from "@/infrastructure.graphql/dtos";
import { CampusFindOneOutputGraphQlDto } from "@/modules/ambientes/campus/presentation.graphql/campus.graphql.dto";
import { ImagemFindOneOutputGraphQlDto } from "@/modules/armazenamento/imagem-arquivo/presentation.graphql/imagem-arquivo.graphql.dto";
import { OfertaFormacaoFindOneOutputGraphQlDto } from "@/modules/ensino/oferta-formacao/presentation.graphql/oferta-formacao.graphql.dto";
import { ArgsType, Field, InputType, ObjectType } from "@/shared/presentation/graphql";
import {
  cursoCreateSchema,
  cursoGraphqlListInputSchema,
  cursoUpdateSchema,
} from "../domain/curso.schemas";

// ============================================================================
// FindOne Output
// ============================================================================

@ObjectType("CursoFindOneOutputDto")
export class CursoFindOneOutputGraphQlDto extends EntityBaseGraphQlDto {
  @Field(() => String) nome: string;
  @Field(() => String) nomeAbreviado: string;
  @Field(() => CampusFindOneOutputGraphQlDto) campus: CampusFindOneOutputGraphQlDto;
  @Field(() => OfertaFormacaoFindOneOutputGraphQlDto)
  ofertaFormacao: OfertaFormacaoFindOneOutputGraphQlDto;
  @Field(() => ImagemFindOneOutputGraphQlDto, { nullable: true })
  imagemCapa: ImagemFindOneOutputGraphQlDto | null;
}

// ============================================================================
// Create Input
// ============================================================================

@InputType("CursoCampusRefInputDto")
export class CursoCampusRefInputGraphQlDto {
  @Field(() => String) id: string;
}

@InputType("CursoOfertaFormacaoRefInputDto")
export class CursoOfertaFormacaoRefInputGraphQlDto {
  @Field(() => String) id: string;
}

@InputType("CursoImagemCapaRefInputDto")
export class CursoImagemCapaRefInputGraphQlDto {
  @Field(() => String) id: string;
}

@InputType("CursoCreateInputDto")
export class CursoCreateInputGraphQlDto {
  static readonly schema = cursoCreateSchema;

  @Field(() => String) nome: string;
  @Field(() => String) nomeAbreviado: string;
  @Field(() => CursoCampusRefInputGraphQlDto)
  campus: CursoCampusRefInputGraphQlDto;
  @Field(() => CursoOfertaFormacaoRefInputGraphQlDto)
  ofertaFormacao: CursoOfertaFormacaoRefInputGraphQlDto;
  @Field(() => CursoImagemCapaRefInputGraphQlDto, { nullable: true })
  imagemCapa?: CursoImagemCapaRefInputGraphQlDto | null;
}

// ============================================================================
// Update Input
// ============================================================================

@InputType("CursoUpdateInputDto")
export class CursoUpdateInputGraphQlDto {
  static readonly schema = cursoUpdateSchema;

  @Field(() => String, { nullable: true })
  nome?: string;
  @Field(() => String, { nullable: true })
  nomeAbreviado?: string;
  @Field(() => CursoCampusRefInputGraphQlDto, { nullable: true })
  campus?: CursoCampusRefInputGraphQlDto;
  @Field(() => CursoOfertaFormacaoRefInputGraphQlDto, { nullable: true })
  ofertaFormacao?: CursoOfertaFormacaoRefInputGraphQlDto;
  @Field(() => CursoImagemCapaRefInputGraphQlDto, { nullable: true })
  imagemCapa?: CursoImagemCapaRefInputGraphQlDto | null;
}

// ============================================================================
// List Input
// ============================================================================

@ArgsType()
export class CursoListInputGraphQlDto extends PaginatedFilterByIdGraphQlDto {
  static schema = cursoGraphqlListInputSchema;

  @Field(() => [String], { nullable: true, description: "Filtro por ID do Campus" })
  filterCampusId?: string[];

  @Field(() => [String], { nullable: true, description: "Filtro por ID da Oferta de Formacao" })
  filterOfertaFormacaoId?: string[];
}

// ============================================================================
// List Output
// ============================================================================

@ObjectType("CursoListResult")
export class CursoListOutputGraphQlDto {
  @Field(() => PaginationMetaGraphQlDto)
  meta: PaginationMetaGraphQlDto;

  @Field(() => [CursoFindOneOutputGraphQlDto])
  data: CursoFindOneOutputGraphQlDto[];
}

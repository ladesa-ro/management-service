import { z } from "zod";
import {
  EntityBaseGraphQlDto,
  PaginatedFilterByIdGraphQlDto,
  PaginationMetaGraphQlDto,
} from "@/infrastructure.graphql/dtos";
import { CampusFindOneOutputGraphQlDto } from "@/modules/ambientes/campus/presentation.graphql/campus.graphql.dto";
import { ImagemFindOneOutputGraphQlDto } from "@/modules/armazenamento/imagem-arquivo/presentation.graphql/imagem-arquivo.graphql.dto";
import { OfertaFormacaoFindOneOutputGraphQlDto } from "@/modules/ensino/oferta-formacao/presentation.graphql/oferta-formacao.graphql.dto";
import { ArgsType, Field, InputType, ObjectType } from "@/shared/presentation/graphql";
import { createGraphqlListInputSchema } from "@/shared/validation/schemas";
import { CursoCreateCommandFields } from "../domain/commands/curso-create.command";
import { CursoUpdateCommandFields } from "../domain/commands/curso-update.command";
import { CursoCreateSchema, CursoUpdateSchema } from "../domain/curso.schemas";
import { CursoFindOneQueryResultFields } from "../domain/queries/curso-find-one.query.result";
import { CursoListQueryFields } from "../domain/queries/curso-list.query";

// ============================================================================
// FindOne Output
// ============================================================================

@ObjectType("CursoFindOneOutputDto")
export class CursoFindOneOutputGraphQlDto extends EntityBaseGraphQlDto {
  @Field(() => String, CursoFindOneQueryResultFields.nome.gqlMetadata) nome: string;
  @Field(() => String, CursoFindOneQueryResultFields.nomeAbreviado.gqlMetadata)
  nomeAbreviado: string;
  @Field(() => CampusFindOneOutputGraphQlDto, CursoFindOneQueryResultFields.campus.gqlMetadata)
  campus: CampusFindOneOutputGraphQlDto;
  @Field(
    () => OfertaFormacaoFindOneOutputGraphQlDto,
    CursoFindOneQueryResultFields.ofertaFormacao.gqlMetadata,
  )
  ofertaFormacao: OfertaFormacaoFindOneOutputGraphQlDto;
  @Field(() => ImagemFindOneOutputGraphQlDto, {
    nullable: true,
    ...CursoFindOneQueryResultFields.imagemCapa.gqlMetadata,
  })
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
  static readonly schema = CursoCreateSchema.domain;

  @Field(() => String, CursoCreateCommandFields.nome.gqlMetadata) nome: string;
  @Field(() => String, CursoCreateCommandFields.nomeAbreviado.gqlMetadata) nomeAbreviado: string;
  @Field(() => CursoCampusRefInputGraphQlDto, CursoCreateCommandFields.campus.gqlMetadata)
  campus: CursoCampusRefInputGraphQlDto;
  @Field(
    () => CursoOfertaFormacaoRefInputGraphQlDto,
    CursoCreateCommandFields.ofertaFormacao.gqlMetadata,
  )
  ofertaFormacao: CursoOfertaFormacaoRefInputGraphQlDto;
  @Field(() => CursoImagemCapaRefInputGraphQlDto, {
    nullable: true,
    ...CursoFindOneQueryResultFields.imagemCapa.gqlMetadata,
  })
  imagemCapa?: CursoImagemCapaRefInputGraphQlDto | null;
}

// ============================================================================
// Update Input
// ============================================================================

@InputType("CursoUpdateInputDto")
export class CursoUpdateInputGraphQlDto {
  static readonly schema = CursoUpdateSchema.domain;

  @Field(() => String, { nullable: true, ...CursoUpdateCommandFields.nome.gqlMetadata })
  nome?: string;
  @Field(() => String, { nullable: true, ...CursoUpdateCommandFields.nomeAbreviado.gqlMetadata })
  nomeAbreviado?: string;
  @Field(() => CursoCampusRefInputGraphQlDto, {
    nullable: true,
    ...CursoUpdateCommandFields.campus.gqlMetadata,
  })
  campus?: CursoCampusRefInputGraphQlDto;
  @Field(() => CursoOfertaFormacaoRefInputGraphQlDto, {
    nullable: true,
    ...CursoUpdateCommandFields.ofertaFormacao.gqlMetadata,
  })
  ofertaFormacao?: CursoOfertaFormacaoRefInputGraphQlDto;
  @Field(() => CursoImagemCapaRefInputGraphQlDto, {
    nullable: true,
    ...CursoFindOneQueryResultFields.imagemCapa.gqlMetadata,
  })
  imagemCapa?: CursoImagemCapaRefInputGraphQlDto | null;
}

// ============================================================================
// List Input
// ============================================================================

const CursoGraphqlListInputSchema = createGraphqlListInputSchema({
  filterCampusId: z.array(z.string()).optional(),
  filterOfertaFormacaoId: z.array(z.string()).optional(),
});

@ArgsType()
export class CursoListInputGraphQlDto extends PaginatedFilterByIdGraphQlDto {
  static schema = CursoGraphqlListInputSchema;

  @Field(() => [String], CursoListQueryFields.filterCampusId.gqlMetadata)
  filterCampusId?: string[];

  @Field(() => [String], CursoListQueryFields.filterOfertaFormacaoId.gqlMetadata)
  filterOfertaFormacaoId?: string[];
}

// ============================================================================
// List Output
// ============================================================================

@ObjectType("CursoListResult")
export class CursoListOutputGraphQlDto {
  @Field(() => PaginationMetaGraphQlDto, CursoListQueryFields.meta.gqlMetadata)
  meta: PaginationMetaGraphQlDto;

  @Field(() => [CursoFindOneOutputGraphQlDto], CursoListQueryFields.data.gqlMetadata)
  data: CursoFindOneOutputGraphQlDto[];
}

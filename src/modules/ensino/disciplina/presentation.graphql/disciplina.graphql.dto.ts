import { z } from "zod";
import {
  EntityBaseGraphQlDto,
  PaginatedFilterByIdGraphQlDto,
  PaginationMetaGraphQlDto,
} from "@/infrastructure.graphql/dtos";
import { ImagemFindOneOutputGraphQlDto } from "@/modules/armazenamento/imagem-arquivo/presentation.graphql/imagem-arquivo.graphql.dto";
import { ArgsType, Field, InputType, Int, ObjectType } from "@/shared/presentation/graphql";
import { createGraphqlListInputSchema } from "@/shared/validation/schemas";
import { DisciplinaCreateCommandFields } from "../domain/commands/disciplina-create.command";
import { DisciplinaUpdateCommandFields } from "../domain/commands/disciplina-update.command";
import { DisciplinaCreateSchema, DisciplinaUpdateSchema } from "../domain/disciplina.schemas";
import { DisciplinaFindOneQueryResultFields } from "../domain/queries/disciplina-find-one.query.result";
import { DisciplinaListQueryFields } from "../domain/queries/disciplina-list.query";

// ============================================================================
// FindOne Output
// ============================================================================

@ObjectType("DisciplinaFindOneOutputDto")
export class DisciplinaFindOneOutputGraphQlDto extends EntityBaseGraphQlDto {
  @Field(() => String, DisciplinaFindOneQueryResultFields.nome.gqlMetadata) nome: string;
  @Field(() => String, DisciplinaFindOneQueryResultFields.nomeAbreviado.gqlMetadata)
  nomeAbreviado: string;
  @Field(() => Int, DisciplinaFindOneQueryResultFields.cargaHoraria.gqlMetadata)
  cargaHoraria: number;
  @Field(() => ImagemFindOneOutputGraphQlDto, {
    nullable: true,
    ...DisciplinaFindOneQueryResultFields.imagemCapa.gqlMetadata,
  })
  imagemCapa: ImagemFindOneOutputGraphQlDto | null;
}

// ============================================================================
// Create Input
// ============================================================================

@InputType("DisciplinaImagemCapaRefInputDto")
export class DisciplinaImagemCapaRefInputGraphQlDto {
  @Field(() => String) id: string;
}

@InputType("DisciplinaCreateInputDto")
export class DisciplinaCreateInputGraphQlDto {
  static readonly schema = DisciplinaCreateSchema.domain;

  @Field(() => String, DisciplinaCreateCommandFields.nome.gqlMetadata) nome: string;
  @Field(() => String, DisciplinaCreateCommandFields.nomeAbreviado.gqlMetadata)
  nomeAbreviado: string;
  @Field(() => Int, DisciplinaCreateCommandFields.cargaHoraria.gqlMetadata) cargaHoraria: number;
  @Field(() => DisciplinaImagemCapaRefInputGraphQlDto, {
    nullable: true,
    ...DisciplinaFindOneQueryResultFields.imagemCapa.gqlMetadata,
  })
  imagemCapa?: DisciplinaImagemCapaRefInputGraphQlDto | null;
}

// ============================================================================
// Update Input
// ============================================================================

@InputType("DisciplinaUpdateInputDto")
export class DisciplinaUpdateInputGraphQlDto {
  static readonly schema = DisciplinaUpdateSchema.domain;

  @Field(() => String, { nullable: true, ...DisciplinaUpdateCommandFields.nome.gqlMetadata })
  nome?: string;
  @Field(() => String, {
    nullable: true,
    ...DisciplinaUpdateCommandFields.nomeAbreviado.gqlMetadata,
  })
  nomeAbreviado?: string;
  @Field(() => Int, { nullable: true, ...DisciplinaUpdateCommandFields.cargaHoraria.gqlMetadata })
  cargaHoraria?: number;
  @Field(() => DisciplinaImagemCapaRefInputGraphQlDto, {
    nullable: true,
    ...DisciplinaFindOneQueryResultFields.imagemCapa.gqlMetadata,
  })
  imagemCapa?: DisciplinaImagemCapaRefInputGraphQlDto | null;
}

// ============================================================================
// List Input
// ============================================================================

const DisciplinaGraphqlListInputSchema = createGraphqlListInputSchema({
  filterDiariosId: z.array(z.string()).optional(),
});

@ArgsType()
export class DisciplinaListInputGraphQlDto extends PaginatedFilterByIdGraphQlDto {
  static schema = DisciplinaGraphqlListInputSchema;

  @Field(() => [String], DisciplinaListQueryFields.filterDiariosId.gqlMetadata)
  filterDiariosId?: string[];
}

// ============================================================================
// List Output
// ============================================================================

@ObjectType("DisciplinaListResult")
export class DisciplinaListOutputGraphQlDto {
  @Field(() => PaginationMetaGraphQlDto, DisciplinaListQueryFields.meta.gqlMetadata)
  meta: PaginationMetaGraphQlDto;

  @Field(() => [DisciplinaFindOneOutputGraphQlDto], DisciplinaListQueryFields.data.gqlMetadata)
  data: DisciplinaFindOneOutputGraphQlDto[];
}

import {
  EntityBaseGraphQlDto,
  PaginatedFilterByIdGraphQlDto,
  PaginationMetaGraphQlDto,
} from "@/infrastructure.graphql/dtos";
import { ArgsType, Field, ID, Int, ObjectType } from "@/shared/presentation/graphql";
import { createGraphqlListInputSchema } from "@/shared/validation/schemas";
import { ImagemArquivoFindOneQueryResultFields } from "../domain/queries/imagem-arquivo-find-one.query.result";
import { ImagemArquivoListQueryFields } from "../domain/queries/imagem-arquivo-list.query";

// ============================================================================
// Arquivo nested output for GraphQL
// ============================================================================

@ObjectType("ArquivoFindOneOutputDto")
export class ArquivoFindOneOutputGraphQlDto extends EntityBaseGraphQlDto {
  @Field(() => String, { nullable: true }) name: string | null;
  @Field(() => String, { nullable: true }) mimeType: string | null;
  @Field(() => Int, { nullable: true }) sizeBytes: number | null;
  @Field(() => String) storageType: string;
}

// ============================================================================
// ImagemArquivo from Imagem (for versoes)
// ============================================================================

@ObjectType("ImagemArquivoFindOneFromImagemOutputDto")
export class ImagemArquivoFindOneFromImagemOutputGraphQlDto {
  @Field(() => ID) id: string;
  @Field(() => Int, {
    nullable: true,
    ...ImagemArquivoFindOneQueryResultFields.largura.gqlMetadata,
  })
  largura: number | null;
  @Field(() => Int, { nullable: true, ...ImagemArquivoFindOneQueryResultFields.altura.gqlMetadata })
  altura: number | null;
  @Field(() => String, {
    nullable: true,
    ...ImagemArquivoFindOneQueryResultFields.formato.gqlMetadata,
  })
  formato: string | null;
  @Field(() => String, {
    nullable: true,
    ...ImagemArquivoFindOneQueryResultFields.mimeType.gqlMetadata,
  })
  mimeType: string | null;
  @Field(
    () => ArquivoFindOneOutputGraphQlDto,
    ImagemArquivoFindOneQueryResultFields.arquivo.gqlMetadata,
  )
  arquivo: ArquivoFindOneOutputGraphQlDto;
  @Field(() => Date) dateCreated: Date;
  @Field(() => Date) dateUpdated: Date;
  @Field(() => Date, { nullable: true }) dateDeleted: Date | null;
}

// ============================================================================
// Imagem output for GraphQL (used by bloco, usuario, etc.)
// ============================================================================

@ObjectType("ImagemFindOneOutputDto")
export class ImagemFindOneOutputGraphQlDto extends EntityBaseGraphQlDto {
  @Field(() => String, { nullable: true }) descricao: string | null;
  @Field(() => [ImagemArquivoFindOneFromImagemOutputGraphQlDto])
  versoes: ImagemArquivoFindOneFromImagemOutputGraphQlDto[];
}

// ============================================================================
// Imagem ref (just id) for nested in ImagemArquivo
// ============================================================================

@ObjectType("ImagemFindOneFromImagemArquivoOutputDto")
export class ImagemFindOneFromImagemArquivoOutputGraphQlDto {
  @Field(() => ID) id: string;
}

// ============================================================================
// ImagemArquivo full output
// ============================================================================

@ObjectType("ImagemArquivoFindOneOutputDto")
export class ImagemArquivoFindOneOutputGraphQlDto extends EntityBaseGraphQlDto {
  @Field(() => Int, ImagemArquivoFindOneQueryResultFields.largura.gqlMetadata) largura: number;
  @Field(() => Int, ImagemArquivoFindOneQueryResultFields.altura.gqlMetadata) altura: number;
  @Field(() => String, ImagemArquivoFindOneQueryResultFields.formato.gqlMetadata) formato: string;
  @Field(() => String, ImagemArquivoFindOneQueryResultFields.mimeType.gqlMetadata) mimeType: string;
  @Field(
    () => ImagemFindOneFromImagemArquivoOutputGraphQlDto,
    ImagemArquivoFindOneQueryResultFields.imagem.gqlMetadata,
  )
  imagem: ImagemFindOneFromImagemArquivoOutputGraphQlDto;
  @Field(
    () => ArquivoFindOneOutputGraphQlDto,
    ImagemArquivoFindOneQueryResultFields.arquivo.gqlMetadata,
  )
  arquivo: ArquivoFindOneOutputGraphQlDto;
}

// ============================================================================
// List Input
// ============================================================================

@ArgsType()
export class ImagemArquivoListInputGraphQlDto extends PaginatedFilterByIdGraphQlDto {
  static schema = createGraphqlListInputSchema();
}

// ============================================================================
// List Output
// ============================================================================

@ObjectType("ImagemArquivoListResult")
export class ImagemArquivoListOutputGraphQlDto {
  @Field(() => PaginationMetaGraphQlDto, ImagemArquivoListQueryFields.meta.gqlMetadata)
  meta: PaginationMetaGraphQlDto;

  @Field(
    () => [ImagemArquivoFindOneOutputGraphQlDto],
    ImagemArquivoListQueryFields.data.gqlMetadata,
  )
  data: ImagemArquivoFindOneOutputGraphQlDto[];
}

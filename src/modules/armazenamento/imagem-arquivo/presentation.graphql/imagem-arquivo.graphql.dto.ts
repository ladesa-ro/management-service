import { SharedFields } from "@/domain/abstractions";
import {
  EntityBaseGraphQlDto,
  PaginatedFilterByIdGraphQlDto,
  PaginationMetaGraphQlDto,
} from "@/infrastructure.graphql/dtos";
import { ArquivoFindOneQueryResultFields } from "@/modules/armazenamento/arquivo/domain/queries/arquivo-find-one.query.result";
import { ImagemFields } from "@/modules/armazenamento/imagem/domain/imagem.fields";
import { ImagemArquivoFromImagemFields } from "@/modules/armazenamento/imagem-arquivo/domain/imagem-arquivo-from-imagem.fields";
import { ArgsType, Field, ID, Int, ObjectType } from "@/shared/presentation/graphql";
import { createGraphqlListInputSchema } from "@/shared/validation/schemas";
import { ImagemArquivoFindOneQueryResultFields } from "../domain/queries/imagem-arquivo-find-one.query.result";
import { ImagemArquivoListQueryFields } from "../domain/queries/imagem-arquivo-list.query";

// ============================================================================
// Arquivo nested output for GraphQL
// ============================================================================

@ObjectType("ArquivoFindOneOutputDto")
export class ArquivoFindOneOutputGraphQlDto extends EntityBaseGraphQlDto {
  @Field(() => String, ArquivoFindOneQueryResultFields.name.gqlMetadata) name: string | null;
  @Field(() => String, ArquivoFindOneQueryResultFields.mimeType.gqlMetadata) mimeType:
    | string
    | null;
  @Field(() => Int, ArquivoFindOneQueryResultFields.sizeBytes.gqlMetadata) sizeBytes: number | null;
  @Field(() => String, ArquivoFindOneQueryResultFields.storageType.gqlMetadata) storageType: string;
}

// ============================================================================
// ImagemArquivo from Imagem (for versoes)
// ============================================================================

@ObjectType("ImagemArquivoFindOneFromImagemOutputDto")
export class ImagemArquivoFindOneFromImagemOutputGraphQlDto {
  @Field(() => ID, ImagemArquivoFromImagemFields.id.gqlMetadata) id: string;
  @Field(() => Int, ImagemArquivoFromImagemFields.largura.gqlMetadata) largura: number | null;
  @Field(() => Int, ImagemArquivoFromImagemFields.altura.gqlMetadata) altura: number | null;
  @Field(() => String, ImagemArquivoFromImagemFields.formato.gqlMetadata) formato: string | null;
  @Field(() => String, ImagemArquivoFromImagemFields.mimeType.gqlMetadata) mimeType: string | null;
  @Field(() => ArquivoFindOneOutputGraphQlDto, ImagemArquivoFromImagemFields.arquivo.gqlMetadata)
  arquivo: ArquivoFindOneOutputGraphQlDto;
  @Field(() => Date, SharedFields.dateCreated.gqlMetadata) dateCreated: Date;
  @Field(() => Date, SharedFields.dateUpdated.gqlMetadata) dateUpdated: Date;
  @Field(() => Date, SharedFields.dateDeleted.gqlMetadata) dateDeleted: Date | null;
}

// ============================================================================
// Imagem output for GraphQL (used by bloco, usuario, etc.)
// ============================================================================

@ObjectType("ImagemFindOneOutputDto")
export class ImagemFindOneOutputGraphQlDto extends EntityBaseGraphQlDto {
  @Field(() => String, ImagemFields.descricao.gqlMetadata) descricao: string | null;
  @Field(() => [ImagemArquivoFindOneFromImagemOutputGraphQlDto], ImagemFields.versoes.gqlMetadata)
  versoes: ImagemArquivoFindOneFromImagemOutputGraphQlDto[];
}

// ============================================================================
// Imagem ref (just id) for nested in ImagemArquivo
// ============================================================================

@ObjectType("ImagemFindOneFromImagemArquivoOutputDto")
export class ImagemFindOneFromImagemArquivoOutputGraphQlDto {
  @Field(() => ID, SharedFields.idUuid.gqlMetadata) id: string;
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

import { ArgsType, Field, ID, Int, ObjectType } from "@nestjs/graphql";
import { decorate } from "ts-mixer";
import {
  EntityBaseGraphQlDto,
  PaginatedFilterByIdGraphQlDto,
  PaginationMetaGraphQlDto,
} from "@/modules/@shared/infrastructure/graphql/dtos";

// ============================================================================
// Arquivo nested output for GraphQL
// ============================================================================

@decorate(ObjectType("ArquivoFindOneOutputDto"))
export class ArquivoFindOneOutputGraphQlDto extends EntityBaseGraphQlDto {
  @decorate(Field(() => String, { nullable: true })) name: string | null;
  @decorate(Field(() => String, { nullable: true })) mimeType: string | null;
  @decorate(Field(() => Int, { nullable: true })) sizeBytes: number | null;
  @decorate(Field(() => String)) storageType: string;
}

// ============================================================================
// ImagemArquivo from Imagem (for versoes)
// ============================================================================

@decorate(ObjectType("ImagemArquivoFindOneFromImagemOutputDto"))
export class ImagemArquivoFindOneFromImagemOutputGraphQlDto {
  @decorate(Field(() => ID)) id: string;
  @decorate(Field(() => Int, { nullable: true })) largura: number | null;
  @decorate(Field(() => Int, { nullable: true })) altura: number | null;
  @decorate(Field(() => String, { nullable: true })) formato: string | null;
  @decorate(Field(() => String, { nullable: true })) mimeType: string | null;
  @decorate(Field(() => ArquivoFindOneOutputGraphQlDto)) arquivo: ArquivoFindOneOutputGraphQlDto;
  @decorate(Field(() => Date)) dateCreated: Date;
  @decorate(Field(() => Date)) dateUpdated: Date;
  @decorate(Field(() => Date, { nullable: true })) dateDeleted: Date | null;
}

// ============================================================================
// Imagem output for GraphQL (used by bloco, usuario, etc.)
// ============================================================================

@decorate(ObjectType("ImagemFindOneOutputDto"))
export class ImagemFindOneOutputGraphQlDto extends EntityBaseGraphQlDto {
  @decorate(Field(() => String, { nullable: true })) descricao: string | null;
  @decorate(Field(() => [ImagemArquivoFindOneFromImagemOutputGraphQlDto]))
  versoes: ImagemArquivoFindOneFromImagemOutputGraphQlDto[];
}

// ============================================================================
// Imagem ref (just id) for nested in ImagemArquivo
// ============================================================================

@decorate(ObjectType("ImagemFindOneFromImagemArquivoOutputDto"))
export class ImagemFindOneFromImagemArquivoOutputGraphQlDto {
  @decorate(Field(() => ID)) id: string;
}

// ============================================================================
// ImagemArquivo full output
// ============================================================================

@decorate(ObjectType("ImagemArquivoFindOneOutputDto"))
export class ImagemArquivoFindOneOutputGraphQlDto extends EntityBaseGraphQlDto {
  @decorate(Field(() => Int)) largura: number;
  @decorate(Field(() => Int)) altura: number;
  @decorate(Field(() => String)) formato: string;
  @decorate(Field(() => String)) mimeType: string;
  @decorate(Field(() => ImagemFindOneFromImagemArquivoOutputGraphQlDto))
  imagem: ImagemFindOneFromImagemArquivoOutputGraphQlDto;
  @decorate(Field(() => ArquivoFindOneOutputGraphQlDto)) arquivo: ArquivoFindOneOutputGraphQlDto;
}

// ============================================================================
// List Input
// ============================================================================

@decorate(ArgsType())
export class ImagemArquivoListInputGraphQlDto extends PaginatedFilterByIdGraphQlDto {}

// ============================================================================
// List Output
// ============================================================================

@decorate(ObjectType("ImagemArquivoListResult"))
export class ImagemArquivoListOutputGraphQlDto {
  @decorate(Field(() => PaginationMetaGraphQlDto))
  meta: PaginationMetaGraphQlDto;

  @decorate(Field(() => [ImagemArquivoFindOneOutputGraphQlDto]))
  data: ImagemArquivoFindOneOutputGraphQlDto[];
}

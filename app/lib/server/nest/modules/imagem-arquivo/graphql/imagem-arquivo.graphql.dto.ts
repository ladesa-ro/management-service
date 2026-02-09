import { ArgsType, Field, ID, Int, ObjectType } from "@nestjs/graphql";
import { IsArray, IsOptional, IsUUID } from "class-validator";
import {
  EntityBaseGraphQlDto,
  PaginationMetaGraphQlDto,
} from "@/modules/@shared/infrastructure/graphql/dtos";
import { PaginationArgsGraphQlDto } from "@/modules/@shared/infrastructure/graphql/dtos/pagination-graphql.dto";

// ============================================================================
// Arquivo nested output for GraphQL
// ============================================================================

@ObjectType("ArquivoFindOneOutputDto")
export class ArquivoFindOneOutputGraphQlDto extends EntityBaseGraphQlDto {
  @Field(() => String, { nullable: true }) name: string | null;
  @Field(() => String, { nullable: true }) mimeType: string | null;
  @Field(() => Int, { nullable: true }) sizeBytes: number | null;
  @Field() storageType: string;
}

// ============================================================================
// ImagemArquivo from Imagem (for versoes)
// ============================================================================

@ObjectType("ImagemArquivoFindOneFromImagemOutputDto")
export class ImagemArquivoFindOneFromImagemOutputGraphQlDto {
  @Field(() => ID) id: string;
  @Field(() => Int, { nullable: true }) largura: number | null;
  @Field(() => Int, { nullable: true }) altura: number | null;
  @Field(() => String, { nullable: true }) formato: string | null;
  @Field(() => String, { nullable: true }) mimeType: string | null;
  @Field(() => ArquivoFindOneOutputGraphQlDto) arquivo: ArquivoFindOneOutputGraphQlDto;
  @Field() dateCreated: Date;
  @Field() dateUpdated: Date;
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
  @Field(() => Int) largura: number;
  @Field(() => Int) altura: number;
  @Field() formato: string;
  @Field() mimeType: string;
  @Field(() => ImagemFindOneFromImagemArquivoOutputGraphQlDto)
  imagem: ImagemFindOneFromImagemArquivoOutputGraphQlDto;
  @Field(() => ArquivoFindOneOutputGraphQlDto) arquivo: ArquivoFindOneOutputGraphQlDto;
}

// ============================================================================
// List Input
// ============================================================================

@ArgsType()
export class ImagemArquivoListInputGraphQlDto extends PaginationArgsGraphQlDto {
  @Field(() => [String], { nullable: true, description: "Filtro por ID" })
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  filterId?: string[];
}

// ============================================================================
// List Output
// ============================================================================

@ObjectType("ImagemArquivoListResult")
export class ImagemArquivoListOutputGraphQlDto {
  @Field(() => PaginationMetaGraphQlDto)
  meta: PaginationMetaGraphQlDto;

  @Field(() => [ImagemArquivoFindOneOutputGraphQlDto])
  data: ImagemArquivoFindOneOutputGraphQlDto[];
}

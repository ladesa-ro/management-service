import { ApiProperty, ApiSchema, PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsString, IsUUID, Min, MinLength, ValidateNested } from "class-validator";
import { decorate } from "ts-mixer";
import { ArquivoFindOneOutputRestDto } from "@/modules/@base/armazenamento/arquivo/presentation/rest/arquivo.rest.dto";
import {
  commonProperties,
  RegisterModel,
  simpleProperty,
} from "@/modules/@shared/infrastructure/persistence/typeorm/metadata";
import {
  EntityBaseRestDto,
  PaginatedFilterByIdRestDto,
  PaginationMetaRestDto,
} from "@/modules/@shared/infrastructure/presentation/rest/dtos";

// ============================================================================
// Nested DTOs
// ============================================================================

@decorate(ApiSchema({ name: "ImagemFindOneFromImagemArquivoOutputDto" }))
export class ImagemFindOneFromImagemArquivoOutputRestDto {
  @decorate(
    ApiProperty({
      type: "string",
      description: "Identificador do registro (uuid)",
      format: "uuid",
    }),
  )
  @decorate(IsUUID())
  id: string;
}

// ============================================================================
// FindOne Output
// ============================================================================

@decorate(ApiSchema({ name: "ImagemArquivoFindOneOutputDto" }))
@decorate(
  RegisterModel({
    name: "ImagemArquivoFindOneOutputDto",
    properties: [
      simpleProperty("id"),
      simpleProperty("largura"),
      simpleProperty("altura"),
      simpleProperty("formato"),
      simpleProperty("mimeType"),
      simpleProperty("imagem"),
      simpleProperty("arquivo"),
      ...commonProperties.dated,
    ],
  }),
)
export class ImagemArquivoFindOneOutputRestDto extends EntityBaseRestDto {
  @decorate(ApiProperty({ type: "integer", description: "Largura da imagem" }))
  @decorate(IsInt())
  @decorate(Min(0))
  largura: number;

  @decorate(ApiProperty({ type: "integer", description: "Altura da imagem" }))
  @decorate(IsInt())
  @decorate(Min(0))
  altura: number;

  @decorate(ApiProperty({ type: "string", description: "Formato da imagem", minLength: 1 }))
  @decorate(IsString())
  @decorate(MinLength(1))
  formato: string;

  @decorate(ApiProperty({ type: "string", description: "Mime-type da imagem", minLength: 1 }))
  @decorate(IsString())
  @decorate(MinLength(1))
  mimeType: string;

  @decorate(
    ApiProperty({ description: "Imagem", type: () => ImagemFindOneFromImagemArquivoOutputRestDto }),
  )
  @decorate(ValidateNested())
  @decorate(Type(() => ImagemFindOneFromImagemArquivoOutputRestDto))
  imagem: ImagemFindOneFromImagemArquivoOutputRestDto;

  @decorate(ApiProperty({ description: "Arquivo", type: () => ArquivoFindOneOutputRestDto }))
  @decorate(ValidateNested())
  @decorate(Type(() => ArquivoFindOneOutputRestDto))
  arquivo: ArquivoFindOneOutputRestDto;
}

// ============================================================================
// FindOneFromImagem Output (for nested use in Imagem)
// ============================================================================

@decorate(ApiSchema({ name: "ImagemArquivoFindOneFromImagemOutputDto" }))
export class ImagemArquivoFindOneFromImagemOutputRestDto extends EntityBaseRestDto {
  @decorate(ApiProperty({ type: "integer", description: "Largura da imagem" }))
  @decorate(IsInt())
  @decorate(Min(0))
  largura: number;

  @decorate(ApiProperty({ type: "integer", description: "Altura da imagem" }))
  @decorate(IsInt())
  @decorate(Min(0))
  altura: number;

  @decorate(ApiProperty({ type: "string", description: "Formato da imagem", minLength: 1 }))
  @decorate(IsString())
  @decorate(MinLength(1))
  formato: string;

  @decorate(ApiProperty({ type: "string", description: "Mime-type da imagem", minLength: 1 }))
  @decorate(IsString())
  @decorate(MinLength(1))
  mimeType: string;

  @decorate(ApiProperty({ description: "Arquivo", type: () => ArquivoFindOneOutputRestDto }))
  @decorate(ValidateNested())
  @decorate(Type(() => ArquivoFindOneOutputRestDto))
  arquivo: ArquivoFindOneOutputRestDto;
}

// ============================================================================
// List Input/Output
// ============================================================================

@decorate(ApiSchema({ name: "ImagemArquivoListInputDto" }))
export class ImagemArquivoListInputRestDto extends PaginatedFilterByIdRestDto {}

@decorate(ApiSchema({ name: "ImagemArquivoListOutputDto" }))
export class ImagemArquivoListOutputRestDto {
  @decorate(ApiProperty({ type: () => PaginationMetaRestDto, description: "Metadados da busca" }))
  meta: PaginationMetaRestDto;

  @decorate(
    ApiProperty({
      type: () => [ImagemArquivoFindOneOutputRestDto],
      description: "Resultados da busca",
    }),
  )
  data: ImagemArquivoFindOneOutputRestDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@decorate(ApiSchema({ name: "ImagemArquivoCreateInputDto" }))
export class ImagemArquivoCreateInputRestDto {
  @decorate(ApiProperty({ type: "integer", description: "Largura da imagem" }))
  @decorate(IsInt())
  @decorate(Min(0))
  largura: number;

  @decorate(ApiProperty({ type: "integer", description: "Altura da imagem" }))
  @decorate(IsInt())
  @decorate(Min(0))
  altura: number;

  @decorate(ApiProperty({ type: "string", description: "Formato da imagem", minLength: 1 }))
  @decorate(IsString())
  @decorate(MinLength(1))
  formato: string;

  @decorate(ApiProperty({ type: "string", description: "Mime-type da imagem", minLength: 1 }))
  @decorate(IsString())
  @decorate(MinLength(1))
  mimeType: string;

  @decorate(ApiProperty({ type: "string", description: "ID da imagem", format: "uuid" }))
  @decorate(IsUUID())
  imagemId: string;

  @decorate(ApiProperty({ type: "string", description: "ID do arquivo", format: "uuid" }))
  @decorate(IsUUID())
  arquivoId: string;
}

@decorate(ApiSchema({ name: "ImagemArquivoUpdateInputDto" }))
export class ImagemArquivoUpdateInputRestDto extends PartialType(ImagemArquivoCreateInputRestDto) {}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@decorate(ApiSchema({ name: "ImagemArquivoFindOneInputDto" }))
export class ImagemArquivoFindOneInputRestDto {
  @decorate(
    ApiProperty({
      type: "string",
      description: "Identificador do registro (uuid)",
      format: "uuid",
    }),
  )
  @decorate(IsUUID())
  id: string;
}

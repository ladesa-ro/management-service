import { ApiProperty, ApiPropertyOptional, ApiSchema, PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsOptional, IsString, IsUUID, ValidateNested } from "class-validator";
import { decorate, Mixin } from "ts-mixer";
import {
  commonProperties,
  RegisterModel,
  referenceProperty,
  simpleProperty,
} from "@/modules/@shared/infrastructure/persistence/typeorm/metadata";
import {
  EntityBaseRestDto,
  PaginatedFilterByIdRestDto,
  PaginationMetaRestDto,
  TransformToArray,
} from "@/modules/@shared/infrastructure/presentation/rest/dtos";
import {
  CampusFindOneInputRestDto,
  CampusFindOneOutputRestDto,
} from "@/server/nest/modules/campus/rest";
import { BlocoFieldsMixin } from "../bloco.validation-mixin";

// ============================================================================
// Imagem Stub DTOs (forward reference until imagem module has DTOs)
// ============================================================================

@decorate(ApiSchema({ name: "ArquivoFindOneOutputFromBlocoDto" }))
export class ArquivoFindOneOutputFromBlocoRestDto {
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

@decorate(ApiSchema({ name: "ImagemArquivoFindOneFromImagemOutputFromBlocoDto" }))
export class ImagemArquivoFindOneFromImagemOutputRestDto {
  @decorate(
    ApiProperty({
      type: "string",
      description: "Identificador do registro (uuid)",
      format: "uuid",
    }),
  )
  @decorate(IsUUID())
  id: string;

  @decorate(ApiProperty({ type: "integer", description: "Largura da imagem" }))
  largura: number | null;

  @decorate(ApiProperty({ type: "integer", description: "Altura da imagem" }))
  altura: number | null;

  @decorate(ApiProperty({ type: "string", description: "Formato da imagem" }))
  @decorate(IsString())
  formato: string | null;

  @decorate(ApiProperty({ type: "string", description: "Mime-type da imagem" }))
  @decorate(IsString())
  mimeType: string | null;

  @decorate(
    ApiProperty({ description: "Arquivo", type: () => ArquivoFindOneOutputFromBlocoRestDto }),
  )
  @decorate(ValidateNested())
  @decorate(Type(() => ArquivoFindOneOutputFromBlocoRestDto))
  arquivo: ArquivoFindOneOutputFromBlocoRestDto;
}

@decorate(ApiSchema({ name: "ImagemFindOneOutputFromBlocoDto" }))
export class ImagemFindOneOutputRestDto extends EntityBaseRestDto {
  @decorate(
    ApiPropertyOptional({ type: "string", description: "Descricao da imagem", nullable: true }),
  )
  @decorate(IsOptional())
  @decorate(IsString())
  descricao: string | null;

  @decorate(
    ApiProperty({
      description: "Versoes da imagem",
      type: () => [ImagemArquivoFindOneFromImagemOutputRestDto],
    }),
  )
  @decorate(IsArray())
  @decorate(ValidateNested({ each: true }))
  @decorate(Type(() => ImagemArquivoFindOneFromImagemOutputRestDto))
  versoes: ImagemArquivoFindOneFromImagemOutputRestDto[];
}

// ============================================================================
// FindOne Output
// ============================================================================

@decorate(ApiSchema({ name: "BlocoFindOneOutputDto" }))
@decorate(
  RegisterModel({
    name: "BlocoFindOneOutputDto",
    properties: [
      simpleProperty("id"),
      simpleProperty("nome"),
      simpleProperty("codigo"),
      referenceProperty("campus", "CampusFindOneOutputDto"),
      referenceProperty("imagemCapa", "ImagemFindOneOutputDto", { nullable: true }),
      ...commonProperties.dated,
    ],
  }),
)
export class BlocoFindOneOutputRestDto extends Mixin(EntityBaseRestDto, BlocoFieldsMixin) {
  @decorate(ApiProperty({ type: "string", description: "Nome do bloco", minLength: 1 }))
  declare nome: string;

  @decorate(ApiProperty({ type: "string", description: "Codigo do bloco", minLength: 1 }))
  declare codigo: string;

  @decorate(ApiProperty({ type: () => CampusFindOneOutputRestDto, description: "Campus do bloco" }))
  @decorate(ValidateNested())
  @decorate(Type(() => CampusFindOneOutputRestDto))
  campus: CampusFindOneOutputRestDto;

  @decorate(
    ApiPropertyOptional({
      type: () => ImagemFindOneOutputRestDto,
      description: "Imagem de capa do bloco",
      nullable: true,
    }),
  )
  @decorate(IsOptional())
  @decorate(ValidateNested())
  @decorate(Type(() => ImagemFindOneOutputRestDto))
  imagemCapa: ImagemFindOneOutputRestDto | null;
}

// ============================================================================
// List Input/Output
// ============================================================================

@decorate(ApiSchema({ name: "BlocoListInputDto" }))
export class BlocoListInputRestDto extends PaginatedFilterByIdRestDto {
  @decorate(
    ApiPropertyOptional({
      description: "Filtro por ID de Campus",
      type: "string",
      isArray: true,
    }),
  )
  @decorate(TransformToArray())
  @decorate(IsOptional())
  @decorate(IsArray())
  @decorate(IsUUID(undefined, { each: true }))
  "filter.campus.id"?: string[];
}

@decorate(ApiSchema({ name: "BlocoListOutputDto" }))
export class BlocoListOutputRestDto {
  @decorate(ApiProperty({ type: () => PaginationMetaRestDto, description: "Metadados da busca" }))
  meta: PaginationMetaRestDto;

  @decorate(
    ApiProperty({ type: () => [BlocoFindOneOutputRestDto], description: "Resultados da busca" }),
  )
  data: BlocoFindOneOutputRestDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@decorate(ApiSchema({ name: "BlocoCreateInputDto" }))
export class BlocoCreateInputRestDto extends BlocoFieldsMixin {
  @decorate(ApiProperty({ type: "string", description: "Nome do bloco", minLength: 1 }))
  declare nome: string;

  @decorate(ApiProperty({ type: "string", description: "Codigo do bloco", minLength: 1 }))
  declare codigo: string;

  @decorate(ApiProperty({ type: () => CampusFindOneInputRestDto, description: "Campus do bloco" }))
  @decorate(ValidateNested())
  @decorate(Type(() => CampusFindOneInputRestDto))
  campus: CampusFindOneInputRestDto;
}

@decorate(ApiSchema({ name: "BlocoUpdateInputDto" }))
export class BlocoUpdateInputRestDto extends PartialType(BlocoCreateInputRestDto) {}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@decorate(ApiSchema({ name: "BlocoFindOneInputDto" }))
export class BlocoFindOneInputRestDto {
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

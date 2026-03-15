import { Mixin } from "ts-mixer";
import {
  EntityBaseRestDto,
  PaginatedFilterByIdRestDto,
  PaginationMetaRestDto,
} from "@/modules/@shared/infrastructure/presentation/rest/dtos";
import {
  ApiProperty,
  ApiPropertyOptional,
  ApiSchema,
  commonProperties,
  PartialType,
  RegisterModel,
  referenceProperty,
  simpleProperty,
  TransformToArray,
} from "@/modules/@shared/presentation/rest";
import {
  IsArray,
  IsOptional,
  IsString,
  IsUUID,
  Type,
  ValidateNested,
} from "@/modules/@shared/presentation/shared";
import {
  CampusFindOneInputRestDto,
  CampusFindOneOutputRestDto,
} from "@/modules/ambientes/campus/presentation.rest";
import { BlocoFieldsMixin } from "../presentation.validations/bloco.validation-mixin";

// ============================================================================
// Imagem Stub DTOs (forward reference until imagem module has DTOs)
// ============================================================================

@ApiSchema({ name: "ArquivoFindOneOutputFromBlocoDto" })
export class ArquivoFindOneOutputFromBlocoRestDto {
  @ApiProperty({
    type: "string",
    description: "Identificador do registro (uuid)",
    format: "uuid",
  })
  @IsUUID()
  id: string;
}

@ApiSchema({ name: "ImagemArquivoFindOneFromImagemOutputFromBlocoDto" })
export class ImagemArquivoFindOneFromImagemOutputRestDto {
  @ApiProperty({
    type: "string",
    description: "Identificador do registro (uuid)",
    format: "uuid",
  })
  @IsUUID()
  id: string;

  @ApiProperty({ type: "integer", description: "Largura da imagem" })
  largura: number | null;

  @ApiProperty({ type: "integer", description: "Altura da imagem" })
  altura: number | null;

  @ApiProperty({ type: "string", description: "Formato da imagem" })
  @IsString()
  formato: string | null;

  @ApiProperty({ type: "string", description: "Mime-type da imagem" })
  @IsString()
  mimeType: string | null;

  @ApiProperty({ description: "Arquivo", type: () => ArquivoFindOneOutputFromBlocoRestDto })
  @ValidateNested()
  @Type(() => ArquivoFindOneOutputFromBlocoRestDto)
  arquivo: ArquivoFindOneOutputFromBlocoRestDto;
}

@ApiSchema({ name: "ImagemFindOneOutputFromBlocoDto" })
export class ImagemFindOneOutputRestDto extends EntityBaseRestDto {
  @ApiPropertyOptional({ type: "string", description: "Descricao da imagem", nullable: true })
  @IsOptional()
  @IsString()
  descricao: string | null;

  @ApiProperty({
    description: "Versoes da imagem",
    type: () => [ImagemArquivoFindOneFromImagemOutputRestDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ImagemArquivoFindOneFromImagemOutputRestDto)
  versoes: ImagemArquivoFindOneFromImagemOutputRestDto[];
}

// ============================================================================
// FindOne Output
// ============================================================================

@ApiSchema({ name: "BlocoFindOneOutputDto" })
@RegisterModel({
  name: "BlocoFindOneOutputDto",
  properties: [
    simpleProperty("id"),
    simpleProperty("nome"),
    simpleProperty("codigo"),
    referenceProperty("campus", "CampusFindOneOutputDto"),
    referenceProperty("imagemCapa", "ImagemFindOneOutputDto", { nullable: true }),
    ...commonProperties.dated,
  ],
})
export class BlocoFindOneOutputRestDto extends Mixin(EntityBaseRestDto, BlocoFieldsMixin) {
  @ApiProperty({ type: "string", description: "Nome do bloco", minLength: 1 })
  declare nome: string;

  @ApiProperty({ type: "string", description: "Codigo do bloco", minLength: 1 })
  declare codigo: string;

  @ApiProperty({ type: () => CampusFindOneOutputRestDto, description: "Campus do bloco" })
  @ValidateNested()
  @Type(() => CampusFindOneOutputRestDto)
  campus: CampusFindOneOutputRestDto;

  @ApiPropertyOptional({
    type: () => ImagemFindOneOutputRestDto,
    description: "Imagem de capa do bloco",
    nullable: true,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => ImagemFindOneOutputRestDto)
  imagemCapa: ImagemFindOneOutputRestDto | null;
}

// ============================================================================
// List Input/Output
// ============================================================================

@ApiSchema({ name: "BlocoListInputDto" })
export class BlocoListInputRestDto extends PaginatedFilterByIdRestDto {
  @ApiPropertyOptional({
    description: "Filtro por ID de Campus",
    type: "string",
    isArray: true,
  })
  @TransformToArray()
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  "filter.campus.id"?: string[];
}

@ApiSchema({ name: "BlocoListOutputDto" })
export class BlocoListOutputRestDto {
  @ApiProperty({ type: () => PaginationMetaRestDto, description: "Metadados da busca" })
  meta: PaginationMetaRestDto;

  @ApiProperty({ type: () => [BlocoFindOneOutputRestDto], description: "Resultados da busca" })
  data: BlocoFindOneOutputRestDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@ApiSchema({ name: "BlocoCreateInputDto" })
export class BlocoCreateInputRestDto extends BlocoFieldsMixin {
  @ApiProperty({ type: "string", description: "Nome do bloco", minLength: 1 })
  declare nome: string;

  @ApiProperty({ type: "string", description: "Codigo do bloco", minLength: 1 })
  declare codigo: string;

  @ApiProperty({ type: () => CampusFindOneInputRestDto, description: "Campus do bloco" })
  @ValidateNested()
  @Type(() => CampusFindOneInputRestDto)
  campus: CampusFindOneInputRestDto;
}

@ApiSchema({ name: "BlocoUpdateInputDto" })
export class BlocoUpdateInputRestDto extends PartialType(BlocoCreateInputRestDto) {}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@ApiSchema({ name: "BlocoFindOneInputDto" })
export class BlocoFindOneInputRestDto {
  @ApiProperty({
    type: "string",
    description: "Identificador do registro (uuid)",
    format: "uuid",
  })
  @IsUUID()
  id: string;
}

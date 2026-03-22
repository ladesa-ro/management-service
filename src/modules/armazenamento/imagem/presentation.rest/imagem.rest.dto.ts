import {
  ImagemCreateSchema,
  ImagemUpdateSchema,
} from "@/modules/armazenamento/imagem/domain/imagem.schemas";
import { ImagemFindOneInputSchema } from "@/modules/armazenamento/imagem/domain/queries/imagem-find-one.query.schemas";
import { ImagemPaginationInputSchema } from "@/modules/armazenamento/imagem/domain/queries/imagem-list.query.schemas";
import { ImagemArquivoFindOneFromImagemOutputRestDto } from "@/modules/armazenamento/imagem-arquivo/presentation.rest";
import {
  ApiProperty,
  ApiPropertyOptional,
  ApiSchema,
  PartialType,
} from "@/shared/presentation/rest";
import {
  EntityBaseRestDto,
  PaginatedFilterByIdRestDto,
  PaginationMetaRestDto,
} from "@/shared/presentation/rest/dtos";

// ============================================================================
// FindOne Output
// ============================================================================

@ApiSchema({ name: "ImagemFindOneOutputDto" })
export class ImagemFindOneOutputRestDto extends EntityBaseRestDto {
  @ApiPropertyOptional({
    type: "string",
    description: "Descrição da imagem",
    nullable: true,
    minLength: 1,
  })
  descricao: string | null;

  @ApiProperty({
    description: "Versões da imagem",
    type: () => [ImagemArquivoFindOneFromImagemOutputRestDto],
  })
  versoes: ImagemArquivoFindOneFromImagemOutputRestDto[];
}

// ============================================================================
// List Input/Output
// ============================================================================

@ApiSchema({ name: "ImagemListInputDto" })
export class ImagemListInputRestDto extends PaginatedFilterByIdRestDto {
  static schema = ImagemPaginationInputSchema;
}

@ApiSchema({ name: "ImagemListOutputDto" })
export class ImagemListOutputRestDto {
  @ApiProperty({ type: () => PaginationMetaRestDto, description: "Metadados da busca" })
  meta: PaginationMetaRestDto;

  @ApiProperty({ type: () => [ImagemFindOneOutputRestDto], description: "Resultados da busca" })
  data: ImagemFindOneOutputRestDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@ApiSchema({ name: "ImagemCreateInputDto" })
export class ImagemCreateInputRestDto {
  static schema = ImagemCreateSchema;

  @ApiPropertyOptional({
    type: "string",
    description: "Descrição da imagem",
    nullable: true,
    minLength: 1,
  })
  descricao?: string | null;
}

@ApiSchema({ name: "ImagemUpdateInputDto" })
export class ImagemUpdateInputRestDto extends PartialType(ImagemCreateInputRestDto) {
  static schema = ImagemUpdateSchema;
}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@ApiSchema({ name: "ImagemFindOneInputDto" })
export class ImagemFindOneInputRestDto {
  static schema = ImagemFindOneInputSchema;

  @ApiProperty({
    type: "string",
    description: "Identificador do registro (uuid)",
    format: "uuid",
  })
  id: string;
}

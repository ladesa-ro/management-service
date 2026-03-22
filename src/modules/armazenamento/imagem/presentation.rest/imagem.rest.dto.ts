import {
  imagemCreateSchema,
  imagemFindOneInputSchema,
  imagemPaginationInputSchema,
  imagemUpdateSchema,
} from "@/modules/armazenamento/imagem/domain/imagem.schemas";
import { ImagemArquivoFindOneFromImagemOutputRestDto } from "@/modules/armazenamento/imagem-arquivo/presentation.rest";
import {
  ApiProperty,
  ApiPropertyOptional,
  ApiSchema,
  commonProperties,
  PartialType,
  RegisterModel,
  simpleProperty,
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
@RegisterModel({
  name: "ImagemFindOneQueryResult",
  properties: [
    simpleProperty("id"),
    simpleProperty("descricao"),
    // Note: 'versoes' is a OneToMany relation - not loaded via QbEfficientLoad
    ...commonProperties.dated,
  ],
})
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
  static schema = imagemPaginationInputSchema;
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
  static schema = imagemCreateSchema;

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
  static schema = imagemUpdateSchema;
}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@ApiSchema({ name: "ImagemFindOneInputDto" })
export class ImagemFindOneInputRestDto {
  static schema = imagemFindOneInputSchema;

  @ApiProperty({
    type: "string",
    description: "Identificador do registro (uuid)",
    format: "uuid",
  })
  id: string;
}

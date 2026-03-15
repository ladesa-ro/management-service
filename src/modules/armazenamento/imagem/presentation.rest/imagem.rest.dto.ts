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
  simpleProperty,
} from "@/modules/@shared/presentation/rest";
import {
  IsArray,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
  Type,
  ValidateNested,
} from "@/modules/@shared/presentation/shared";
import { ImagemArquivoFindOneFromImagemOutputRestDto } from "@/modules/armazenamento/imagem-arquivo/presentation.rest";

// ============================================================================
// FindOne Output
// ============================================================================

@ApiSchema({ name: "ImagemFindOneOutputDto" })
@RegisterModel({
  name: "ImagemFindOneOutputDto",
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
  @IsOptional()
  @IsString()
  @MinLength(1)
  descricao: string | null;

  @ApiProperty({
    description: "Versões da imagem",
    type: () => [ImagemArquivoFindOneFromImagemOutputRestDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ImagemArquivoFindOneFromImagemOutputRestDto)
  versoes: ImagemArquivoFindOneFromImagemOutputRestDto[];
}

// ============================================================================
// List Input/Output
// ============================================================================

@ApiSchema({ name: "ImagemListInputDto" })
export class ImagemListInputRestDto extends PaginatedFilterByIdRestDto {}

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
  @ApiPropertyOptional({
    type: "string",
    description: "Descrição da imagem",
    nullable: true,
    minLength: 1,
  })
  @IsOptional()
  @IsString()
  @MinLength(1)
  descricao?: string | null;
}

@ApiSchema({ name: "ImagemUpdateInputDto" })
export class ImagemUpdateInputRestDto extends PartialType(ImagemCreateInputRestDto) {}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@ApiSchema({ name: "ImagemFindOneInputDto" })
export class ImagemFindOneInputRestDto {
  @ApiProperty({
    type: "string",
    description: "Identificador do registro (uuid)",
    format: "uuid",
  })
  @IsUUID()
  id: string;
}

import { ApiProperty, ApiPropertyOptional, ApiSchema, PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsArray,
  IsDateString,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
  ValidateNested,
} from "class-validator";
import {
  commonProperties,
  RegisterModel,
  simpleProperty,
} from "@/modules/@shared/infrastructure/persistence/typeorm/metadata";
import {
  PaginationInputRestDto,
  PaginationMetaRestDto,
  TransformToArray,
} from "@/modules/@shared/infrastructure/presentation/rest/dtos";
import { ImagemArquivoFindOneFromImagemOutputRestDto } from "@/server/nest/modules/imagem-arquivo/rest";

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
export class ImagemFindOneOutputRestDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @IsUUID()
  id: string;

  @ApiPropertyOptional({ description: "Descrição da imagem", nullable: true, minLength: 1 })
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

  @ApiProperty({ description: "Data e hora da criacao do registro" })
  @IsDateString()
  dateCreated: Date;

  @ApiProperty({ description: "Data e hora da alteracao do registro" })
  @IsDateString()
  dateUpdated: Date;

  @ApiPropertyOptional({ description: "Data e hora da exclusao do registro", nullable: true })
  @IsOptional()
  @IsDateString()
  dateDeleted: Date | null;
}

// ============================================================================
// List Input/Output
// ============================================================================

@ApiSchema({ name: "ImagemListInputDto" })
export class ImagemListInputRestDto extends PaginationInputRestDto {
  @ApiPropertyOptional({
    description: "Filtro por ID",
    type: [String],
  })
  @TransformToArray()
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  "filter.id"?: string[];
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
  @ApiPropertyOptional({ description: "Descrição da imagem", nullable: true, minLength: 1 })
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
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @IsUUID()
  id: string;
}

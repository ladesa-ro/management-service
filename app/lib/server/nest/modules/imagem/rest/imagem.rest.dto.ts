import { ApiProperty, ApiPropertyOptional, ApiSchema, PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsOptional, IsString, IsUUID, MinLength, ValidateNested } from "class-validator";
import { decorate } from "ts-mixer";
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
import { ImagemArquivoFindOneFromImagemOutputRestDto } from "@/server/nest/modules/imagem-arquivo/rest";

// ============================================================================
// FindOne Output
// ============================================================================

@decorate(ApiSchema({ name: "ImagemFindOneOutputDto" }))
@decorate(
  RegisterModel({
    name: "ImagemFindOneOutputDto",
    properties: [
      simpleProperty("id"),
      simpleProperty("descricao"),
      // Note: 'versoes' is a OneToMany relation - not loaded via QbEfficientLoad
      ...commonProperties.dated,
    ],
  }),
)
export class ImagemFindOneOutputRestDto extends EntityBaseRestDto {
  @decorate(
    ApiPropertyOptional({
      type: "string",
      description: "Descrição da imagem",
      nullable: true,
      minLength: 1,
    }),
  )
  @decorate(IsOptional())
  @decorate(IsString())
  @decorate(MinLength(1))
  descricao: string | null;

  @decorate(
    ApiProperty({
      description: "Versões da imagem",
      type: () => [ImagemArquivoFindOneFromImagemOutputRestDto],
    }),
  )
  @decorate(IsArray())
  @decorate(ValidateNested({ each: true }))
  @decorate(Type(() => ImagemArquivoFindOneFromImagemOutputRestDto))
  versoes: ImagemArquivoFindOneFromImagemOutputRestDto[];
}

// ============================================================================
// List Input/Output
// ============================================================================

@decorate(ApiSchema({ name: "ImagemListInputDto" }))
export class ImagemListInputRestDto extends PaginatedFilterByIdRestDto {}

@decorate(ApiSchema({ name: "ImagemListOutputDto" }))
export class ImagemListOutputRestDto {
  @decorate(ApiProperty({ type: () => PaginationMetaRestDto, description: "Metadados da busca" }))
  meta: PaginationMetaRestDto;

  @decorate(
    ApiProperty({ type: () => [ImagemFindOneOutputRestDto], description: "Resultados da busca" }),
  )
  data: ImagemFindOneOutputRestDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@decorate(ApiSchema({ name: "ImagemCreateInputDto" }))
export class ImagemCreateInputRestDto {
  @decorate(
    ApiPropertyOptional({
      type: "string",
      description: "Descrição da imagem",
      nullable: true,
      minLength: 1,
    }),
  )
  @decorate(IsOptional())
  @decorate(IsString())
  @decorate(MinLength(1))
  descricao?: string | null;
}

@decorate(ApiSchema({ name: "ImagemUpdateInputDto" }))
export class ImagemUpdateInputRestDto extends PartialType(ImagemCreateInputRestDto) {}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@decorate(ApiSchema({ name: "ImagemFindOneInputDto" }))
export class ImagemFindOneInputRestDto {
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

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
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Min,
  MinLength,
} from "@/modules/@shared/presentation/shared";

// ============================================================================
// FindOne Output
// ============================================================================

@ApiSchema({ name: "ArquivoFindOneOutputDto" })
@RegisterModel({
  name: "ArquivoFindOneOutputDto",
  properties: [
    simpleProperty("id"),
    simpleProperty("name"),
    simpleProperty("mimeType"),
    simpleProperty("sizeBytes"),
    simpleProperty("storageType"),
    ...commonProperties.dated,
  ],
})
export class ArquivoFindOneOutputRestDto extends EntityBaseRestDto {
  @ApiPropertyOptional({
    type: "string",
    description: "Nome do arquivo",
    nullable: true,
    minLength: 1,
  })
  @IsOptional()
  @IsString()
  @MinLength(1)
  name: string | null;

  @ApiPropertyOptional({
    type: "string",
    description: "Formato do arquivo",
    nullable: true,
    minLength: 1,
  })
  @IsOptional()
  @IsString()
  @MinLength(1)
  mimeType: string | null;

  @ApiPropertyOptional({
    type: "integer",
    description: "Tamanho do arquivo (em bytes)",
    nullable: true,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  sizeBytes: number | null;

  @ApiProperty({
    type: "string",
    description: "Estratégia de armazenamento do conteúdo",
    minLength: 1,
  })
  @IsString()
  @MinLength(1)
  storageType: string;
}

// ============================================================================
// List Input/Output
// ============================================================================

@ApiSchema({ name: "ArquivoListInputDto" })
export class ArquivoListInputRestDto extends PaginatedFilterByIdRestDto {}

@ApiSchema({ name: "ArquivoListOutputDto" })
export class ArquivoListOutputRestDto {
  @ApiProperty({ type: () => PaginationMetaRestDto, description: "Metadados da busca" })
  meta: PaginationMetaRestDto;

  @ApiProperty({ type: () => [ArquivoFindOneOutputRestDto], description: "Resultados da busca" })
  data: ArquivoFindOneOutputRestDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@ApiSchema({ name: "ArquivoCreateInputDto" })
export class ArquivoCreateInputRestDto {
  @ApiPropertyOptional({
    type: "string",
    description: "Nome do arquivo",
    nullable: true,
    minLength: 1,
  })
  @IsOptional()
  @IsString()
  @MinLength(1)
  name?: string | null;

  @ApiPropertyOptional({
    type: "string",
    description: "Formato do arquivo",
    nullable: true,
    minLength: 1,
  })
  @IsOptional()
  @IsString()
  @MinLength(1)
  mimeType?: string | null;

  @ApiPropertyOptional({
    type: "integer",
    description: "Tamanho do arquivo (em bytes)",
    nullable: true,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  sizeBytes?: number | null;

  @ApiProperty({
    type: "string",
    description: "Estratégia de armazenamento do conteúdo",
    minLength: 1,
  })
  @IsString()
  @MinLength(1)
  storageType: string;
}

@ApiSchema({ name: "ArquivoUpdateInputDto" })
export class ArquivoUpdateInputRestDto extends PartialType(ArquivoCreateInputRestDto) {}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@ApiSchema({ name: "ArquivoFindOneInputDto" })
export class ArquivoFindOneInputRestDto {
  @ApiProperty({
    type: "string",
    description: "Identificador do registro (uuid)",
    format: "uuid",
  })
  @IsUUID()
  id: string;
}

// ============================================================================
// GetFile Query Input
// ============================================================================

@ApiSchema({ name: "ArquivoGetFileQueryInputDto" })
export class ArquivoGetFileQueryInputRestDto {
  @ApiPropertyOptional({
    type: "string",
    description: "ID do recurso de acesso (uuid)",
    format: "uuid",
  })
  @IsOptional()
  @IsUUID()
  "acesso.recurso.id"?: string;

  @ApiPropertyOptional({ type: "string", description: "Nome do recurso de acesso" })
  @IsOptional()
  @IsString()
  "acesso.recurso.nome"?: string;
}

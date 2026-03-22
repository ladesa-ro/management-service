import {
  arquivoCreateSchema,
  arquivoFindOneInputSchema,
  arquivoPaginationInputSchema,
  arquivoUpdateSchema,
} from "@/modules/armazenamento/arquivo/domain/arquivo.schemas";
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

@ApiSchema({ name: "ArquivoFindOneOutputDto" })
@RegisterModel({
  name: "ArquivoFindOneQueryResult",
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
  name: string | null;

  @ApiPropertyOptional({
    type: "string",
    description: "Formato do arquivo",
    nullable: true,
    minLength: 1,
  })
  mimeType: string | null;

  @ApiPropertyOptional({
    type: "integer",
    description: "Tamanho do arquivo (em bytes)",
    nullable: true,
  })
  sizeBytes: number | null;

  @ApiProperty({
    type: "string",
    description: "Estratégia de armazenamento do conteúdo",
    minLength: 1,
  })
  storageType: string;
}

// ============================================================================
// List Input/Output
// ============================================================================

@ApiSchema({ name: "ArquivoListInputDto" })
export class ArquivoListInputRestDto extends PaginatedFilterByIdRestDto {
  static schema = arquivoPaginationInputSchema;
}

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
  static schema = arquivoCreateSchema;

  @ApiPropertyOptional({
    type: "string",
    description: "Nome do arquivo",
    nullable: true,
    minLength: 1,
  })
  name?: string | null;

  @ApiPropertyOptional({
    type: "string",
    description: "Formato do arquivo",
    nullable: true,
    minLength: 1,
  })
  mimeType?: string | null;

  @ApiPropertyOptional({
    type: "integer",
    description: "Tamanho do arquivo (em bytes)",
    nullable: true,
  })
  sizeBytes?: number | null;

  @ApiProperty({
    type: "string",
    description: "Estratégia de armazenamento do conteúdo",
    minLength: 1,
  })
  storageType: string;
}

@ApiSchema({ name: "ArquivoUpdateInputDto" })
export class ArquivoUpdateInputRestDto extends PartialType(ArquivoCreateInputRestDto) {
  static schema = arquivoUpdateSchema;
}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@ApiSchema({ name: "ArquivoFindOneInputDto" })
export class ArquivoFindOneInputRestDto {
  static schema = arquivoFindOneInputSchema;

  @ApiProperty({
    type: "string",
    description: "Identificador do registro (uuid)",
    format: "uuid",
  })
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
  "acesso.recurso.id"?: string;

  @ApiPropertyOptional({ type: "string", description: "Nome do recurso de acesso" })
  "acesso.recurso.nome"?: string;
}

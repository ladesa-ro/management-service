import {
  ArquivoCreateSchema,
  ArquivoUpdateSchema,
} from "@/modules/armazenamento/arquivo/domain/arquivo.schemas";
import { ArquivoFindOneInputSchema } from "@/modules/armazenamento/arquivo/domain/queries/arquivo-find-one.query.schemas";
import { ArquivoPaginationInputSchema } from "@/modules/armazenamento/arquivo/domain/queries/arquivo-list.query.schemas";
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
import { ArquivoCreateCommandFields } from "../domain/commands/arquivo-create.command";
import { ArquivoFindOneQueryResultFields } from "../domain/queries/arquivo-find-one.query.result";
import { ArquivoListQueryFields } from "../domain/queries/arquivo-list.query";

// ============================================================================
// FindOne Output
// ============================================================================

@ApiSchema({ name: "ArquivoFindOneOutputDto" })
export class ArquivoFindOneOutputRestDto extends EntityBaseRestDto {
  @ApiPropertyOptional({
    type: "string",
    ...ArquivoFindOneQueryResultFields.name.swaggerMetadata,
    nullable: true,
    minLength: 1,
  })
  name: string | null;

  @ApiPropertyOptional({
    type: "string",
    ...ArquivoFindOneQueryResultFields.mimeType.swaggerMetadata,
    nullable: true,
    minLength: 1,
  })
  mimeType: string | null;

  @ApiPropertyOptional({
    type: "integer",
    ...ArquivoFindOneQueryResultFields.sizeBytes.swaggerMetadata,
    nullable: true,
  })
  sizeBytes: number | null;

  @ApiProperty({
    type: "string",
    ...ArquivoFindOneQueryResultFields.storageType.swaggerMetadata,
    minLength: 1,
  })
  storageType: string;
}

// ============================================================================
// List Input/Output
// ============================================================================

@ApiSchema({ name: "ArquivoListInputDto" })
export class ArquivoListInputRestDto extends PaginatedFilterByIdRestDto {
  static schema = ArquivoPaginationInputSchema;
}

@ApiSchema({ name: "ArquivoListOutputDto" })
export class ArquivoListOutputRestDto {
  @ApiProperty({
    type: () => PaginationMetaRestDto,
    ...ArquivoListQueryFields.meta.swaggerMetadata,
  })
  meta: PaginationMetaRestDto;

  @ApiProperty({
    type: () => [ArquivoFindOneOutputRestDto],
    ...ArquivoListQueryFields.data.swaggerMetadata,
  })
  data: ArquivoFindOneOutputRestDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@ApiSchema({ name: "ArquivoCreateInputDto" })
export class ArquivoCreateInputRestDto {
  static schema = ArquivoCreateSchema.presentation;

  @ApiPropertyOptional({
    type: "string",
    ...ArquivoCreateCommandFields.name.swaggerMetadata,
    nullable: true,
    minLength: 1,
  })
  name?: string | null;

  @ApiPropertyOptional({
    type: "string",
    ...ArquivoCreateCommandFields.mimeType.swaggerMetadata,
    nullable: true,
    minLength: 1,
  })
  mimeType?: string | null;

  @ApiPropertyOptional({
    type: "integer",
    ...ArquivoCreateCommandFields.sizeBytes.swaggerMetadata,
    nullable: true,
  })
  sizeBytes?: number | null;

  @ApiProperty({
    type: "string",
    ...ArquivoCreateCommandFields.storageType.swaggerMetadata,
    minLength: 1,
  })
  storageType: string;
}

@ApiSchema({ name: "ArquivoUpdateInputDto" })
export class ArquivoUpdateInputRestDto extends PartialType(ArquivoCreateInputRestDto) {
  static schema = ArquivoUpdateSchema.presentation;
}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@ApiSchema({ name: "ArquivoFindOneInputDto" })
export class ArquivoFindOneInputRestDto {
  static schema = ArquivoFindOneInputSchema;

  @ApiProperty({
    type: "string",
    ...ArquivoFindOneQueryResultFields.id.swaggerMetadata,
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

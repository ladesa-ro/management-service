import { ApiProperty, ApiPropertyOptional, ApiSchema, PartialType } from "@nestjs/swagger";
import {
  IsArray,
  IsDateString,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Min,
  MinLength,
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
export class ArquivoFindOneOutputRestDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @IsUUID()
  id: string;

  @ApiPropertyOptional({ description: "Nome do arquivo", nullable: true, minLength: 1 })
  @IsOptional()
  @IsString()
  @MinLength(1)
  name: string | null;

  @ApiPropertyOptional({ description: "Formato do arquivo", nullable: true, minLength: 1 })
  @IsOptional()
  @IsString()
  @MinLength(1)
  mimeType: string | null;

  @ApiPropertyOptional({ description: "Tamanho do arquivo (em bytes)", nullable: true })
  @IsOptional()
  @IsInt()
  @Min(0)
  sizeBytes: number | null;

  @ApiProperty({ description: "Estratégia de armazenamento do conteúdo", minLength: 1 })
  @IsString()
  @MinLength(1)
  storageType: string;

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

@ApiSchema({ name: "ArquivoListInputDto" })
export class ArquivoListInputRestDto extends PaginationInputRestDto {
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
  @ApiPropertyOptional({ description: "Nome do arquivo", nullable: true, minLength: 1 })
  @IsOptional()
  @IsString()
  @MinLength(1)
  name?: string | null;

  @ApiPropertyOptional({ description: "Formato do arquivo", nullable: true, minLength: 1 })
  @IsOptional()
  @IsString()
  @MinLength(1)
  mimeType?: string | null;

  @ApiPropertyOptional({ description: "Tamanho do arquivo (em bytes)", nullable: true })
  @IsOptional()
  @IsInt()
  @Min(0)
  sizeBytes?: number | null;

  @ApiProperty({ description: "Estratégia de armazenamento do conteúdo", minLength: 1 })
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
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @IsUUID()
  id: string;
}

// ============================================================================
// GetFile Query Input
// ============================================================================

@ApiSchema({ name: "ArquivoGetFileQueryInputDto" })
export class ArquivoGetFileQueryInputRestDto {
  @ApiPropertyOptional({ description: "ID do recurso de acesso (uuid)", format: "uuid" })
  @IsOptional()
  @IsUUID()
  "acesso.recurso.id"?: string;

  @ApiPropertyOptional({ description: "Nome do recurso de acesso" })
  @IsOptional()
  @IsString()
  "acesso.recurso.nome"?: string;
}

import { ApiProperty, ApiPropertyOptional, ApiSchema, PartialType } from "@nestjs/swagger";
import { IsInt, IsOptional, IsString, IsUUID, Min, MinLength } from "class-validator";
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

// ============================================================================
// FindOne Output
// ============================================================================

@decorate(ApiSchema({ name: "ArquivoFindOneOutputDto" }))
@decorate(
  RegisterModel({
    name: "ArquivoFindOneOutputDto",
    properties: [
      simpleProperty("id"),
      simpleProperty("name"),
      simpleProperty("mimeType"),
      simpleProperty("sizeBytes"),
      simpleProperty("storageType"),
      ...commonProperties.dated,
    ],
  }),
)
export class ArquivoFindOneOutputRestDto extends EntityBaseRestDto {
  @decorate(
    ApiPropertyOptional({
      type: "string",
      description: "Nome do arquivo",
      nullable: true,
      minLength: 1,
    }),
  )
  @decorate(IsOptional())
  @decorate(IsString())
  @decorate(MinLength(1))
  name: string | null;

  @decorate(
    ApiPropertyOptional({
      type: "string",
      description: "Formato do arquivo",
      nullable: true,
      minLength: 1,
    }),
  )
  @decorate(IsOptional())
  @decorate(IsString())
  @decorate(MinLength(1))
  mimeType: string | null;

  @decorate(
    ApiPropertyOptional({
      type: "integer",
      description: "Tamanho do arquivo (em bytes)",
      nullable: true,
    }),
  )
  @decorate(IsOptional())
  @decorate(IsInt())
  @decorate(Min(0))
  sizeBytes: number | null;

  @decorate(
    ApiProperty({
      type: "string",
      description: "Estratégia de armazenamento do conteúdo",
      minLength: 1,
    }),
  )
  @decorate(IsString())
  @decorate(MinLength(1))
  storageType: string;
}

// ============================================================================
// List Input/Output
// ============================================================================

@decorate(ApiSchema({ name: "ArquivoListInputDto" }))
export class ArquivoListInputRestDto extends PaginatedFilterByIdRestDto {}

@decorate(ApiSchema({ name: "ArquivoListOutputDto" }))
export class ArquivoListOutputRestDto {
  @decorate(ApiProperty({ type: () => PaginationMetaRestDto, description: "Metadados da busca" }))
  meta: PaginationMetaRestDto;

  @decorate(
    ApiProperty({ type: () => [ArquivoFindOneOutputRestDto], description: "Resultados da busca" }),
  )
  data: ArquivoFindOneOutputRestDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@decorate(ApiSchema({ name: "ArquivoCreateInputDto" }))
export class ArquivoCreateInputRestDto {
  @decorate(
    ApiPropertyOptional({
      type: "string",
      description: "Nome do arquivo",
      nullable: true,
      minLength: 1,
    }),
  )
  @decorate(IsOptional())
  @decorate(IsString())
  @decorate(MinLength(1))
  name?: string | null;

  @decorate(
    ApiPropertyOptional({
      type: "string",
      description: "Formato do arquivo",
      nullable: true,
      minLength: 1,
    }),
  )
  @decorate(IsOptional())
  @decorate(IsString())
  @decorate(MinLength(1))
  mimeType?: string | null;

  @decorate(
    ApiPropertyOptional({
      type: "integer",
      description: "Tamanho do arquivo (em bytes)",
      nullable: true,
    }),
  )
  @decorate(IsOptional())
  @decorate(IsInt())
  @decorate(Min(0))
  sizeBytes?: number | null;

  @decorate(
    ApiProperty({
      type: "string",
      description: "Estratégia de armazenamento do conteúdo",
      minLength: 1,
    }),
  )
  @decorate(IsString())
  @decorate(MinLength(1))
  storageType: string;
}

@decorate(ApiSchema({ name: "ArquivoUpdateInputDto" }))
export class ArquivoUpdateInputRestDto extends PartialType(ArquivoCreateInputRestDto) {}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@decorate(ApiSchema({ name: "ArquivoFindOneInputDto" }))
export class ArquivoFindOneInputRestDto {
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

// ============================================================================
// GetFile Query Input
// ============================================================================

@decorate(ApiSchema({ name: "ArquivoGetFileQueryInputDto" }))
export class ArquivoGetFileQueryInputRestDto {
  @decorate(
    ApiPropertyOptional({
      type: "string",
      description: "ID do recurso de acesso (uuid)",
      format: "uuid",
    }),
  )
  @decorate(IsOptional())
  @decorate(IsUUID())
  "acesso.recurso.id"?: string;

  @decorate(ApiPropertyOptional({ type: "string", description: "Nome do recurso de acesso" }))
  @decorate(IsOptional())
  @decorate(IsString())
  "acesso.recurso.nome"?: string;
}

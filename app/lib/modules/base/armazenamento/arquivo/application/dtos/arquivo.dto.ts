import {
  EntityOutputDto,
  FindOneInputDto,
  IFilterAcceptableValues,
  ObjectUuidRefDto,
  PaginationInputDto,
  PaginationResultDto,
} from "@/modules/@shared";
import type { IdUuid } from "@/modules/@shared/domain/scalars.types";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class ArquivoFindOneInputDto extends FindOneInputDto {}

export class ArquivoFindOneOutputDto extends EntityOutputDto {
  name!: string | null;
  mimeType!: string | null;
  sizeBytes!: number | null;
  storageType!: string;
}

// ============================================================================
// List Input/Output
// ============================================================================

export class ArquivoListInputDto extends PaginationInputDto {
  "filter.id"?: IFilterAcceptableValues;
}

export class ArquivoListOutputDto extends PaginationResultDto<ArquivoFindOneOutputDto> {}

// ============================================================================
// Create/Update Input
// ============================================================================

export class ArquivoCreateInputDto {
  name?: string | null;
  mimeType?: string | null;
  sizeBytes?: number | null;
  storageType!: string;
}

export class ArquivoUpdateInputDto {
  name?: string | null;
  mimeType?: string | null;
  sizeBytes?: number | null;
  storageType?: string;
}

// ============================================================================
// Input Ref
// ============================================================================

export type ArquivoInputRefDto = ObjectUuidRefDto;

// ============================================================================
// GetFile Input
// ============================================================================

export class ArquivoGetFileInputDto {
  id!: IdUuid;
  acesso?: { id?: string; nome?: string } | null;
}

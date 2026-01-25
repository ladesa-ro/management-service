import {
  IsArray,
  IsDate,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
} from "class-validator";
import { ObjectUuidRef, PaginationInput, PaginationMeta } from "../../../common/application/dtos";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class IntervaloDeTempoFindOneInput {
  @IsUUID()
  id!: string;
}

export class IntervaloDeTempoFindOneOutput {
  @IsUUID()
  id!: string;

  @IsString()
  @Matches(/^\d{2}:\d{2}(:\d{2})?$/)
  periodoInicio!: string;

  @IsString()
  @Matches(/^\d{2}:\d{2}(:\d{2})?$/)
  periodoFim!: string;

  @IsDate()
  dateCreated!: Date;

  @IsDate()
  dateUpdated!: Date;

  @IsOptional()
  @IsDate()
  dateDeleted!: Date | null;
}

// ============================================================================
// List Input/Output
// ============================================================================

export class IntervaloDeTempoListInput extends PaginationInput {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.id"?: string[];
}

export class IntervaloDeTempoListOutput {
  meta!: PaginationMeta;
  data!: IntervaloDeTempoFindOneOutput[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

export class IntervaloDeTempoCreateInput {
  @IsString()
  @Matches(/^\d{2}:\d{2}(:\d{2})?$/)
  periodoInicio!: string;

  @IsString()
  @Matches(/^\d{2}:\d{2}(:\d{2})?$/)
  periodoFim!: string;
}

export class IntervaloDeTempoUpdateInput {
  @IsOptional()
  @IsString()
  @Matches(/^\d{2}:\d{2}(:\d{2})?$/)
  periodoInicio?: string;

  @IsOptional()
  @IsString()
  @Matches(/^\d{2}:\d{2}(:\d{2})?$/)
  periodoFim?: string;
}

// ============================================================================
// Input Ref
// ============================================================================

export class IntervaloDeTempoInputRef extends ObjectUuidRef {}

// ============================================================================
// Input for create-or-update pattern
// ============================================================================

export class IntervaloDeTempoInput {
  @IsOptional()
  @IsUUID()
  id?: string;

  @IsOptional()
  @IsString()
  @Matches(/^\d{2}:\d{2}(:\d{2})?$/)
  periodoInicio?: string;

  @IsOptional()
  @IsString()
  @Matches(/^\d{2}:\d{2}(:\d{2})?$/)
  periodoFim?: string;
}

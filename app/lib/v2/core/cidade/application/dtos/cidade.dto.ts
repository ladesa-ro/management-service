import { IsArray, IsInt, IsOptional, IsString, Min, MinLength, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { PaginationInput, PaginationMeta, ObjectIntRef } from "../../../common/application/dtos";
import { EstadoFindOneOutput } from "../../../estado/application/dtos";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class CidadeFindOneInput {
  @IsInt()
  @Min(1)
  id!: number;
}

export class CidadeFindOneOutput {
  @IsInt()
  id!: number;

  @IsString()
  @MinLength(1)
  nome!: string;

  @ValidateNested()
  @Type(() => EstadoFindOneOutput)
  estado!: EstadoFindOneOutput;
}

// ============================================================================
// List Input/Output
// ============================================================================

export class CidadeListInput extends PaginationInput {
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  "filter.id"?: number[];

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  "filter.estado.id"?: number[];
}

export class CidadeListOutput {
  meta!: PaginationMeta;
  data!: CidadeFindOneOutput[];
}

// ============================================================================
// Input Ref
// ============================================================================

export class CidadeInputRef extends ObjectIntRef {}

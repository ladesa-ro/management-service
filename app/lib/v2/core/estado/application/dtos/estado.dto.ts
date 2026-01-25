import { IsArray, IsInt, IsOptional, IsString, Length, Min, MinLength } from "class-validator";
import { PaginationInput, PaginationMeta } from "../../../common/application/dtos";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class EstadoFindOneInput {
  @IsInt()
  @Min(1)
  id!: number;
}

export class EstadoFindOneOutput {
  @IsInt()
  id!: number;

  @IsString()
  @MinLength(1)
  nome!: string;

  @IsString()
  @Length(2, 2)
  sigla!: string;
}

// ============================================================================
// List Input/Output
// ============================================================================

export class EstadoListInput extends PaginationInput {
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  "filter.id"?: number[];
}

export class EstadoListOutput {
  meta!: PaginationMeta;
  data!: EstadoFindOneOutput[];
}

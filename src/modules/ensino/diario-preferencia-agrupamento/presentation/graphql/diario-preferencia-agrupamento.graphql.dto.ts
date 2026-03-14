import {
  EntityBaseGraphQlDto,
  PaginatedFilterByIdGraphQlDto,
  PaginationMetaGraphQlDto,
} from "@/modules/@shared/infrastructure/graphql/dtos";
import {
  ArgsType,
  Field,
  InputType,
  Int,
  ObjectType,
} from "@/modules/@shared/presentation/graphql";
import {
  IsArray,
  IsDateString,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from "@/modules/@shared/presentation/shared";
import { DiarioPreferenciaAgrupamentoFieldsMixin } from "@/modules/ensino/diario-preferencia-agrupamento/presentation/diario-preferencia-agrupamento.validation-mixin";

// ============================================================================
// Ref Input DTOs for cross-module references
// ============================================================================

@InputType("DiarioPreferenciaAgrupamentoDiarioRefInputDto")
export class DiarioPreferenciaAgrupamentoDiarioRefInputGraphQlDto {
  @Field(() => String) @IsString() id: string;
}

// ============================================================================
// Diario nested output (diario module not yet refactored to GraphQL)
// ============================================================================

@ObjectType("DiarioPreferenciaAgrupamentoDiarioOutput")
export class DiarioPreferenciaAgrupamentoDiarioOutputGraphQlDto extends EntityBaseGraphQlDto {
  @Field(() => Boolean) ativo: boolean;
}

// ============================================================================
// FindOne Output
// ============================================================================

@ObjectType("DiarioPreferenciaAgrupamentoFindOneOutputDto")
export class DiarioPreferenciaAgrupamentoFindOneOutputGraphQlDto extends EntityBaseGraphQlDto {
  @Field(() => Date) dataInicio: Date;
  @Field(() => Date, { nullable: true }) dataFim: Date | null;
  @Field(() => Int) diaSemanaIso: number;
  @Field(() => Int) aulasSeguidas: number;
  @Field(() => DiarioPreferenciaAgrupamentoDiarioOutputGraphQlDto)
  diario: DiarioPreferenciaAgrupamentoDiarioOutputGraphQlDto;
}

// ============================================================================
// Create Input
// ============================================================================

@InputType("DiarioPreferenciaAgrupamentoCreateInputDto")
export class DiarioPreferenciaAgrupamentoCreateInputGraphQlDto extends DiarioPreferenciaAgrupamentoFieldsMixin {
  @Field(() => Date) declare dataInicio: Date;
  @Field(() => Date, { nullable: true }) declare dataFim?: Date | null;
  @Field(() => Int) declare diaSemanaIso: number;
  @Field(() => Int) declare aulasSeguidas: number;
  @Field(() => DiarioPreferenciaAgrupamentoDiarioRefInputGraphQlDto)
  @ValidateNested()
  diario: DiarioPreferenciaAgrupamentoDiarioRefInputGraphQlDto;
}

// ============================================================================
// Update Input
// ============================================================================

@InputType("DiarioPreferenciaAgrupamentoUpdateInputDto")
export class DiarioPreferenciaAgrupamentoUpdateInputGraphQlDto {
  @Field(() => Date, { nullable: true })
  @IsOptional()
  @IsDateString()
  dataInicio?: Date;
  @Field(() => Date, { nullable: true })
  @IsOptional()
  @IsDateString()
  dataFim?: Date | null;
  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  diaSemanaIso?: number;
  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  aulasSeguidas?: number;
  @Field(() => DiarioPreferenciaAgrupamentoDiarioRefInputGraphQlDto, { nullable: true })
  @IsOptional()
  @ValidateNested()
  diario?: DiarioPreferenciaAgrupamentoDiarioRefInputGraphQlDto;
}

// ============================================================================
// List Input (GraphQL-compatible - no dots in field names)
// ============================================================================

@ArgsType()
export class DiarioPreferenciaAgrupamentoListInputGraphQlDto extends PaginatedFilterByIdGraphQlDto {
  @Field(() => [String], { nullable: true, description: "Filtro por ID do Diario" })
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  filterDiarioId?: string[];
}

// ============================================================================
// List Output
// ============================================================================

@ObjectType("DiarioPreferenciaAgrupamentoListResult")
export class DiarioPreferenciaAgrupamentoListOutputGraphQlDto {
  @Field(() => PaginationMetaGraphQlDto)
  meta: PaginationMetaGraphQlDto;

  @Field(() => [DiarioPreferenciaAgrupamentoFindOneOutputGraphQlDto])
  data: DiarioPreferenciaAgrupamentoFindOneOutputGraphQlDto[];
}

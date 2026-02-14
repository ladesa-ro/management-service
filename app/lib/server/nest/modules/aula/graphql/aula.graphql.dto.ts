import { ArgsType, Field, InputType, Int, ObjectType } from "@nestjs/graphql";
import {
  IsArray,
  IsDateString,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from "class-validator";
import {
  EntityBaseGraphQlDto,
  PaginationMetaGraphQlDto,
} from "@/modules/@shared/infrastructure/graphql/dtos";
import { PaginationInputGraphQlDto } from "@/modules/@shared/infrastructure/graphql/dtos/pagination-graphql.dto";
import { DiarioFindOneOutputGraphQlDto } from "@/server/nest/modules/diario/graphql/diario.graphql.dto";
import { IntervaloDeTempoFindOneOutputGraphQlDto } from "@/server/nest/modules/intervalo-de-tempo/graphql/intervalo-de-tempo.graphql.dto";

// ============================================================================
// Nested ref output DTOs
// ============================================================================

@ObjectType("AmbienteFindOneOutputForAulaDto")
export class AmbienteFindOneOutputForAulaGraphQlDto extends EntityBaseGraphQlDto {
  @Field() nome: string;
  @Field(() => String, { nullable: true }) descricao: string | null;
  @Field() codigo: string;
  @Field(() => Int, { nullable: true }) capacidade: number | null;
  @Field(() => String, { nullable: true }) tipo: string | null;
}

// ============================================================================
// FindOne Output
// ============================================================================

@ObjectType("AulaFindOneOutputDto")
export class AulaFindOneOutputGraphQlDto extends EntityBaseGraphQlDto {
  @Field() data: string;
  @Field(() => String, { nullable: true }) modalidade: string | null;
  @Field(() => IntervaloDeTempoFindOneOutputGraphQlDto)
  intervaloDeTempo: IntervaloDeTempoFindOneOutputGraphQlDto;
  @Field(() => DiarioFindOneOutputGraphQlDto)
  diario: DiarioFindOneOutputGraphQlDto;
  @Field(() => AmbienteFindOneOutputForAulaGraphQlDto, { nullable: true })
  ambiente: AmbienteFindOneOutputForAulaGraphQlDto | null;
}

// ============================================================================
// Ref Input DTOs
// ============================================================================

@InputType("IntervaloDeTempoRefInputForAulaDto")
export class IntervaloDeTempoRefInputForAulaGraphQlDto {
  @Field() @IsString() id: string;
}

@InputType("DiarioRefInputForAulaDto")
export class DiarioRefInputForAulaGraphQlDto {
  @Field() @IsString() id: string;
}

@InputType("AmbienteRefInputForAulaDto")
export class AmbienteRefInputForAulaGraphQlDto {
  @Field() @IsString() id: string;
}

// ============================================================================
// Create Input
// ============================================================================

@InputType("AulaCreateInputDto")
export class AulaCreateInputGraphQlDto {
  @Field() @IsDateString() data: string;
  @Field({ nullable: true }) @IsOptional() @IsString() modalidade?: string | null;

  @Field(() => IntervaloDeTempoRefInputForAulaGraphQlDto)
  @ValidateNested()
  intervaloDeTempo: IntervaloDeTempoRefInputForAulaGraphQlDto;

  @Field(() => DiarioRefInputForAulaGraphQlDto)
  @ValidateNested()
  diario: DiarioRefInputForAulaGraphQlDto;

  @Field(() => AmbienteRefInputForAulaGraphQlDto, { nullable: true })
  @IsOptional()
  @ValidateNested()
  ambiente?: AmbienteRefInputForAulaGraphQlDto | null;
}

// ============================================================================
// Update Input
// ============================================================================

@InputType("AulaUpdateInputDto")
export class AulaUpdateInputGraphQlDto {
  @Field({ nullable: true }) @IsOptional() @IsDateString() data?: string;
  @Field({ nullable: true }) @IsOptional() @IsString() modalidade?: string | null;

  @Field(() => IntervaloDeTempoRefInputForAulaGraphQlDto, { nullable: true })
  @IsOptional()
  @ValidateNested()
  intervaloDeTempo?: IntervaloDeTempoRefInputForAulaGraphQlDto;

  @Field(() => DiarioRefInputForAulaGraphQlDto, { nullable: true })
  @IsOptional()
  @ValidateNested()
  diario?: DiarioRefInputForAulaGraphQlDto;

  @Field(() => AmbienteRefInputForAulaGraphQlDto, { nullable: true })
  @IsOptional()
  @ValidateNested()
  ambiente?: AmbienteRefInputForAulaGraphQlDto | null;
}

// ============================================================================
// List Input
// ============================================================================

@ArgsType()
export class AulaListInputGraphQlDto extends PaginationInputGraphQlDto {
  @Field(() => [String], { nullable: true, description: "Filtro por ID" })
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  filterId?: string[];

  @Field(() => [String], { nullable: true, description: "Filtro por ID do Intervalo de Tempo" })
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  filterIntervaloDeTempoId?: string[];

  @Field(() => [String], { nullable: true, description: "Filtro por ID do Diario" })
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  filterDiarioId?: string[];
}

// ============================================================================
// List Output
// ============================================================================

@ObjectType("AulaListResult")
export class AulaListOutputGraphQlDto {
  @Field(() => PaginationMetaGraphQlDto)
  meta: PaginationMetaGraphQlDto;

  @Field(() => [AulaFindOneOutputGraphQlDto])
  data: AulaFindOneOutputGraphQlDto[];
}

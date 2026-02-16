import { ArgsType, Field, InputType, Int, ObjectType } from "@nestjs/graphql";
import {
  IsArray,
  IsDateString,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from "class-validator";
import { decorate } from "ts-mixer";
import {
  EntityBaseGraphQlDto,
  PaginatedFilterByIdGraphQlDto,
  PaginationMetaGraphQlDto,
} from "@/modules/@shared/infrastructure/graphql/dtos";
import { DiarioFindOneOutputGraphQlDto } from "@/modules/ensino/diario/presentation/graphql/diario.graphql.dto";
import { IntervaloDeTempoFindOneOutputGraphQlDto } from "@/modules/horarios/intervalo-de-tempo/presentation/graphql/intervalo-de-tempo.graphql.dto";
import { AulaFieldsMixin } from "../aula.validation-mixin";

// ============================================================================
// Nested ref output DTOs
// ============================================================================

@decorate(ObjectType("AmbienteFindOneOutputForAulaDto"))
export class AmbienteFindOneOutputForAulaGraphQlDto extends EntityBaseGraphQlDto {
  @decorate(Field(() => String)) nome: string;
  @decorate(Field(() => String, { nullable: true })) descricao: string | null;
  @decorate(Field(() => String)) codigo: string;
  @decorate(Field(() => Int, { nullable: true })) capacidade: number | null;
  @decorate(Field(() => String, { nullable: true })) tipo: string | null;
}

// ============================================================================
// FindOne Output
// ============================================================================

@decorate(ObjectType("AulaFindOneOutputDto"))
export class AulaFindOneOutputGraphQlDto extends EntityBaseGraphQlDto {
  @decorate(Field(() => String)) data: string;
  @decorate(Field(() => String, { nullable: true })) modalidade: string | null;
  @decorate(Field(() => IntervaloDeTempoFindOneOutputGraphQlDto))
  intervaloDeTempo: IntervaloDeTempoFindOneOutputGraphQlDto;
  @decorate(Field(() => DiarioFindOneOutputGraphQlDto))
  diario: DiarioFindOneOutputGraphQlDto;
  @decorate(Field(() => AmbienteFindOneOutputForAulaGraphQlDto, { nullable: true }))
  ambiente: AmbienteFindOneOutputForAulaGraphQlDto | null;
}

// ============================================================================
// Ref Input DTOs
// ============================================================================

@decorate(InputType("IntervaloDeTempoRefInputForAulaDto"))
export class IntervaloDeTempoRefInputForAulaGraphQlDto {
  @decorate(Field(() => String)) @decorate(IsString()) id: string;
}

@decorate(InputType("DiarioRefInputForAulaDto"))
export class DiarioRefInputForAulaGraphQlDto {
  @decorate(Field(() => String)) @decorate(IsString()) id: string;
}

@decorate(InputType("AmbienteRefInputForAulaDto"))
export class AmbienteRefInputForAulaGraphQlDto {
  @decorate(Field(() => String)) @decorate(IsString()) id: string;
}

// ============================================================================
// Create Input
// ============================================================================

@decorate(InputType("AulaCreateInputDto"))
export class AulaCreateInputGraphQlDto extends AulaFieldsMixin {
  @decorate(Field(() => String)) declare data: string;
  @decorate(Field(() => String, { nullable: true })) declare modalidade?: string | null;

  @decorate(Field(() => IntervaloDeTempoRefInputForAulaGraphQlDto))
  @decorate(ValidateNested())
  intervaloDeTempo: IntervaloDeTempoRefInputForAulaGraphQlDto;

  @decorate(Field(() => DiarioRefInputForAulaGraphQlDto))
  @decorate(ValidateNested())
  diario: DiarioRefInputForAulaGraphQlDto;

  @decorate(Field(() => AmbienteRefInputForAulaGraphQlDto, { nullable: true }))
  @decorate(IsOptional())
  @decorate(ValidateNested())
  ambiente?: AmbienteRefInputForAulaGraphQlDto | null;
}

// ============================================================================
// Update Input
// ============================================================================

@decorate(InputType("AulaUpdateInputDto"))
export class AulaUpdateInputGraphQlDto {
  @decorate(Field(() => String, { nullable: true }))
  @decorate(IsOptional())
  @decorate(IsDateString())
  data?: string;
  @decorate(Field(() => String, { nullable: true }))
  @decorate(IsOptional())
  @decorate(IsString())
  modalidade?: string | null;

  @decorate(Field(() => IntervaloDeTempoRefInputForAulaGraphQlDto, { nullable: true }))
  @decorate(IsOptional())
  @decorate(ValidateNested())
  intervaloDeTempo?: IntervaloDeTempoRefInputForAulaGraphQlDto;

  @decorate(Field(() => DiarioRefInputForAulaGraphQlDto, { nullable: true }))
  @decorate(IsOptional())
  @decorate(ValidateNested())
  diario?: DiarioRefInputForAulaGraphQlDto;

  @decorate(Field(() => AmbienteRefInputForAulaGraphQlDto, { nullable: true }))
  @decorate(IsOptional())
  @decorate(ValidateNested())
  ambiente?: AmbienteRefInputForAulaGraphQlDto | null;
}

// ============================================================================
// List Input
// ============================================================================

@decorate(ArgsType())
export class AulaListInputGraphQlDto extends PaginatedFilterByIdGraphQlDto {
  @decorate(
    Field(() => [String], { nullable: true, description: "Filtro por ID do Intervalo de Tempo" }),
  )
  @decorate(IsOptional())
  @decorate(IsArray())
  @decorate(IsUUID(undefined, { each: true }))
  filterIntervaloDeTempoId?: string[];

  @decorate(Field(() => [String], { nullable: true, description: "Filtro por ID do Diario" }))
  @decorate(IsOptional())
  @decorate(IsArray())
  @decorate(IsUUID(undefined, { each: true }))
  filterDiarioId?: string[];
}

// ============================================================================
// List Output
// ============================================================================

@decorate(ObjectType("AulaListResult"))
export class AulaListOutputGraphQlDto {
  @decorate(Field(() => PaginationMetaGraphQlDto))
  meta: PaginationMetaGraphQlDto;

  @decorate(Field(() => [AulaFindOneOutputGraphQlDto]))
  data: AulaFindOneOutputGraphQlDto[];
}

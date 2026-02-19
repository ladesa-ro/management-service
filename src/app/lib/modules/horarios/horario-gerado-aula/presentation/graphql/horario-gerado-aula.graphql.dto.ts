import { ArgsType, Field, InputType, ObjectType } from "@nestjs/graphql";
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
import { IntervaloDeTempoFindOneOutputGraphQlDto } from "@/modules/horarios/intervalo-de-tempo/presentation/graphql/intervalo-de-tempo.graphql.dto";
import { HorarioGeradoAulaFieldsMixin } from "../horario-gerado-aula.validation-mixin";

// ============================================================================
// DiarioProfessor nested output (not yet refactored to GraphQL)
// ============================================================================

@decorate(ObjectType("HorarioGeradoAulaDiarioProfessorOutput"))
export class HorarioGeradoAulaDiarioProfessorOutputGraphQlDto extends EntityBaseGraphQlDto {
  @decorate(Field(() => Boolean)) situacao: boolean;
}

// ============================================================================
// HorarioGerado nested output (not yet refactored to GraphQL)
// ============================================================================

@decorate(ObjectType("HorarioGeradoAulaHorarioGeradoOutput"))
export class HorarioGeradoAulaHorarioGeradoOutputGraphQlDto extends EntityBaseGraphQlDto {
  @decorate(Field(() => String, { nullable: true })) status: string | null;
  @decorate(Field(() => String, { nullable: true })) tipo: string | null;
  @decorate(Field(() => Date, { nullable: true })) dataGeracao: Date | null;
  @decorate(Field(() => Date, { nullable: true })) vigenciaInicio: Date | null;
  @decorate(Field(() => Date, { nullable: true })) vigenciaFim: Date | null;
}

// ============================================================================
// Ref Input DTOs for cross-module references
// ============================================================================

@decorate(InputType("HorarioGeradoAulaDiarioProfessorRefInputDto"))
export class HorarioGeradoAulaDiarioProfessorRefInputGraphQlDto {
  @decorate(Field(() => String)) @decorate(IsString()) id: string;
}

@decorate(InputType("HorarioGeradoAulaHorarioGeradoRefInputDto"))
export class HorarioGeradoAulaHorarioGeradoRefInputGraphQlDto {
  @decorate(Field(() => String)) @decorate(IsString()) id: string;
}

@decorate(InputType("HorarioGeradoAulaIntervaloDeTempoRefInputDto"))
export class HorarioGeradoAulaIntervaloDeTempoRefInputGraphQlDto {
  @decorate(Field(() => String)) @decorate(IsString()) id: string;
}

// ============================================================================
// FindOne Output
// ============================================================================

@decorate(ObjectType("HorarioGeradoAulaFindOneOutputDto"))
export class HorarioGeradoAulaFindOneOutputGraphQlDto extends EntityBaseGraphQlDto {
  @decorate(Field(() => Date)) data: Date;
  @decorate(Field(() => HorarioGeradoAulaDiarioProfessorOutputGraphQlDto))
  diarioProfessor: HorarioGeradoAulaDiarioProfessorOutputGraphQlDto;
  @decorate(Field(() => HorarioGeradoAulaHorarioGeradoOutputGraphQlDto))
  horarioGerado: HorarioGeradoAulaHorarioGeradoOutputGraphQlDto;
  @decorate(Field(() => IntervaloDeTempoFindOneOutputGraphQlDto))
  intervaloDeTempo: IntervaloDeTempoFindOneOutputGraphQlDto;
}

// ============================================================================
// Create Input
// ============================================================================

@decorate(InputType("HorarioGeradoAulaCreateInputDto"))
export class HorarioGeradoAulaCreateInputGraphQlDto extends HorarioGeradoAulaFieldsMixin {
  @decorate(Field(() => Date)) declare data: Date;
  @decorate(Field(() => HorarioGeradoAulaDiarioProfessorRefInputGraphQlDto))
  @decorate(ValidateNested())
  diarioProfessor: HorarioGeradoAulaDiarioProfessorRefInputGraphQlDto;
  @decorate(Field(() => HorarioGeradoAulaHorarioGeradoRefInputGraphQlDto))
  @decorate(ValidateNested())
  horarioGerado: HorarioGeradoAulaHorarioGeradoRefInputGraphQlDto;
  @decorate(Field(() => HorarioGeradoAulaIntervaloDeTempoRefInputGraphQlDto))
  @decorate(ValidateNested())
  intervaloDeTempo: HorarioGeradoAulaIntervaloDeTempoRefInputGraphQlDto;
}

// ============================================================================
// Update Input
// ============================================================================

@decorate(InputType("HorarioGeradoAulaUpdateInputDto"))
export class HorarioGeradoAulaUpdateInputGraphQlDto {
  @decorate(Field(() => Date, { nullable: true }))
  @decorate(IsOptional())
  @decorate(IsDateString())
  data?: Date;
  @decorate(Field(() => HorarioGeradoAulaDiarioProfessorRefInputGraphQlDto, { nullable: true }))
  @decorate(IsOptional())
  @decorate(ValidateNested())
  diarioProfessor?: HorarioGeradoAulaDiarioProfessorRefInputGraphQlDto;
  @decorate(Field(() => HorarioGeradoAulaHorarioGeradoRefInputGraphQlDto, { nullable: true }))
  @decorate(IsOptional())
  @decorate(ValidateNested())
  horarioGerado?: HorarioGeradoAulaHorarioGeradoRefInputGraphQlDto;
  @decorate(Field(() => HorarioGeradoAulaIntervaloDeTempoRefInputGraphQlDto, { nullable: true }))
  @decorate(IsOptional())
  @decorate(ValidateNested())
  intervaloDeTempo?: HorarioGeradoAulaIntervaloDeTempoRefInputGraphQlDto;
}

// ============================================================================
// List Input (GraphQL-compatible - no dots in field names)
// ============================================================================

@decorate(ArgsType())
export class HorarioGeradoAulaListInputGraphQlDto extends PaginatedFilterByIdGraphQlDto {
  @decorate(
    Field(() => [String], { nullable: true, description: "Filtro por ID do Horario Gerado" }),
  )
  @decorate(IsOptional())
  @decorate(IsArray())
  @decorate(IsUUID(undefined, { each: true }))
  filterHorarioGeradoId?: string[];
}

// ============================================================================
// List Output
// ============================================================================

@decorate(ObjectType("HorarioGeradoAulaListResult"))
export class HorarioGeradoAulaListOutputGraphQlDto {
  @decorate(Field(() => PaginationMetaGraphQlDto))
  meta: PaginationMetaGraphQlDto;

  @decorate(Field(() => [HorarioGeradoAulaFindOneOutputGraphQlDto]))
  data: HorarioGeradoAulaFindOneOutputGraphQlDto[];
}

import { ArgsType, Field, InputType, ObjectType } from "@nestjs/graphql";
import {
  IsArray,
  IsDateString,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from "class-validator";
import { PaginationInputGraphQlDto } from "@/modules/@shared/infrastructure/graphql";
import {
  EntityBaseGraphQlDto,
  PaginationMetaGraphQlDto,
} from "@/modules/@shared/infrastructure/graphql/dtos";
import { IntervaloDeTempoFindOneOutputGraphQlDto } from "@/server/nest/modules/intervalo-de-tempo/graphql/intervalo-de-tempo.graphql.dto";

// ============================================================================
// DiarioProfessor nested output (not yet refactored to GraphQL)
// ============================================================================

@ObjectType("HorarioGeradoAulaDiarioProfessorOutput")
export class HorarioGeradoAulaDiarioProfessorOutputGraphQlDto extends EntityBaseGraphQlDto {
  @Field() situacao: boolean;
}

// ============================================================================
// HorarioGerado nested output (not yet refactored to GraphQL)
// ============================================================================

@ObjectType("HorarioGeradoAulaHorarioGeradoOutput")
export class HorarioGeradoAulaHorarioGeradoOutputGraphQlDto extends EntityBaseGraphQlDto {
  @Field(() => String, { nullable: true }) status: string | null;
  @Field(() => String, { nullable: true }) tipo: string | null;
  @Field(() => Date, { nullable: true }) dataGeracao: Date | null;
  @Field(() => Date, { nullable: true }) vigenciaInicio: Date | null;
  @Field(() => Date, { nullable: true }) vigenciaFim: Date | null;
}

// ============================================================================
// Ref Input DTOs for cross-module references
// ============================================================================

@InputType("HorarioGeradoAulaDiarioProfessorRefInputDto")
export class HorarioGeradoAulaDiarioProfessorRefInputGraphQlDto {
  @Field() @IsString() id: string;
}

@InputType("HorarioGeradoAulaHorarioGeradoRefInputDto")
export class HorarioGeradoAulaHorarioGeradoRefInputGraphQlDto {
  @Field() @IsString() id: string;
}

@InputType("HorarioGeradoAulaIntervaloDeTempoRefInputDto")
export class HorarioGeradoAulaIntervaloDeTempoRefInputGraphQlDto {
  @Field() @IsString() id: string;
}

// ============================================================================
// FindOne Output
// ============================================================================

@ObjectType("HorarioGeradoAulaFindOneOutputDto")
export class HorarioGeradoAulaFindOneOutputGraphQlDto extends EntityBaseGraphQlDto {
  @Field() data: Date;
  @Field(() => HorarioGeradoAulaDiarioProfessorOutputGraphQlDto)
  diarioProfessor: HorarioGeradoAulaDiarioProfessorOutputGraphQlDto;
  @Field(() => HorarioGeradoAulaHorarioGeradoOutputGraphQlDto)
  horarioGerado: HorarioGeradoAulaHorarioGeradoOutputGraphQlDto;
  @Field(() => IntervaloDeTempoFindOneOutputGraphQlDto)
  intervaloDeTempo: IntervaloDeTempoFindOneOutputGraphQlDto;
}

// ============================================================================
// Create Input
// ============================================================================

@InputType("HorarioGeradoAulaCreateInputDto")
export class HorarioGeradoAulaCreateInputGraphQlDto {
  @Field() @IsDateString() data: Date;
  @Field(() => HorarioGeradoAulaDiarioProfessorRefInputGraphQlDto)
  @ValidateNested()
  diarioProfessor: HorarioGeradoAulaDiarioProfessorRefInputGraphQlDto;
  @Field(() => HorarioGeradoAulaHorarioGeradoRefInputGraphQlDto)
  @ValidateNested()
  horarioGerado: HorarioGeradoAulaHorarioGeradoRefInputGraphQlDto;
  @Field(() => HorarioGeradoAulaIntervaloDeTempoRefInputGraphQlDto)
  @ValidateNested()
  intervaloDeTempo: HorarioGeradoAulaIntervaloDeTempoRefInputGraphQlDto;
}

// ============================================================================
// Update Input
// ============================================================================

@InputType("HorarioGeradoAulaUpdateInputDto")
export class HorarioGeradoAulaUpdateInputGraphQlDto {
  @Field({ nullable: true }) @IsOptional() @IsDateString() data?: Date;
  @Field(() => HorarioGeradoAulaDiarioProfessorRefInputGraphQlDto, { nullable: true })
  @IsOptional()
  @ValidateNested()
  diarioProfessor?: HorarioGeradoAulaDiarioProfessorRefInputGraphQlDto;
  @Field(() => HorarioGeradoAulaHorarioGeradoRefInputGraphQlDto, { nullable: true })
  @IsOptional()
  @ValidateNested()
  horarioGerado?: HorarioGeradoAulaHorarioGeradoRefInputGraphQlDto;
  @Field(() => HorarioGeradoAulaIntervaloDeTempoRefInputGraphQlDto, { nullable: true })
  @IsOptional()
  @ValidateNested()
  intervaloDeTempo?: HorarioGeradoAulaIntervaloDeTempoRefInputGraphQlDto;
}

// ============================================================================
// List Input (GraphQL-compatible - no dots in field names)
// ============================================================================

@ArgsType()
export class HorarioGeradoAulaListInputGraphQlDto extends PaginationInputGraphQlDto {
  @Field(() => [String], { nullable: true, description: "Filtro por ID" })
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  filterId?: string[];

  @Field(() => [String], { nullable: true, description: "Filtro por ID do Horario Gerado" })
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  filterHorarioGeradoId?: string[];
}

// ============================================================================
// List Output
// ============================================================================

@ObjectType("HorarioGeradoAulaListResult")
export class HorarioGeradoAulaListOutputGraphQlDto {
  @Field(() => PaginationMetaGraphQlDto)
  meta: PaginationMetaGraphQlDto;

  @Field(() => [HorarioGeradoAulaFindOneOutputGraphQlDto])
  data: HorarioGeradoAulaFindOneOutputGraphQlDto[];
}

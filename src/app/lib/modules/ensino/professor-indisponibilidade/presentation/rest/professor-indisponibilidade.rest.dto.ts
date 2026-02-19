import { ApiProperty, ApiPropertyOptional, ApiSchema, PartialType } from "@nestjs/swagger";
import { IsInt, IsOptional, IsString, IsUUID, Max, Min } from "class-validator";
import { decorate, Mixin } from "ts-mixer";
import {
  commonProperties,
  RegisterModel,
  simpleProperty,
} from "@/modules/@shared/infrastructure/persistence/typeorm/metadata";
import {
  EntityBaseRestDto,
  PaginationInputRestDto,
  PaginationMetaRestDto,
} from "@/modules/@shared/infrastructure/presentation/rest/dtos";
import { ProfessorIndisponibilidadeFieldsMixin } from "../professor-indisponibilidade.validation-mixin";

// ============================================================================
// FindOne Output
// ============================================================================

@decorate(ApiSchema({ name: "ProfessorIndisponibilidadeFindOneOutputDto" }))
@decorate(
  RegisterModel({
    name: "ProfessorIndisponibilidadeFindOneOutputDto",
    properties: [
      simpleProperty("id"),
      simpleProperty("idPerfilFk"),
      simpleProperty("diaDaSemana"),
      simpleProperty("horaInicio"),
      simpleProperty("horaFim"),
      simpleProperty("motivo"),
      ...commonProperties.dated,
    ],
  }),
)
export class ProfessorIndisponibilidadeFindOneOutputRestDto extends Mixin(
  EntityBaseRestDto,
  ProfessorIndisponibilidadeFieldsMixin,
) {
  @decorate(
    ApiProperty({ type: "string", description: "Identificador do perfil (uuid)", format: "uuid" }),
  )
  @decorate(IsUUID())
  idPerfilFk: string;

  @decorate(
    ApiProperty({
      type: "integer",
      description: "Dia da semana (0=domingo, 1=segunda, ..., 6=sabado)",
    }),
  )
  declare diaDaSemana: number;

  @decorate(ApiProperty({ type: "string", description: "Hora de inicio da indisponibilidade" }))
  declare horaInicio: string;

  @decorate(ApiProperty({ type: "string", description: "Hora de termino da indisponibilidade" }))
  declare horaFim: string;

  @decorate(ApiProperty({ type: "string", description: "Motivo da indisponibilidade" }))
  declare motivo: string;
}

// ============================================================================
// List Input/Output
// ============================================================================

@decorate(ApiSchema({ name: "ProfessorIndisponibilidadeListInputDto" }))
export class ProfessorIndisponibilidadeListInputRestDto extends PaginationInputRestDto {
  @decorate(
    ApiPropertyOptional({
      type: "string",
      description: "Filtro por ID do perfil",
    }),
  )
  @decorate(IsOptional())
  @decorate(IsUUID())
  idPerfilFk?: string;
}

@decorate(ApiSchema({ name: "ProfessorIndisponibilidadeListOutputDto" }))
export class ProfessorIndisponibilidadeListOutputRestDto {
  @decorate(ApiProperty({ type: () => PaginationMetaRestDto, description: "Metadados da busca" }))
  meta: PaginationMetaRestDto;

  @decorate(
    ApiProperty({
      type: () => [ProfessorIndisponibilidadeFindOneOutputRestDto],
      description: "Resultados da busca",
    }),
  )
  data: ProfessorIndisponibilidadeFindOneOutputRestDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@decorate(ApiSchema({ name: "ProfessorIndisponibilidadeCreateInputDto" }))
export class ProfessorIndisponibilidadeCreateInputRestDto extends ProfessorIndisponibilidadeFieldsMixin {
  @decorate(
    ApiPropertyOptional({
      type: "string",
      description: "Identificador do perfil (uuid)",
      format: "uuid",
    }),
  )
  @decorate(IsOptional())
  @decorate(IsUUID())
  idPerfilFk?: string;

  @decorate(
    ApiProperty({
      type: "integer",
      description: "Dia da semana (0=domingo, 1=segunda, ..., 6=sabado)",
    }),
  )
  declare diaDaSemana: number;

  @decorate(ApiProperty({ type: "string", description: "Hora de inicio da indisponibilidade" }))
  declare horaInicio: string;

  @decorate(ApiProperty({ type: "string", description: "Hora de termino da indisponibilidade" }))
  declare horaFim: string;

  @decorate(ApiProperty({ type: "string", description: "Motivo da indisponibilidade" }))
  declare motivo: string;
}

@decorate(ApiSchema({ name: "ProfessorIndisponibilidadeUpdateInputDto" }))
export class ProfessorIndisponibilidadeUpdateInputRestDto extends PartialType(
  ProfessorIndisponibilidadeCreateInputRestDto,
) {}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@decorate(ApiSchema({ name: "ProfessorIndisponibilidadeFindOneInputDto" }))
export class ProfessorIndisponibilidadeFindOneInputRestDto {
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
// ListByPerfil Input (for path params)
// ============================================================================

@decorate(ApiSchema({ name: "ProfessorIndisponibilidadeListByPerfilInputDto" }))
export class ProfessorIndisponibilidadeListByPerfilInputRestDto {
  @decorate(
    ApiProperty({ type: "string", description: "Identificador do perfil (uuid)", format: "uuid" }),
  )
  @decorate(IsUUID())
  idPerfilFk: string;
}

// ============================================================================
// Create with Perfil Input (for path params)
// ============================================================================

@decorate(ApiSchema({ name: "ProfessorIndisponibilidadeCreatePerfilInputDto" }))
export class ProfessorIndisponibilidadeCreatePerfilInputRestDto {
  @decorate(
    ApiProperty({ type: "string", description: "Identificador do perfil (uuid)", format: "uuid" }),
  )
  @decorate(IsUUID())
  id_perfil: string;
}

// ============================================================================
// RRule View/Input/Output
// ============================================================================

@decorate(ApiSchema({ name: "ProfessorIndisponibilidadeRRuleViewDto" }))
export class ProfessorIndisponibilidadeRRuleViewRestDto {
  @decorate(
    ApiProperty({
      type: "string",
      description: "Identificador da indisponibilidade (uuid)",
      format: "uuid",
    }),
  )
  @decorate(IsUUID())
  id: string;

  @decorate(
    ApiProperty({ type: "string", description: "Identificador do perfil (uuid)", format: "uuid" }),
  )
  @decorate(IsUUID())
  id_perfil_fk: string;

  @decorate(
    ApiProperty({
      type: "string",
      description:
        "String RRULE + possivel DTSTART (ex: 'DTSTART:20251025T080000\\nRRULE:FREQ=WEEKLY;BYDAY=MO')",
    }),
  )
  @decorate(IsString())
  rrule: string;

  @decorate(ApiProperty({ type: "string", description: "Horario de inicio" }))
  @decorate(IsString())
  hora_inicio: string;

  @decorate(ApiPropertyOptional({ type: "string", description: "Horario de fim", nullable: true }))
  @decorate(IsOptional())
  @decorate(IsString())
  hora_fim?: string | null;
}

@decorate(ApiSchema({ name: "ProfessorIndisponibilidadeRRuleInputDto" }))
export class ProfessorIndisponibilidadeRRuleInputRestDto {
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

@decorate(ApiSchema({ name: "ProfessorIndisponibilidadeRRuleOutputDto" }))
export class ProfessorIndisponibilidadeRRuleOutputRestDto {
  @decorate(
    ApiPropertyOptional({
      type: "string",
      description: "Identificador do perfil (uuid)",
      format: "uuid",
    }),
  )
  @decorate(IsOptional())
  @decorate(IsUUID())
  idPerfilFk?: string;

  @decorate(ApiProperty({ type: "string", description: "String RRULE" }))
  @decorate(IsString())
  rrule: string;

  @decorate(
    ApiProperty({
      type: "integer",
      description: "Dia da semana (0=domingo, 1=segunda, ..., 6=sabado)",
    }),
  )
  @decorate(IsInt())
  @decorate(Min(0))
  @decorate(Max(6))
  diaDaSemana: number;

  @decorate(ApiProperty({ type: "string", description: "Hora de inicio da indisponibilidade" }))
  @decorate(IsString())
  horaInicio: string;

  @decorate(ApiProperty({ type: "string", description: "Hora de termino da indisponibilidade" }))
  @decorate(IsString())
  horaFim: string;
}

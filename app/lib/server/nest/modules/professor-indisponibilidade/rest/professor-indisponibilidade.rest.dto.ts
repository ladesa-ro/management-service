import { ApiProperty, ApiPropertyOptional, ApiSchema, PartialType } from "@nestjs/swagger";
import { IsDateString, IsInt, IsOptional, IsString, IsUUID, Max, Min } from "class-validator";
import {
  commonProperties,
  RegisterModel,
  simpleProperty,
} from "@/modules/@shared/infrastructure/persistence/typeorm/metadata";
import {
  PaginationInputRestDto,
  PaginationMetaRestDto,
} from "@/modules/@shared/infrastructure/presentation/rest/dtos";

// ============================================================================
// FindOne Output
// ============================================================================

@ApiSchema({ name: "ProfessorIndisponibilidadeFindOneOutputDto" })
@RegisterModel({
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
})
export class ProfessorIndisponibilidadeFindOneOutputRestDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @IsUUID()
  id: string;

  @ApiProperty({ description: "Identificador do perfil (uuid)", format: "uuid" })
  @IsUUID()
  idPerfilFk: string;

  @ApiProperty({ description: "Dia da semana (0=domingo, 1=segunda, ..., 6=sabado)" })
  @IsInt()
  @Min(0)
  @Max(6)
  diaDaSemana: number;

  @ApiProperty({ description: "Hora de inicio da indisponibilidade" })
  @IsString()
  horaInicio: string;

  @ApiProperty({ description: "Hora de termino da indisponibilidade" })
  @IsString()
  horaFim: string;

  @ApiProperty({ description: "Motivo da indisponibilidade" })
  @IsString()
  motivo: string;

  @ApiPropertyOptional({ description: "Data e hora da criacao do registro" })
  @IsOptional()
  @IsDateString()
  dateCreated?: Date;

  @ApiPropertyOptional({ description: "Data e hora da alteracao do registro" })
  @IsOptional()
  @IsDateString()
  dateUpdated?: Date;

  @ApiPropertyOptional({ description: "Data e hora da exclusao do registro", nullable: true })
  @IsOptional()
  @IsDateString()
  dateDeleted?: Date | null;
}

// ============================================================================
// List Input/Output
// ============================================================================

@ApiSchema({ name: "ProfessorIndisponibilidadeListInputDto" })
export class ProfessorIndisponibilidadeListInputRestDto extends PaginationInputRestDto {
  @ApiPropertyOptional({
    description: "Filtro por ID do perfil",
    type: String,
  })
  @IsOptional()
  @IsUUID()
  idPerfilFk?: string;
}

@ApiSchema({ name: "ProfessorIndisponibilidadeListOutputDto" })
export class ProfessorIndisponibilidadeListOutputRestDto {
  @ApiProperty({ type: () => PaginationMetaRestDto, description: "Metadados da busca" })
  meta: PaginationMetaRestDto;

  @ApiProperty({
    type: () => [ProfessorIndisponibilidadeFindOneOutputRestDto],
    description: "Resultados da busca",
  })
  data: ProfessorIndisponibilidadeFindOneOutputRestDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@ApiSchema({ name: "ProfessorIndisponibilidadeCreateInputDto" })
export class ProfessorIndisponibilidadeCreateInputRestDto {
  @ApiPropertyOptional({ description: "Identificador do perfil (uuid)", format: "uuid" })
  @IsOptional()
  @IsUUID()
  idPerfilFk?: string;

  @ApiProperty({ description: "Dia da semana (0=domingo, 1=segunda, ..., 6=sabado)" })
  @IsInt()
  @Min(0)
  @Max(6)
  diaDaSemana: number;

  @ApiProperty({ description: "Hora de inicio da indisponibilidade" })
  @IsString()
  horaInicio: string;

  @ApiProperty({ description: "Hora de termino da indisponibilidade" })
  @IsString()
  horaFim: string;

  @ApiProperty({ description: "Motivo da indisponibilidade" })
  @IsString()
  motivo: string;
}

@ApiSchema({ name: "ProfessorIndisponibilidadeUpdateInputDto" })
export class ProfessorIndisponibilidadeUpdateInputRestDto extends PartialType(
  ProfessorIndisponibilidadeCreateInputRestDto,
) {}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@ApiSchema({ name: "ProfessorIndisponibilidadeFindOneInputDto" })
export class ProfessorIndisponibilidadeFindOneInputRestDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @IsUUID()
  id: string;
}

// ============================================================================
// ListByPerfil Input (for path params)
// ============================================================================

@ApiSchema({ name: "ProfessorIndisponibilidadeListByPerfilInputDto" })
export class ProfessorIndisponibilidadeListByPerfilInputRestDto {
  @ApiProperty({ description: "Identificador do perfil (uuid)", format: "uuid" })
  @IsUUID()
  idPerfilFk: string;
}

// ============================================================================
// Create with Perfil Input (for path params)
// ============================================================================

@ApiSchema({ name: "ProfessorIndisponibilidadeCreatePerfilInputDto" })
export class ProfessorIndisponibilidadeCreatePerfilInputRestDto {
  @ApiProperty({ description: "Identificador do perfil (uuid)", format: "uuid" })
  @IsUUID()
  id_perfil: string;
}

// ============================================================================
// RRule View/Input/Output
// ============================================================================

@ApiSchema({ name: "ProfessorIndisponibilidadeRRuleViewDto" })
export class ProfessorIndisponibilidadeRRuleViewRestDto {
  @ApiProperty({ description: "Identificador da indisponibilidade (uuid)", format: "uuid" })
  @IsUUID()
  id: string;

  @ApiProperty({ description: "Identificador do perfil (uuid)", format: "uuid" })
  @IsUUID()
  id_perfil_fk: string;

  @ApiProperty({
    description:
      "String RRULE + possivel DTSTART (ex: 'DTSTART:20251025T080000\\nRRULE:FREQ=WEEKLY;BYDAY=MO')",
  })
  @IsString()
  rrule: string;

  @ApiProperty({ description: "Horario de inicio" })
  @IsString()
  hora_inicio: string;

  @ApiPropertyOptional({ description: "Horario de fim", nullable: true })
  @IsOptional()
  @IsString()
  hora_fim?: string | null;
}

@ApiSchema({ name: "ProfessorIndisponibilidadeRRuleInputDto" })
export class ProfessorIndisponibilidadeRRuleInputRestDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @IsUUID()
  id: string;
}

@ApiSchema({ name: "ProfessorIndisponibilidadeRRuleOutputDto" })
export class ProfessorIndisponibilidadeRRuleOutputRestDto {
  @ApiPropertyOptional({ description: "Identificador do perfil (uuid)", format: "uuid" })
  @IsOptional()
  @IsUUID()
  idPerfilFk?: string;

  @ApiProperty({ description: "String RRULE" })
  @IsString()
  rrule: string;

  @ApiProperty({ description: "Dia da semana (0=domingo, 1=segunda, ..., 6=sabado)" })
  @IsInt()
  @Min(0)
  @Max(6)
  diaDaSemana: number;

  @ApiProperty({ description: "Hora de inicio da indisponibilidade" })
  @IsString()
  horaInicio: string;

  @ApiProperty({ description: "Hora de termino da indisponibilidade" })
  @IsString()
  horaFim: string;
}

import { ArgsType, Field, ID, InputType, Int, ObjectType } from "@nestjs/graphql";
import { ApiProperty, ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import { IsDateString, IsInt, IsOptional, IsString, IsUUID, Max, Min } from "class-validator";
import {
  commonProperties,
  RegisterModel,
  simpleProperty,
} from "@/modules/@shared/infrastructure/persistence/typeorm/metadata";
import {
  PaginationInputDto,
  PaginationMetaDto,
} from "@/modules/@shared/infrastructure/presentation/rest/dtos";

// ============================================================================
// FindOne Output
// ============================================================================

@ObjectType("ProfessorIndisponibilidade")
@RegisterModel({
  name: "ProfessorIndisponibilidadeFindOneOutput",
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
export class ProfessorIndisponibilidadeFindOneOutputDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @Field(() => ID)
  @IsUUID()
  id: string;

  @ApiProperty({ description: "Identificador do perfil (uuid)", format: "uuid" })
  @Field()
  @IsUUID()
  idPerfilFk: string;

  @ApiProperty({ description: "Dia da semana (0=domingo, 1=segunda, ..., 6=sabado)" })
  @Field(() => Int)
  @IsInt()
  @Min(0)
  @Max(6)
  diaDaSemana: number;

  @ApiProperty({ description: "Hora de inicio da indisponibilidade" })
  @Field()
  @IsString()
  horaInicio: string;

  @ApiProperty({ description: "Hora de termino da indisponibilidade" })
  @Field()
  @IsString()
  horaFim: string;

  @ApiProperty({ description: "Motivo da indisponibilidade" })
  @Field()
  @IsString()
  motivo: string;

  @ApiPropertyOptional({ description: "Data e hora da criacao do registro" })
  @Field({ nullable: true })
  @IsOptional()
  @IsDateString()
  dateCreated?: Date;

  @ApiPropertyOptional({ description: "Data e hora da alteracao do registro" })
  @Field({ nullable: true })
  @IsOptional()
  @IsDateString()
  dateUpdated?: Date;

  @ApiPropertyOptional({ description: "Data e hora da exclusao do registro", nullable: true })
  @Field({ nullable: true })
  @IsOptional()
  @IsDateString()
  dateDeleted?: Date | null;
}

// ============================================================================
// List Input/Output
// ============================================================================

@ArgsType()
@InputType("ProfessorIndisponibilidadeListInput")
export class ProfessorIndisponibilidadeListInputDto extends PaginationInputDto {
  @ApiPropertyOptional({
    description: "Filtro por ID do perfil",
    type: String,
  })
  @Field({ nullable: true })
  @IsOptional()
  @IsUUID()
  idPerfilFk?: string;
}

@ObjectType("ProfessorIndisponibilidadeListOutput")
export class ProfessorIndisponibilidadeListOutputDto {
  @ApiProperty({ type: () => PaginationMetaDto, description: "Metadados da busca" })
  @Field(() => PaginationMetaDto)
  meta: PaginationMetaDto;

  @ApiProperty({
    type: () => [ProfessorIndisponibilidadeFindOneOutputDto],
    description: "Resultados da busca",
  })
  @Field(() => [ProfessorIndisponibilidadeFindOneOutputDto])
  data: ProfessorIndisponibilidadeFindOneOutputDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@InputType("ProfessorIndisponibilidadeCreateInput")
export class ProfessorIndisponibilidadeCreateInputDto {
  @ApiPropertyOptional({ description: "Identificador do perfil (uuid)", format: "uuid" })
  @Field({ nullable: true })
  @IsOptional()
  @IsUUID()
  idPerfilFk?: string;

  @ApiProperty({ description: "Dia da semana (0=domingo, 1=segunda, ..., 6=sabado)" })
  @Field(() => Int)
  @IsInt()
  @Min(0)
  @Max(6)
  diaDaSemana: number;

  @ApiProperty({ description: "Hora de inicio da indisponibilidade" })
  @Field()
  @IsString()
  horaInicio: string;

  @ApiProperty({ description: "Hora de termino da indisponibilidade" })
  @Field()
  @IsString()
  horaFim: string;

  @ApiProperty({ description: "Motivo da indisponibilidade" })
  @Field()
  @IsString()
  motivo: string;
}

@InputType("ProfessorIndisponibilidadeUpdateInput")
export class ProfessorIndisponibilidadeUpdateInputDto extends PartialType(
  ProfessorIndisponibilidadeCreateInputDto,
) {}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@ArgsType()
@InputType("ProfessorIndisponibilidadeFindOneInput")
export class ProfessorIndisponibilidadeFindOneInputDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @Field(() => ID)
  @IsUUID()
  id: string;
}

// ============================================================================
// ListByPerfil Input (for path params)
// ============================================================================

@ArgsType()
@InputType("ProfessorIndisponibilidadeListByPerfilInput")
export class ProfessorIndisponibilidadeListByPerfilInputDto {
  @ApiProperty({ description: "Identificador do perfil (uuid)", format: "uuid" })
  @Field(() => ID)
  @IsUUID()
  idPerfilFk: string;
}

// ============================================================================
// Create with Perfil Input (for path params)
// ============================================================================

@ArgsType()
@InputType("ProfessorIndisponibilidadeCreatePerfilInput")
export class ProfessorIndisponibilidadeCreatePerfilInputDto {
  @ApiProperty({ description: "Identificador do perfil (uuid)", format: "uuid" })
  @Field(() => ID)
  @IsUUID()
  id_perfil: string;
}

// ============================================================================
// RRule View/Input/Output
// ============================================================================

@ObjectType("ProfessorIndisponibilidadeRRuleView")
export class ProfessorIndisponibilidadeRRuleViewDto {
  @ApiProperty({ description: "Identificador da indisponibilidade (uuid)", format: "uuid" })
  @Field(() => ID)
  @IsUUID()
  id: string;

  @ApiProperty({ description: "Identificador do perfil (uuid)", format: "uuid" })
  @Field()
  @IsUUID()
  id_perfil_fk: string;

  @ApiProperty({
    description:
      "String RRULE + possivel DTSTART (ex: 'DTSTART:20251025T080000\\nRRULE:FREQ=WEEKLY;BYDAY=MO')",
  })
  @Field()
  @IsString()
  rrule: string;

  @ApiProperty({ description: "Horario de inicio" })
  @Field()
  @IsString()
  hora_inicio: string;

  @ApiPropertyOptional({ description: "Horario de fim", nullable: true })
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  hora_fim?: string | null;
}

@ArgsType()
@InputType("ProfessorIndisponibilidadeRRuleInput")
export class ProfessorIndisponibilidadeRRuleInputDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @Field(() => ID)
  @IsUUID()
  id: string;
}

@ObjectType("ProfessorIndisponibilidadeRRuleOutput")
export class ProfessorIndisponibilidadeRRuleOutputDto {
  @ApiPropertyOptional({ description: "Identificador do perfil (uuid)", format: "uuid" })
  @Field({ nullable: true })
  @IsOptional()
  @IsUUID()
  idPerfilFk?: string;

  @ApiProperty({ description: "String RRULE" })
  @Field()
  @IsString()
  rrule: string;

  @ApiProperty({ description: "Dia da semana (0=domingo, 1=segunda, ..., 6=sabado)" })
  @Field(() => Int)
  @IsInt()
  @Min(0)
  @Max(6)
  diaDaSemana: number;

  @ApiProperty({ description: "Hora de inicio da indisponibilidade" })
  @Field()
  @IsString()
  horaInicio: string;

  @ApiProperty({ description: "Hora de termino da indisponibilidade" })
  @Field()
  @IsString()
  horaFim: string;
}

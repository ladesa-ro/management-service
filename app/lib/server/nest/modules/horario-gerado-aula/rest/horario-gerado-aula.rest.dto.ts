import { ApiProperty, ApiPropertyOptional, ApiSchema, PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsDateString, IsOptional, IsUUID, ValidateNested } from "class-validator";
import {
  commonProperties,
  RegisterModel,
  referenceProperty,
  simpleProperty,
} from "@/modules/@shared/infrastructure/persistence/typeorm/metadata";
import {
  PaginationInputRestDto,
  PaginationMetaRestDto,
  TransformToArray,
} from "@/modules/@shared/infrastructure/presentation/rest/dtos";
import {
  DiarioProfessorFindOneInputRestDto,
  DiarioProfessorFindOneOutputRestDto,
} from "@/server/nest/modules/diario-professor/rest";
import {
  HorarioGeradoFindOneInputRestDto,
  HorarioGeradoFindOneOutputRestDto,
} from "@/server/nest/modules/horario-gerado/rest";
import {
  IntervaloDeTempoFindOneInputRestDto,
  IntervaloDeTempoFindOneOutputRestDto,
} from "@/server/nest/modules/intervalo-de-tempo/rest/intervalo-de-tempo.rest.dto";

// ============================================================================
// FindOne Output
// ============================================================================

@ApiSchema({ name: "HorarioGeradoAulaFindOneOutputDto" })
@RegisterModel({
  name: "HorarioGeradoAulaFindOneOutputDto",
  properties: [
    simpleProperty("id"),
    simpleProperty("data"),
    referenceProperty("intervaloDeTempo", "IntervaloDeTempoFindOneOutputDto"),
    referenceProperty("diarioProfessor", "DiarioProfessorFindOneOutputDto"),
    referenceProperty("horarioGerado", "HorarioGeradoFindOneOutputDto"),
    ...commonProperties.dated,
  ],
})
export class HorarioGeradoAulaFindOneOutputRestDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @IsUUID()
  id: string;

  @ApiProperty({ description: "Data da aula gerada" })
  @IsDateString()
  data: Date;

  @ApiProperty({
    type: () => IntervaloDeTempoFindOneOutputRestDto,
    description: "Intervalo de tempo",
  })
  @ValidateNested()
  @Type(() => IntervaloDeTempoFindOneOutputRestDto)
  intervaloDeTempo: IntervaloDeTempoFindOneOutputRestDto;

  @ApiProperty({
    type: () => DiarioProfessorFindOneOutputRestDto,
    description: "Vinculo de diario e professor",
  })
  @ValidateNested()
  @Type(() => DiarioProfessorFindOneOutputRestDto)
  diarioProfessor: DiarioProfessorFindOneOutputRestDto;

  @ApiProperty({
    type: () => HorarioGeradoFindOneOutputRestDto,
    description: "Horario ao qual a aula pertence",
  })
  @ValidateNested()
  @Type(() => HorarioGeradoFindOneOutputRestDto)
  horarioGerado: HorarioGeradoFindOneOutputRestDto;

  @ApiProperty({ description: "Data e hora da criacao do registro" })
  @IsDateString()
  dateCreated: Date;

  @ApiProperty({ description: "Data e hora da alteracao do registro" })
  @IsDateString()
  dateUpdated: Date;

  @ApiPropertyOptional({ description: "Data e hora da exclusao do registro", nullable: true })
  @IsOptional()
  @IsDateString()
  dateDeleted: Date | null;
}

// ============================================================================
// List Input/Output
// ============================================================================

@ApiSchema({ name: "HorarioGeradoAulaListInputDto" })
export class HorarioGeradoAulaListInputRestDto extends PaginationInputRestDto {
  @ApiPropertyOptional({
    description: "Filtro por ID",
    type: [String],
  })
  @TransformToArray()
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  "filter.id"?: string[];

  @ApiPropertyOptional({
    description: "Filtro por ID do Horario Gerado",
    type: [String],
  })
  @TransformToArray()
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  "filter.horarioGerado.id"?: string[];
}

@ApiSchema({ name: "HorarioGeradoAulaListOutputDto" })
export class HorarioGeradoAulaListOutputRestDto {
  @ApiProperty({ type: () => PaginationMetaRestDto, description: "Metadados da busca" })
  meta: PaginationMetaRestDto;

  @ApiProperty({
    type: () => [HorarioGeradoAulaFindOneOutputRestDto],
    description: "Resultados da busca",
  })
  data: HorarioGeradoAulaFindOneOutputRestDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@ApiSchema({ name: "HorarioGeradoAulaCreateInputDto" })
export class HorarioGeradoAulaCreateInputRestDto {
  @ApiProperty({ description: "Data da aula gerada" })
  @IsDateString()
  data: Date;

  @ApiProperty({
    type: () => IntervaloDeTempoFindOneInputRestDto,
    description: "Intervalo de tempo",
  })
  @ValidateNested()
  @Type(() => IntervaloDeTempoFindOneInputRestDto)
  intervaloDeTempo: IntervaloDeTempoFindOneInputRestDto;

  @ApiProperty({
    type: () => DiarioProfessorFindOneInputRestDto,
    description: "Vinculo de diario e professor",
  })
  @ValidateNested()
  @Type(() => DiarioProfessorFindOneInputRestDto)
  diarioProfessor: DiarioProfessorFindOneInputRestDto;

  @ApiProperty({
    type: () => HorarioGeradoFindOneInputRestDto,
    description: "Horario ao qual a aula pertence",
  })
  @ValidateNested()
  @Type(() => HorarioGeradoFindOneInputRestDto)
  horarioGerado: HorarioGeradoFindOneInputRestDto;
}

@ApiSchema({ name: "HorarioGeradoAulaUpdateInputDto" })
export class HorarioGeradoAulaUpdateInputRestDto extends PartialType(
  HorarioGeradoAulaCreateInputRestDto,
) {}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@ApiSchema({ name: "HorarioGeradoAulaFindOneInputDto" })
export class HorarioGeradoAulaFindOneInputRestDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @IsUUID()
  id: string;
}

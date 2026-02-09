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
  GradeHorarioOfertaFormacaoFindOneInputRestDto,
  GradeHorarioOfertaFormacaoFindOneOutputRestDto,
} from "@/server/nest/modules/grade-horario-oferta-formacao/rest";
import {
  IntervaloDeTempoFindOneInputRestDto,
  IntervaloDeTempoFindOneOutputRestDto,
} from "@/server/nest/modules/intervalo-de-tempo/rest/intervalo-de-tempo.rest.dto";

// ============================================================================
// FindOne Output
// ============================================================================

@ApiSchema({ name: "GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputDto" })
@RegisterModel({
  name: "GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputDto",
  properties: [
    simpleProperty("id"),
    referenceProperty("gradeHorarioOfertaFormacao", "GradeHorarioOfertaFormacaoFindOneOutputDto"),
    referenceProperty("intervaloDeTempo", "IntervaloDeTempoFindOneOutputDto"),
    ...commonProperties.dated,
  ],
})
export class GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputRestDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @IsUUID()
  id: string;

  @ApiProperty({
    type: () => GradeHorarioOfertaFormacaoFindOneOutputRestDto,
    description: "Grade horaria da oferta de formacao",
  })
  @ValidateNested()
  @Type(() => GradeHorarioOfertaFormacaoFindOneOutputRestDto)
  gradeHorarioOfertaFormacao: GradeHorarioOfertaFormacaoFindOneOutputRestDto;

  @ApiProperty({
    type: () => IntervaloDeTempoFindOneOutputRestDto,
    description: "Intervalo de tempo",
  })
  @ValidateNested()
  @Type(() => IntervaloDeTempoFindOneOutputRestDto)
  intervaloDeTempo: IntervaloDeTempoFindOneOutputRestDto;

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

@ApiSchema({ name: "GradeHorarioOfertaFormacaoIntervaloDeTempoListInputDto" })
export class GradeHorarioOfertaFormacaoIntervaloDeTempoListInputRestDto extends PaginationInputRestDto {
  @ApiPropertyOptional({
    description: "Filtro por ID",
    type: [String],
  })
  @TransformToArray()
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  "filter.id"?: string[];
}

@ApiSchema({ name: "GradeHorarioOfertaFormacaoIntervaloDeTempoListOutputDto" })
export class GradeHorarioOfertaFormacaoIntervaloDeTempoListOutputRestDto {
  @ApiProperty({ type: () => PaginationMetaRestDto, description: "Metadados da busca" })
  meta: PaginationMetaRestDto;

  @ApiProperty({
    type: () => [GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputRestDto],
    description: "Resultados da busca",
  })
  data: GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputRestDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@ApiSchema({ name: "GradeHorarioOfertaFormacaoIntervaloDeTempoCreateInputDto" })
export class GradeHorarioOfertaFormacaoIntervaloDeTempoCreateInputRestDto {
  @ApiProperty({
    type: () => GradeHorarioOfertaFormacaoFindOneInputRestDto,
    description: "Grade horaria da oferta de formacao",
  })
  @ValidateNested()
  @Type(() => GradeHorarioOfertaFormacaoFindOneInputRestDto)
  gradeHorarioOfertaFormacao: GradeHorarioOfertaFormacaoFindOneInputRestDto;

  @ApiProperty({
    type: () => IntervaloDeTempoFindOneInputRestDto,
    description: "Intervalo de tempo",
  })
  @ValidateNested()
  @Type(() => IntervaloDeTempoFindOneInputRestDto)
  intervaloDeTempo: IntervaloDeTempoFindOneInputRestDto;
}

@ApiSchema({ name: "GradeHorarioOfertaFormacaoIntervaloDeTempoUpdateInputDto" })
export class GradeHorarioOfertaFormacaoIntervaloDeTempoUpdateInputRestDto extends PartialType(
  GradeHorarioOfertaFormacaoIntervaloDeTempoCreateInputRestDto,
) {}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@ApiSchema({ name: "GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneInputDto" })
export class GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneInputRestDto {
  @ApiProperty({ description: "Identificador do registro (uuid)", format: "uuid" })
  @IsUUID()
  id: string;
}

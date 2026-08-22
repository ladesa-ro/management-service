import { ApiProperty, ApiPropertyOptional, ApiSchema } from "@/shared/presentation/rest";
import { GerarHorarioFields } from "../domain/gerar-horario.fields";

// ============================================================================
// Create Input
// ============================================================================

@ApiSchema({ name: "GerarHorarioCreateInputDto" })
export class GerarHorarioCreateInputRestDto {
  @ApiProperty(GerarHorarioFields.dataInicio.swaggerMetadata)
  dataInicio: string;

  @ApiPropertyOptional(GerarHorarioFields.dataTermino.swaggerMetadata)
  dataTermino?: string;

  @ApiPropertyOptional(GerarHorarioFields.ofertaFormacaoIds.swaggerMetadata)
  ofertaFormacaoIds?: string[];

  @ApiPropertyOptional(GerarHorarioFields.calendarioLetivoIds.swaggerMetadata)
  calendarioLetivoIds?: string[];

  @ApiPropertyOptional(GerarHorarioFields.boostSameDayOfWeekAndTimeSlot.swaggerMetadata)
  boostSameDayOfWeekAndTimeSlot?: number;

  @ApiPropertyOptional(GerarHorarioFields.boostSameDayOfWeekOnly.swaggerMetadata)
  boostSameDayOfWeekOnly?: number;

  @ApiPropertyOptional(GerarHorarioFields.boostSameTimeSlotOnly.swaggerMetadata)
  boostSameTimeSlotOnly?: number;

  @ApiPropertyOptional(GerarHorarioFields.boostLesserDistanceFromDayOfWeek.swaggerMetadata)
  boostLesserDistanceFromDayOfWeek?: number;

  @ApiPropertyOptional(GerarHorarioFields.boostLesserDistanceFromTimeSlot.swaggerMetadata)
  boostLesserDistanceFromTimeSlot?: number;

  @ApiPropertyOptional(GerarHorarioFields.enabledConstraints.swaggerMetadata)
  enabledConstraints?: string[] | null;

  @ApiPropertyOptional(GerarHorarioFields.duracao.swaggerMetadata)
  duracao?: string;
}

// ============================================================================
// FindOne Params
// ============================================================================

@ApiSchema({ name: "GerarHorarioFindOneParamsDto" })
export class GerarHorarioFindOneParamsRestDto {
  @ApiProperty(GerarHorarioFields.id.swaggerMetadata)
  id: string;
}

// ============================================================================
// FindOne Output
// ============================================================================

@ApiSchema({ name: "GerarHorarioFindOneOutputDto" })
export class GerarHorarioFindOneOutputRestDto {
  @ApiProperty(GerarHorarioFields.id.swaggerMetadata) id: string;

  @ApiProperty(GerarHorarioFields.status.swaggerMetadata)
  status: string;

  @ApiProperty(GerarHorarioFields.duracao.swaggerMetadata)
  duracao: string;

  @ApiProperty(GerarHorarioFields.dataInicio.swaggerMetadata)
  dataInicio: string;

  @ApiPropertyOptional(GerarHorarioFields.dataTermino.swaggerMetadata)
  dataTermino: string | null;

  @ApiPropertyOptional(GerarHorarioFields.respostaGerador.swaggerMetadata)
  respostaGerador: Record<string, unknown> | null;

  @ApiPropertyOptional({
    description:
      "Sessão de edição aberta com a grade aceita como proposta, preenchida só na resposta de POST /:id/aceitar",
  })
  sessaoEdicaoId?: string;

  @ApiProperty(GerarHorarioFields.dateCreated.swaggerMetadata)
  dateCreated: string;

  @ApiPropertyOptional(GerarHorarioFields.ofertaFormacaoIds.swaggerMetadata)
  ofertaFormacaoIds: string[];

  @ApiPropertyOptional(GerarHorarioFields.calendarioLetivoIds.swaggerMetadata)
  calendarioLetivoIds: string[];
}

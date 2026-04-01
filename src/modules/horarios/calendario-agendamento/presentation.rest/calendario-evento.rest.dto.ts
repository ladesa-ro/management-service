import { SharedFields } from "@/domain/abstractions";
import { CalendarioEventoFields } from "@/modules/horarios/calendario-agendamento/domain/calendario-evento.fields";
import { ApiProperty, ApiPropertyOptional, ApiSchema } from "@/shared/presentation/rest";

// ============================================================================
// Create Input
// ============================================================================

@ApiSchema({ name: "CalendarioEventoCreateInputDto" })
export class CalendarioEventoCreateInputRestDto {
  @ApiProperty(CalendarioEventoFields.nome.swaggerMetadata)
  nome: string;

  @ApiProperty(CalendarioEventoFields.dataInicio.swaggerMetadata)
  dataInicio: string;

  @ApiPropertyOptional(CalendarioEventoFields.dataFim.swaggerMetadata)
  dataFim?: string;

  @ApiProperty(CalendarioEventoFields.diaInteiro.swaggerMetadata)
  diaInteiro: boolean;

  @ApiPropertyOptional(CalendarioEventoFields.horarioInicio.swaggerMetadata)
  horarioInicio?: string;

  @ApiPropertyOptional(CalendarioEventoFields.horarioFim.swaggerMetadata)
  horarioFim?: string;

  @ApiPropertyOptional(CalendarioEventoFields.cor.swaggerMetadata)
  cor?: string;

  @ApiPropertyOptional(CalendarioEventoFields.repeticao.swaggerMetadata)
  repeticao?: string;

  @ApiPropertyOptional({
    type: "string",
    isArray: true,
    ...CalendarioEventoFields.turmaIds.swaggerMetadata,
  })
  turmaIds?: string[];

  @ApiPropertyOptional({
    type: "string",
    isArray: true,
    ...CalendarioEventoFields.perfilIds.swaggerMetadata,
  })
  perfilIds?: string[];

  @ApiPropertyOptional({
    type: "string",
    isArray: true,
    ...CalendarioEventoFields.calendarioLetivoIds.swaggerMetadata,
  })
  calendarioLetivoIds?: string[];

  @ApiPropertyOptional({
    type: "string",
    isArray: true,
    ...CalendarioEventoFields.ofertaFormacaoIds.swaggerMetadata,
  })
  ofertaFormacaoIds?: string[];

  @ApiPropertyOptional({
    type: "string",
    isArray: true,
    ...CalendarioEventoFields.modalidadeIds.swaggerMetadata,
  })
  modalidadeIds?: string[];

  @ApiPropertyOptional({
    type: "string",
    isArray: true,
    ...CalendarioEventoFields.ambienteIds.swaggerMetadata,
  })
  ambienteIds?: string[];

  @ApiPropertyOptional({
    type: "string",
    isArray: true,
    ...CalendarioEventoFields.diarioIds.swaggerMetadata,
  })
  diarioIds?: string[];
}

// ============================================================================
// Update Input
// ============================================================================

@ApiSchema({ name: "CalendarioEventoUpdateInputDto" })
export class CalendarioEventoUpdateInputRestDto {
  @ApiPropertyOptional(CalendarioEventoFields.nome.swaggerMetadata) nome?: string;
  @ApiPropertyOptional(CalendarioEventoFields.dataInicio.swaggerMetadata) dataInicio?: string;
  @ApiPropertyOptional(CalendarioEventoFields.dataFim.swaggerMetadata) dataFim?: string;
  @ApiPropertyOptional(CalendarioEventoFields.diaInteiro.swaggerMetadata) diaInteiro?: boolean;
  @ApiPropertyOptional(CalendarioEventoFields.horarioInicio.swaggerMetadata) horarioInicio?: string;
  @ApiPropertyOptional(CalendarioEventoFields.horarioFim.swaggerMetadata) horarioFim?: string;
  @ApiPropertyOptional(CalendarioEventoFields.cor.swaggerMetadata) cor?: string;
  @ApiPropertyOptional(CalendarioEventoFields.repeticao.swaggerMetadata) repeticao?: string;

  @ApiPropertyOptional({
    type: "string",
    isArray: true,
    ...CalendarioEventoFields.turmaIds.swaggerMetadata,
  })
  turmaIds?: string[];

  @ApiPropertyOptional({
    type: "string",
    isArray: true,
    ...CalendarioEventoFields.perfilIds.swaggerMetadata,
  })
  perfilIds?: string[];

  @ApiPropertyOptional({
    type: "string",
    isArray: true,
    ...CalendarioEventoFields.calendarioLetivoIds.swaggerMetadata,
  })
  calendarioLetivoIds?: string[];

  @ApiPropertyOptional({
    type: "string",
    isArray: true,
    ...CalendarioEventoFields.ofertaFormacaoIds.swaggerMetadata,
  })
  ofertaFormacaoIds?: string[];

  @ApiPropertyOptional({
    type: "string",
    isArray: true,
    ...CalendarioEventoFields.modalidadeIds.swaggerMetadata,
  })
  modalidadeIds?: string[];

  @ApiPropertyOptional({
    type: "string",
    isArray: true,
    ...CalendarioEventoFields.ambienteIds.swaggerMetadata,
  })
  ambienteIds?: string[];

  @ApiPropertyOptional({
    type: "string",
    isArray: true,
    ...CalendarioEventoFields.diarioIds.swaggerMetadata,
  })
  diarioIds?: string[];
}

// ============================================================================
// Params
// ============================================================================

@ApiSchema({ name: "CalendarioEventoFindOneParamsDto" })
export class CalendarioEventoFindOneParamsRestDto {
  @ApiProperty(CalendarioEventoFields.id.swaggerMetadata)
  id: string;
}

// ============================================================================
// Output
// ============================================================================

@ApiSchema({ name: "CalendarioEventoFindOneOutputDto" })
export class CalendarioEventoFindOneOutputRestDto {
  @ApiProperty(CalendarioEventoFields.id.swaggerMetadata) id: string;
  @ApiPropertyOptional(CalendarioEventoFields.nome.swaggerMetadata) nome: string | null;
  @ApiProperty(CalendarioEventoFields.dataInicio.swaggerMetadata) dataInicio: string;
  @ApiPropertyOptional(CalendarioEventoFields.dataFim.swaggerMetadata) dataFim: string | null;
  @ApiProperty(CalendarioEventoFields.diaInteiro.swaggerMetadata) diaInteiro: boolean;
  @ApiProperty(CalendarioEventoFields.horarioInicio.swaggerMetadata) horarioInicio: string;
  @ApiProperty(CalendarioEventoFields.horarioFim.swaggerMetadata) horarioFim: string;
  @ApiPropertyOptional(CalendarioEventoFields.cor.swaggerMetadata) cor: string | null;
  @ApiPropertyOptional(CalendarioEventoFields.repeticao.swaggerMetadata) repeticao: string | null;
  @ApiPropertyOptional(CalendarioEventoFields.status.swaggerMetadata) status: string | null;
  @ApiPropertyOptional({
    type: "string",
    isArray: true,
    ...CalendarioEventoFields.turmaIds.swaggerMetadata,
  })
  turmaIds?: string[];
  @ApiPropertyOptional({
    type: "string",
    isArray: true,
    ...CalendarioEventoFields.perfilIds.swaggerMetadata,
  })
  perfilIds?: string[];
  @ApiPropertyOptional({
    type: "string",
    isArray: true,
    ...CalendarioEventoFields.calendarioLetivoIds.swaggerMetadata,
  })
  calendarioLetivoIds?: string[];
  @ApiPropertyOptional({
    type: "string",
    isArray: true,
    ...CalendarioEventoFields.ofertaFormacaoIds.swaggerMetadata,
  })
  ofertaFormacaoIds?: string[];
  @ApiPropertyOptional({
    type: "string",
    isArray: true,
    ...CalendarioEventoFields.modalidadeIds.swaggerMetadata,
  })
  modalidadeIds?: string[];
  @ApiPropertyOptional({
    type: "string",
    isArray: true,
    ...CalendarioEventoFields.ambienteIds.swaggerMetadata,
  })
  ambienteIds?: string[];
  @ApiPropertyOptional({
    type: "string",
    isArray: true,
    ...CalendarioEventoFields.diarioIds.swaggerMetadata,
  })
  diarioIds?: string[];
}

@ApiSchema({ name: "CalendarioEventoListOutputDto" })
export class CalendarioEventoListOutputRestDto {
  @ApiProperty({
    type: () => [CalendarioEventoFindOneOutputRestDto],
    ...SharedFields.data.swaggerMetadata,
  })
  data: CalendarioEventoFindOneOutputRestDto[];
}

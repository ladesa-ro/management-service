import { ApiProperty, ApiPropertyOptional, ApiSchema } from "@/shared/presentation/rest";

// ============================================================================
// Create Input
// ============================================================================

@ApiSchema({ name: "CalendarioEventoCreateInputDto" })
export class CalendarioEventoCreateInputRestDto {
  @ApiProperty({ type: "string", description: "Nome do evento" })
  nome: string;

  @ApiProperty({ type: "string", format: "date", description: "Data inicio" })
  dataInicio: string;

  @ApiPropertyOptional({ type: "string", format: "date", description: "Data fim", nullable: true })
  dataFim?: string;

  @ApiProperty({ type: "boolean", description: "Evento ocupa o dia inteiro" })
  diaInteiro: boolean;

  @ApiPropertyOptional({ type: "string", description: "Horario inicio (HH:MM)" })
  horarioInicio?: string;

  @ApiPropertyOptional({ type: "string", description: "Horario fim (HH:MM)" })
  horarioFim?: string;

  @ApiPropertyOptional({
    type: "string",
    description: "Cor do evento para exibicao",
    nullable: true,
  })
  cor?: string;

  @ApiPropertyOptional({
    type: "string",
    description: "Regra de repeticao (iCalendar RRULE)",
    nullable: true,
  })
  repeticao?: string;

  @ApiPropertyOptional({
    type: "string",
    isArray: true,
    description: "IDs das turmas participantes",
  })
  turmaIds?: string[];

  @ApiPropertyOptional({
    type: "string",
    isArray: true,
    description: "IDs dos perfis (professores) participantes",
  })
  perfilIds?: string[];

  @ApiPropertyOptional({
    type: "string",
    isArray: true,
    description: "IDs dos calendarios letivos vinculados",
  })
  calendarioLetivoIds?: string[];

  @ApiPropertyOptional({
    type: "string",
    isArray: true,
    description: "IDs das ofertas de formacao vinculadas",
  })
  ofertaFormacaoIds?: string[];

  @ApiPropertyOptional({
    type: "string",
    isArray: true,
    description: "IDs das modalidades vinculadas",
  })
  modalidadeIds?: string[];
}

// ============================================================================
// Update Input
// ============================================================================

@ApiSchema({ name: "CalendarioEventoUpdateInputDto" })
export class CalendarioEventoUpdateInputRestDto {
  @ApiPropertyOptional({ type: "string" }) nome?: string;
  @ApiPropertyOptional({ type: "string", format: "date" })
  dataInicio?: string;
  @ApiPropertyOptional({ type: "string", format: "date", nullable: true })
  dataFim?: string;
  @ApiPropertyOptional({ type: "boolean" }) diaInteiro?: boolean;
  @ApiPropertyOptional({ type: "string" }) horarioInicio?: string;
  @ApiPropertyOptional({ type: "string" }) horarioFim?: string;
  @ApiPropertyOptional({ type: "string", nullable: true }) cor?: string;
  @ApiPropertyOptional({ type: "string", nullable: true })
  repeticao?: string;

  @ApiPropertyOptional({
    type: "string",
    isArray: true,
    description: "IDs das turmas participantes",
  })
  turmaIds?: string[];

  @ApiPropertyOptional({
    type: "string",
    isArray: true,
    description: "IDs dos perfis (professores) participantes",
  })
  perfilIds?: string[];

  @ApiPropertyOptional({
    type: "string",
    isArray: true,
    description: "IDs dos calendarios letivos vinculados",
  })
  calendarioLetivoIds?: string[];

  @ApiPropertyOptional({
    type: "string",
    isArray: true,
    description: "IDs das ofertas de formacao vinculadas",
  })
  ofertaFormacaoIds?: string[];

  @ApiPropertyOptional({
    type: "string",
    isArray: true,
    description: "IDs das modalidades vinculadas",
  })
  modalidadeIds?: string[];
}

// ============================================================================
// Params
// ============================================================================

@ApiSchema({ name: "CalendarioEventoFindOneParamsDto" })
export class CalendarioEventoFindOneParamsRestDto {
  @ApiProperty({ type: "string", format: "uuid" })
  id: string;
}

// ============================================================================
// Output
// ============================================================================

@ApiSchema({ name: "CalendarioEventoFindOneOutputDto" })
export class CalendarioEventoFindOneOutputRestDto {
  @ApiProperty({ type: "string" }) id: string;
  @ApiPropertyOptional({ type: "string", nullable: true }) nome: string | null;
  @ApiProperty({ type: "string", format: "date" }) dataInicio: string;
  @ApiPropertyOptional({ type: "string", format: "date", nullable: true }) dataFim: string | null;
  @ApiProperty({ type: "boolean" }) diaInteiro: boolean;
  @ApiProperty({ type: "string" }) horarioInicio: string;
  @ApiProperty({ type: "string" }) horarioFim: string;
  @ApiPropertyOptional({ type: "string", nullable: true }) cor: string | null;
  @ApiPropertyOptional({ type: "string", nullable: true }) repeticao: string | null;
  @ApiPropertyOptional({ type: "string", nullable: true }) status: string | null;
  @ApiPropertyOptional({ type: "string", isArray: true }) turmaIds?: string[];
  @ApiPropertyOptional({ type: "string", isArray: true }) perfilIds?: string[];
  @ApiPropertyOptional({ type: "string", isArray: true }) calendarioLetivoIds?: string[];
  @ApiPropertyOptional({ type: "string", isArray: true }) ofertaFormacaoIds?: string[];
  @ApiPropertyOptional({ type: "string", isArray: true }) modalidadeIds?: string[];
}

@ApiSchema({ name: "CalendarioEventoListOutputDto" })
export class CalendarioEventoListOutputRestDto {
  @ApiProperty({ type: () => [CalendarioEventoFindOneOutputRestDto] })
  data: CalendarioEventoFindOneOutputRestDto[];
}

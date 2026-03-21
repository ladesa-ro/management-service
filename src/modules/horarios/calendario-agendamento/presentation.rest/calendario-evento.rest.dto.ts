import { ApiProperty, ApiPropertyOptional, ApiSchema } from "@/modules/@shared/presentation/rest";
import {
  IsArray,
  IsBoolean,
  IsOptional,
  IsString,
  IsUUID,
} from "@/modules/@shared/presentation/shared";

// ============================================================================
// Create Input
// ============================================================================

@ApiSchema({ name: "CalendarioEventoCreateInputDto" })
export class CalendarioEventoCreateInputRestDto {
  @ApiProperty({ type: "string", description: "Nome do evento" })
  @IsString()
  nome: string;

  @ApiProperty({ type: "string", format: "date", description: "Data inicio" })
  @IsString()
  dataInicio: string;

  @ApiPropertyOptional({ type: "string", format: "date", description: "Data fim", nullable: true })
  @IsOptional()
  @IsString()
  dataFim?: string;

  @ApiProperty({ type: "boolean", description: "Evento ocupa o dia inteiro" })
  @IsBoolean()
  diaInteiro: boolean;

  @ApiPropertyOptional({ type: "string", description: "Horario inicio (HH:MM)" })
  @IsOptional()
  @IsString()
  horarioInicio?: string;

  @ApiPropertyOptional({ type: "string", description: "Horario fim (HH:MM)" })
  @IsOptional()
  @IsString()
  horarioFim?: string;

  @ApiPropertyOptional({
    type: "string",
    description: "Cor do evento para exibicao",
    nullable: true,
  })
  @IsOptional()
  @IsString()
  cor?: string;

  @ApiPropertyOptional({
    type: "string",
    description: "Regra de repeticao (iCalendar RRULE)",
    nullable: true,
  })
  @IsOptional()
  @IsString()
  repeticao?: string;

  @ApiPropertyOptional({
    type: "string",
    isArray: true,
    description: "IDs das turmas participantes",
  })
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  turmaIds?: string[];

  @ApiPropertyOptional({
    type: "string",
    isArray: true,
    description: "IDs dos perfis (professores) participantes",
  })
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  perfilIds?: string[];

  @ApiPropertyOptional({
    type: "string",
    isArray: true,
    description: "IDs dos calendarios letivos vinculados",
  })
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  calendarioLetivoIds?: string[];

  @ApiPropertyOptional({
    type: "string",
    isArray: true,
    description: "IDs das ofertas de formacao vinculadas",
  })
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  ofertaFormacaoIds?: string[];

  @ApiPropertyOptional({
    type: "string",
    isArray: true,
    description: "IDs das modalidades vinculadas",
  })
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  modalidadeIds?: string[];
}

// ============================================================================
// Update Input
// ============================================================================

@ApiSchema({ name: "CalendarioEventoUpdateInputDto" })
export class CalendarioEventoUpdateInputRestDto {
  @ApiPropertyOptional({ type: "string" }) @IsOptional() @IsString() nome?: string;
  @ApiPropertyOptional({ type: "string", format: "date" })
  @IsOptional()
  @IsString()
  dataInicio?: string;
  @ApiPropertyOptional({ type: "string", format: "date", nullable: true })
  @IsOptional()
  @IsString()
  dataFim?: string;
  @ApiPropertyOptional({ type: "boolean" }) @IsOptional() @IsBoolean() diaInteiro?: boolean;
  @ApiPropertyOptional({ type: "string" }) @IsOptional() @IsString() horarioInicio?: string;
  @ApiPropertyOptional({ type: "string" }) @IsOptional() @IsString() horarioFim?: string;
  @ApiPropertyOptional({ type: "string", nullable: true }) @IsOptional() @IsString() cor?: string;
  @ApiPropertyOptional({ type: "string", nullable: true })
  @IsOptional()
  @IsString()
  repeticao?: string;

  @ApiPropertyOptional({
    type: "string",
    isArray: true,
    description: "IDs das turmas participantes",
  })
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  turmaIds?: string[];

  @ApiPropertyOptional({
    type: "string",
    isArray: true,
    description: "IDs dos perfis (professores) participantes",
  })
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  perfilIds?: string[];

  @ApiPropertyOptional({
    type: "string",
    isArray: true,
    description: "IDs dos calendarios letivos vinculados",
  })
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  calendarioLetivoIds?: string[];

  @ApiPropertyOptional({
    type: "string",
    isArray: true,
    description: "IDs das ofertas de formacao vinculadas",
  })
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  ofertaFormacaoIds?: string[];

  @ApiPropertyOptional({
    type: "string",
    isArray: true,
    description: "IDs das modalidades vinculadas",
  })
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  modalidadeIds?: string[];
}

// ============================================================================
// Params
// ============================================================================

@ApiSchema({ name: "CalendarioEventoFindOneParamsDto" })
export class CalendarioEventoFindOneParamsRestDto {
  @ApiProperty({ type: "string", format: "uuid" })
  @IsUUID()
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

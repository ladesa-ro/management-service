import { z } from "zod";
import { CalendarioAgendamentoFindOneOutputRestDto } from "@/modules/calendario/agendamento/presentation.rest/calendario-agendamento.rest.dto";
import { ApiProperty, ApiPropertyOptional, ApiSchema } from "@/shared/presentation/rest";

// ============================================================================
// Query Input
// ============================================================================

const ConsultaOcorrenciasQuerySchema = z.object({
  dateStart: z.string().min(1),
  dateEnd: z.string().min(1),
  campus: z.uuid().optional(),
  turma: z.uuid().optional(),
  professor: z.uuid().optional(),
  tipo: z.string().optional(),
});

@ApiSchema({ name: "ConsultaOcorrenciasQueryDto" })
export class ConsultaOcorrenciasQueryRestDto {
  static schema = ConsultaOcorrenciasQuerySchema;

  @ApiProperty({ description: "Data início do período (YYYY-MM-DD)", type: "string" })
  dateStart: string;

  @ApiProperty({ description: "Data fim do período (YYYY-MM-DD)", type: "string" })
  dateEnd: string;

  @ApiPropertyOptional({ description: "Filtro por campus ID", type: "string", format: "uuid" })
  campus?: string;

  @ApiPropertyOptional({ description: "Filtro por turma ID", type: "string", format: "uuid" })
  turma?: string;

  @ApiPropertyOptional({
    description: "Filtro por professor (perfil) ID",
    type: "string",
    format: "uuid",
  })
  professor?: string;

  @ApiPropertyOptional({
    description: "Filtro por tipo de ocorrência (AULA, EVENTO, INDISPONIBILIDADE, RESERVA)",
    type: "string",
  })
  tipo?: string;
}

// ============================================================================
// Output
// ============================================================================

@ApiSchema({ name: "ConsultaOcorrenciasOutputDto" })
export class ConsultaOcorrenciasOutputRestDto {
  @ApiProperty({
    description: "Ocorrências encontradas",
    type: () => [CalendarioAgendamentoFindOneOutputRestDto],
  })
  ocorrencias: CalendarioAgendamentoFindOneOutputRestDto[];
}

const CalendarioOcupacaoSemDetalheQuerySchema = z.object({
  campus: z.uuid(),
  dateStart: z.string().min(1),
  dateEnd: z.string().min(1),
});

@ApiSchema({ name: "CalendarioOcupacaoSemDetalheQueryDto" })
export class CalendarioOcupacaoSemDetalheQueryRestDto {
  static schema = CalendarioOcupacaoSemDetalheQuerySchema;

  @ApiProperty({ description: "Filtro por campus ID", type: "string", format: "uuid" })
  campus: string;

  @ApiProperty({ description: "Data início do período (YYYY-MM-DD)", type: "string" })
  dateStart: string;

  @ApiProperty({ description: "Data fim do período (YYYY-MM-DD)", type: "string" })
  dateEnd: string;
}

@ApiSchema({ name: "CalendarioOcupacaoSemDetalheItemDto" })
export class CalendarioOcupacaoSemDetalheItemRestDto {
  @ApiProperty({ description: "Data da ocupação (YYYY-MM-DD)", type: "string" })
  data: string;

  @ApiProperty({ description: "Horário de início", type: "string" })
  horarioInicio: string;

  @ApiProperty({ description: "Horário de fim", type: "string" })
  horarioFim: string;

  @ApiProperty({ description: "IDs dos ambientes ocupados", type: [String] })
  ambienteIds: string[];

  @ApiProperty({ description: "IDs dos professores (perfis) envolvidos", type: [String] })
  professorIds: string[];
}

@ApiSchema({ name: "CalendarioOcupacaoSemDetalheOutputDto" })
export class CalendarioOcupacaoSemDetalheOutputRestDto {
  @ApiProperty({
    description: "Ocupações encontradas, sem detalhes do evento",
    type: () => [CalendarioOcupacaoSemDetalheItemRestDto],
  })
  ocupacoes: CalendarioOcupacaoSemDetalheItemRestDto[];
}

const CalendarioAgendamentoExportarIcsQuerySchema = z.object({
  dateStart: z.string().min(1),
  dateEnd: z.string().min(1),
  campus: z.uuid().optional(),
  turma: z.uuid().optional(),
  professor: z.uuid().optional(),
  tipo: z.string().optional(),
});

@ApiSchema({ name: "CalendarioAgendamentoExportarIcsQueryDto" })
export class CalendarioAgendamentoExportarIcsQueryRestDto {
  static schema = CalendarioAgendamentoExportarIcsQuerySchema;

  @ApiProperty({ description: "Data início do período (YYYY-MM-DD)", type: "string" })
  dateStart: string;

  @ApiProperty({ description: "Data fim do período (YYYY-MM-DD)", type: "string" })
  dateEnd: string;

  @ApiPropertyOptional({ description: "Filtro por campus ID", type: "string", format: "uuid" })
  campus?: string;

  @ApiPropertyOptional({ description: "Filtro por turma ID", type: "string", format: "uuid" })
  turma?: string;

  @ApiPropertyOptional({
    description: "Filtro por professor (perfil) ID",
    type: "string",
    format: "uuid",
  })
  professor?: string;

  @ApiPropertyOptional({
    description: "Filtro por tipo de ocorrência (AULA, EVENTO, INDISPONIBILIDADE, RESERVA)",
    type: "string",
  })
  tipo?: string;
}

const CalendarioColecaoMudancasDesdeQuerySchema = z.object({
  colecaoId: z.uuid(),
  desde: z.coerce.number().int().min(0),
});

@ApiSchema({ name: "CalendarioColecaoMudancasDesdeQueryDto" })
export class CalendarioColecaoMudancasDesdeQueryRestDto {
  static schema = CalendarioColecaoMudancasDesdeQuerySchema;

  @ApiProperty({ description: "ID da coleção", type: "string", format: "uuid" })
  colecaoId: string;

  @ApiProperty({
    description: "Marcador de sincronização (sync_token) já conhecido pelo cliente",
    type: "number",
  })
  desde: number;
}

@ApiSchema({ name: "CalendarioColecaoMudancasDesdeOutputDto" })
export class CalendarioColecaoMudancasDesdeOutputRestDto {
  @ApiProperty({ description: "Marcador de sincronização atual da coleção", type: "number" })
  syncToken: number;

  @ApiProperty({
    description:
      "Agendamentos considerados mudados desde o marcador informado (snapshot completo quando houve mudança — sem tabela de auditoria, não é possível devolver um diff exato)",
    type: () => [CalendarioAgendamentoFindOneOutputRestDto],
  })
  agendamentos: CalendarioAgendamentoFindOneOutputRestDto[];
}

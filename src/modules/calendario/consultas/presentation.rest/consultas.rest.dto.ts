import type {
  CalendarioAgendamentoStatus,
  CalendarioAgendamentoTipo,
} from "@/modules/calendario/agendamento/domain/calendario-agendamento.types";
import { ApiProperty, ApiPropertyOptional, ApiSchema } from "@/shared/presentation/rest";
import { z } from "zod";

// ============================================================================
// Query Input
// ============================================================================

const ConsultaAgendamentosQuerySchema = z.object({
  dateStart: z.string().min(1),
  dateEnd: z.string().min(1),
  campus: z.uuid().optional(),
  turma: z.uuid().optional(),
  professor: z.uuid().optional(),
});

@ApiSchema({ name: "ConsultaAgendamentosQueryDto" })
export class ConsultaAgendamentosQueryRestDto {
  static schema = ConsultaAgendamentosQuerySchema;

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
}

// ============================================================================
// Output
// ============================================================================

@ApiSchema({ name: "AgendamentoConsultaItemDto" })
export class AgendamentoConsultaItemRestDto {
  @ApiProperty({ description: "ID do agendamento", type: "string", format: "uuid" })
  id: string;

  @ApiProperty({ description: "Tipo do agendamento", type: "string" })
  tipo: CalendarioAgendamentoTipo;

  @ApiPropertyOptional({ description: "Nome do agendamento", type: "string", nullable: true })
  nome: string | null;

  @ApiProperty({ description: "Data início", type: "string" })
  dataInicio: string;

  @ApiPropertyOptional({ description: "Data fim", type: "string", nullable: true })
  dataFim: string | null;

  @ApiProperty({ description: "Dia inteiro", type: "boolean" })
  diaInteiro: boolean;

  @ApiProperty({ description: "Horário início", type: "string" })
  horarioInicio: string;

  @ApiProperty({ description: "Horário fim", type: "string" })
  horarioFim: string;

  @ApiPropertyOptional({ description: "Cor", type: "string", nullable: true })
  cor: string | null;

  @ApiPropertyOptional({ description: "Status", type: "string", nullable: true })
  status: CalendarioAgendamentoStatus | null;

  @ApiProperty({ description: "IDs das turmas", type: [String] })
  turmaIds: string[];

  @ApiProperty({ description: "IDs dos perfis (professores)", type: [String] })
  perfilIds: string[];

  @ApiProperty({ description: "IDs dos ambientes", type: [String] })
  ambienteIds: string[];

  @ApiProperty({ description: "IDs dos diários", type: [String] })
  diarioIds: string[];
}

@ApiSchema({ name: "ConsultaAgendamentosOutputDto" })
export class ConsultaAgendamentosOutputRestDto {
  @ApiProperty({
    description: "Agendamentos encontrados",
    type: () => [AgendamentoConsultaItemRestDto],
  })
  agendamentos: AgendamentoConsultaItemRestDto[];
}

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

import { z } from "zod";
import { horariosAulaArraySchema } from "@/modules/horarios/horarios-de-aula/domain/horario-aula-configuracao.schemas";
import { ApiProperty, ApiSchema } from "@/shared/presentation/rest";

// ============================================================================
// Parent Route Params
// ============================================================================

@ApiSchema({ name: "TurmaHorarioAulaParentParamsDto" })
export class TurmaHorarioAulaParentParamsRestDto {
  @ApiProperty({ type: "string", format: "uuid", description: "ID da turma" })
  turmaId: string;
}

// ============================================================================
// Item (value object)
// ============================================================================

@ApiSchema({ name: "TurmaHorarioAulaItemInputDto" })
export class TurmaHorarioAulaItemInputRestDto {
  @ApiProperty({ type: "string", description: "Horario inicio (HH:MM:SS)" })
  inicio: string;

  @ApiProperty({ type: "string", description: "Horario fim (HH:MM:SS)" })
  fim: string;
}

@ApiSchema({ name: "TurmaHorarioAulaItemOutputDto" })
export class TurmaHorarioAulaItemOutputRestDto {
  @ApiProperty({ type: "string" }) inicio: string;
  @ApiProperty({ type: "string" }) fim: string;
}

// ============================================================================
// Bulk Replace Input
// ============================================================================

const TurmaHorarioAulaBulkReplaceInputSchema = z.object({
  horarios: horariosAulaArraySchema,
});

@ApiSchema({ name: "TurmaHorarioAulaBulkReplaceInputDto" })
export class TurmaHorarioAulaBulkReplaceInputRestDto {
  static schema = TurmaHorarioAulaBulkReplaceInputSchema;

  @ApiProperty({
    type: () => [TurmaHorarioAulaItemInputRestDto],
    description: "Horarios de aula da turma (substituicao completa)",
  })
  horarios: TurmaHorarioAulaItemInputRestDto[];
}

// ============================================================================
// Output
// ============================================================================

@ApiSchema({ name: "TurmaHorarioAulaListOutputDto" })
export class TurmaHorarioAulaListOutputRestDto {
  @ApiProperty({ type: () => [TurmaHorarioAulaItemOutputRestDto] })
  data: TurmaHorarioAulaItemOutputRestDto[];
}

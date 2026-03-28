import { z } from "zod";
import { ApiProperty, ApiSchema } from "@/shared/presentation/rest";
import { horariosAulaArraySchema } from "../domain/horario-aula-configuracao.schemas";

// ============================================================================
// Horario Item (value object)
// ============================================================================

@ApiSchema({ name: "HorarioAulaItemInputDto" })
export class HorarioAulaItemInputRestDto {
  @ApiProperty({ type: "string", description: "Horario inicio (HH:MM:SS)" })
  inicio: string;

  @ApiProperty({ type: "string", description: "Horario fim (HH:MM:SS)" })
  fim: string;
}

@ApiSchema({ name: "HorarioAulaItemOutputDto" })
export class HorarioAulaItemOutputRestDto {
  @ApiProperty({ type: "string" }) inicio: string;
  @ApiProperty({ type: "string" }) fim: string;
}

// ============================================================================
// Params
// ============================================================================

@ApiSchema({ name: "HorarioDeAulaCampusParamsDto" })
export class HorarioDeAulaCampusParamsRestDto {
  @ApiProperty({ type: "string", format: "uuid", description: "ID do campus" })
  campusId: string;
}

// ============================================================================
// PUT Input
// ============================================================================

@ApiSchema({ name: "HorarioDeAulaReplaceInputDto" })
export class HorarioDeAulaReplaceInputRestDto {
  static schema = z.object({ horarios: horariosAulaArraySchema });

  @ApiProperty({
    type: () => [HorarioAulaItemInputRestDto],
    description: "Horarios de aula (substituicao completa)",
  })
  horarios: HorarioAulaItemInputRestDto[];
}

// ============================================================================
// Output
// ============================================================================

@ApiSchema({ name: "HorarioDeAulaListOutputDto" })
export class HorarioDeAulaListOutputRestDto {
  @ApiProperty({ type: () => [HorarioAulaItemOutputRestDto] })
  data: HorarioAulaItemOutputRestDto[];
}

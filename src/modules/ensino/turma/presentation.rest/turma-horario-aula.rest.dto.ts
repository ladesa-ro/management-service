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
// Bulk Replace Input
// ============================================================================

@ApiSchema({ name: "TurmaHorarioAulaBulkReplaceInputDto" })
export class TurmaHorarioAulaBulkReplaceInputRestDto {
  @ApiProperty({
    type: "string",
    isArray: true,
    description: "IDs dos horarios de aula selecionados",
  })
  horarioAulaIds: string[];
}

// ============================================================================
// Output
// ============================================================================

@ApiSchema({ name: "TurmaHorarioAulaFindOneOutputDto" })
export class TurmaHorarioAulaFindOneOutputRestDto {
  @ApiProperty({ type: "string" }) id: string;
  @ApiProperty({ type: "string" }) horarioAulaId: string;
  @ApiProperty({ type: "string" }) inicio: string;
  @ApiProperty({ type: "string" }) fim: string;
}

@ApiSchema({ name: "TurmaHorarioAulaListOutputDto" })
export class TurmaHorarioAulaListOutputRestDto {
  @ApiProperty({ type: () => [TurmaHorarioAulaFindOneOutputRestDto] })
  data: TurmaHorarioAulaFindOneOutputRestDto[];
}

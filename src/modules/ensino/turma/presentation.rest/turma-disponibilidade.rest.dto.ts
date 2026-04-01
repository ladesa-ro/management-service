import { z } from "zod";
import { ApiProperty, ApiSchema } from "@/shared/presentation/rest";
import { uuidSchema } from "@/shared/validation/schemas";

// ============================================================================
// Parent Route Params
// ============================================================================

const TurmaDisponibilidadeParentParamsSchema = z.object({
  turmaId: uuidSchema,
});

@ApiSchema({ name: "TurmaDisponibilidadeParentParamsDto" })
export class TurmaDisponibilidadeParentParamsRestDto {
  static schema = TurmaDisponibilidadeParentParamsSchema;

  @ApiProperty({ type: "string", format: "uuid", description: "ID da turma" })
  turmaId: string;
}

// ============================================================================
// Query Params (semana)
// ============================================================================

const TurmaDisponibilidadeFindByWeekQuerySchema = z.object({
  semana: z.string().min(1),
});

@ApiSchema({ name: "TurmaDisponibilidadeFindByWeekQueryDto" })
export class TurmaDisponibilidadeFindByWeekQueryRestDto {
  static schema = TurmaDisponibilidadeFindByWeekQuerySchema;

  @ApiProperty({
    type: "string",
    format: "date",
    description: "Data da semana (qualquer dia, normalizado para domingo)",
  })
  semana: string;
}

// ============================================================================
// Intervalo item
// ============================================================================

@ApiSchema({ name: "TurmaDisponibilidadeIntervaloDto" })
export class TurmaDisponibilidadeIntervaloRestDto {
  @ApiProperty({ type: "string", description: "Horario inicio (HH:MM:SS)" })
  inicio: string;

  @ApiProperty({ type: "string", description: "Horario fim (HH:MM:SS)" })
  fim: string;
}

// ============================================================================
// Dia com intervalos
// ============================================================================

@ApiSchema({ name: "TurmaDisponibilidadeDiaDto" })
export class TurmaDisponibilidadeDiaRestDto {
  @ApiProperty({ type: "number", description: "Dia da semana (1=seg..6=sab)" })
  dia_semana: number;

  @ApiProperty({ type: () => [TurmaDisponibilidadeIntervaloRestDto] })
  intervalos: TurmaDisponibilidadeIntervaloRestDto[];
}

// ============================================================================
// Config (uma vigencia)
// ============================================================================

@ApiSchema({ name: "TurmaDisponibilidadeConfigOutputDto" })
export class TurmaDisponibilidadeConfigOutputRestDto {
  @ApiProperty({ type: "string", format: "date" })
  data_inicio: string;

  @ApiProperty({ type: "string", format: "date", nullable: true })
  data_fim: string | null;

  @ApiProperty({ type: () => [TurmaDisponibilidadeDiaRestDto] })
  horarios: TurmaDisponibilidadeDiaRestDto[];
}

// ============================================================================
// Week Output
// ============================================================================

@ApiSchema({ name: "TurmaDisponibilidadeWeekOutputDto" })
export class TurmaDisponibilidadeWeekOutputRestDto {
  @ApiProperty({ type: () => [TurmaDisponibilidadeConfigOutputRestDto] })
  configs: TurmaDisponibilidadeConfigOutputRestDto[];
}

// ============================================================================
// Save Input
// ============================================================================

const TurmaDisponibilidadeConfigInputSchema = z.object({
  data_inicio: z.string().min(1),
  data_fim: z.string().min(1).nullable(),
  horarios: z.array(
    z.object({
      dia_semana: z.number().int().min(1).max(6),
      intervalos: z.array(
        z.object({
          inicio: z.string().min(1),
          fim: z.string().min(1),
        }),
      ),
    }),
  ),
});

const TurmaDisponibilidadeSaveInputSchema = z.object({
  configs: z.array(TurmaDisponibilidadeConfigInputSchema),
  aplicar_futuras: z.boolean().optional(),
});

@ApiSchema({ name: "TurmaDisponibilidadeSaveInputDto" })
export class TurmaDisponibilidadeSaveInputRestDto {
  static schema = TurmaDisponibilidadeSaveInputSchema;

  @ApiProperty({
    type: () => [TurmaDisponibilidadeConfigInputRestDto],
    description: "Configuracoes de disponibilidade",
  })
  configs: TurmaDisponibilidadeConfigInputRestDto[];

  @ApiProperty({
    type: "boolean",
    required: false,
    description: "Aplicar tambem para semanas futuras",
  })
  aplicar_futuras?: boolean;
}

@ApiSchema({ name: "TurmaDisponibilidadeConfigInputDto" })
export class TurmaDisponibilidadeConfigInputRestDto {
  @ApiProperty({ type: "string", format: "date" })
  data_inicio: string;

  @ApiProperty({ type: "string", format: "date", nullable: true })
  data_fim: string | null;

  @ApiProperty({ type: () => [TurmaDisponibilidadeDiaInputRestDto] })
  horarios: TurmaDisponibilidadeDiaInputRestDto[];
}

@ApiSchema({ name: "TurmaDisponibilidadeDiaInputDto" })
export class TurmaDisponibilidadeDiaInputRestDto {
  @ApiProperty({ type: "number", description: "Dia da semana (1=seg..6=sab)" })
  dia_semana: number;

  @ApiProperty({ type: () => [TurmaDisponibilidadeIntervaloRestDto] })
  intervalos: TurmaDisponibilidadeIntervaloRestDto[];
}

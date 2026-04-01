import { z } from "zod";
import {
  TurmaDisponibilidadeConfigFields,
  TurmaDisponibilidadeDiaFields,
  TurmaDisponibilidadeIntervaloFields,
  TurmaDisponibilidadeParamsFields,
  TurmaDisponibilidadeQueryFields,
  TurmaDisponibilidadeSaveFields,
} from "@/modules/ensino/turma/domain/turma-disponibilidade.fields";
import { ApiProperty, ApiPropertyOptional, ApiSchema } from "@/shared/presentation/rest";
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

  @ApiProperty(TurmaDisponibilidadeParamsFields.turmaId.swaggerMetadata)
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

  @ApiProperty(TurmaDisponibilidadeQueryFields.semana.swaggerMetadata)
  semana: string;
}

// ============================================================================
// Intervalo item
// ============================================================================

@ApiSchema({ name: "TurmaDisponibilidadeIntervaloDto" })
export class TurmaDisponibilidadeIntervaloRestDto {
  @ApiProperty(TurmaDisponibilidadeIntervaloFields.inicio.swaggerMetadata)
  inicio: string;

  @ApiProperty(TurmaDisponibilidadeIntervaloFields.fim.swaggerMetadata)
  fim: string;
}

// ============================================================================
// Dia com intervalos
// ============================================================================

@ApiSchema({ name: "TurmaDisponibilidadeDiaDto" })
export class TurmaDisponibilidadeDiaRestDto {
  @ApiProperty(TurmaDisponibilidadeDiaFields.dia_semana.swaggerMetadata)
  dia_semana: number;

  @ApiProperty({
    ...TurmaDisponibilidadeDiaFields.intervalos.swaggerMetadata,
    type: () => [TurmaDisponibilidadeIntervaloRestDto],
  })
  intervalos: TurmaDisponibilidadeIntervaloRestDto[];
}

// ============================================================================
// Config (uma vigencia)
// ============================================================================

@ApiSchema({ name: "TurmaDisponibilidadeConfigOutputDto" })
export class TurmaDisponibilidadeConfigOutputRestDto {
  @ApiProperty(TurmaDisponibilidadeConfigFields.data_inicio.swaggerMetadata)
  data_inicio: string;

  @ApiPropertyOptional(TurmaDisponibilidadeConfigFields.data_fim.swaggerMetadata)
  data_fim: string | null;

  @ApiProperty({
    ...TurmaDisponibilidadeConfigFields.horarios.swaggerMetadata,
    type: () => [TurmaDisponibilidadeDiaRestDto],
  })
  horarios: TurmaDisponibilidadeDiaRestDto[];
}

// ============================================================================
// Week Output
// ============================================================================

@ApiSchema({ name: "TurmaDisponibilidadeWeekOutputDto" })
export class TurmaDisponibilidadeWeekOutputRestDto {
  @ApiProperty({
    ...TurmaDisponibilidadeSaveFields.configs.swaggerMetadata,
    type: () => [TurmaDisponibilidadeConfigOutputRestDto],
  })
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
    ...TurmaDisponibilidadeSaveFields.configs.swaggerMetadata,
    type: () => [TurmaDisponibilidadeConfigInputRestDto],
  })
  configs: TurmaDisponibilidadeConfigInputRestDto[];

  @ApiPropertyOptional(TurmaDisponibilidadeSaveFields.aplicar_futuras.swaggerMetadata)
  aplicar_futuras?: boolean;
}

@ApiSchema({ name: "TurmaDisponibilidadeConfigInputDto" })
export class TurmaDisponibilidadeConfigInputRestDto {
  @ApiProperty(TurmaDisponibilidadeConfigFields.data_inicio.swaggerMetadata)
  data_inicio: string;

  @ApiPropertyOptional(TurmaDisponibilidadeConfigFields.data_fim.swaggerMetadata)
  data_fim: string | null;

  @ApiProperty({
    ...TurmaDisponibilidadeConfigFields.horarios.swaggerMetadata,
    type: () => [TurmaDisponibilidadeDiaInputRestDto],
  })
  horarios: TurmaDisponibilidadeDiaInputRestDto[];
}

@ApiSchema({ name: "TurmaDisponibilidadeDiaInputDto" })
export class TurmaDisponibilidadeDiaInputRestDto {
  @ApiProperty(TurmaDisponibilidadeDiaFields.dia_semana.swaggerMetadata)
  dia_semana: number;

  @ApiProperty({
    ...TurmaDisponibilidadeDiaFields.intervalos.swaggerMetadata,
    type: () => [TurmaDisponibilidadeIntervaloRestDto],
  })
  intervalos: TurmaDisponibilidadeIntervaloRestDto[];
}

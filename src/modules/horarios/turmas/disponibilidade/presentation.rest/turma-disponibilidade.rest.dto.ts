import { z } from "zod";
import { ApiProperty, ApiPropertyOptional, ApiSchema } from "@/shared/presentation/rest";
import { uuidSchema } from "@/shared/validation/schemas";
import {
  TurmaDisponibilidadeConfigFields,
  TurmaDisponibilidadeDiaFields,
  TurmaDisponibilidadeIntervaloFields,
  TurmaDisponibilidadeParamsFields,
  TurmaDisponibilidadeQueryFields,
  TurmaDisponibilidadeSaveFields,
} from "../domain/turma-disponibilidade.fields";

// ============================================================================
// Parent Route Params
// ============================================================================

const TurmaDisponibilidadeParentParamsSchema = z.object({
  id: uuidSchema,
});

@ApiSchema({ name: "TurmaDisponibilidadeParentParamsDto" })
export class TurmaDisponibilidadeParentParamsRestDto {
  static schema = TurmaDisponibilidadeParentParamsSchema;

  @ApiProperty(TurmaDisponibilidadeParamsFields.turmaId.swaggerMetadata)
  id: string;
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

  @ApiPropertyOptional({
    description: "Identificador externo da grade horaria utilizada (snapshot)",
    type: "string",
    format: "uuid",
    nullable: true,
  })
  identificador_externo_grade_horaria: string | null;

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
// Config Output with ID (for findAllActive)
// ============================================================================

@ApiSchema({ name: "TurmaDisponibilidadeConfigWithIdOutputDto" })
export class TurmaDisponibilidadeConfigWithIdOutputRestDto {
  @ApiProperty({ description: "ID da configuracao", type: "string", format: "uuid" })
  id: string;

  @ApiProperty(TurmaDisponibilidadeConfigFields.data_inicio.swaggerMetadata)
  data_inicio: string;

  @ApiPropertyOptional(TurmaDisponibilidadeConfigFields.data_fim.swaggerMetadata)
  data_fim: string | null;

  @ApiPropertyOptional({
    description: "Identificador externo da grade horaria utilizada (snapshot)",
    type: "string",
    format: "uuid",
    nullable: true,
  })
  identificador_externo_grade_horaria: string | null;

  @ApiProperty({
    ...TurmaDisponibilidadeConfigFields.horarios.swaggerMetadata,
    type: () => [TurmaDisponibilidadeDiaRestDto],
  })
  horarios: TurmaDisponibilidadeDiaRestDto[];
}

// ============================================================================
// All Active Output
// ============================================================================

@ApiSchema({ name: "TurmaDisponibilidadeAllOutputDto" })
export class TurmaDisponibilidadeAllOutputRestDto {
  @ApiProperty({
    ...TurmaDisponibilidadeSaveFields.configs.swaggerMetadata,
    type: () => [TurmaDisponibilidadeConfigWithIdOutputRestDto],
  })
  configs: TurmaDisponibilidadeConfigWithIdOutputRestDto[];
}

// ============================================================================
// Config ID Params (for deactivate)
// ============================================================================

const TurmaDisponibilidadeConfigIdParamsSchema = z.object({
  id: uuidSchema,
  configId: uuidSchema,
});

@ApiSchema({ name: "TurmaDisponibilidadeConfigIdParamsDto" })
export class TurmaDisponibilidadeConfigIdParamsRestDto {
  static schema = TurmaDisponibilidadeConfigIdParamsSchema;

  @ApiProperty(TurmaDisponibilidadeParamsFields.turmaId.swaggerMetadata)
  id: string;

  @ApiProperty({
    description: "ID da configuracao de disponibilidade",
    type: "string",
    format: "uuid",
  })
  configId: string;
}

// ============================================================================
// Save Input
// ============================================================================

const TurmaDisponibilidadeConfigInputSchema = z.object({
  data_inicio: z.string().min(1),
  data_fim: z.string().min(1).nullable(),
  identificador_externo_grade_horaria: z.string().uuid().nullable().optional(),
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
});

@ApiSchema({ name: "TurmaDisponibilidadeSaveInputDto" })
export class TurmaDisponibilidadeSaveInputRestDto {
  static schema = TurmaDisponibilidadeSaveInputSchema;

  @ApiProperty({
    ...TurmaDisponibilidadeSaveFields.configs.swaggerMetadata,
    type: () => [TurmaDisponibilidadeConfigInputRestDto],
  })
  configs: TurmaDisponibilidadeConfigInputRestDto[];
}

@ApiSchema({ name: "TurmaDisponibilidadeConfigInputDto" })
export class TurmaDisponibilidadeConfigInputRestDto {
  @ApiProperty(TurmaDisponibilidadeConfigFields.data_inicio.swaggerMetadata)
  data_inicio: string;

  @ApiPropertyOptional(TurmaDisponibilidadeConfigFields.data_fim.swaggerMetadata)
  data_fim: string | null;

  @ApiPropertyOptional({
    description: "Identificador externo da grade horaria utilizada",
    type: "string",
    format: "uuid",
    nullable: true,
  })
  identificador_externo_grade_horaria?: string | null;

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

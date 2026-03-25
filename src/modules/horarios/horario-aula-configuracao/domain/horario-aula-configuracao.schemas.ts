/**
 * Horario Aula Configuracao — schemas zod para a entidade e suas operacoes.
 */
import { z } from "zod";
import { ObjectIdUuidFactory } from "@/domain/abstractions";
import { uuidSchema } from "@/shared/validation/schemas";

// ============================================================================
// Horario item (value object)
// ============================================================================

const horarioAulaItemSchema = z.object({
  inicio: z.string().min(1),
  fim: z.string().min(1),
});

// ============================================================================
// Schema completo
// ============================================================================

export const HorarioAulaConfiguracaoSchema = z.object({
  id: uuidSchema,
  dataInicio: z.string().min(1),
  dataFim: z.string().nullable(),
  ativo: z.boolean(),
  campus: ObjectIdUuidFactory.domain.loose(),
  horarios: z.array(horarioAulaItemSchema),
});

// ============================================================================
// Create
// ============================================================================

export const HorarioAulaConfiguracaoCreateSchema = z.object({
  dataInicio: z.string().min(1),
  dataFim: z.string().nullable().optional(),
  ativo: z.boolean(),
  campus: ObjectIdUuidFactory.domain.loose(),
  horarios: z.array(horarioAulaItemSchema).optional().default([]),
});

// ============================================================================
// Update
// ============================================================================

export const HorarioAulaConfiguracaoUpdateSchema = z.object({
  dataInicio: z.string().min(1).optional(),
  dataFim: z.string().nullable().optional(),
  ativo: z.boolean().optional(),
  campus: ObjectIdUuidFactory.domain.loose().optional(),
  horarios: z.array(horarioAulaItemSchema).optional(),
});

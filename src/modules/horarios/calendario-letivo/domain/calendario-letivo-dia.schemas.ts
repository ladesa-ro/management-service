import { z } from "zod";
import { datedSchema, stringFilterSchema, uuidSchema } from "@/shared/validation/schemas";

// ============================================================================
// Fragments reutilizáveis
// ============================================================================

export const calendarioLetivoDiaDataSchema = z.string().min(1, "data é obrigatória");

export const calendarioLetivoDiaTipoSchema = z.string().min(1, "tipo é obrigatório");

export const calendarioLetivoDiaCalendarioRefSchema = z.object({
  id: uuidSchema,
});

// ============================================================================
// Schemas compostos
// ============================================================================

export const calendarioLetivoDiaSchema = z
  .object({
    id: uuidSchema,
    data: calendarioLetivoDiaDataSchema,
    diaLetivo: z.boolean(),
    feriado: z.string(),
    diaPresencial: z.boolean(),
    tipo: calendarioLetivoDiaTipoSchema,
    extraCurricular: z.boolean(),
    calendario: calendarioLetivoDiaCalendarioRefSchema,
  })
  .merge(datedSchema);

export const calendarioLetivoDiaUpdateSchema = z.object({
  data: calendarioLetivoDiaDataSchema.optional(),
  diaLetivo: z.boolean().optional(),
  feriado: z.string().optional(),
  diaPresencial: z.boolean().optional(),
  tipo: calendarioLetivoDiaTipoSchema.optional(),
  extraCurricular: z.boolean().optional(),
});

// ============================================================================
// Schemas de input (presentation layer)
// ============================================================================

export const calendarioLetivoDiaListInputSchema = z.object({
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).optional(),
  search: z.string().optional(),
  sortBy: z.array(z.string()).optional(),
  selection: z.array(z.string()).optional(),
  "filter.id": stringFilterSchema,
  "filter.calendario.nome": stringFilterSchema,
  "filter.calendario.ano": stringFilterSchema,
});

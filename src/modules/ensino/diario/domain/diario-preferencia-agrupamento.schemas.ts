import { z } from "zod";
import { datedSchema, uuidSchema } from "@/shared/validation/schemas";

// ============================================================================
// Fragments reutilizáveis
// ============================================================================

export const diarioPreferenciaAgrupamentoDataInicioSchema = z
  .string()
  .min(1, "dataInicio é obrigatória");

export const diarioPreferenciaAgrupamentoDataFimSchema = z.string().nullable().optional();

export const diarioPreferenciaAgrupamentoDiaSemanaIsoSchema = z
  .number()
  .int()
  .min(1, "diaSemanaIso deve ser >= 1")
  .max(7, "diaSemanaIso deve ser <= 7");

export const diarioPreferenciaAgrupamentoAulasSeguidasSchema = z
  .number()
  .int()
  .min(1, "aulasSeguidas deve ser >= 1");

export const diarioPreferenciaAgrupamentoDiarioRefSchema = z.object({
  id: uuidSchema,
});

// ============================================================================
// Schemas compostos
// ============================================================================

export const diarioPreferenciaAgrupamentoSchema = z
  .object({
    id: uuidSchema,
    dataInicio: diarioPreferenciaAgrupamentoDataInicioSchema,
    dataFim: z.string().nullable(),
    diaSemanaIso: diarioPreferenciaAgrupamentoDiaSemanaIsoSchema,
    aulasSeguidas: diarioPreferenciaAgrupamentoAulasSeguidasSchema,
    diario: diarioPreferenciaAgrupamentoDiarioRefSchema,
  })
  .merge(datedSchema);

export const diarioPreferenciaAgrupamentoCreateSchema = z.object({
  dataInicio: diarioPreferenciaAgrupamentoDataInicioSchema,
  dataFim: diarioPreferenciaAgrupamentoDataFimSchema,
  diaSemanaIso: diarioPreferenciaAgrupamentoDiaSemanaIsoSchema,
  aulasSeguidas: diarioPreferenciaAgrupamentoAulasSeguidasSchema,
  diario: diarioPreferenciaAgrupamentoDiarioRefSchema,
});

export const diarioPreferenciaAgrupamentoUpdateSchema = z.object({
  dataInicio: diarioPreferenciaAgrupamentoDataInicioSchema.optional(),
  dataFim: diarioPreferenciaAgrupamentoDataFimSchema,
  diaSemanaIso: diarioPreferenciaAgrupamentoDiaSemanaIsoSchema.optional(),
  aulasSeguidas: diarioPreferenciaAgrupamentoAulasSeguidasSchema.optional(),
  diario: diarioPreferenciaAgrupamentoDiarioRefSchema.optional(),
});

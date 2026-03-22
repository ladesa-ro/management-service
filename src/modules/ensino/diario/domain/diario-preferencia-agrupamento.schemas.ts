/**
 * Diario Preferencia Agrupamento — schemas zod para a entidade e suas operacoes.
 *
 * Contem os schemas de referencia, composicao (create/update)
 * e validacao da entidade. Fonte unica de verdade (SSOT) para
 * os contratos de dados da entidade.
 */
import { z } from "zod";
import { datedSchema, uuidSchema } from "@/shared/validation/schemas";
import { DiarioPreferenciaAgrupamentoFields } from "./diario-preferencia-agrupamento.fields";

// ============================================================================
// Fragments de referência
// ============================================================================

export const DiarioPreferenciaAgrupamentoDiarioRefSchema = z.object({
  id: uuidSchema,
});

// ============================================================================
// Schemas compostos
// ============================================================================

export const DiarioPreferenciaAgrupamentoSchema = z
  .object({
    id: uuidSchema,
    dataInicio: DiarioPreferenciaAgrupamentoFields.dataInicio.schema,
    dataFim: z.string().nullable(),
    diaSemanaIso: DiarioPreferenciaAgrupamentoFields.diaSemanaIso.schema,
    aulasSeguidas: DiarioPreferenciaAgrupamentoFields.aulasSeguidas.schema,
    diario: DiarioPreferenciaAgrupamentoDiarioRefSchema,
  })
  .merge(datedSchema);

export const DiarioPreferenciaAgrupamentoCreateSchema = z.object({
  dataInicio: DiarioPreferenciaAgrupamentoFields.dataInicio.schema,
  dataFim: DiarioPreferenciaAgrupamentoFields.dataFim.schema,
  diaSemanaIso: DiarioPreferenciaAgrupamentoFields.diaSemanaIso.schema,
  aulasSeguidas: DiarioPreferenciaAgrupamentoFields.aulasSeguidas.schema,
  diario: DiarioPreferenciaAgrupamentoDiarioRefSchema,
});

export const DiarioPreferenciaAgrupamentoUpdateSchema = z.object({
  dataInicio: DiarioPreferenciaAgrupamentoFields.dataInicio.schema.optional(),
  dataFim: DiarioPreferenciaAgrupamentoFields.dataFim.schema,
  diaSemanaIso: DiarioPreferenciaAgrupamentoFields.diaSemanaIso.schema.optional(),
  aulasSeguidas: DiarioPreferenciaAgrupamentoFields.aulasSeguidas.schema.optional(),
  diario: DiarioPreferenciaAgrupamentoDiarioRefSchema.optional(),
});

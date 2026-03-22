/**
 * Calendario Letivo Dia — schemas zod para a entidade e suas operacoes.
 *
 * Contem os schemas de referencia, composicao (create/update)
 * e validacao da entidade. Fonte unica de verdade (SSOT) para
 * os contratos de dados da entidade.
 */
import { z } from "zod";
import { datedSchema, uuidSchema } from "@/shared/validation/schemas";
import { CalendarioLetivoDiaFields } from "./calendario-letivo-dia.fields";

// ============================================================================
// Fragments de referência
// ============================================================================

export const CalendarioLetivoDiaCalendarioRefSchema = z.object({
  id: uuidSchema,
});

// ============================================================================
// Schemas compostos
// ============================================================================

export const CalendarioLetivoDiaSchema = z
  .object({
    id: uuidSchema,
    data: CalendarioLetivoDiaFields.data.schema,
    diaLetivo: CalendarioLetivoDiaFields.diaLetivo.schema,
    feriado: CalendarioLetivoDiaFields.feriado.schema,
    diaPresencial: CalendarioLetivoDiaFields.diaPresencial.schema,
    tipo: CalendarioLetivoDiaFields.tipo.schema,
    extraCurricular: CalendarioLetivoDiaFields.extraCurricular.schema,
    calendario: CalendarioLetivoDiaCalendarioRefSchema,
  })
  .merge(datedSchema);

export const CalendarioLetivoDiaUpdateSchema = z.object({
  data: CalendarioLetivoDiaFields.data.schema.optional(),
  diaLetivo: CalendarioLetivoDiaFields.diaLetivo.schema.optional(),
  feriado: CalendarioLetivoDiaFields.feriado.schema.optional(),
  diaPresencial: CalendarioLetivoDiaFields.diaPresencial.schema.optional(),
  tipo: CalendarioLetivoDiaFields.tipo.schema.optional(),
  extraCurricular: CalendarioLetivoDiaFields.extraCurricular.schema.optional(),
});

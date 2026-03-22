/**
 * Calendario Letivo — schemas zod para a entidade e suas operacoes.
 *
 * Contem os schemas de referencia, composicao (create/update)
 * e validacao da entidade. Fonte unica de verdade (SSOT) para
 * os contratos de dados da entidade.
 */
import { z } from "zod";
import { datedSchema, uuidSchema } from "@/shared/validation/schemas";
import { CalendarioLetivoFields } from "./calendario-letivo.fields";

// ============================================================================
// Fragments de referência
// ============================================================================

export const CalendarioLetivoCampusRefSchema = z.object({
  id: uuidSchema,
});

export const CalendarioLetivoOfertaFormacaoRefSchema = z.object({
  id: uuidSchema,
});

// ============================================================================
// Schemas compostos
// ============================================================================

export const CalendarioLetivoSchema = z
  .object({
    id: uuidSchema,
    nome: CalendarioLetivoFields.nome.schema,
    ano: CalendarioLetivoFields.ano.schema,
    campus: CalendarioLetivoCampusRefSchema,
    ofertaFormacao: CalendarioLetivoOfertaFormacaoRefSchema.nullable(),
  })
  .merge(datedSchema);

export const CalendarioLetivoCreateSchema = z.object({
  nome: CalendarioLetivoFields.nome.schema,
  ano: CalendarioLetivoFields.ano.schema,
  campus: CalendarioLetivoCampusRefSchema,
  ofertaFormacao: CalendarioLetivoOfertaFormacaoRefSchema.optional(),
});

export const CalendarioLetivoUpdateSchema = z.object({
  nome: CalendarioLetivoFields.nome.schema.optional(),
  ano: CalendarioLetivoFields.ano.schema.optional(),
  campus: CalendarioLetivoCampusRefSchema.optional(),
  ofertaFormacao: CalendarioLetivoOfertaFormacaoRefSchema.nullable().optional(),
});

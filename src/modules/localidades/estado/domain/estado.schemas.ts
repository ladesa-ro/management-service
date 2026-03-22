/**
 * Estado — schemas zod para a entidade e suas operacoes.
 *
 * Contem os schemas de referencia, composicao (create/update)
 * e validacao da entidade. Fonte unica de verdade (SSOT) para
 * os contratos de dados da entidade.
 */
import { z } from "zod";
import { EstadoFields } from "./estado.fields";

// ============================================================================
// Schemas compostos
// ============================================================================

export const EstadoSchema = z.object({
  id: z.number().int(),
  nome: EstadoFields.nome.schema,
  sigla: EstadoFields.sigla.schema,
});

export const EstadoCreateSchema = EstadoSchema;

export const EstadoUpdateSchema = z.object({
  nome: EstadoFields.nome.schema.optional(),
  sigla: EstadoFields.sigla.schema.optional(),
});

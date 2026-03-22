/**
 * Cidade — schemas zod para a entidade e suas operacoes.
 *
 * Contem os schemas de referencia, composicao (create/update)
 * e validacao da entidade. Fonte unica de verdade (SSOT) para
 * os contratos de dados da entidade.
 */
import { z } from "zod";
import { CidadeFields } from "./cidade.fields";

// ============================================================================
// Schemas compostos
// ============================================================================

export const CidadeSchema = z.object({
  id: z.number().int(),
  nome: CidadeFields.nome.schema,
});

export const CidadeCreateSchema = CidadeSchema;

export const CidadeUpdateSchema = z.object({
  nome: CidadeFields.nome.schema.optional(),
});

/**
 * Cidade — schemas zod para a entidade e suas operacoes.
 *
 * Contem os schemas de referencia, composicao (create/update)
 * e validacao da entidade. Fonte unica de verdade (SSOT) para
 * os contratos de dados da entidade.
 */
import { z } from "zod";
import { createSchema, safeInt } from "@/domain/abstractions";
import { CidadeFields } from "./cidade.fields";

// ============================================================================
// Schemas compostos
// ============================================================================

export const CidadeSchema = z.object({
  id: z.number().int(),
  nome: CidadeFields.nome.domainSchema,
});

export const CidadeCreateSchema = createSchema((standard) =>
  z.object({
    id: safeInt(standard),
    nome: CidadeFields.nome.create(standard),
  }),
);

export const CidadeUpdateSchema = createSchema((standard) =>
  z.object({
    nome: CidadeFields.nome.create(standard).optional(),
  }),
);

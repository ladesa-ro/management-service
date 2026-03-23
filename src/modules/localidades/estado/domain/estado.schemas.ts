/**
 * Estado — schemas zod para a entidade e suas operacoes.
 *
 * Contem os schemas de referencia, composicao (create/update)
 * e validacao da entidade. Fonte unica de verdade (SSOT) para
 * os contratos de dados da entidade.
 */
import { z } from "zod";
import { createSchema, safeInt } from "@/domain/abstractions";
import { EstadoFields } from "./estado.fields";

// ============================================================================
// Schemas compostos
// ============================================================================

export const EstadoSchema = z.object({
  id: z.number().int(),
  nome: EstadoFields.nome.domainSchema,
  sigla: EstadoFields.sigla.domainSchema,
});

export const EstadoCreateSchema = createSchema((standard) =>
  z.object({
    id: safeInt(standard),
    nome: EstadoFields.nome.create(standard),
    sigla: EstadoFields.sigla.create(standard),
  }),
);

export const EstadoUpdateSchema = createSchema((standard) =>
  z.object({
    nome: EstadoFields.nome.create(standard).optional(),
    sigla: EstadoFields.sigla.create(standard).optional(),
  }),
);

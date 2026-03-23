/**
 * Calendario Letivo — schemas zod para a entidade e suas operacoes.
 *
 * Contem os schemas de referencia, composicao (create/update)
 * e validacao da entidade. Fonte unica de verdade (SSOT) para
 * os contratos de dados da entidade.
 */
import { z } from "zod";
import { createSchema, ObjectIdUuidFactory } from "@/domain/abstractions";
import { datedSchema, uuidSchema } from "@/shared/validation/schemas";
import { CalendarioLetivoFields } from "./calendario-letivo.fields";

// ============================================================================
// Fragments de referência
// ============================================================================

export const CalendarioLetivoCampusRefSchema = createSchema(() => z.object({ id: uuidSchema }));

export const CalendarioLetivoOfertaFormacaoRefSchema = ObjectIdUuidFactory;

// ============================================================================
// Schemas compostos
// ============================================================================

export const CalendarioLetivoSchema = z
  .object({
    id: uuidSchema,
    nome: CalendarioLetivoFields.nome.domainSchema,
    ano: CalendarioLetivoFields.ano.domainSchema,
    campus: z.object({ id: uuidSchema }),
    ofertaFormacao: z.object({ id: uuidSchema }).nullable(),
  })
  .merge(datedSchema);

export const CalendarioLetivoCreateSchema = createSchema((standard) =>
  z.object({
    nome: CalendarioLetivoFields.nome.create(standard),
    ano: CalendarioLetivoFields.ano.create(standard),
    campus: CalendarioLetivoCampusRefSchema.create(standard),
    ofertaFormacao: CalendarioLetivoOfertaFormacaoRefSchema.create(standard).optional(),
  }),
);

export const CalendarioLetivoUpdateSchema = createSchema((standard) =>
  z.object({
    nome: CalendarioLetivoFields.nome.create(standard).optional(),
    ano: CalendarioLetivoFields.ano.create(standard).optional(),
    campus: CalendarioLetivoCampusRefSchema.create(standard).optional(),
    ofertaFormacao: CalendarioLetivoOfertaFormacaoRefSchema.create(standard).optional(),
  }),
);

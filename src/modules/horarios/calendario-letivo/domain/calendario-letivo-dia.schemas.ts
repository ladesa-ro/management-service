/**
 * Calendario Letivo Dia — schemas zod para a entidade e suas operacoes.
 *
 * Contem os schemas de referencia, composicao (create/update)
 * e validacao da entidade. Fonte unica de verdade (SSOT) para
 * os contratos de dados da entidade.
 */
import { z } from "zod";
import { createSchema, ObjectIdUuidFactory } from "@/domain/abstractions";
import { datedSchema, uuidSchema } from "@/shared/validation/schemas";
import { CalendarioLetivoDiaFields } from "./calendario-letivo-dia.fields";

// ============================================================================
// Fragments de referência
// ============================================================================

export const CalendarioLetivoDiaCalendarioRefSchema = ObjectIdUuidFactory;

// ============================================================================
// Schemas compostos
// ============================================================================

export const CalendarioLetivoDiaSchema = z
  .object({
    id: uuidSchema,
    data: CalendarioLetivoDiaFields.data.domainSchema,
    diaLetivo: CalendarioLetivoDiaFields.diaLetivo.domainSchema,
    feriado: CalendarioLetivoDiaFields.feriado.domainSchema,
    diaPresencial: CalendarioLetivoDiaFields.diaPresencial.domainSchema,
    tipo: CalendarioLetivoDiaFields.tipo.domainSchema,
    extraCurricular: CalendarioLetivoDiaFields.extraCurricular.domainSchema,
    calendario: ObjectIdUuidFactory.domain,
  })
  .extend(datedSchema.shape);

export const CalendarioLetivoDiaUpdateSchema = createSchema((standard) =>
  z.object({
    data: CalendarioLetivoDiaFields.data.create(standard).optional(),
    diaLetivo: CalendarioLetivoDiaFields.diaLetivo.create(standard).optional(),
    feriado: CalendarioLetivoDiaFields.feriado.create(standard).optional(),
    diaPresencial: CalendarioLetivoDiaFields.diaPresencial.create(standard).optional(),
    tipo: CalendarioLetivoDiaFields.tipo.create(standard).optional(),
    extraCurricular: CalendarioLetivoDiaFields.extraCurricular.create(standard).optional(),
  }),
);

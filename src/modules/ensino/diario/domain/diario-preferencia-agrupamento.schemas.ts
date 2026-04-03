/**
 * Diario Preferencia Agrupamento — schemas zod para a entidade e suas operacoes.
 *
 * Contem os schemas de referencia, composicao (create/update)
 * e validacao da entidade. Fonte unica de verdade (SSOT) para
 * os contratos de dados da entidade.
 */
import { z } from "zod";
import { createSchema, ObjectIdUuidFactory } from "@/domain/abstractions";
import { datedSchema, uuidSchema } from "@/shared/validation/schemas";
import { DiarioPreferenciaAgrupamentoFields } from "./diario-preferencia-agrupamento.fields";

// ============================================================================
// Fragments de referência
// ============================================================================

export const DiarioPreferenciaAgrupamentoDiarioRefSchema = ObjectIdUuidFactory;

// ============================================================================
// Schemas compostos
// ============================================================================

export const DiarioPreferenciaAgrupamentoSchema = z
  .object({
    id: uuidSchema,
    modo: DiarioPreferenciaAgrupamentoFields.modo.domainSchema,
    ordem: DiarioPreferenciaAgrupamentoFields.ordem.domainSchema,
    dataInicio: DiarioPreferenciaAgrupamentoFields.dataInicio.domainSchema,
    dataFim: z.string().nullable(),
    diaSemanaIso: DiarioPreferenciaAgrupamentoFields.diaSemanaIso.domainSchema,
    aulasSeguidas: DiarioPreferenciaAgrupamentoFields.aulasSeguidas.domainSchema,
    diario: ObjectIdUuidFactory.domain.loose(),
  })
  .extend(datedSchema.shape);

export const DiarioPreferenciaAgrupamentoCreateSchema = createSchema((standard) =>
  z.object({
    modo: DiarioPreferenciaAgrupamentoFields.modo.create(standard),
    ordem: DiarioPreferenciaAgrupamentoFields.ordem.create(standard),
    dataInicio: DiarioPreferenciaAgrupamentoFields.dataInicio.create(standard),
    dataFim: DiarioPreferenciaAgrupamentoFields.dataFim.create(standard),
    diaSemanaIso: DiarioPreferenciaAgrupamentoFields.diaSemanaIso.create(standard),
    aulasSeguidas: DiarioPreferenciaAgrupamentoFields.aulasSeguidas.create(standard),
    diario: DiarioPreferenciaAgrupamentoDiarioRefSchema.create(standard),
  }),
);

export const DiarioPreferenciaAgrupamentoUpdateSchema = createSchema((standard) =>
  z.object({
    modo: DiarioPreferenciaAgrupamentoFields.modo.create(standard).optional(),
    ordem: DiarioPreferenciaAgrupamentoFields.ordem.create(standard).optional(),
    dataInicio: DiarioPreferenciaAgrupamentoFields.dataInicio.create(standard).optional(),
    dataFim: DiarioPreferenciaAgrupamentoFields.dataFim.create(standard),
    diaSemanaIso: DiarioPreferenciaAgrupamentoFields.diaSemanaIso.create(standard).optional(),
    aulasSeguidas: DiarioPreferenciaAgrupamentoFields.aulasSeguidas.create(standard).optional(),
    diario: DiarioPreferenciaAgrupamentoDiarioRefSchema.create(standard).optional(),
  }),
);

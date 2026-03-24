/**
 * Diario — schemas zod para a entidade e suas operacoes.
 *
 * Contem os schemas de referencia, composicao (create/update)
 * e validacao da entidade. Fonte unica de verdade (SSOT) para
 * os contratos de dados da entidade.
 */
import { z } from "zod";
import { createSchema, ObjectIdUuidFactory } from "@/domain/abstractions";
import { datedSchema, uuidSchema } from "@/shared/validation/schemas";
import { DiarioFields } from "./diario.fields";

// ============================================================================
// Fragments de referência
// ============================================================================

export const DiarioCalendarioLetivoRefSchema = ObjectIdUuidFactory;

export const DiarioTurmaRefSchema = ObjectIdUuidFactory;

export const DiarioDisciplinaRefSchema = ObjectIdUuidFactory;

export const DiarioAmbientePadraoRefSchema = ObjectIdUuidFactory;

export const DiarioImagemCapaRefSchema = ObjectIdUuidFactory;

// ============================================================================
// Schemas compostos
// ============================================================================

export const DiarioSchema = z
  .object({
    id: uuidSchema,
    ativo: DiarioFields.ativo.domainSchema,
    calendarioLetivo: ObjectIdUuidFactory.domain.loose(),
    turma: ObjectIdUuidFactory.domain.loose(),
    disciplina: ObjectIdUuidFactory.domain.loose(),
    ambientePadrao: ObjectIdUuidFactory.domain.loose().nullable(),
    imagemCapa: ObjectIdUuidFactory.domain.loose().nullable(),
  })
  .extend(datedSchema.shape);

export const DiarioCreateSchema = createSchema((standard) =>
  z.object({
    ativo: DiarioFields.ativo.create(standard).optional().default(true),
    calendarioLetivo: DiarioCalendarioLetivoRefSchema.create(standard),
    turma: DiarioTurmaRefSchema.create(standard),
    disciplina: DiarioDisciplinaRefSchema.create(standard),
    ambientePadrao: DiarioAmbientePadraoRefSchema.create(standard).optional(),
  }),
);

export const DiarioUpdateSchema = createSchema((standard) =>
  z.object({
    ativo: DiarioFields.ativo.create(standard).optional(),
    calendarioLetivo: DiarioCalendarioLetivoRefSchema.create(standard).optional(),
    turma: DiarioTurmaRefSchema.create(standard).optional(),
    disciplina: DiarioDisciplinaRefSchema.create(standard).optional(),
    ambientePadrao: DiarioAmbientePadraoRefSchema.create(standard).optional(),
  }),
);

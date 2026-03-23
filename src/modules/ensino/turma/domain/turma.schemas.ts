/**
 * Turma — schemas zod para a entidade e suas operacoes.
 *
 * Contem os schemas de referencia, composicao (create/update)
 * e validacao da entidade. Fonte unica de verdade (SSOT) para
 * os contratos de dados da entidade.
 */
import { z } from "zod";
import { createSchema, ObjectIdUuidFactory } from "@/domain/abstractions";
import { datedSchema, uuidSchema } from "@/shared/validation/schemas";
import { TurmaFields } from "./turma.fields";

// ============================================================================
// Fragments de referência
// ============================================================================

export const TurmaCursoRefSchema = createSchema(() => z.object({ id: uuidSchema }));

export const TurmaAmbientePadraoAulaRefSchema = createSchema((standard) =>
  ObjectIdUuidFactory.create(standard).nullable().optional(),
);

export const TurmaImagemCapaRefSchema = createSchema((standard) =>
  ObjectIdUuidFactory.create(standard).nullable().optional(),
);

// ============================================================================
// Schemas compostos
// ============================================================================

export const TurmaSchema = z
  .object({
    id: uuidSchema,
    periodo: TurmaFields.periodo.domainSchema,
    curso: z.object({ id: uuidSchema }).passthrough(),
    ambientePadraoAula: z.object({ id: uuidSchema }).nullable(),
    imagemCapa: z.object({ id: uuidSchema }).nullable(),
  })
  .merge(datedSchema);

export const TurmaCreateSchema = createSchema((standard) =>
  z.object({
    periodo: TurmaFields.periodo.create(standard),
    nome: TurmaFields.nome.create(standard),
    curso: TurmaCursoRefSchema.create(standard),
    ambientePadraoAula: TurmaAmbientePadraoAulaRefSchema.create(standard),
    imagemCapa: TurmaImagemCapaRefSchema.create(standard),
  }),
);

export const TurmaUpdateSchema = createSchema((standard) =>
  z.object({
    periodo: TurmaFields.periodo.create(standard).optional(),
    nome: TurmaFields.nome.create(standard),
    curso: TurmaCursoRefSchema.create(standard).optional(),
    ambientePadraoAula: TurmaAmbientePadraoAulaRefSchema.create(standard),
    imagemCapa: TurmaImagemCapaRefSchema.create(standard),
  }),
);

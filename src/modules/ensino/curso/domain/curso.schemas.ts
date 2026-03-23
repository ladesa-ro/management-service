/**
 * Curso — schemas zod para a entidade e suas operacoes.
 *
 * Contem os schemas de referencia, composicao (create/update)
 * e validacao da entidade. Fonte unica de verdade (SSOT) para
 * os contratos de dados da entidade.
 */
import { z } from "zod";
import { createSchema, ObjectIdUuidFactory } from "@/domain/abstractions";
import { datedSchema, uuidSchema } from "@/shared/validation/schemas";
import { CursoFields } from "./curso.fields";

// ============================================================================
// Fragments de referência
// ============================================================================

export const CursoCampusRefSchema = createSchema(() => z.object({ id: uuidSchema }));

export const CursoOfertaFormacaoRefSchema = createSchema(() => z.object({ id: uuidSchema }));

export const CursoImagemCapaRefSchema = createSchema((standard) =>
  ObjectIdUuidFactory.create(standard).nullable().optional(),
);

// ============================================================================
// Schemas compostos
// ============================================================================

export const CursoSchema = z
  .object({
    id: uuidSchema,
    nome: CursoFields.nome.domainSchema,
    nomeAbreviado: CursoFields.nomeAbreviado.domainSchema,
    campus: z.object({ id: uuidSchema }).passthrough(),
    ofertaFormacao: z.object({ id: uuidSchema }).passthrough(),
    imagemCapa: z.object({ id: uuidSchema }).nullable(),
  })
  .merge(datedSchema);

export const CursoCreateSchema = createSchema((standard) =>
  z.object({
    nome: CursoFields.nome.create(standard),
    nomeAbreviado: CursoFields.nomeAbreviado.create(standard),
    campus: CursoCampusRefSchema.create(standard),
    ofertaFormacao: CursoOfertaFormacaoRefSchema.create(standard),
    imagemCapa: CursoImagemCapaRefSchema.create(standard),
  }),
);

export const CursoUpdateSchema = createSchema((standard) =>
  z.object({
    nome: CursoFields.nome.create(standard).optional(),
    nomeAbreviado: CursoFields.nomeAbreviado.create(standard).optional(),
    campus: CursoCampusRefSchema.create(standard).optional(),
    ofertaFormacao: CursoOfertaFormacaoRefSchema.create(standard).optional(),
    imagemCapa: CursoImagemCapaRefSchema.create(standard),
  }),
);

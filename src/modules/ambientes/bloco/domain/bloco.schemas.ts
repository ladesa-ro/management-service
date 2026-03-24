/**
 * Bloco — schemas zod para a entidade e suas operacoes.
 *
 * Contem os schemas de referencia, composicao (create/update)
 * e validacao da entidade. Fonte unica de verdade (SSOT) para
 * os contratos de dados da entidade.
 */
import { z } from "zod";
import { createSchema, ObjectIdUuidFactory } from "@/domain/abstractions";
import { datedSchema, uuidSchema } from "@/shared/validation/schemas";
import { BlocoFields } from "./bloco.fields";

// ============================================================================
// Fragments de referência
// ============================================================================

export const BlocoCampusRefSchema = ObjectIdUuidFactory;

export const BlocoImagemCapaRefSchema = ObjectIdUuidFactory;

// ============================================================================
// Schemas compostos
// ============================================================================

export const BlocoSchema = z
  .object({
    id: uuidSchema,
    nome: BlocoFields.nome.domainSchema,
    codigo: BlocoFields.codigo.domainSchema,
    campus: ObjectIdUuidFactory.domain.loose(),
    imagemCapa: ObjectIdUuidFactory.domain.loose().nullable(),
  })
  .extend(datedSchema.shape);

export const BlocoCreateSchema = createSchema((standard) =>
  z.object({
    nome: BlocoFields.nome.create(standard),
    codigo: BlocoFields.codigo.create(standard),
    campus: BlocoCampusRefSchema.create(standard),
  }),
);

export const BlocoUpdateSchema = createSchema((standard) =>
  z.object({
    nome: BlocoFields.nome.create(standard).optional(),
    codigo: BlocoFields.codigo.create(standard).optional(),
    campus: BlocoCampusRefSchema.create(standard).optional(),
  }),
);

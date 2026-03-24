/**
 * Usuario — schemas zod para a entidade e suas operacoes.
 *
 * Contem os schemas de referencia, composicao (create/update)
 * e validacao da entidade. Fonte unica de verdade (SSOT) para
 * os contratos de dados da entidade.
 */
import { z } from "zod";
import { createSchema, ObjectIdUuidFactory } from "@/domain/abstractions";
import { datedSchema, uuidSchema } from "@/shared/validation/schemas";
import { UsuarioFields } from "./usuario.fields";

// ============================================================================
// Fragments de referência
// ============================================================================

export const UsuarioImagemRefSchema = createSchema((standard) =>
  ObjectIdUuidFactory.create(standard).nullable().optional(),
);

// ============================================================================
// Schemas compostos
// ============================================================================

export const UsuarioSchema = z
  .object({
    id: uuidSchema,
    nome: z.string().nullable(),
    matricula: z.string().nullable(),
    email: z.string().nullable(),
    isSuperUser: z.boolean(),
    imagemCapa: z.unknown().nullable(),
    imagemPerfil: z.unknown().nullable(),
  })
  .extend(datedSchema.shape);

export const UsuarioCreateSchema = createSchema((standard) =>
  z.object({
    nome: UsuarioFields.nome.create(standard),
    matricula: UsuarioFields.matricula.create(standard),
    email: UsuarioFields.email.create(standard),
  }),
);

export const UsuarioUpdateSchema = createSchema((standard) =>
  z.object({
    nome: UsuarioFields.nome.create(standard),
    matricula: UsuarioFields.matricula.create(standard),
    email: UsuarioFields.email.create(standard),
  }),
);

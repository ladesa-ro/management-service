/**
 * Usuario — schemas zod para a entidade e suas operacoes.
 *
 * Contem os schemas de referencia, composicao (create/update)
 * e validacao da entidade. Fonte unica de verdade (SSOT) para
 * os contratos de dados da entidade.
 */
import { z } from "zod";
import { datedSchema, uuidSchema } from "@/shared/validation/schemas";
import { UsuarioFields } from "./usuario.fields";

// ============================================================================
// Fragments de referência
// ============================================================================

export const UsuarioImagemRefSchema = z.object({ id: uuidSchema }).nullable().optional();

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
  .merge(datedSchema);

export const UsuarioCreateSchema = z.object({
  nome: UsuarioFields.nome.schema,
  matricula: UsuarioFields.matricula.schema,
  email: UsuarioFields.email.schema,
});

export const UsuarioUpdateSchema = z.object({
  nome: UsuarioFields.nome.schema,
  matricula: UsuarioFields.matricula.schema,
  email: UsuarioFields.email.schema,
});

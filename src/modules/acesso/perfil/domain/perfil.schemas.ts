/**
 * Perfil — schemas zod para a entidade e suas operacoes.
 *
 * Contem os schemas de referencia, composicao (create/update)
 * e validacao da entidade. Fonte unica de verdade (SSOT) para
 * os contratos de dados da entidade.
 */
import { z } from "zod";
import { datedSchema, uuidSchema } from "@/shared/validation/schemas";
import { PerfilFields } from "./perfil.fields";

// ============================================================================
// Fragments de referência
// ============================================================================

export const PerfilCampusRefSchema = z.object({
  id: uuidSchema,
});

export const PerfilUsuarioRefSchema = z.object({
  id: uuidSchema,
});

// ============================================================================
// Schemas compostos
// ============================================================================

export const PerfilSchema = z
  .object({
    id: uuidSchema,
    ativo: PerfilFields.ativo.schema,
    cargo: PerfilFields.cargo.schema,
    campus: PerfilCampusRefSchema,
    usuario: PerfilUsuarioRefSchema,
  })
  .merge(datedSchema);

export const PerfilCreateSchema = z.object({
  cargo: PerfilFields.cargo.schema,
  campus: PerfilCampusRefSchema,
  usuario: PerfilUsuarioRefSchema,
});

export const PerfilUpdateSchema = z.object({
  ativo: PerfilFields.ativo.schema.optional(),
  cargo: PerfilFields.cargo.schema.optional(),
  campus: PerfilCampusRefSchema.optional(),
  usuario: PerfilUsuarioRefSchema.optional(),
});

export const PerfilSetVinculosInputSchema = z.object({
  cargos: z.array(z.string().min(1)),
  campus: PerfilCampusRefSchema,
  usuario: PerfilUsuarioRefSchema,
});

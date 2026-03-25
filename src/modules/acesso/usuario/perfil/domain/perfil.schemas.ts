/**
 * Perfil — schemas zod para a entidade e suas operacoes.
 *
 * Contem os schemas de referencia, composicao (create/update)
 * e validacao da entidade. Fonte unica de verdade (SSOT) para
 * os contratos de dados da entidade.
 */
import { z } from "zod";
import { createSchema, ObjectIdUuidFactory } from "@/domain/abstractions";
import { datedSchema, uuidSchema } from "@/shared/validation/schemas";
import { PerfilFields } from "./perfil.fields";

// ============================================================================
// Fragments de referência
// ============================================================================

export const PerfilCampusRefSchema = ObjectIdUuidFactory;

export const PerfilUsuarioRefSchema = ObjectIdUuidFactory;

// ============================================================================
// Schemas compostos
// ============================================================================

export const PerfilSchema = z
  .object({
    id: uuidSchema,
    ativo: PerfilFields.ativo.domainSchema,
    cargo: PerfilFields.cargo.domainSchema,
    campus: ObjectIdUuidFactory.domain,
    usuario: ObjectIdUuidFactory.domain,
  })
  .extend(datedSchema.shape);

export const PerfilCreateSchema = createSchema((standard) =>
  z.object({
    cargo: PerfilFields.cargo.create(standard),
    campus: PerfilCampusRefSchema.create(standard),
    usuario: PerfilUsuarioRefSchema.create(standard),
  }),
);

export const PerfilUpdateSchema = createSchema((standard) =>
  z.object({
    ativo: PerfilFields.ativo.create(standard).optional(),
    cargo: PerfilFields.cargo.create(standard).optional(),
    campus: PerfilCampusRefSchema.create(standard).optional(),
    usuario: PerfilUsuarioRefSchema.create(standard).optional(),
  }),
);

export const PerfilSetVinculosInputSchema = createSchema((standard) =>
  z.object({
    cargos: z.array(z.string().min(1)),
    campus: PerfilCampusRefSchema.create(standard),
    usuario: PerfilUsuarioRefSchema.create(standard),
  }),
);

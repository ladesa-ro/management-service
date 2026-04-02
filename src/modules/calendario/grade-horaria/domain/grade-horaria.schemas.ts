import { z } from "zod";
import { ObjectIdUuidFactory } from "@/domain/abstractions";
import { datedSchema, uuidSchema, versionedSchema } from "@/shared/validation/schemas";

// ============================================================================
// Intervalo (value object)
// ============================================================================

export const gradeHorariaIntervaloSchema = z
  .object({
    inicio: z.string().min(1),
    fim: z.string().min(1),
  })
  .refine((h) => h.inicio < h.fim, {
    message: "Horario inicio deve ser anterior ao fim",
  });

// ============================================================================
// Array de intervalos com validacao de sobreposicao (dentro da mesma grade)
// ============================================================================

export const gradeHorariaIntervalosArraySchema = z.array(gradeHorariaIntervaloSchema).refine(
  (intervalos) => {
    const sorted = [...intervalos].sort((a, b) => a.inicio.localeCompare(b.inicio));
    for (let i = 0; i < sorted.length - 1; i++) {
      if (sorted[i].fim > sorted[i + 1].inicio) return false;
    }
    return true;
  },
  { message: "Intervalos nao podem ter conflitos de sobreposicao dentro da mesma grade" },
);

// ============================================================================
// Schema completo (para load)
// ============================================================================

export const GradeHorariaSchema = z
  .object({
    id: uuidSchema,
    identificadorExterno: uuidSchema,
    nome: z.string().min(1),
    dataInicio: z.string().min(1),
    dataFim: z.string().nullable(),
    ativo: z.boolean(),
    campus: ObjectIdUuidFactory.domain.loose(),
    intervalos: gradeHorariaIntervalosArraySchema,
  })
  .extend(versionedSchema.shape)
  .extend(datedSchema.shape);

// ============================================================================
// Create
// ============================================================================

export const GradeHorariaCreateSchema = z.object({
  identificadorExterno: uuidSchema,
  nome: z.string().min(1),
  dataInicio: z.string().min(1),
  dataFim: z.string().nullable().optional(),
  ativo: z.boolean(),
  campus: ObjectIdUuidFactory.domain.loose(),
  intervalos: gradeHorariaIntervalosArraySchema,
});

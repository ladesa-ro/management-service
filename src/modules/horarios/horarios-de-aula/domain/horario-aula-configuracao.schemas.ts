/**
 * Horario Aula Configuracao — schemas zod para a entidade e suas operacoes.
 */
import { z } from "zod";
import { ObjectIdUuidFactory } from "@/domain/abstractions";
import { uuidSchema } from "@/shared/validation/schemas";

// ============================================================================
// Horario item (value object)
// ============================================================================

export const horarioAulaItemSchema = z
  .object({
    inicio: z.string().min(1),
    fim: z.string().min(1),
  })
  .refine((h) => h.inicio < h.fim, {
    message: "Horario inicio deve ser anterior ao fim",
  });

// ============================================================================
// Array de horarios com validacao de sobreposicao
// ============================================================================

export const horariosAulaArraySchema = z.array(horarioAulaItemSchema).refine(
  (horarios) => {
    const sorted = [...horarios].sort((a, b) => a.inicio.localeCompare(b.inicio));
    for (let i = 0; i < sorted.length - 1; i++) {
      if (sorted[i].fim > sorted[i + 1].inicio) return false;
    }
    return true;
  },
  { message: "Horarios nao podem ter conflitos de sobreposicao" },
);

// ============================================================================
// Schema completo
// ============================================================================

export const HorarioAulaConfiguracaoSchema = z.object({
  id: uuidSchema,
  dataInicio: z.string().min(1),
  dataFim: z.string().nullable(),
  ativo: z.boolean(),
  campus: ObjectIdUuidFactory.domain.loose(),
  horarios: horariosAulaArraySchema,
});

// ============================================================================
// Create
// ============================================================================

export const HorarioAulaConfiguracaoCreateSchema = z.object({
  dataInicio: z.string().min(1),
  dataFim: z.string().nullable().optional(),
  ativo: z.boolean(),
  campus: ObjectIdUuidFactory.domain.loose(),
  horarios: horariosAulaArraySchema,
});

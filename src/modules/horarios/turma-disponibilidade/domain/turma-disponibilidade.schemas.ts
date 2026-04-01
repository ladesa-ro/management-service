import { z } from "zod";
import { ObjectIdUuidFactory } from "@/domain/abstractions";
import { uuidSchema } from "@/shared/validation/schemas";

// ============================================================================
// Item (value object) — dia da semana + intervalo de tempo
// ============================================================================

export const turmaDisponibilidadeItemSchema = z
  .object({
    diaSemana: z.number().int().min(1).max(6),
    inicio: z.string().min(1),
    fim: z.string().min(1),
  })
  .refine((h) => h.inicio < h.fim, {
    message: "Horario inicio deve ser anterior ao fim",
  });

// ============================================================================
// Array de items com validacao de sobreposicao por dia
// ============================================================================

export const turmaDisponibilidadeItemsArraySchema = z.array(turmaDisponibilidadeItemSchema).refine(
  (items) => {
    const byDay = new Map<number, { inicio: string; fim: string }[]>();

    for (const item of items) {
      const dayItems = byDay.get(item.diaSemana) ?? [];
      dayItems.push({ inicio: item.inicio, fim: item.fim });
      byDay.set(item.diaSemana, dayItems);
    }

    for (const dayItems of byDay.values()) {
      const sorted = [...dayItems].sort((a, b) => a.inicio.localeCompare(b.inicio));
      for (let i = 0; i < sorted.length - 1; i++) {
        if (sorted[i].fim > sorted[i + 1].inicio) return false;
      }
    }

    return true;
  },
  { message: "Horarios nao podem ter conflitos de sobreposicao no mesmo dia" },
);

// ============================================================================
// Schema completo
// ============================================================================

export const TurmaDisponibilidadeConfiguracaoSchema = z.object({
  id: uuidSchema,
  turma: ObjectIdUuidFactory.domain.loose(),
  dataInicio: z.string().min(1),
  dataFim: z.string().min(1).nullable(),
  ativo: z.boolean(),
  horarios: turmaDisponibilidadeItemsArraySchema,
  dateCreated: z.string().min(1),
  dateUpdated: z.string().min(1),
  dateDeleted: z.string().nullable(),
});

// ============================================================================
// Create
// ============================================================================

export const TurmaDisponibilidadeConfiguracaoCreateSchema = z.object({
  turma: ObjectIdUuidFactory.domain.loose(),
  dataInicio: z.string().min(1),
  dataFim: z.string().min(1).nullable().optional(),
  horarios: turmaDisponibilidadeItemsArraySchema,
});

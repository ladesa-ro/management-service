import { z } from "zod";
import {
  coerceArray,
  datedSchema,
  stringFilterSchema,
  uuidSchema,
} from "@/shared/validation/schemas";

// ============================================================================
// Enums
// ============================================================================

export const estagioStatusValues = ["ABERTA", "EM_ANDAMENTO", "CONCLUIDA"] as const;
export const estagioStatusSchema = z.enum(estagioStatusValues);

// ============================================================================
// Fragments reutilizáveis
// ============================================================================

export const timeFormatSchema = z
  .string()
  .regex(
    /^([01]\d|2[0-3]):([0-5]\d)(:([0-5]\d))?$/,
    "formato de hora inválido (HH:MM ou HH:MM:SS)",
  );

export const horarioEstagioSchema = z.object({
  id: z.string().optional(),
  diaSemana: z.number().int().min(0, "dia da semana mínimo é 0").max(6, "dia da semana máximo é 6"),
  horaInicio: timeFormatSchema,
  horaFim: timeFormatSchema,
});

export const horarioEstagioInputSchema = z
  .object({
    diaSemana: z.number().int().min(0).max(6),
    horaInicio: timeFormatSchema,
    horaFim: timeFormatSchema,
  })
  .refine(
    (h) => {
      const toMinutes = (t: string) => {
        const [hour, minute, second] = t.split(":").map(Number);
        return hour * 60 + minute + (second ? second / 60 : 0);
      };
      return toMinutes(h.horaFim) > toMinutes(h.horaInicio);
    },
    { message: "hora de fim deve ser maior que hora de início", path: ["horaFim"] },
  );

export const dateStringSchema = z
  .string()
  .refine((val) => !isNaN(new Date(val).getTime()), "data inválida");

// ============================================================================
// Schemas compostos
// ============================================================================

export const estagioSchema = z
  .object({
    id: uuidSchema,
    idEmpresaFk: uuidSchema,
    idEstagiarioFk: z.string().uuid().nullable(),
    cargaHoraria: z.number().int().min(1),
    dataInicio: z.string().nullable(),
    dataFim: z.string().nullable(),
    status: estagioStatusSchema,
    horariosEstagio: z.array(horarioEstagioSchema),
  })
  .merge(datedSchema);

export const estagioCreateSchema = z
  .object({
    idEmpresaFk: uuidSchema,
    idEstagiarioFk: uuidSchema.optional(),
    cargaHoraria: z.number().int().min(1, "carga horária deve ser maior que zero"),
    dataInicio: dateStringSchema.optional(),
    dataFim: dateStringSchema.nullable().optional(),
    status: estagioStatusSchema.optional(),
    horariosEstagio: z.array(horarioEstagioInputSchema).optional(),
  })
  .superRefine((data, ctx) => {
    const status = data.status ?? "ABERTA";

    if (data.dataInicio && data.dataFim) {
      if (new Date(data.dataFim) < new Date(data.dataInicio)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "data de fim deve ser maior ou igual à data de início",
          path: ["dataFim"],
        });
      }
    }

    if (status === "EM_ANDAMENTO" || status === "CONCLUIDA") {
      if (!data.idEstagiarioFk) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "estagiário é obrigatório quando o estágio não está aberto",
          path: ["idEstagiarioFk"],
        });
      }
      if (!data.dataInicio) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "data de início é obrigatória neste status",
          path: ["dataInicio"],
        });
      }
    }

    if (status === "CONCLUIDA") {
      if (!data.dataFim) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "data de fim é obrigatória para estágio concluído",
          path: ["dataFim"],
        });
      }
    }
  });

export const estagioUpdateSchema = z.object({
  idEmpresaFk: uuidSchema.optional(),
  idEstagiarioFk: uuidSchema.nullable().optional(),
  cargaHoraria: z.number().int().min(1, "carga horária deve ser maior que zero").optional(),
  dataInicio: dateStringSchema.nullable().optional(),
  dataFim: dateStringSchema.nullable().optional(),
  status: estagioStatusSchema.optional(),
  horariosEstagio: z.array(horarioEstagioInputSchema).optional(),
});

// ============================================================================
// Schemas de input (presentation layer)
// ============================================================================

export const estagioFindOneInputSchema = z.object({
  id: uuidSchema,
});

export const estagioPaginationInputSchema = z.object({
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).optional(),
  search: z.string().optional(),
  sortBy: coerceArray(z.string()),
  selection: coerceArray(z.string()),
  "filter.idEmpresaFk": stringFilterSchema,
  "filter.idEstagiarioFk": stringFilterSchema,
  "filter.status": coerceArray(estagioStatusSchema),
});

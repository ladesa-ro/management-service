/**
 * Estagio — schemas zod para a entidade e suas operacoes.
 *
 * Contem os schemas de referencia, composicao (create/update)
 * e validacao da entidade. Fonte unica de verdade (SSOT) para
 * os contratos de dados da entidade.
 */
import { z } from "zod";
import { datedSchema, uuidSchema } from "@/shared/validation/schemas";
import { EstagioStatusSchema } from "./estagio.fields";

// ============================================================================
// Fragments de referência / estruturais
// ============================================================================

export const TimeFormatSchema = z
  .string()
  .regex(
    /^([01]\d|2[0-3]):([0-5]\d)(:([0-5]\d))?$/,
    "formato de hora inválido (HH:MM ou HH:MM:SS)",
  );

export const HorarioEstagioSchema = z.object({
  id: z.string().optional(),
  diaSemana: z.number().int().min(0, "dia da semana mínimo é 0").max(6, "dia da semana máximo é 6"),
  horaInicio: TimeFormatSchema,
  horaFim: TimeFormatSchema,
});

export const HorarioEstagioInputSchema = z
  .object({
    diaSemana: z.number().int().min(0).max(6),
    horaInicio: TimeFormatSchema,
    horaFim: TimeFormatSchema,
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

export const DateStringSchema = z
  .string()
  .refine((val) => !isNaN(new Date(val).getTime()), "data inválida");

export const EstagioEmpresaRefSchema = z.object({
  id: uuidSchema,
});

export const EstagioEstagiarioRefSchema = z.object({
  id: uuidSchema,
});

// ============================================================================
// Schemas compostos
// ============================================================================

export const EstagioSchema = z
  .object({
    id: uuidSchema,
    empresa: EstagioEmpresaRefSchema,
    estagiario: EstagioEstagiarioRefSchema.nullable(),
    cargaHoraria: z.number().int().min(1),
    dataInicio: z.string().nullable(),
    dataFim: z.string().nullable(),
    status: EstagioStatusSchema,
    horariosEstagio: z.array(HorarioEstagioSchema),
  })
  .merge(datedSchema);

export const EstagioCreateSchema = z
  .object({
    empresa: EstagioEmpresaRefSchema,
    estagiario: EstagioEstagiarioRefSchema.optional(),
    cargaHoraria: z.number().int().min(1, "carga horária deve ser maior que zero"),
    dataInicio: DateStringSchema.optional(),
    dataFim: DateStringSchema.nullable().optional(),
    status: EstagioStatusSchema.optional(),
    horariosEstagio: z.array(HorarioEstagioInputSchema).optional(),
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
      if (!data.estagiario) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "estagiário é obrigatório quando o estágio não está aberto",
          path: ["estagiario"],
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

export const EstagioUpdateSchema = z.object({
  empresa: EstagioEmpresaRefSchema.optional(),
  estagiario: EstagioEstagiarioRefSchema.nullable().optional(),
  cargaHoraria: z.number().int().min(1, "carga horária deve ser maior que zero").optional(),
  dataInicio: DateStringSchema.nullable().optional(),
  dataFim: DateStringSchema.nullable().optional(),
  status: EstagioStatusSchema.optional(),
  horariosEstagio: z.array(HorarioEstagioInputSchema).optional(),
});

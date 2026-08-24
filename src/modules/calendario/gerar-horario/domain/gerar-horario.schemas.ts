/**
 * Gerar Horario — schemas zod para a entidade e suas operacoes.
 */
import { z } from "zod";
import { uuidSchema } from "@/shared/validation/schemas";
import { GerarHorarioDuracao, GerarHorarioStatus } from "./gerar-horario.types";

// ============================================================================
// Schema completo do aggregate
// ============================================================================

export const GerarHorarioSchema = z.object({
  id: uuidSchema,
  status: z.nativeEnum(GerarHorarioStatus),
  duracao: z.nativeEnum(GerarHorarioDuracao),
  dataInicio: z.string().min(1),
  dataTermino: z.string().nullable(),
  requisicaoGerador: z.record(z.string(), z.unknown()).nullable(),
  respostaGerador: z.record(z.string(), z.unknown()).nullable(),
  dateCreated: z.string(),

  calendarioLetivoIds: z.array(uuidSchema),
  ofertaFormacaoIds: z.array(uuidSchema),
});

// ============================================================================
// Create
// ============================================================================

export const ConstraintKindValues = [
  "GroupOneScheduleAtSameTime",
  "TeacherOneScheduleAtSameTime",
  "DiaryLimitSchedulesInOneWeek",
  "DiaryLimitRemaining",
  "TeacherLunch",
  "GroupLunch",
  "TeacherNoOppositeTurns",
  "Teacher12Hours",
  "GroupNoOverlappingTimeSlots",
  "TeacherNoOverlappingTimeSlots",
  "RoomOneScheduleAtSameTime",
] as const;

const boostSchema = z.number().int().min(0).max(1000);

export const GerarHorarioCreateSchema = z.object({
  dataInicio: z.string().min(1),
  dataTermino: z.string().nullable().optional(),
  calendarioLetivoIds: z.array(uuidSchema).optional().default([]),
  ofertaFormacaoIds: z.array(uuidSchema).optional().default([]),

  boostSameDayOfWeekAndTimeSlot: boostSchema.optional().default(0),
  boostSameDayOfWeekOnly: boostSchema.optional().default(0),
  boostSameTimeSlotOnly: boostSchema.optional().default(0),
  boostLesserDistanceFromDayOfWeek: boostSchema.optional().default(0),
  boostLesserDistanceFromTimeSlot: boostSchema.optional().default(0),

  enabledConstraints: z.array(z.enum(ConstraintKindValues)).nullable().optional(),
});

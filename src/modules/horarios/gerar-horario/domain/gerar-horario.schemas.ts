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

export const GerarHorarioCreateSchema = z.object({
  dataInicio: z.string().min(1),
  dataTermino: z.string().nullable().optional(),
  calendarioLetivoIds: z.array(uuidSchema).optional().default([]),
  ofertaFormacaoIds: z.array(uuidSchema).optional().default([]),
});

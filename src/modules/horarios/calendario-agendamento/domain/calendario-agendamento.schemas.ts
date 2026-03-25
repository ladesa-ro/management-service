/**
 * Calendario Agendamento — schemas zod para a entidade e suas operacoes.
 */
import { z } from "zod";
import { createSchema } from "@/domain/abstractions";
import { datedSchema, uuidSchema } from "@/shared/validation/schemas";
import {
  CalendarioAgendamentoStatus,
  CalendarioAgendamentoTipo,
} from "./calendario-agendamento.types";

// ============================================================================
// Schema completo do aggregate
// ============================================================================

export const CalendarioAgendamentoSchema = z
  .object({
    id: uuidSchema,
    tipo: z.nativeEnum(CalendarioAgendamentoTipo),
    dataInicio: z.string().min(1),
    dataFim: z.string().nullable(),
    diaInteiro: z.boolean(),
    horarioInicio: z.string(),
    horarioFim: z.string(),
    repeticao: z.string().nullable(),
    nome: z.string().nullable(),
    cor: z.string().nullable(),
    status: z.nativeEnum(CalendarioAgendamentoStatus).nullable(),

    turmaIds: z.array(uuidSchema),
    perfilIds: z.array(uuidSchema),
    calendarioLetivoIds: z.array(uuidSchema),
    ofertaFormacaoIds: z.array(uuidSchema),
    modalidadeIds: z.array(uuidSchema),
    ambienteIds: z.array(uuidSchema),
    diarioIds: z.array(uuidSchema),
  })
  .extend(datedSchema.shape);

// ============================================================================
// Create
// ============================================================================

export const CalendarioAgendamentoCreateSchema = createSchema((_standard) =>
  z.object({
    tipo: z.nativeEnum(CalendarioAgendamentoTipo),
    nome: z.string().nullable().optional(),
    dataInicio: z.string().min(1),
    dataFim: z.string().nullable().optional(),
    diaInteiro: z.boolean(),
    horarioInicio: z.string().optional(),
    horarioFim: z.string().optional(),
    cor: z.string().nullable().optional(),
    repeticao: z.string().nullable().optional(),
    status: z
      .nativeEnum(CalendarioAgendamentoStatus)
      .optional()
      .default(CalendarioAgendamentoStatus.ATIVO),

    turmaIds: z.array(uuidSchema).optional().default([]),
    perfilIds: z.array(uuidSchema).optional().default([]),
    calendarioLetivoIds: z.array(uuidSchema).optional().default([]),
    ofertaFormacaoIds: z.array(uuidSchema).optional().default([]),
    modalidadeIds: z.array(uuidSchema).optional().default([]),
    ambienteIds: z.array(uuidSchema).optional().default([]),
    diarioIds: z.array(uuidSchema).optional().default([]),
  }),
);

// ============================================================================
// Update
// ============================================================================

export const CalendarioAgendamentoUpdateSchema = createSchema((_standard) =>
  z.object({
    nome: z.string().nullable().optional(),
    dataInicio: z.string().min(1).optional(),
    dataFim: z.string().nullable().optional(),
    diaInteiro: z.boolean().optional(),
    horarioInicio: z.string().optional(),
    horarioFim: z.string().optional(),
    cor: z.string().nullable().optional(),
    repeticao: z.string().nullable().optional(),

    turmaIds: z.array(uuidSchema).optional(),
    perfilIds: z.array(uuidSchema).optional(),
    calendarioLetivoIds: z.array(uuidSchema).optional(),
    ofertaFormacaoIds: z.array(uuidSchema).optional(),
    modalidadeIds: z.array(uuidSchema).optional(),
    ambienteIds: z.array(uuidSchema).optional(),
    diarioIds: z.array(uuidSchema).optional(),
  }),
);

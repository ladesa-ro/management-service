/**
 * Calendario Agendamento — schemas zod para a entidade e suas operacoes.
 *
 * Nota: `nome` e `cor` foram movidos para calendario_agendamento_metadata.
 * Eles nao fazem parte do aggregate versionado.
 */
import { z } from "zod";
import { createSchema, ObjectIdUuidFactory } from "@/domain/abstractions";
import { datedSchema, uuidSchema, versionedSchema } from "@/shared/validation/schemas";
import {
  CalendarioAgendamentoStatus,
  CalendarioAgendamentoTipo,
} from "./calendario-agendamento.types";

// ============================================================================
// Paleta de cores permitidas
// ============================================================================

export const CALENDARIO_AGENDAMENTO_CORES_PERMITIDAS = [
  "#2f9e41",
  "#1e5dcc",
  "#cd191e",
  "#b8a003",
  "#5300a6",
  "#e85d04",
  "#0d9488",
  "#db2777",
  "#6366f1",
  "#78716c",
] as const;

const corSchema = z
  .string()
  .refine((val) => CALENDARIO_AGENDAMENTO_CORES_PERMITIDAS.some((c) => c === val), {
    message: `A cor deve ser uma das seguintes: ${CALENDARIO_AGENDAMENTO_CORES_PERMITIDAS.join(", ")}`,
  });

// ============================================================================
// Ref schemas para relacoes (arrays de {id})
// ============================================================================

const objectIdUuidArraySchema = z.array(z.object({ id: uuidSchema }));

// ============================================================================
// Schema completo do aggregate (para load)
// ============================================================================

export const CalendarioAgendamentoSchema = z
  .object({
    id: uuidSchema,
    identificadorExterno: uuidSchema,
    tipo: z.nativeEnum(CalendarioAgendamentoTipo),
    dataInicio: z.string().min(1),
    dataFim: z.string().nullable(),
    diaInteiro: z.boolean(),
    horarioInicio: z.string(),
    horarioFim: z.string(),
    repeticao: z.string().nullable(),
    status: z.nativeEnum(CalendarioAgendamentoStatus).nullable(),

    turmas: objectIdUuidArraySchema,
    perfis: objectIdUuidArraySchema,
    calendariosLetivos: objectIdUuidArraySchema,
    ofertasFormacao: objectIdUuidArraySchema,
    modalidades: objectIdUuidArraySchema,
    ambientes: objectIdUuidArraySchema,
    diarios: objectIdUuidArraySchema,
  })
  .extend(versionedSchema.shape)
  .extend(datedSchema.shape);

// ============================================================================
// Create
// ============================================================================

export const CalendarioAgendamentoCreateSchema = createSchema((standard) =>
  z
    .object({
      tipo: z.nativeEnum(CalendarioAgendamentoTipo),
      dataInicio: z.string().min(1),
      dataFim: z.string().nullable().optional(),
      diaInteiro: z.boolean(),
      horarioInicio: z.string().optional(),
      horarioFim: z.string().optional(),
      repeticao: z.string().nullable().optional(),
      status: z
        .nativeEnum(CalendarioAgendamentoStatus)
        .optional()
        .default(CalendarioAgendamentoStatus.ATIVO),

      turmas: z.array(ObjectIdUuidFactory.create(standard)).optional().default([]),
      perfis: z.array(ObjectIdUuidFactory.create(standard)).optional().default([]),
      calendariosLetivos: z.array(ObjectIdUuidFactory.create(standard)).optional().default([]),
      ofertasFormacao: z.array(ObjectIdUuidFactory.create(standard)).optional().default([]),
      modalidades: z.array(ObjectIdUuidFactory.create(standard)).optional().default([]),
      ambientes: z.array(ObjectIdUuidFactory.create(standard)).optional().default([]),
      diarios: z.array(ObjectIdUuidFactory.create(standard)).optional().default([]),
    })
    .refine(
      (data) => {
        if (data.dataFim != null && data.dataInicio) {
          return data.dataFim >= data.dataInicio;
        }
        return true;
      },
      {
        message: "A data de fim deve ser igual ou posterior à data de início.",
        path: ["dataFim"],
      },
    ),
);

// ============================================================================
// Revise — campos que geram nova versao ao serem alterados
// ============================================================================

export const CalendarioAgendamentoReviseSchema = z
  .object({
    dataInicio: z.string().min(1).optional(),
    dataFim: z.string().nullable().optional(),
    diaInteiro: z.boolean().optional(),
    horarioInicio: z.string().optional(),
    horarioFim: z.string().optional(),
    repeticao: z.string().nullable().optional(),
    status: z.nativeEnum(CalendarioAgendamentoStatus).nullable().optional(),

    turmas: objectIdUuidArraySchema.optional(),
    perfis: objectIdUuidArraySchema.optional(),
    calendariosLetivos: objectIdUuidArraySchema.optional(),
    ofertasFormacao: objectIdUuidArraySchema.optional(),
    modalidades: objectIdUuidArraySchema.optional(),
    ambientes: objectIdUuidArraySchema.optional(),
    diarios: objectIdUuidArraySchema.optional(),
  })
  .refine(
    (data) => {
      if (data.dataFim != null && data.dataInicio != null) {
        return data.dataFim >= data.dataInicio;
      }
      return true;
    },
    {
      message: "A data de fim deve ser igual ou posterior à data de início.",
      path: ["dataFim"],
    },
  );

// ============================================================================
// Metadata — campos nao-versionados (tabela separada)
// ============================================================================

export const CalendarioAgendamentoMetadataSchema = z.object({
  id: uuidSchema,
  identificadorExternoCalendarioAgendamento: uuidSchema,
  nome: z.string().nullable(),
  cor: corSchema.nullable(),
  dateUpdated: z.string().min(1),
});

export const CalendarioAgendamentoMetadataUpdateSchema = z.object({
  nome: z.string().nullable().optional(),
  cor: corSchema.nullable().optional(),
});

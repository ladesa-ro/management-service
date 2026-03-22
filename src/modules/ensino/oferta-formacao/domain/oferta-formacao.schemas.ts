import { z } from "zod";
import { datedSchema, stringFilterSchema, uuidSchema } from "@/shared/validation/schemas";

// ============================================================================
// Fragments reutilizáveis
// ============================================================================

export const ofertaFormacaoNomeSchema = z.string().min(1, "nome é obrigatório");

export const ofertaFormacaoSlugSchema = z
  .string()
  .min(1, "slug é obrigatório")
  .regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    "slug deve conter apenas letras minúsculas, números e hífens",
  );

export const ofertaFormacaoDuracaoPeriodoSchema = z
  .enum(["SEMESTRAL", "ANUAL", "TRIMESTRAL", "QUADRIMESTRAL"])
  .nullable()
  .optional();

export const ofertaFormacaoModalidadeRefSchema = z.object({
  id: uuidSchema,
});

// ============================================================================
// Schemas compostos
// ============================================================================

export const ofertaFormacaoSchema = z
  .object({
    id: uuidSchema,
    nome: ofertaFormacaoNomeSchema,
    slug: ofertaFormacaoSlugSchema,
    modalidade: ofertaFormacaoModalidadeRefSchema.nullable(),
  })
  .merge(datedSchema);

export const ofertaFormacaoCreateSchema = z.object({
  nome: ofertaFormacaoNomeSchema,
  slug: ofertaFormacaoSlugSchema,
  duracaoPeriodo: ofertaFormacaoDuracaoPeriodoSchema,
  modalidade: ofertaFormacaoModalidadeRefSchema,
});

export const ofertaFormacaoUpdateSchema = z.object({
  nome: ofertaFormacaoNomeSchema.optional(),
  slug: ofertaFormacaoSlugSchema.optional(),
  duracaoPeriodo: ofertaFormacaoDuracaoPeriodoSchema,
  modalidade: ofertaFormacaoModalidadeRefSchema.optional(),
});

// ============================================================================
// Schemas de input (presentation layer)
// ============================================================================

export const ofertaFormacaoFindOneInputSchema = z.object({
  id: uuidSchema,
});

export const ofertaFormacaoPaginationInputSchema = z.object({
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).optional(),
  search: z.string().optional(),
  sortBy: z.array(z.string()).optional(),
  selection: z.array(z.string()).optional(),
  "filter.id": stringFilterSchema,
  "filter.modalidade.id": stringFilterSchema,
});

export const ofertaFormacaoGraphqlListInputSchema = z.object({
  page: z.number().int().min(1).optional().default(1),
  limit: z.number().int().min(1).optional(),
  search: z.string().optional(),
  sortBy: z.array(z.string()).optional(),
  selection: z.array(z.string()).optional(),
  filterId: z.array(z.string()).optional(),
  filterModalidadeId: z.array(z.string()).optional(),
});

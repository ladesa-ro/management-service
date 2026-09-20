import { z } from "zod";
import { uuidSchema } from "@/shared/validation/schemas";
import { EstagioCandidaturaSituacaoSchema } from "../estagio-candidatura.fields";

export const FilaEsperaListQuerySchema = z.object({
  estagioId: uuidSchema,
  page: z.coerce.number().int().min(1).default(1).optional(),
  limit: z.coerce.number().int().min(1).max(100).default(20).optional(),
  "filter.situacao": EstagioCandidaturaSituacaoSchema.optional(),
  situacao: EstagioCandidaturaSituacaoSchema.optional(),
});

export type FilaEsperaListQuery = z.infer<typeof FilaEsperaListQuerySchema>;

import { z } from "zod";
import { uuidSchema } from "@/shared/validation/schemas";

/** Path params de rotas aninhadas em /calendario/colecoes/:colecaoId/acessos */
export const CalendarioColecaoAcessoParentParamsSchema = z.object({
  colecaoId: uuidSchema,
});

/** Path params de rotas aninhadas em /calendario/colecoes/:colecaoId/acessos/:id */
export const CalendarioColecaoAcessoFindOneInputSchema = z.object({
  colecaoId: uuidSchema,
  id: uuidSchema,
});

/**
 * Relatorio — schemas Zod para a entidade e suas operacoes.
 *
 * Fonte unica de verdade (SSOT) para os contratos de dados da entidade.
 * Usados para validacao no dominio, DTOs REST e GraphQL.
 */
import { z } from "zod";
import { ObjectIdUuidFactory } from "@/domain/abstractions";
import { datedSchema, uuidSchema } from "@/shared/validation/schemas";

// ============================================================================
// Schema de referencia completa (entidade persistida)
// ============================================================================

export const RelatorioSchema = z
  .object({
    id: uuidSchema,
    estagio: ObjectIdUuidFactory.domain,
    arquivo: ObjectIdUuidFactory.domain.nullable().optional(),
    conteudoJson: z.record(z.string(), z.any()).nullable().optional(),
  })
  .extend(datedSchema.shape);

// ============================================================================
// Schema de criacao / envio de relatorio
// ============================================================================

export const RelatorioCreateSchema = z.object({
  estagio: ObjectIdUuidFactory.domain,
  arquivo: ObjectIdUuidFactory.domain.nullish(),
  conteudoJson: z.record(z.string(), z.any()).nullish(),
});

// ============================================================================
// Schema de atualizacao de relatorio
// ============================================================================

export const RelatorioUpdateSchema = z.object({
  arquivo: ObjectIdUuidFactory.domain.nullish(),
  conteudoJson: z.record(z.string(), z.any()).nullish(),
});

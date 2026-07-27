/**
 * FolhaPonto — schemas Zod para a entidade e suas operações.
 *
 * Fonte única de verdade (SSOT) para os contratos de dados da entidade.
 * Usados para validação no domínio, DTOs REST e GraphQL.
 */
import { z } from "zod";
import { ObjectIdUuidFactory } from "@/domain/abstractions";
import { datedSchema, uuidSchema } from "@/shared/validation/schemas";
import {
  FolhaPontoStatusSchema,
  FolhaPontoTokenTipoSchema,
  TimeHHMMSchema,
} from "./folha-ponto.fields";

// ============================================================================
// Schema de referência completa (entidade persistida)
// ============================================================================

export const FolhaPontoSchema = z
  .object({
    id: uuidSchema,
    estagio: ObjectIdUuidFactory.domain,
    data: z.string().date(),
    horaInicio: TimeHHMMSchema,
    horaFim: TimeHHMMSchema,
    quantidadeHoras: z.number().positive().max(24),
    observacoes: z.string().max(2000).nullable(),
    status: FolhaPontoStatusSchema,
    dataSolicitacao: z.string(),
    dataAprovacao: z.string().nullable(),
    dataRejeicao: z.string().nullable(),
  })
  .extend(datedSchema.shape)
  .refine((d) => d.horaFim > d.horaInicio, {
    message: "horaFim deve ser posterior a horaInicio",
    path: ["horaFim"],
  });

// ============================================================================
// Schema de criação (input do estagiário)
// ============================================================================

export const FolhaPontoCreateSchema = z
  .object({
    estagio: ObjectIdUuidFactory.domain,
    data: z.string().date(),
    horaInicio: TimeHHMMSchema,
    horaFim: TimeHHMMSchema,
    observacoes: z.string().max(2000).nullish(),
  })
  .refine((d) => d.horaFim > d.horaInicio, {
    message: "horaFim deve ser posterior a horaInicio",
    path: ["horaFim"],
  });

// ============================================================================
// Schema de token de uso único
// ============================================================================

export const FolhaPontoTokenSchema = z.object({
  id: uuidSchema,
  folhaPonto: ObjectIdUuidFactory.domain,
  tipo: FolhaPontoTokenTipoSchema,
  expiresAt: z.string(),
  usedAt: z.string().nullable(),
  ipAddress: z.string().nullable(),
  userAgent: z.string().nullable(),
  dateCreated: z.string(),
});

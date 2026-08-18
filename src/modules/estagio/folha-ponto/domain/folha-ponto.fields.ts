/**
 * FolhaPonto — campos (FieldMetadata) da entidade.
 *
 * Cada campo contém descrição, SchemaFactory e metadados
 * reutilizados em Swagger, GraphQL e validação de entrada.
 *
 * @see createFieldMetadata (domain/abstractions/fields/field-metadata.ts)
 */
import { z } from "zod";
import { createFieldMetadata, createSchema } from "@/domain/abstractions";

export const FolhaPontoStatusValues = [
  "PENDING",
  "APPROVED",
  "REJECTED",
  "EXPIRED",
  "CANCELLED",
] as const;

export const FolhaPontoStatusSchema = z.enum(FolhaPontoStatusValues);

export const FolhaPontoTokenTipoValues = ["APROVACAO", "REJEICAO", "CANCELAMENTO"] as const;

export const FolhaPontoTokenTipoSchema = z.enum(FolhaPontoTokenTipoValues);

// Regex estrito HH:MM (sem segundos) para registros de ponto
export const TimeHHMMSchema = z.string().regex(/^\d{2}:\d{2}$/, "Formato HH:MM esperado");

export const FolhaPontoFields = {
  estagio: createFieldMetadata({
    description: "Estágio ao qual a folha de ponto pertence",
  }),
  data: createFieldMetadata({
    description: "Data do registro de ponto (YYYY-MM-DD)",
    schema: createSchema(() => z.string().date()),
  }),
  horaInicio: createFieldMetadata({
    description: "Hora de início do turno (HH:MM)",
    schema: createSchema(() => TimeHHMMSchema),
  }),
  horaFim: createFieldMetadata({
    description: "Hora de fim do turno (HH:MM)",
    schema: createSchema(() => TimeHHMMSchema),
  }),
  quantidadeHoras: createFieldMetadata({
    description: "Total de horas trabalhadas no dia (decimal, ex: 8.5)",
    schema: createSchema(() => z.number().positive().max(24)),
  }),
  observacoes: createFieldMetadata({
    description: "Observações opcionais do estagiário",
    schema: createSchema(() => z.string().max(2000)),
    nullable: true,
  }),
  status: createFieldMetadata({
    description: "Status atual da folha de ponto",
    schema: createSchema(() => FolhaPontoStatusSchema),
  }),
  dataSolicitacao: createFieldMetadata({
    description: "Data e hora em que o ponto foi registrado",
    schema: createSchema(() => z.string()),
  }),
  dataAprovacao: createFieldMetadata({
    description: "Data e hora em que o ponto foi aprovado pelo supervisor",
    schema: createSchema(() => z.string()),
    nullable: true,
  }),
  dataRejeicao: createFieldMetadata({
    description: "Data e hora em que o ponto foi rejeitado pelo supervisor",
    schema: createSchema(() => z.string()),
    nullable: true,
  }),
};

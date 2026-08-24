/**
 * Gerar Horario — definicao dos campos (FieldMetadata) da entidade.
 *
 * Cada campo contem descricao, SchemaFactory e metadados
 * reutilizados automaticamente em Swagger, GraphQL e validacao de entrada.
 *
 * @see createFieldMetadata (domain/abstractions/fields/field-metadata.ts)
 */
import { z } from "zod";
import { createFieldMetadata, createSchema } from "@/domain/abstractions";
import { uuidSchema } from "@/shared/validation/schemas";
import { ConstraintKindValues } from "./gerar-horario.schemas";

export const GerarHorarioDuracaoValues = ["TEMPORARIO", "PERMANENTE"] as const;

export const GerarHorarioStatusValues = [
  "SOLICITADO",
  "PENDENTE",
  "SUCESSO",
  "ERRO",
  "ACEITO",
  "REJEITADO",
] as const;

export const GerarHorarioFields = {
  id: createFieldMetadata({
    description: "ID da solicitacao",
    schema: createSchema(() => uuidSchema),
  }),
  dataInicio: createFieldMetadata({
    description: "Data inicio do periodo",
    schema: createSchema(() => z.string().date()),
  }),
  dataTermino: createFieldMetadata({
    description: "Data termino do periodo",
    schema: createSchema(() => z.string().date().nullable()),
    nullable: true,
  }),
  ofertaFormacaoIds: createFieldMetadata({
    description: "IDs das ofertas de formacao",
    schema: createSchema(() => z.array(z.string().uuid())),
  }),
  calendarioLetivoIds: createFieldMetadata({
    description: "IDs dos calendarios letivos",
    schema: createSchema(() => z.array(z.string().uuid())),
  }),
  boostSameDayOfWeekAndTimeSlot: createFieldMetadata({
    description: "Peso para manter o mesmo dia da semana e horario da grade anterior",
    schema: createSchema(() => z.number().int().min(0).max(1000).optional()),
  }),
  boostSameDayOfWeekOnly: createFieldMetadata({
    description: "Peso para manter apenas o mesmo dia da semana da grade anterior",
    schema: createSchema(() => z.number().int().min(0).max(1000).optional()),
  }),
  boostSameTimeSlotOnly: createFieldMetadata({
    description: "Peso para manter apenas o mesmo horario da grade anterior",
    schema: createSchema(() => z.number().int().min(0).max(1000).optional()),
  }),
  boostLesserDistanceFromDayOfWeek: createFieldMetadata({
    description: "Peso para ficar proximo do dia da semana da grade anterior",
    schema: createSchema(() => z.number().int().min(0).max(1000).optional()),
  }),
  boostLesserDistanceFromTimeSlot: createFieldMetadata({
    description: "Peso para ficar proximo do horario da grade anterior",
    schema: createSchema(() => z.number().int().min(0).max(1000).optional()),
  }),
  enabledConstraints: createFieldMetadata({
    description: "Restricoes habilitadas. Ausente ou nulo habilita todas.",
    schema: createSchema(() => z.array(z.enum(ConstraintKindValues)).nullable().optional()),
  }),
  duracao: createFieldMetadata({
    description: "Duracao: TEMPORARIO ou PERMANENTE",
    schema: createSchema(() => z.enum(GerarHorarioDuracaoValues)),
  }),
  status: createFieldMetadata({
    description: "Status da solicitacao de geracao de horario",
    schema: createSchema(() => z.enum(GerarHorarioStatusValues)),
  }),
  respostaGerador: createFieldMetadata({
    description: "Resposta do gerador de horario",
    nullable: true,
  }),
  dateCreated: createFieldMetadata({
    description: "Data de criacao da solicitacao",
    schema: createSchema(() => z.string().datetime()),
  }),
};

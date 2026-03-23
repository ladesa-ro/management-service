/**
 * Calendario Letivo Dia — definicao dos campos (FieldMetadata) da entidade.
 *
 * Cada campo contem descricao, SchemaFactory e metadados
 * reutilizados automaticamente em Swagger, GraphQL e validacao de entrada.
 *
 * @see createFieldMetadata (domain/abstractions/fields/field-metadata.ts)
 */
import { z } from "zod";
import { createFieldMetadata, createSchema } from "@/domain/abstractions";

export const CalendarioLetivoDiaFields = {
  data: createFieldMetadata({
    description: "Data do dia no calendario",
    schema: createSchema(() => z.string().min(1, "data é obrigatória")),
  }),
  diaLetivo: createFieldMetadata({
    description: "Indica se o dia e letivo",
    schema: createSchema(() => z.boolean()),
  }),
  feriado: createFieldMetadata({
    description: "Nome do feriado (ou null se nao for)",
    schema: createSchema(() => z.string()),
  }),
  diaPresencial: createFieldMetadata({
    description: "Indica se o dia e presencial",
    schema: createSchema(() => z.boolean()),
  }),
  tipo: createFieldMetadata({
    description: "Tipo do dia (presencial, feriado, sabado, etc.)",
    schema: createSchema(() => z.string().min(1, "tipo é obrigatório")),
  }),
  extraCurricular: createFieldMetadata({
    description: "Indica se o dia e extracurricular",
    schema: createSchema(() => z.boolean()),
  }),
  calendario: createFieldMetadata({
    description: "Calendario letivo ao qual o dia pertence",
  }),
};

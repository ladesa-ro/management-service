/**
 * Calendario Letivo Dia — definicao dos campos (FieldMetadata) da entidade.
 *
 * Cada campo contem descricao, schema zod (quando aplicavel) e metadados
 * reutilizados automaticamente em Swagger, GraphQL e validacao de entrada.
 *
 * @see createFieldMetadata (domain/abstractions/fields/field-metadata.ts)
 */
import { z } from "zod";
import { createFieldMetadata } from "@/domain/abstractions";

export const CalendarioLetivoDiaFields = {
  data: createFieldMetadata({
    description: "Data do dia no calendario",
    schema: z.string().min(1, "data é obrigatória"),
  }),
  diaLetivo: createFieldMetadata({
    description: "Indica se o dia e letivo",
    schema: z.boolean(),
  }),
  feriado: createFieldMetadata({
    description: "Nome do feriado (ou null se nao for)",
    schema: z.string(),
  }),
  diaPresencial: createFieldMetadata({
    description: "Indica se o dia e presencial",
    schema: z.boolean(),
  }),
  tipo: createFieldMetadata({
    description: "Tipo do dia (presencial, feriado, sabado, etc.)",
    schema: z.string().min(1, "tipo é obrigatório"),
  }),
  extraCurricular: createFieldMetadata({
    description: "Indica se o dia e extracurricular",
    schema: z.boolean(),
  }),
  calendario: createFieldMetadata({
    description: "Calendario letivo ao qual o dia pertence",
  }),
};

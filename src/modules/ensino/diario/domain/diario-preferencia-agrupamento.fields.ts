/**
 * Diario Preferencia Agrupamento — definicao dos campos (FieldMetadata) da entidade.
 *
 * Cada campo contem descricao, schema zod (quando aplicavel) e metadados
 * reutilizados automaticamente em Swagger, GraphQL e validacao de entrada.
 *
 * @see createFieldMetadata (domain/abstractions/fields/field-metadata.ts)
 */
import { z } from "zod";
import { createFieldMetadata } from "@/domain/abstractions";

export const DiarioPreferenciaAgrupamentoFields = {
  dataInicio: createFieldMetadata({
    description: "Inicio da vigencia da preferencia de agrupamento",
    schema: z.string().min(1, "dataInicio é obrigatória"),
  }),
  dataFim: createFieldMetadata({
    description: "Fim da vigencia da preferencia de agrupamento",
    schema: z.string().nullable().optional(),
  }),
  diaSemanaIso: createFieldMetadata({
    description: "Dia da semana (ISO 8601: 1=Segunda, 7=Domingo)",
    schema: z
      .number()
      .int()
      .min(1, "diaSemanaIso deve ser >= 1")
      .max(7, "diaSemanaIso deve ser <= 7"),
  }),
  aulasSeguidas: createFieldMetadata({
    description: "Quantidade de aulas seguidas",
    schema: z.number().int().min(1, "aulasSeguidas deve ser >= 1"),
  }),
  diario: createFieldMetadata({
    description: "Diario vinculado",
  }),
};

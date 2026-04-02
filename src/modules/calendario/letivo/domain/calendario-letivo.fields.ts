/**
 * Calendario Letivo — definicao dos campos (FieldMetadata) da entidade.
 *
 * Cada campo contem descricao, SchemaFactory e metadados
 * reutilizados automaticamente em Swagger, GraphQL e validacao de entrada.
 *
 * @see createFieldMetadata (domain/abstractions/fields/field-metadata.ts)
 */
import { z } from "zod";
import { createFieldMetadata, createSchema, safeInt } from "@/domain/abstractions";

export const CalendarioLetivoFields = {
  nome: createFieldMetadata({
    description: "Nome do calendario letivo",
    schema: createSchema(() => z.string().min(1, "nome é obrigatório")),
  }),
  ano: createFieldMetadata({
    description: "Ano do calendario letivo",
    schema: createSchema((standard) => safeInt(standard, (s) => s.min(1, "ano deve ser >= 1"))),
  }),
  campus: createFieldMetadata({
    description: "Campus ao qual o calendario letivo pertence",
  }),
  ofertaFormacao: createFieldMetadata({
    description: "Oferta de formacao do calendario letivo",
  }),
};

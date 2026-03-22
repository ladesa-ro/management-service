/**
 * Oferta Formacao Nivel Formacao — definicao dos campos (FieldMetadata) da entidade.
 *
 * Cada campo contem descricao, schema zod (quando aplicavel) e metadados
 * reutilizados automaticamente em Swagger, GraphQL e validacao de entrada.
 *
 * @see createFieldMetadata (domain/abstractions/fields/field-metadata.ts)
 */
import { createFieldMetadata } from "@/domain/abstractions";

export const OfertaFormacaoNivelFormacaoFields = {
  nivelFormacao: createFieldMetadata({
    description: "Nivel de formacao vinculado",
  }),
  ofertaFormacao: createFieldMetadata({
    description: "Oferta de formacao vinculada",
  }),
};

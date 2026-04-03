/**
 * Curso — definicao dos campos (FieldMetadata) da entidade.
 *
 * Cada campo contem descricao, schema zod (quando aplicavel) e metadados
 * reutilizados automaticamente em Swagger, GraphQL e validacao de entrada.
 *
 * @see createFieldMetadata (domain/abstractions/fields/field-metadata.ts)
 */
import { z } from "zod";
import { createFieldMetadata, createSchema } from "@/domain/abstractions";

export const CursoFields = {
  nome: createFieldMetadata({
    description: "Nome do curso",
    schema: createSchema(() => z.string().min(1, "nome é obrigatório")),
  }),
  nomeAbreviado: createFieldMetadata({
    description: "Nome abreviado do curso",
    schema: createSchema(() => z.string().min(1, "nomeAbreviado é obrigatório")),
  }),
  campus: createFieldMetadata({
    description: "Campus que o curso pertence",
  }),
  ofertaFormacao: createFieldMetadata({
    description: "Oferta de formacao do curso",
  }),
  quantidadePeriodos: createFieldMetadata({
    description: "Quantidade de períodos do curso",
    schema: createSchema(() => z.number().int().min(1).max(12)),
  }),
  imagemCapa: createFieldMetadata({
    description: "Imagem de capa do curso",
    nullable: true,
  }),
};

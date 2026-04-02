/**
 * Modalidade — definicao dos campos (FieldMetadata) da entidade.
 *
 * Cada campo contem descricao, schema zod (quando aplicavel) e metadados
 * reutilizados automaticamente em Swagger, GraphQL e validacao de entrada.
 *
 * @see createFieldMetadata (domain/abstractions/fields/field-metadata.ts)
 */
import { z } from "zod";
import { createFieldMetadata, createSchema } from "@/domain/abstractions";

export const ModalidadeFields = {
  nome: createFieldMetadata({
    description: "Nome da modalidade",
    schema: createSchema(() => z.string().min(1, "nome é obrigatório")),
  }),
  slug: createFieldMetadata({
    description: "Apelido da modalidade",
    schema: createSchema(() => z.string().min(1, "slug é obrigatório")),
  }),
  imagemCapa: createFieldMetadata({
    description: "Imagem de capa da modalidade",
    nullable: true,
  }),
};

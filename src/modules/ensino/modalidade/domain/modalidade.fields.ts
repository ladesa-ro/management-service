/**
 * Modalidade — definicao dos campos (FieldMetadata) da entidade.
 *
 * Cada campo contem descricao, schema zod (quando aplicavel) e metadados
 * reutilizados automaticamente em Swagger, GraphQL e validacao de entrada.
 *
 * @see createFieldMetadata (domain/abstractions/fields/field-metadata.ts)
 */
import { z } from "zod";
import { createFieldMetadata } from "@/domain/abstractions";

export const ModalidadeFields = {
  nome: createFieldMetadata({
    description: "Nome da modalidade",
    schema: z.string().min(1, "nome é obrigatório"),
  }),
  slug: createFieldMetadata({
    description: "Apelido da modalidade",
    schema: z
      .string()
      .min(1, "slug é obrigatório")
      .regex(
        /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
        "slug deve conter apenas letras minúsculas, números e hífens",
      ),
  }),
};

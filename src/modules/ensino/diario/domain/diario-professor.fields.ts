/**
 * Diario Professor — definicao dos campos (FieldMetadata) da entidade.
 *
 * Cada campo contem descricao, schema zod (quando aplicavel) e metadados
 * reutilizados automaticamente em Swagger, GraphQL e validacao de entrada.
 *
 * @see createFieldMetadata (domain/abstractions/fields/field-metadata.ts)
 */
import { z } from "zod";
import { createFieldMetadata } from "@/domain/abstractions";

export const DiarioProfessorFields = {
  situacao: createFieldMetadata({
    description: "Situacao do vinculo",
    schema: z.boolean(),
  }),
  diario: createFieldMetadata({
    description: "Diario vinculado",
  }),
  perfil: createFieldMetadata({
    description: "Perfil do usuario ao campus",
  }),
};

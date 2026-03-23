/**
 * Estagiario — definicao dos campos (FieldMetadata) da entidade.
 *
 * Cada campo contem descricao, SchemaFactory e metadados
 * reutilizados automaticamente em Swagger, GraphQL e validacao de entrada.
 *
 * @see createFieldMetadata (domain/abstractions/fields/field-metadata.ts)
 */
import { z } from "zod";
import { createFieldMetadata, createSchema } from "@/domain/abstractions";

export const EstagiarioFields = {
  perfil: createFieldMetadata({
    description: "Perfil vinculado ao estagiário",
  }),
  curso: createFieldMetadata({
    description: "Curso vinculado ao estagiário",
  }),
  turma: createFieldMetadata({
    description: "Turma vinculada ao estagiário",
  }),
  telefone: createFieldMetadata({
    description: "Telefone do estagiário",
    schema: createSchema(() =>
      z
        .string()
        .min(1, "telefone é obrigatório")
        .max(15, "telefone deve ter no máximo 15 caracteres"),
    ),
  }),
  emailInstitucional: createFieldMetadata({
    description: "Email institucional do estagiário",
    schema: createSchema(() =>
      z.string().email("email institucional inválido").nullable().optional(),
    ),
  }),
  dataNascimento: createFieldMetadata({
    description: "Data de nascimento do estagiário",
    schema: createSchema(() =>
      z
        .string()
        .min(1, "data de nascimento é obrigatória")
        .refine((val) => !isNaN(new Date(val).getTime()), "data de nascimento inválida"),
    ),
  }),
  ativo: createFieldMetadata({
    description: "Se o estagiário está ativo",
  }),
};

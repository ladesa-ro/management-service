/**
 * Perfil — definicao dos campos (FieldMetadata) da entidade.
 *
 * Cada campo contem descricao, schema zod (quando aplicavel) e metadados
 * reutilizados automaticamente em Swagger, GraphQL e validacao de entrada.
 *
 * @see createFieldMetadata (domain/abstractions/fields/field-metadata.ts)
 */
import { z } from "zod";
import { createFieldMetadata } from "@/domain/abstractions";

export const PerfilFields = {
  ativo: createFieldMetadata({
    description: "Indica se o vinculo esta ativo",
    schema: z.boolean(),
  }),
  cargo: createFieldMetadata({
    description: "Cargo do usuario no vinculo",
    schema: z.string().min(1, "cargo é obrigatório"),
  }),
  campus: createFieldMetadata({
    description: "Campus associado ao vinculo",
  }),
  usuario: createFieldMetadata({
    description: "Usuario associado ao vinculo",
  }),
  cargos: createFieldMetadata({
    description: "Lista de cargos que o usuario tera no campus",
  }),
};

/**
 * Perfil — definicao dos campos (FieldMetadata) da entidade.
 *
 * Cada campo contem descricao, schema zod (quando aplicavel) e metadados
 * reutilizados automaticamente em Swagger, GraphQL e validacao de entrada.
 *
 * @see createFieldMetadata (domain/abstractions/fields/field-metadata.ts)
 */
import { z } from "zod";
import { createFieldMetadata, createSchema, safeInt } from "@/domain/abstractions";

export const PerfilFields = {
  ativo: createFieldMetadata({
    description: "Indica se o vinculo esta ativo",
    schema: createSchema(() => z.boolean()),
  }),
  cargo: createFieldMetadata({
    description: "Cargo do usuario no vinculo",
    schema: createSchema(() => z.string().min(1, "cargo é obrigatório")),
  }),
  campus: createFieldMetadata({
    description: "Campus associado ao vinculo",
  }),
  usuario: createFieldMetadata({
    description: "Usuario associado ao vinculo",
  }),
  cargaMaximaSemanal: createFieldMetadata({
    description: "Carga horária semanal máxima do professor, em horas — nulo significa sem limite",
    schema: createSchema((standard) =>
      safeInt(standard, (s) => s.min(1, "cargaMaximaSemanal deve ser no mínimo 1"))
        .nullable()
        .optional(),
    ),
    nullable: true,
  }),
};

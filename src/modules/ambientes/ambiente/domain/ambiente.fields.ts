/**
 * Ambiente — definicao dos campos (FieldMetadata) da entidade.
 *
 * Cada campo contem descricao, SchemaFactory e metadados
 * reutilizados automaticamente em Swagger, GraphQL e validacao de entrada.
 *
 * @see createFieldMetadata (domain/abstractions/fields/field-metadata.ts)
 */
import { z } from "zod";
import { createFieldMetadata, createSchema, safeInt } from "@/domain/abstractions";

export const AmbienteFields = {
  nome: createFieldMetadata({
    description: "Nome do ambiente/sala",
    schema: createSchema(() => z.string().min(1, "nome é obrigatório")),
  }),
  descricao: createFieldMetadata({
    description: "Descricao do ambiente/sala",
    schema: createSchema(() => z.string().nullable().optional()),
    nullable: true,
  }),
  codigo: createFieldMetadata({
    description: "Codigo do ambiente/sala",
    schema: createSchema(() => z.string().min(1, "codigo é obrigatório")),
  }),
  capacidade: createFieldMetadata({
    description: "Capacidade do ambiente/sala",
    schema: createSchema((standard) =>
      safeInt(standard, (s) => s.min(0))
        .nullable()
        .optional(),
    ),
    nullable: true,
  }),
  tipo: createFieldMetadata({
    description: "Tipo do ambiente/sala. Ex.: sala aula, auditorio, laboratorio de quimica",
    schema: createSchema(() => z.string().nullable().optional()),
    nullable: true,
  }),
  bloco: createFieldMetadata({
    description: "Bloco que o ambiente/sala pertence",
  }),
  imagemCapa: createFieldMetadata({
    description: "Imagem de capa do ambiente",
    nullable: true,
  }),
};

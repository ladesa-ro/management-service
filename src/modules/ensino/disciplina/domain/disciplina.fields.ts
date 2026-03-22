/**
 * Disciplina — definicao dos campos (FieldMetadata) da entidade.
 *
 * Cada campo contem descricao, schema zod (quando aplicavel) e metadados
 * reutilizados automaticamente em Swagger, GraphQL e validacao de entrada.
 *
 * @see createFieldMetadata (domain/abstractions/fields/field-metadata.ts)
 */
import { z } from "zod";
import { createFieldMetadata } from "@/domain/abstractions";

export const DisciplinaFields = {
  nome: createFieldMetadata({
    description: "Nome da disciplina",
    schema: z.string().min(1, "nome é obrigatório"),
  }),
  nomeAbreviado: createFieldMetadata({
    description: "Nome abreviado da disciplina",
    schema: z.string().min(1, "nomeAbreviado é obrigatório"),
  }),
  cargaHoraria: createFieldMetadata({
    description: "Carga horaria da disciplina",
    schema: z.number().int().min(1, "cargaHoraria deve ser no mínimo 1"),
  }),
  imagemCapa: createFieldMetadata({
    description: "Imagem de capa da disciplina",
  }),
};

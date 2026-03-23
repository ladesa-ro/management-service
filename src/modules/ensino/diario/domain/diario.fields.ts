/**
 * Diario — definicao dos campos (FieldMetadata) da entidade.
 *
 * Cada campo contem descricao, schema zod (quando aplicavel) e metadados
 * reutilizados automaticamente em Swagger, GraphQL e validacao de entrada.
 *
 * @see createFieldMetadata (domain/abstractions/fields/field-metadata.ts)
 */
import { z } from "zod";
import { createFieldMetadata, createSchema } from "@/domain/abstractions";

export const DiarioFields = {
  ativo: createFieldMetadata({
    description: "Situacao do diario",
    schema: createSchema(() => z.boolean()),
  }),
  calendarioLetivo: createFieldMetadata({
    description: "Calendario letivo vinculado ao diario",
  }),
  turma: createFieldMetadata({
    description: "Turma vinculada ao diario",
  }),
  disciplina: createFieldMetadata({
    description: "Disciplina vinculada ao diario",
  }),
  ambientePadrao: createFieldMetadata({
    description: "Ambiente padrao",
  }),
  imagemCapa: createFieldMetadata({
    description: "Imagem de capa do diario",
  }),
};

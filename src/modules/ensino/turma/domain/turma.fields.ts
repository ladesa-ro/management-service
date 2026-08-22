/**
 * Turma — definicao dos campos (FieldMetadata) da entidade.
 *
 * Cada campo contem descricao, schema zod (quando aplicavel) e metadados
 * reutilizados automaticamente em Swagger, GraphQL e validacao de entrada.
 *
 * @see createFieldMetadata (domain/abstractions/fields/field-metadata.ts)
 */
import { z } from "zod";
import { createFieldMetadata, createSchema, safeInt } from "@/domain/abstractions";

export const TurmaFields = {
  periodo: createFieldMetadata({
    description: "Periodo da turma",
    schema: createSchema(() => z.string().min(1, "periodo é obrigatório")),
  }),
  nome: createFieldMetadata({
    description: "Nome da turma",
    schema: createSchema(() => z.string().nullable().optional()),
    nullable: true,
  }),
  curso: createFieldMetadata({
    description: "Curso da turma",
  }),
  ambientePadraoAula: createFieldMetadata({
    description: "Ambiente padrao da sala de aula",
    nullable: true,
  }),
  imagemCapa: createFieldMetadata({
    description: "Imagem de capa da turma",
    nullable: true,
  }),
  numeroEstimadoAlunos: createFieldMetadata({
    description:
      "Número estimado de alunos da turma, usado para validar a capacidade dos ambientes agendados — nulo significa não informado",
    schema: createSchema((standard) =>
      safeInt(standard, (s) => s.min(1, "numeroEstimadoAlunos deve ser no mínimo 1"))
        .nullable()
        .optional(),
    ),
    nullable: true,
  }),
};

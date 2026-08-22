/**
 * TurmaMatricula — definicao dos campos (FieldMetadata) da entidade.
 */
import { createFieldMetadata } from "@/domain/abstractions";

export const TurmaMatriculaFields = {
  turma: createFieldMetadata({
    description: "Turma em que o perfil esta matriculado",
  }),
  perfil: createFieldMetadata({
    description: "Perfil do aluno matriculado (nao o usuario diretamente — a matricula e por campus/oferta)",
  }),
};

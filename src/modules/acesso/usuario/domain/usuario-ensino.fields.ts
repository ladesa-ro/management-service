/**
 * UsuarioEnsino — definicao dos campos (FieldMetadata) para os DTOs
 * de dados de ensino do usuario (turma ref, curso ref, disciplina ref).
 */
import { z } from "zod";
import { createFieldMetadata, ObjectIdUuidFactory, SharedFields } from "@/domain/abstractions";

export const UsuarioEnsinoTurmaRefFields = {
  id: SharedFields.idUuid,
  periodo: createFieldMetadata({
    description: "Periodo da turma",
    schema: z.string(),
  }),
};

export const UsuarioEnsinoCursoRefFields = {
  id: SharedFields.idUuid,
  nome: createFieldMetadata({
    description: "Nome do curso",
    schema: z.string(),
  }),
  turmas: createFieldMetadata({
    description: "Turmas do curso onde o usuario leciona",
  }),
};

export const UsuarioEnsinoDisciplinaRefFields = {
  id: SharedFields.idUuid,
  nome: createFieldMetadata({
    description: "Nome da disciplina",
    schema: z.string(),
  }),
  cursos: createFieldMetadata({
    description: "Cursos onde o usuario leciona esta disciplina",
  }),
};

export const UsuarioEnsinoOutputFields = {
  usuario: createFieldMetadata({
    description: "Dados do usuario",
  }),
  disciplinas: createFieldMetadata({
    description: "Disciplinas onde o usuario leciona (com cursos e turmas)",
  }),
};

export const VinculoInputFields = {
  campus: createFieldMetadata({
    description: "Campus associado ao vinculo",
    schema: ObjectIdUuidFactory,
  }),
  cargo: createFieldMetadata({
    description: "Cargo do usuario no vinculo",
    schema: z.string(),
  }),
};

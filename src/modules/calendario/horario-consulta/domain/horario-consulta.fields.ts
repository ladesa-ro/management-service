/**
 * HorarioConsulta — definicao dos campos (FieldMetadata) para os DTOs
 * de consulta de horários semanais, aulas, professores, etc.
 */
import { z } from "zod";
import { createFieldMetadata, SharedFields } from "@/domain/abstractions";

export const HorarioAulaItemDisciplinaFields = {
  id: SharedFields.idUuid,
  nome: createFieldMetadata({ description: "Nome da disciplina", schema: z.string() }),
  nomeAbreviado: createFieldMetadata({
    description: "Nome abreviado da disciplina",
    schema: z.string(),
  }),
};

export const HorarioAulaItemTurmaFields = {
  id: SharedFields.idUuid,
  periodo: createFieldMetadata({ description: "Periodo da turma", schema: z.number().int() }),
};

export const HorarioAulaItemDiarioFields = {
  id: SharedFields.idUuid,
  disciplina: createFieldMetadata({ description: "Disciplina do diario" }),
  turma: createFieldMetadata({ description: "Turma do diario" }),
};

export const HorarioAulaItemProfessorUsuarioFields = {
  id: SharedFields.idUuid,
  nome: createFieldMetadata({
    description: "Nome do usuario",
    schema: z.string(),
    nullable: true,
  }),
};

export const HorarioAulaItemProfessorPerfilFields = {
  id: SharedFields.idUuid,
  cargo: createFieldMetadata({ description: "Cargo do perfil", schema: z.string() }),
};

export const HorarioAulaItemProfessorFields = {
  id: SharedFields.idUuid,
  perfil: createFieldMetadata({ description: "Perfil do professor" }),
  usuario: createFieldMetadata({ description: "Usuario do professor" }),
};

export const HorarioAulaItemAmbienteFields = {
  id: SharedFields.idUuid,
  nome: createFieldMetadata({ description: "Nome do ambiente", schema: z.string() }),
  codigo: createFieldMetadata({ description: "Codigo do ambiente", schema: z.string() }),
};

export const HorarioAulaItemFields = {
  id: SharedFields.idUuid,
  dataInicio: createFieldMetadata({
    description: "Data de inicio",
    schema: z.string().date(),
  }),
  dataFim: createFieldMetadata({
    description: "Data de fim",
    schema: z.string().date().nullable(),
    nullable: true,
  }),
  horarioInicio: createFieldMetadata({
    description: "Horário de inicio (HH:MM:SS)",
    schema: z.string(),
  }),
  horarioFim: createFieldMetadata({
    description: "Horário de fim (HH:MM:SS)",
    schema: z.string(),
  }),
  nome: createFieldMetadata({
    description: "Nome da aula/evento",
    schema: z.string(),
    nullable: true,
  }),
  cor: createFieldMetadata({
    description: "Cor do evento",
    schema: z.string(),
    nullable: true,
  }),
  diario: createFieldMetadata({ description: "Diario vinculado", nullable: true }),
  professores: createFieldMetadata({ description: "Professores da aula" }),
  ambiente: createFieldMetadata({ description: "Ambiente da aula", nullable: true }),
};

export const HorarioSemanalDiaFields = {
  data: createFieldMetadata({ description: "Data do dia", schema: z.string().date() }),
  diaSemana: createFieldMetadata({
    description: "Dia da semana (0=dom, 1=seg, ..., 6=sab)",
    schema: z.number().int(),
  }),
  aulas: createFieldMetadata({ description: "Aulas do dia" }),
};

export const HorarioSemanalOutputFields = {
  semanaInicio: createFieldMetadata({
    description: "Data inicio da semana",
    schema: z.string().date(),
  }),
  semanaFim: createFieldMetadata({
    description: "Data fim da semana",
    schema: z.string().date(),
  }),
  dias: createFieldMetadata({ description: "Dias da semana com aulas" }),
};

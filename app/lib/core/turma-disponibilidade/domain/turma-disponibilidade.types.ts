import type { IDisponibilidade } from "@/core/disponibilidade/domain/disponibilidade.types";
import type { ITurma } from "@/core/turma/domain/turma.types";

export interface ITurmaDisponibilidade {
  id: string;
  turma: ITurma;
  disponibilidade: IDisponibilidade;
  dateCreated: Date;
  dateUpdated: Date;
  dateDeleted: Date | null;
}

export interface ITurmaDisponibilidadeCreate {
  turma: { id: string };
  disponibilidade: { id: string };
}

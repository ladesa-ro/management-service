import type { IdUuid, IEntityBase } from "@/modules/@shared";
import type { IDisponibilidade } from "@/modules/disponibilidade/domain/disponibilidade.types";
import type { ITurma } from "@/modules/turma/domain/turma.types";

export interface ITurmaDisponibilidade extends IEntityBase {
  turma: ITurma;
  disponibilidade: IDisponibilidade;
}

export interface ITurmaDisponibilidadeCreate {
  turma: { id: IdUuid };
  disponibilidade: { id: IdUuid };
}

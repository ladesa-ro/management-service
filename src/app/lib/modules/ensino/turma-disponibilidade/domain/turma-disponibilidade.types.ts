import type { IdUuid, IEntityBase } from "@/modules/@shared";
import type { IDisponibilidade } from "@/modules/ensino/disponibilidade/domain/disponibilidade.types";
import type { ITurma } from "@/modules/ensino/turma/domain/turma.types";

export interface ITurmaDisponibilidade extends IEntityBase {
  turma: ITurma | null;
  disponibilidade: IDisponibilidade | null;
}

export interface ITurmaDisponibilidadeCreate {
  turma: { id: IdUuid };
  disponibilidade: { id: IdUuid };
}

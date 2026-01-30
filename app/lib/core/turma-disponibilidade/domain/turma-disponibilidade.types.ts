import type { IdUuid, ScalarDateTimeString } from "@/core/@shared";
import type { IDisponibilidade } from "@/core/disponibilidade/domain/disponibilidade.types";
import type { ITurma } from "@/core/turma/domain/turma.types";

export interface ITurmaDisponibilidade {
  id: IdUuid;
  turma: ITurma;
  disponibilidade: IDisponibilidade;
  dateCreated: ScalarDateTimeString;
  dateUpdated: ScalarDateTimeString;
  dateDeleted: ScalarDateTimeString | null;
}

export interface ITurmaDisponibilidadeCreate {
  turma: { id: IdUuid };
  disponibilidade: { id: IdUuid };
}

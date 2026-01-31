import type { IdUuid, ScalarDateTimeString } from "@/modules/@shared";
import type { IDisponibilidade } from "@/modules/disponibilidade/domain/disponibilidade.types";
import type { ITurma } from "@/modules/turma/domain/turma.types";

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

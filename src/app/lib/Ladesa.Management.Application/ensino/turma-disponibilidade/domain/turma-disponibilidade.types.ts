import type { IdUuid, IEntityBase } from "@/Ladesa.Management.Application/@shared";
import type { IDisponibilidade } from "@/Ladesa.Management.Application/ensino/disponibilidade/domain/disponibilidade.types";
import type { ITurma } from "@/Ladesa.Management.Application/ensino/turma/domain/turma.types";

export interface ITurmaDisponibilidade extends IEntityBase {
  turma: ITurma | null;
  disponibilidade: IDisponibilidade | null;
}

export interface ITurmaDisponibilidadeCreate {
  turma: { id: IdUuid };
  disponibilidade: { id: IdUuid };
}

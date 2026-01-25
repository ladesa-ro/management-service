import { Disponibilidade } from "../../disponibilidade/domain/disponibilidade.domain";
import { Turma } from "../../turma/domain/turma.domain";

export class TurmaDisponibilidade {
  id!: string;
  turma!: Turma;
  disponibilidade!: Disponibilidade;
  dateCreated!: Date;
  dateUpdated!: Date;
  dateDeleted!: Date | null;
}

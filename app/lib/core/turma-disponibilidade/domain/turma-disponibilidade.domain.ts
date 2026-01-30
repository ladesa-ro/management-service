import type { Disponibilidade } from "@/core/disponibilidade/domain/disponibilidade.domain";
import type { Turma } from "@/core/turma/domain/turma.domain";
import type {
  ITurmaDisponibilidade,
  ITurmaDisponibilidadeCreate,
} from "./turma-disponibilidade.types";

export class TurmaDisponibilidade implements ITurmaDisponibilidade {
  id!: string;
  turma!: Turma;
  disponibilidade!: Disponibilidade;
  dateCreated!: Date;
  dateUpdated!: Date;
  dateDeleted!: Date | null;

  static criar(dados: ITurmaDisponibilidadeCreate): TurmaDisponibilidade {
    const turmaDisponibilidade = new TurmaDisponibilidade();
    return turmaDisponibilidade;
  }

  static fromData(dados: ITurmaDisponibilidade): TurmaDisponibilidade {
    const turmaDisponibilidade = new TurmaDisponibilidade();
    Object.assign(turmaDisponibilidade, dados);
    return turmaDisponibilidade;
  }

  isAtivo(): boolean {
    return this.dateDeleted === null;
  }
}

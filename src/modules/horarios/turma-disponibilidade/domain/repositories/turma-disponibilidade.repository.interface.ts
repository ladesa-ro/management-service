import type { TurmaDisponibilidadeConfiguracao } from "../turma-disponibilidade";

export const ITurmaDisponibilidadeRepository = Symbol("ITurmaDisponibilidadeRepository");

export interface ITurmaDisponibilidadeRepository {
  findByWeek(
    turmaId: string,
    domingoSemana: string,
  ): Promise<TurmaDisponibilidadeConfiguracao | null>;
  save(config: TurmaDisponibilidadeConfiguracao): Promise<void>;
  encerrarVigente(turmaId: string, dataFim: string): Promise<void>;
  findActiveOverlapping(
    turmaId: string,
    rangeInicio: string,
    rangeFim: string | null,
  ): Promise<TurmaDisponibilidadeConfiguracao[]>;
  deactivateById(configId: string): Promise<void>;
}

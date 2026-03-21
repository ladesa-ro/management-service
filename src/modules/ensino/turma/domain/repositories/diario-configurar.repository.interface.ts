export const IDiarioConfigurarRepository = Symbol("IDiarioConfigurarRepository");

export interface IDiarioConfigurarRepository {
  createDiario(data: {
    id: string;
    ativo: boolean;
    turmaId: string;
    disciplinaId: string;
    calendarioLetivoId: string;
  }): Promise<void>;

  createDiarioProfessor(data: {
    id: string;
    situacao: boolean;
    diarioId: string;
    perfilId: string;
  }): Promise<void>;
}

export const IRelatorioRepository = Symbol("IRelatorioRepository");

export interface IAulasMinistradas {
  diarioId: string | undefined;
  professorNome: string | null;
  perfilId: string | null;
  disciplinaNome: string | null;
  disciplinaId: string | null;
  turmaPeriodo: string | null;
  turmaNome: string | null;
  turmaId: string | null;
  cursoNome: string | null;
  cursoId: string | null;
  calendarioLetivoNome: string | null;
  calendarioLetivoAno: number | null;
  ativo: boolean;
}

export interface IAulasMinistradasQuery {
  perfilId?: string;
  turmaId?: string;
  disciplinaId?: string;
  cursoId?: string;
  periodo?: string;
}

export interface IRelatorioRepository {
  findAulasMinistradas(query: IAulasMinistradasQuery): Promise<IAulasMinistradas[]>;
}

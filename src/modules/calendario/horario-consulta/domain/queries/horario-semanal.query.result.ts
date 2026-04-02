export interface HorarioAulaItem {
  id: string;
  dataInicio: string;
  dataFim: string | null;
  horarioInicio: string;
  horarioFim: string;
  nome: string | null;
  cor: string | null;

  diario: {
    id: string;
    disciplina: { id: string; nome: string; nomeAbreviado: string };
    turma: { id: string; periodo: number };
  } | null;

  professores: Array<{
    id: string;
    perfil: { id: string; cargo: string };
    usuario: { id: string; nome: string | null };
  }>;

  ambiente: {
    id: string;
    nome: string;
    codigo: string;
  } | null;
}

export interface HorarioSemanalDia {
  data: string;
  diaSemana: number;
  aulas: HorarioAulaItem[];
}

export class HorarioSemanalQueryResult {
  semanaInicio!: string;
  semanaFim!: string;
  dias!: HorarioSemanalDia[];
}

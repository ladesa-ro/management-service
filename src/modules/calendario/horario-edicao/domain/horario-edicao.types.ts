export enum HorarioEdicaoSessaoStatus {
  ABERTA = "ABERTA",
  SALVA = "SALVA",
  CANCELADA = "CANCELADA",
}

export interface IHorarioEdicaoSessao {
  id: string;
  status: HorarioEdicaoSessaoStatus;
  usuario: { id: string };
  dateCreated: string;
  dateUpdated: string;
}

export enum HorarioEdicaoMudancaTipoOperacao {
  CRIAR = "CRIAR",
  MOVER = "MOVER",
  REMOVER = "REMOVER",
}

export interface IHorarioEdicaoMudanca {
  id: string;
  sessao: { id: string };
  calendarioAgendamento: { id: string } | null;
  tipoOperacao: HorarioEdicaoMudancaTipoOperacao;
  dados: Record<string, unknown>;
  dateCreated: string;
}

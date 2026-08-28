export interface IHorarioEdicaoDiferencaEntrada {
  mudancaId: string;
  tipoOperacao: "CRIAR" | "MOVER" | "REMOVER";
  calendarioAgendamentoId: string | null;
  antes: Record<string, unknown> | null;
  depois: Record<string, unknown> | null;
}

export class HorarioEdicaoSessaoDiferencaQueryResult {
  sessaoId!: string;
  entram!: IHorarioEdicaoDiferencaEntrada[];
  saem!: IHorarioEdicaoDiferencaEntrada[];
  mudam!: IHorarioEdicaoDiferencaEntrada[];
}

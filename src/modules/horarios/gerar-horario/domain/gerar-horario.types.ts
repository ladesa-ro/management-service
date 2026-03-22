export enum GerarHorarioStatus {
  SOLICITADO = "SOLICITADO",
  PENDENTE = "PENDENTE",
  SUCESSO = "SUCESSO",
  ERRO = "ERRO",
  ACEITO = "ACEITO",
  REJEITADO = "REJEITADO",
}

export enum GerarHorarioDuracao {
  TEMPORARIO = "TEMPORARIO",
  PERMANENTE = "PERMANENTE",
}

export interface IGerarHorario {
  id: string;
  status: GerarHorarioStatus;
  duracao: GerarHorarioDuracao;
  dataInicio: Date;
  dataTermino: Date | null;
  requisicaoGerador: Record<string, unknown> | null;
  respostaGerador: Record<string, unknown> | null;
  dateCreated: Date;
}

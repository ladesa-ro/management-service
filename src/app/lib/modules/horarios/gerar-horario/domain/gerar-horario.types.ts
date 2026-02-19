/**
 * Tipos do domínio de Geração de Horário
 * Define conceitos relacionados à geração automática de horários
 */

/**
 * Status de uma solicitação de geração de horário
 */
export type GerarHorarioStatus = "pendente" | "processando" | "concluido" | "erro";

/**
 * Solicitação de geração de horário
 */
export interface IGerarHorarioSolicitacao {
  calendarioLetivoId: string;
  status: GerarHorarioStatus;
  mensagem?: string;
}

/**
 * Resultado da geração de horário
 */
export interface IGerarHorarioResultado {
  sucesso: boolean;
  mensagem?: string;
  horarioGeradoId?: string;
}

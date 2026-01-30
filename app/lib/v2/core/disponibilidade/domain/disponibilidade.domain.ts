import type { IDisponibilidade, IDisponibilidadeCreate } from "./disponibilidade.types";

/**
 * Classe de domínio que representa uma Disponibilidade
 * Implementa a interface IDisponibilidade
 */
export class Disponibilidade implements IDisponibilidade {
  id!: string;
  dataInicio!: Date;
  dataFim!: Date | null;
  dateCreated!: Date;
  dateUpdated!: Date;
  dateDeleted!: Date | null;

  /**
   * Cria uma nova instância de Disponibilidade
   */
  static criar(dados: IDisponibilidadeCreate): Disponibilidade {
    const disponibilidade = new Disponibilidade();
    disponibilidade.dataInicio = dados.dataInicio;
    disponibilidade.dataFim = dados.dataFim ?? null;
    return disponibilidade;
  }

  /**
   * Cria uma instância a partir de dados existentes
   */
  static fromData(dados: IDisponibilidade): Disponibilidade {
    const disponibilidade = new Disponibilidade();
    Object.assign(disponibilidade, dados);
    return disponibilidade;
  }

  /**
   * Verifica se a disponibilidade está ativa (não deletada)
   */
  isAtiva(): boolean {
    return this.dateDeleted === null;
  }
}

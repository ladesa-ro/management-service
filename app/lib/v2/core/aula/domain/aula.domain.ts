import type { Ambiente } from "@/core/ambiente/domain/ambiente.domain";
import type { Diario } from "@/v2/core/diario/domain/diario.domain";
import type { IntervaloDeTempo } from "@/core/intervalo-de-tempo/domain/intervalo-de-tempo.domain";
import type { IAula, IAulaCreate } from "./aula.types";

/**
 * Classe de domínio que representa uma Aula
 * Implementa a interface IAula
 */
export class Aula implements IAula {
  id!: string;
  data!: Date;
  modalidade!: string | null;
  intervaloDeTempo!: IntervaloDeTempo;
  diario!: Diario;
  ambiente!: Ambiente | null;
  dateCreated!: Date;
  dateUpdated!: Date;
  dateDeleted!: Date | null;

  /**
   * Cria uma nova instância de Aula
   */
  static criar(dados: IAulaCreate): Aula {
    const aula = new Aula();
    aula.data = dados.data;
    aula.modalidade = dados.modalidade ?? null;
    return aula;
  }

  /**
   * Cria uma instância a partir de dados existentes
   */
  static fromData(dados: IAula): Aula {
    const aula = new Aula();
    Object.assign(aula, dados);
    return aula;
  }

  /**
   * Verifica se a aula está ativa (não deletada)
   */
  isAtiva(): boolean {
    return this.dateDeleted === null;
  }

  /**
   * Verifica se a aula tem ambiente associado
   */
  temAmbiente(): boolean {
    return this.ambiente !== null;
  }
}

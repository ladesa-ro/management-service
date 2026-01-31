import { BaseEntity, type IdUuid, type ScalarDateTimeString } from "@/core/@shared";
import type { IDisponibilidade, IDisponibilidadeCreate } from "./disponibilidade.types";

/**
 * Entidade de Dominio: Disponibilidade
 * Implementa a tipagem IDisponibilidade e adiciona regras de negocio
 */
export class Disponibilidade extends BaseEntity implements IDisponibilidade {
  id!: IdUuid;
  dataInicio!: ScalarDateTimeString;
  dataFim!: ScalarDateTimeString | null;
  dateCreated!: ScalarDateTimeString;
  dateUpdated!: ScalarDateTimeString;
  dateDeleted!: ScalarDateTimeString | null;

  // ========================================
  // Factory Methods
  // ========================================

  /**
   * Cria uma nova instancia de Disponibilidade
   */
  static criar(dados: IDisponibilidadeCreate): Disponibilidade {
    const disponibilidade = new Disponibilidade();
    disponibilidade.dataInicio = dados.dataInicio;
    disponibilidade.dataFim = dados.dataFim ?? null;
    return disponibilidade;
  }

  /**
   * Reconstroi uma instancia a partir de dados existentes (ex: do banco)
   */
  static fromData(dados: IDisponibilidade): Disponibilidade {
    const disponibilidade = new Disponibilidade();
    Object.assign(disponibilidade, dados);
    return disponibilidade;
  }
}

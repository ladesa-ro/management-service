import { BaseEntity } from "./base-entity";
import type { IdUuid, ScalarDateTimeString } from "./scalars.types";

/**
 * Classe base para entidades de domínio com datas e ID UUID.
 * Estende BaseEntity adicionando id, dateCreated, dateUpdated, dateDeleted.
 */
export abstract class BaseDatedEntity extends BaseEntity {
  id!: IdUuid;
  dateCreated!: ScalarDateTimeString;
  dateUpdated!: ScalarDateTimeString;
  dateDeleted!: ScalarDateTimeString | null;

  // ========================================
  // Helpers de Datas
  // ========================================

  protected initDates(): void {
    this.dateCreated = new Date().toISOString();
    this.dateUpdated = new Date().toISOString();
    this.dateDeleted = null;
  }

  protected touchUpdated(): void {
    this.dateUpdated = new Date().toISOString();
  }

  // ========================================
  // Métodos de Estado
  // ========================================

  isAtivo(): boolean {
    return this.dateDeleted === null;
  }

  podeSerEditado(): boolean {
    return this.isAtivo();
  }

  podeSerDeletado(): boolean {
    return this.isAtivo();
  }
}

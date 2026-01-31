import type { ScalarDateTimeString } from "./scalars.types";

/**
 * Classe base abstrata para entidades de domínio
 * Fornece métodos comuns para todas as entidades
 */
export abstract class BaseEntity {
  abstract dateDeleted: ScalarDateTimeString | null;

  /**
   * Verifica se a entidade está ativa (não deletada)
   */
  isAtivo(): boolean {
    return this.dateDeleted === null;
  }

  /**
   * Verifica se a entidade pode ser editada
   */
  podeSerEditado(): boolean {
    return this.isAtivo();
  }

  /**
   * Verifica se a entidade pode ser deletada
   */
  podeSerDeletado(): boolean {
    return this.isAtivo();
  }

  /**
   * Valida que um campo obrigatório está preenchido
   * @throws Error se o valor estiver vazio
   */
  protected static validateRequired(value: string | null | undefined, field: string): string {
    if (!value || value.trim().length === 0) {
      throw new Error(`${field} é obrigatório`);
    }
    return value.trim();
  }

  /**
   * Valida um campo opcional, retornando null se vazio
   */
  protected static validateOptional(value: string | null | undefined): string | null {
    if (!value || value.trim().length === 0) {
      return null;
    }
    return value.trim();
  }
}

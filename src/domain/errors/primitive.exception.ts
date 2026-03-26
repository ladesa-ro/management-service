/**
 * Classe base primitiva para todos os erros do projeto.
 * Todas as exceções de domínio e aplicação devem herdar desta classe.
 */

export abstract class PrimitiveException extends Error {
  /** Código de erro legível por máquina (ex: "DOMAIN.ENTITY_VALIDATION", "APP.FORBIDDEN") */
  abstract readonly code: string;

  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

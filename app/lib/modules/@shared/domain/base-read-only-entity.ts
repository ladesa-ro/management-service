/**
 * Classe base para entidades somente leitura (ex: Cidade, Estado).
 * Não possui campos de data nem validação de escrita.
 */
export abstract class BaseReadOnlyEntity {
  protected static get entityName(): string {
    return this.name;
  }
}

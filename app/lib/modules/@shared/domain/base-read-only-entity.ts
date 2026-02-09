import { BaseEntity } from "./base-entity";

/**
 * Classe base para entidades somente leitura (ex: Cidade, Estado).
 * Não possui campos de data nem ID UUID.
 */
export abstract class BaseReadOnlyEntity extends BaseEntity {}

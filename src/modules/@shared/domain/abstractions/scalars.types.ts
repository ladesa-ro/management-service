export type IdNumeric = number;
export type IdUuid = string;

export type ScalarDate = string;
export type ScalarDateTimeString = string;

// ========================================
// Base Entity Interfaces
// ========================================

export interface IEntityId {
  id: IdUuid;
}

export interface IEntityDated {
  dateCreated: ScalarDateTimeString;
  dateUpdated: ScalarDateTimeString;
  dateDeleted: ScalarDateTimeString | null;
}

export interface IEntityBase extends IEntityId, IEntityDated {}

/**
 * Tipo para representar uma entidade parcial (para updates)
 * Equivalente ao DeepPartial do TypeORM, mas sem dependência de ORM
 */
export type PartialEntity<T> = {
  [P in keyof T]?: PartialEntity<T[P]> | T[P];
};

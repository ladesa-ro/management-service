export type IdNumeric = number;
export type IdUuid = string;

export type ScalarDate = string;
export type ScalarDateTimeString = string;

/**
 * Tipo para representar uma entidade parcial (para updates)
 * Equivalente ao DeepPartial do TypeORM, mas sem dependência de ORM
 */
export type PartialEntity<T> = {
  [P in keyof T]?: PartialEntity<T[P]> | T[P];
};

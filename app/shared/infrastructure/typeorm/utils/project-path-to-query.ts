import type { SelectQueryBuilder } from "typeorm";

export const projectPathToQuery = (query: SelectQueryBuilder<any>, path: string) => {
  return `${query.alias}.${path}`;
};

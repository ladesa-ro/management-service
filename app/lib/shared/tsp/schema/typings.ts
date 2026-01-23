import type * as IDomain from "@@/tsp/schema";
import DomainSchema from "@@/tsp/schema.json";

export { DomainSchema };
export type IDomainSchema = typeof DomainSchema;
export type IDomainSchemaDef = keyof IDomainSchema["$defs"];

export type { IDomain };

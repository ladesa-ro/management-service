import type * as IDomain from "@/domain/#/schema";
import DomainSchema from "@/domain/#/schema.json";

export { DomainSchema };
export type IDomainSchema = typeof DomainSchema;

export type IDomainSchemaDef = keyof IDomainSchema["$defs"];

export type { IDomain };

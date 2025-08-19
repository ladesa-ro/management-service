import type * as IDomain from "@/legacy/domain/contracts/.generated/schema";
import DomainSchema from "@/legacy/domain/contracts/.generated/schema.json";

export { DomainSchema };
export type IDomainSchema = typeof DomainSchema;

export type IDomainSchemaDef = keyof IDomainSchema["$defs"];

export type { IDomain };

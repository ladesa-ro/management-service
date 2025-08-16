import { jsonSchemaMergeRules, merge } from "allof-merge";
import type * as IDomain from "@/domain/#/schema";
import DomainSchema from "@/domain/#/schema.json";
import { lazyAsync } from "@/infrastructure/utils/lazy";

export { DomainSchema };
export type IDomainSchema = typeof DomainSchema;

export type IDomainSchemaDef = keyof IDomainSchema["$defs"];

export type { IDomain };

export const getDomainSchemaParsed = lazyAsync(async () => {
  let schema = structuredClone(DomainSchema);

  schema = merge(schema, {
    mergeRefSibling: false,
    mergeCombinarySibling: false,
    onMergeError: (msg) => {
      throw new Error(msg);
    },
    rules: jsonSchemaMergeRules(),
  });

  for (const subSchema of Object.values(schema.$defs)) {
    for (const $def of Object.values(subSchema.$defs ?? {})) {
      delete $def["description"];
    }
  }

  console.log(JSON.stringify(schema, null, 2));

  return schema;
});

import { type JSONSchema7 } from "json-schema";
import { RefResolver } from "json-schema-ref-resolver";
import { uniq } from "lodash";
import { SelectQueryBuilder } from "typeorm";
import { DomainSchema, type IDomainSchemaDef } from "@/domain/contracts/integration";
import { lazyAsync } from "@/infrastructure/utils/lazy";

// ==========================

const getRefResolver = lazyAsync(async () => {
  const refResolver = new RefResolver({
    allowEqualDuplicates: true,
    insertRefSymbol: true,
  });

  const bundleClone = structuredClone(DomainSchema);

  for (const schema of Object.values(bundleClone.$defs)) {
    const schemaClone = structuredClone(schema);

    for (const $def of Object.values(schemaClone.$defs ?? {})) {
      delete $def["description"];
    }

    refResolver.addSchema(schemaClone);
  }

  return {
    getDerefSchema: (schemaId: string) => {
      return refResolver.getDerefSchema(schemaId);
    },
  };
});

export const QbEfficientLoadCore = async (entityDef: JSONSchema7, qb: SelectQueryBuilder<any>, alias: string, selection: boolean | string[] = true, parent: string[] = []) => {
  if (entityDef.type !== "object") {
    throw new Error(`Expected entityDef to be an object, got ${entityDef.type}`);
  }

  let counter = 0;

  let rootSelection: boolean | string[];

  if (typeof selection === "boolean") {
    rootSelection = selection;
  } else {
    rootSelection = uniq(["id", ...selection.map((i) => i.split(".")[0])]);
  }

  const expressionAlias = qb.expressionMap.findAliasByName(alias);
  const metadata = expressionAlias?.metadata;

  const propertiesMap = metadata.propertiesMap;

  for (const [propertyKey, propertySchema] of Object.entries(entityDef.properties)) {
    counter++;

    if (!Object.hasOwn(propertiesMap, propertyKey)) {
      console.warn(`-> entity ${metadata.name} dont have path ${propertyKey}.`);
      continue;
    }

    if (!rootSelection) {
      continue;
    }

    const includeProperty = Array.isArray(rootSelection) ? rootSelection.includes(propertyKey) : rootSelection;

    if (!includeProperty) {
      continue;
    }

    const subPath = `${alias}.${propertyKey}`;

    let cursor: JsonSchema = propertySchema;

    if (propertySchema.type === "array") {
      cursor = propertySchema.items;
    }

    if (cursor.type === "object") {
      const ref = cursor[Symbol.for("json-schema-ref")]?.replace(".json", "");

      if (parent.includes(ref)) {
        console.warn(`${QbEfficientLoad.name}: detected infinite recursion for ${ref}`);
        console.debug({ propertyNodeEntityId: ref, parent });
        continue;
      }

      const childSelection = rootSelection === true ? true : uniq(rootSelection.filter((i) => i.startsWith(`${propertyKey}.`)).map((i) => i.slice(i.indexOf(".") + 1)));

      const childAlias = `${alias}_${propertyKey[0]}${counter}`;

      qb.leftJoin(subPath, childAlias);

      await QbEfficientLoadCore(cursor, qb, childAlias, childSelection, [...parent, ref]);
    } else {
      qb.addSelect(subPath);
    }
  }
};

export const QbEfficientLoad = async (entityDefRef: IDomainSchemaDef, qb: SelectQueryBuilder<any>, alias: string, selection: boolean | string[] = true, parent: string[] = []) => {
  const { getDerefSchema } = await getRefResolver();
  const entityDef = getDerefSchema(`${entityDefRef}.json`);

  return QbEfficientLoadCore(entityDef, qb, alias, selection, parent);
};

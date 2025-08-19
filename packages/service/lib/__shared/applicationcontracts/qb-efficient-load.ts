import { uniq } from "lodash";
import { SelectQueryBuilder } from "typeorm";
import { type IDomainSchemaDef } from "@/legacy/domain/contracts/integration";
import { compileDomainModels, IModelRepresentation } from "@/legacy/domain/contracts/poc";

export const QbEfficientLoadCore = async (modelRepresentation: IModelRepresentation, qb: SelectQueryBuilder<any>, alias: string, selection: boolean | string[] = true, parent: string[] = []) => {
  let counter = 0;

  let rootSelection: boolean | string[];

  if (typeof selection === "boolean") {
    rootSelection = selection;
  } else {
    rootSelection = uniq(["id", ...selection.map((i) => i.split(".")[0])]);
  }

  const expressionAlias = qb.expressionMap.findAliasByName(alias);
  const metadata = expressionAlias?.metadata;

  const propertiesMap = metadata?.createPropertiesMap();

  for (const propertyRepresentation of modelRepresentation.properties) {
    counter++;

    const propertyKey = propertyRepresentation.name;

    if (!Object.hasOwn(propertiesMap, propertyKey)) {
      console.warn(`-> entity ${metadata?.name} dont have path ${propertyKey}.`);
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

    if (propertyRepresentation.mode === "reference") {
      const referenceName = propertyRepresentation.reference.name;

      if (parent.includes(referenceName)) {
        console.warn(`${QbEfficientLoad.name}: detected infinite recursion for ${referenceName}`);
        console.debug({ propertyNodeEntityId: referenceName, parent });
        continue;
      }

      let childSelection: boolean | string[];

      if (typeof rootSelection === "boolean") {
        childSelection = rootSelection;
      } else {
        childSelection = uniq(rootSelection.filter((i) => i.startsWith(`${propertyKey}.`)).map((i) => i.slice(i.indexOf(".") + 1)));
      }

      const childAlias = `${alias}_${propertyKey[0]}${counter}`;

      qb.leftJoin(subPath, childAlias);

      const domainModels = await compileDomainModels();
      await QbEfficientLoadCore(domainModels.getModelRepresentation(referenceName), qb, childAlias, childSelection, [...parent, referenceName]);
    } else {
      qb.addSelect(subPath);
    }
  }
};

export const QbEfficientLoad = async (entityDefRef: IDomainSchemaDef, qb: SelectQueryBuilder<any>, alias: string, selection: boolean | string[] = true, parent: string[] = []) => {
  const domainModels = await compileDomainModels();
  const model = domainModels.getModelRepresentation(entityDefRef);
  return QbEfficientLoadCore(model, qb, alias, selection, parent);
};

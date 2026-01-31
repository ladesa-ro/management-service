import { uniq } from "lodash";
import { SelectQueryBuilder } from "typeorm";
import {
  initializeModelDefinitions,
  ModelRepresentation,
  modelRegistry,
} from "@/modules/@shared/infrastructure/persistence/typeorm/metadata";

// Ensure model definitions are loaded
initializeModelDefinitions();

export const QbEfficientLoadCore = (
  modelRepresentation: ModelRepresentation,
  qb: SelectQueryBuilder<any>,
  alias: string,
  selection: boolean | string[] = true,
  parent: string[] = [],
) => {
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

    const includeProperty = Array.isArray(rootSelection)
      ? rootSelection.includes(propertyKey)
      : rootSelection;

    if (!includeProperty) {
      continue;
    }

    const subPath = `${alias}.${propertyKey}`;

    if (propertyRepresentation.mode === "reference" && propertyRepresentation.reference) {
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
        childSelection = uniq(
          rootSelection
            .filter((i) => i.startsWith(`${propertyKey}.`))
            .map((i) => i.slice(i.indexOf(".") + 1)),
        );
      }

      const childAlias = `${alias}_${propertyKey[0]}${counter}`;

      qb.leftJoin(subPath, childAlias);

      const referenceModel = modelRegistry.get(referenceName);
      QbEfficientLoadCore(referenceModel, qb, childAlias, childSelection, [
        ...parent,
        referenceName,
      ]);
    } else {
      qb.addSelect(subPath);
    }
  }
};

/**
 * Efficiently load entity relations based on model schema definition.
 * Uses static model metadata registry instead of runtime TypeSpec compilation.
 *
 * @param entityDefRef - The model definition name (e.g., "ModalidadeFindOneOutput")
 * @param qb - TypeORM SelectQueryBuilder
 * @param alias - The query alias for the root entity
 * @param selection - Fields to select (true = all, string[] = specific fields)
 * @param parent - Used internally for recursion tracking
 */
export const QbEfficientLoad = (
  entityDefRef: string,
  qb: SelectQueryBuilder<any>,
  alias: string,
  selection: boolean | string[] = true,
  parent: string[] = [],
) => {
  const model = modelRegistry.get(entityDefRef);
  return QbEfficientLoadCore(model, qb, alias, selection, parent);
};

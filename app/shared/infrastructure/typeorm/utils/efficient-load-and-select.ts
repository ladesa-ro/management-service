import { SelectQueryBuilder } from "typeorm";
import { createAliasesGenerator } from "./create-aliases-generator";
import { getRelationPaths } from "./get-relation-paths";
import { parseSelections } from "./parse-selections";

export const EfficientLoadAndSelect = (query: SelectQueryBuilder<any>, rawSelections: string[] | null | undefined) => {
  const selections = parseSelections(rawSelections);
  const relationPaths = getRelationPaths(selections);

  const mainAlias = query.expressionMap.mainAlias!;
  const mainAliasName = mainAlias.name;
  const mainAliasMetadata = mainAlias.metadata;

  const joinAliasesMap = new Map<string, string>();
  const metadataMap = new Map<string, any>();

  joinAliasesMap.set("", mainAliasName);
  metadataMap.set("", mainAliasMetadata);

  const aliasGenerator = createAliasesGenerator();

  for (const relationPath of relationPaths) {
    if (joinAliasesMap.has(relationPath)) {
      continue;
    }

    const segments = relationPath.split(".");

    const parentPath = segments.slice(0, -1).join(".");
    const relationKeyInParent = segments.slice(-1)[0];

    const parentMetadata = metadataMap.get(parentPath);

    if (!parentMetadata) {
      throw new Error(`metadata do parentPath "${parentPath}" não encontrado ao processar "${relationPath}"`);
    }

    const relation = parentMetadata.findRelationWithPropertyPath(relationKeyInParent);

    if (!relation) {
      throw new Error(`Relação "${relationKeyInParent}" não encontrada em "${parentMetadata.name}" (path "${relationPath}")`);
    }

    const parentAlias = joinAliasesMap.get(parentPath);
    const aliasForThis = aliasGenerator();

    query.leftJoinAndSelect(`${parentAlias}.${relation.propertyName}`, aliasForThis);

    joinAliasesMap.set(relationPath, aliasForThis);
    metadataMap.set(relationPath, relation.inverseEntityMetadata);
  }

  for (const selection of selections) {
    const parts = selection.split(".");

    if (parts.length === 1) {
      const rootAlias = joinAliasesMap.get("");
      const [rootSelectField] = parts;
      query.addSelect(`${rootAlias}.${rootSelectField}`);
    } else {
      const parentPath = parts.slice(0, -1).join(".");
      const parentAlias = joinAliasesMap.get(parentPath);

      const selectField = parts.slice(-1)[0];

      query.addSelect(`${parentAlias}.${selectField}`);
    }
  }
};

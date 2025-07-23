import { isEqual } from "lodash";

export const deduplicateSchemaNodes = <T>(nodes: T[]) => {
  return nodes.filter((node, nodeIndex) => {
    return nodes.findIndex((checkNode) => isEqual(checkNode, node)) === nodeIndex;
  });
};

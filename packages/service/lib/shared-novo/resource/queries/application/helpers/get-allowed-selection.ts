import intersection from "lodash/intersection";

export const getAllowedSelection = (fullSelection: string[], requestedSelection: string[] | null = null) => {
  if (!requestedSelection) return fullSelection;
  if (requestedSelection.length === 0) return fullSelection;
  return intersection(fullSelection, requestedSelection);
};

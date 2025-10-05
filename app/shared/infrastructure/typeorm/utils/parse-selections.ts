export const parseSelections = (rawSelections: string[] | null | undefined) => {
  if (Array.isArray(rawSelections) && rawSelections.length > 0) {
    const orderedSelections = rawSelections.sort((a, b) => a.localeCompare(b)).sort((a, b) => a.split(".").length - b.split(".").length);
    return orderedSelections.includes("id") ? orderedSelections : ["id", ...orderedSelections];
  }

  return ["id"];
};

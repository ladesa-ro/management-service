import type { SortByModeDto, SortByRulesDto } from "@/shared";

export const mapRequestListSortByToRulesDto = (sortBy: string[]): SortByRulesDto => {
  return sortBy.map((constraint) => {
    const parts = constraint.split(":");

    const property = parts[0];
    const order = (parts[1] ?? "ASC") as SortByModeDto;

    return {
      property,
      order,
    };
  });
};

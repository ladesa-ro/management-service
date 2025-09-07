import { SelectQueryBuilder } from "typeorm";
import { EfficientLoadAndSelect } from "@/infrastructure/persistence/typeorm/utils";
import { projectPathToQuery } from "@/infrastructure/persistence/typeorm/utils/project-path-to-query";
import { BaseEntityListOutputDto, IFilterRuleGroup, ListInputDto, ListSettings } from "@/shared";

export const baseEntityListRepositoryProvider =
  (listSettings: ListSettings) =>
    async (query: SelectQueryBuilder<any>, allowedFilters: boolean | IFilterRuleGroup, inputDto: ListInputDto, selection?: string[]): Promise<BaseEntityListOutputDto> => {
      if (typeof allowedFilters === "boolean") {
        query.andWhere(allowedFilters ? "TRUE" : "FALSE");
      } else {
        // TODO
      }

      const consideredSelection = selection && selection.length > 0 ? selection : ["id"];
      EfficientLoadAndSelect(query, consideredSelection);

      const consideredSortBy = inputDto.sortBy && inputDto.sortBy.length > 0 ? inputDto.sortBy : listSettings.sortBy.defaultSortBy;
      const allowedSortBy = consideredSortBy.filter((sortByRule) => listSettings.sortBy.allowedColumns.includes(sortByRule.property));

      if (allowedSortBy && allowedSortBy.length > 0) {
        for (const sortByRule of allowedSortBy) {
          query.orderBy(projectPathToQuery(query, sortByRule.property), sortByRule.order);
        }
      }

      const totalItems = await query.getCount();
      const totalPages = Math.ceil(totalItems / inputDto.limit);

      const paginatedQuery = query.clone();
      paginatedQuery.offset((inputDto.page - 1) * inputDto.limit);
      paginatedQuery.limit(inputDto.limit);
      const items = await paginatedQuery.getMany();

      return {
        data: [...items],
        meta: {
          currentPage: inputDto.page,
          search: inputDto.search,
          itemsPerPage: inputDto.limit,
          totalItems,
          totalPages,
        },
      };
    };

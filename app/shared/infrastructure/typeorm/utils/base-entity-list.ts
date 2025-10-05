import type { ListQueryInputDto, ListQueryOutputDto } from "@/shared/features/list/application/dtos/entities";
import type { IFilterRuleGroup, ListSettingsEntity } from "@/shared/features/list/domain";
import { EfficientLoadAndSelect, projectPathToQuery } from "@/shared/infrastructure/typeorm/utils";

export const baseEntityList =
  (listSettings: ListSettingsEntity) =>
  async (query: SelectQueryBuilder<any>, allowedFilters: boolean | IFilterRuleGroup, inputDto: ListQueryInputDto, selection?: string[]): Promise<ListQueryOutputDto> => {
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
        totalPages,
        totalItems,
        currentPage: inputDto.page,
        itemsPerPage: inputDto.limit,
        search: inputDto.search ?? "",
      },
    };
  };

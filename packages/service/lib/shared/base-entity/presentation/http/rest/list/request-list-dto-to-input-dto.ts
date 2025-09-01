import { IRequestRepresentation } from "@/infrastructure";
import { ListInputDtoCustom, mapRequestListSortByToRulesDto } from "@/shared";

export const requestListDtoToInputDto = <InputDto extends ListInputDtoCustom>(request: IRequestRepresentation): InputDto => {
  return {
    page: request.query.page,
    limit: request.query.limit,
    search: request.query.search,

    sortBy: mapRequestListSortByToRulesDto(request.query.sortBy ?? []),

    filters: request.query.filters,

    selection: request.query.selection,
  } as InputDto;
};

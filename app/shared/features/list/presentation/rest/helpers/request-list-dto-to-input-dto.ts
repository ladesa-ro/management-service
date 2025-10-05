import { type ListQueryInputDto, mapRequestListSortByToRulesDto, type RequestRepresentationEntity } from "@/shared";

export const requestListDtoToInputDto = <ReqDto extends Pick<RequestRepresentationEntity, "query">>(request: ReqDto): ListQueryInputDto => {
  return {
    page: request.query.page,
    limit: request.query.limit,
    search: request.query.search,
    sortBy: mapRequestListSortByToRulesDto(request.query.sortBy ?? []),
    filters: request.query.filters,
    selection: request.query.selection,
  };
};

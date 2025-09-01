import { BaseEntityListOutputDto, IFilterRuleGroup, ListInputDto } from "@/shared";

export type IBaseRepositoryListPort<InputDto = ListInputDto, Output = BaseEntityListOutputDto> = {
  list(allowedFilters: IFilterRuleGroup | true | false, inputDto: InputDto, selection?: string[]): Promise<Output>;
};

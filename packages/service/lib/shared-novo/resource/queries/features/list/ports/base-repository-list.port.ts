import { IFilterRuleGroup, ListInputDto, ListOutputDto } from "@/shared-novo";

export type IBaseRepositoryListPort<InputDto = ListInputDto, Output = ListOutputDto> = {
  list(allowedFilters: IFilterRuleGroup | true | false, inputDto: InputDto, selection?: string[]): Promise<Output>;
};

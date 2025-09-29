import { Cidade } from "@/features/cidade";
import { IFilterRuleGroup } from "@/shared";
import { CidadeFindOneByIdOutputDto, CidadeListInputDto, CidadeListOutputDto } from "../dtos";

export const CIDADE_REPOSITORY = Symbol("Ladesa.ManagementService.Cidade.Ports.Repository");

export interface ICidadeRepositoryPort {
  list(allowedFilters: IFilterRuleGroup | true | false, inputDto: CidadeListInputDto, selection?: string[]): Promise<CidadeListOutputDto>;

  findOneById(id: Cidade["id"], selection?: string[]): Promise<CidadeFindOneByIdOutputDto | null>;
}

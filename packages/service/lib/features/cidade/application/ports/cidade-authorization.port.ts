import { CidadeFindOneByIdInputDto } from "../dtos/cidade-find-one-by-id.dto";
import { IFilterRuleGroup } from "@/shared";

export interface ICidadeAuthorizationPort {
  canRead: (id: CidadeFindOneByIdInputDto["id"]) => Promise<boolean>;
  getReadFilters: () => Promise<IFilterRuleGroup> | boolean;
}

import type { IFilterRuleGroup } from "@/shared";
import type { EstadoFindOneByIdInputDto } from "../dtos";

export interface IEstadoAuthorizationPort {
  canRead: (id: EstadoFindOneByIdInputDto) => Promise<boolean> | boolean;
  getReadFilters: () => Promise<IFilterRuleGroup | boolean> | boolean;
}

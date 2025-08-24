import { EstadoFindOneByIdInputDto } from "@/features/estado/application/dtos/estado-find-one-by-id.dto";
import { IFilterRuleGroup } from "@/shared-novo";

export interface IEstadoAuthorizationPort {
  canRead: (id: EstadoFindOneByIdInputDto["id"]) => Promise<boolean>;
  getReadFilters: () => Promise<IFilterRuleGroup> | boolean;
}

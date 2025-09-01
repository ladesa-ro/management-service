import { EstadoFindOneByIdInputDto } from "@/features/estado/application/dtos/estado-find-one-by-id.dto";
import { IFilterRuleGroup } from "@/shared";

export const ESTADO_AUTHORIZATION = Symbol("Ladesa.ManagementService.Estado.Ports.Authorization");

export interface IEstadoAuthorizationPort {
  canRead: (id: EstadoFindOneByIdInputDto["id"]) => Promise<boolean>;
  getReadFilters: () => Promise<IFilterRuleGroup> | boolean;
}

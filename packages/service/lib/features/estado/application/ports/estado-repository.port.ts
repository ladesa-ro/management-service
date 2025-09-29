import { Estado } from "@/features/estado";
import { IFilterRuleGroup } from "@/shared";
import { EstadoFindOneByIdOutputDto, EstadoListInputDto, EstadoListOutputDto } from "../dtos";

export const ESTADO_REPOSITORY = Symbol("Ladesa.ManagementService.Estado.Ports.Repository");

export interface IEstadoRepositoryPort {
  list(allowedFilters: IFilterRuleGroup | true | false, inputDto: EstadoListInputDto, selection?: string[]): Promise<EstadoListOutputDto>;

  findOneById(id: Estado["id"], selection?: string[]): Promise<EstadoFindOneByIdOutputDto | null>;
}

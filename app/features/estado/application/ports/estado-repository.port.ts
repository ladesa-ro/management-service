import type { IFilterRuleGroup } from "../../../../shared";
import type { EstadoDto, EstadoFindOneByIdInputDto, EstadoListInputDto, EstadoListOutputItemDto } from "../dtos";

export const ESTADO_REPOSITORY = Symbol("Ladesa.ManagementService.Estado.Repository");

export interface IEstadoRepositoryPort {
  findOneById(query: EstadoFindOneByIdInputDto): Promise<EstadoDto | null>;

  list(allowedFilters: IFilterRuleGroup | boolean, query: EstadoListInputDto, selection?: string[]): Promise<EstadoListOutputItemDto>;
}

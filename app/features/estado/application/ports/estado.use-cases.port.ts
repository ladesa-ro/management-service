import type { EstadoFindOneByIdInputDto, EstadoFindOneByIdOutputDto, EstadoListInputDto, EstadoListOutputDto, IEstadoAuthorizationPort } from "@/features";

export const ESTADO_USE_CASES = Symbol("Ladesa.ManagementService.Estado.UseCases");

export interface IEstadoUseCasesPort {
  estadoFindOneById(authz: IEstadoAuthorizationPort, dto: EstadoFindOneByIdInputDto): Promise<EstadoFindOneByIdOutputDto>;

  estadoList(authz: IEstadoAuthorizationPort, dto: EstadoListInputDto): Promise<EstadoListOutputDto>;
}

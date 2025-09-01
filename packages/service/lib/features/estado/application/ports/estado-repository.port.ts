import { EstadoFindOneByIdInputDto, EstadoFindOneByIdOutputDto, EstadoListInputDto, EstadoListOutputDto } from "@/features/estado/application/dtos";
import { IBaseRepositoryFindOneByIdPort, IBaseRepositoryListPort } from "@/shared";

export const ESTADO_REPOSITORY = Symbol("Ladesa.ManagementService.Estado.Ports.Repository");

type RepositoryList = IBaseRepositoryListPort<EstadoListInputDto, EstadoListOutputDto>;
type RepositoryFindOneById = IBaseRepositoryFindOneByIdPort<EstadoFindOneByIdInputDto["id"], EstadoFindOneByIdOutputDto>;

export interface IEstadoRepositoryPort extends RepositoryList, RepositoryFindOneById {}

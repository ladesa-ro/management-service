import type { IRepositoryFindAll, IRepositoryFindById } from "@/domain/abstractions";
import { EstadoFindOneQueryResult, EstadoListQueryResult } from "@/modules/localidades/estado";

export const IEstadoRepository = Symbol("IEstadoRepository");

export type IEstadoRepository = IRepositoryFindAll<EstadoListQueryResult> &
  IRepositoryFindById<EstadoFindOneQueryResult>;

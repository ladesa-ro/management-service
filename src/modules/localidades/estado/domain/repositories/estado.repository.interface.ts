import type { IReadOnlyRepository } from "@/domain/abstractions";
import {
  EstadoFindOneQuery,
  EstadoFindOneQueryResult,
  EstadoListQuery,
  EstadoListQueryResult,
} from "@/modules/localidades/estado";

export const IEstadoRepository = Symbol("IEstadoRepository");

export interface IEstadoRepository
  extends IReadOnlyRepository<
    EstadoListQuery,
    EstadoListQueryResult,
    EstadoFindOneQuery,
    EstadoFindOneQueryResult
  > {}

import type {
  IRepositoryCreate,
  IRepositoryFindAll,
  IRepositoryFindById,
  IRepositoryFindByIdSimple,
  IRepositorySoftDelete,
  IRepositoryUpdate,
} from "@/domain/abstractions";
import type { IEstagiario } from "../estagiario";
import type { EstagiarioFindOneQueryResult, EstagiarioListQueryResult } from "../queries";

export const IEstagiarioRepository = Symbol("IEstagiarioRepository");

export type IEstagiarioRepository = IRepositoryFindAll<EstagiarioListQueryResult> &
  IRepositoryFindById<EstagiarioFindOneQueryResult> &
  IRepositoryFindByIdSimple<EstagiarioFindOneQueryResult> &
  IRepositoryCreate<IEstagiario> &
  IRepositoryUpdate<IEstagiario> &
  IRepositorySoftDelete;

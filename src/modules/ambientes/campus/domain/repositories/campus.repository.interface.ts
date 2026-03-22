import type {
  IRepositoryCreate,
  IRepositoryFindAll,
  IRepositoryFindById,
  IRepositoryFindByIdSimple,
  IRepositorySoftDelete,
  IRepositoryUpdate,
} from "@/domain/abstractions";
import type { ICampus } from "@/modules/ambientes/campus";
import type { CampusFindOneQueryResult, CampusListQueryResult } from "../queries";

export const ICampusRepository = Symbol("ICampusRepository");

export type ICampusRepository = IRepositoryFindAll<CampusListQueryResult> &
  IRepositoryFindById<CampusFindOneQueryResult> &
  IRepositoryFindByIdSimple<CampusFindOneQueryResult> &
  IRepositoryCreate<ICampus> &
  IRepositoryUpdate<ICampus> &
  IRepositorySoftDelete;

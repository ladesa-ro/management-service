import type {
  IRepositoryCreate,
  IRepositoryFindAll,
  IRepositoryFindById,
  IRepositoryFindByIdSimple,
  IRepositorySoftDelete,
  IRepositoryUpdate,
} from "@/domain/abstractions";
import type { IEmpresa } from "../empresa";
import type { EmpresaFindOneQueryResult, EmpresaListQueryResult } from "../queries";

export const IEmpresaRepository = Symbol("IEmpresaRepository");

export type IEmpresaRepository = IRepositoryFindAll<EmpresaListQueryResult> &
  IRepositoryFindById<EmpresaFindOneQueryResult> &
  IRepositoryFindByIdSimple<EmpresaFindOneQueryResult> &
  IRepositoryCreate<IEmpresa> &
  IRepositoryUpdate<IEmpresa> &
  IRepositorySoftDelete;

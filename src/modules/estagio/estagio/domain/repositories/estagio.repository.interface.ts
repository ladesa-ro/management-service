import type {
  IRepositoryCreate,
  IRepositoryFindAll,
  IRepositoryFindById,
  IRepositoryFindByIdSimple,
  IRepositorySoftDelete,
  IRepositoryUpdate,
} from "@/domain/abstractions";
import type { IEstagio, IHorarioEstagio } from "../estagio";
import type { EstagioFindOneQueryResult, EstagioListQueryResult } from "../queries";

export const IEstagioRepository = Symbol("IEstagioRepository");

export type IEstagioRepository = IRepositoryFindAll<EstagioListQueryResult> &
  IRepositoryFindById<EstagioFindOneQueryResult> &
  IRepositoryFindByIdSimple<EstagioFindOneQueryResult> &
  IRepositoryCreate<IEstagio> &
  IRepositoryUpdate<IEstagio> &
  IRepositorySoftDelete & {
    replaceHorariosEstagio(estagioId: string, horarios: IHorarioEstagio[]): Promise<void>;
    softDeleteHorariosEstagio(estagioId: string): Promise<void>;
  };

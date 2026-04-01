import type { IAccessContext } from "@/domain/abstractions";
import type { GradeHoraria } from "../grade-horaria";
import type {
  GradeHorariaFindByCampusQuery,
  GradeHorariaFindByCampusQueryResult,
} from "../queries";

export const IGradeHorariaRepository = Symbol("IGradeHorariaRepository");

export interface IGradeHorariaRepository {
  // Write side
  findAllActiveByCampusId(campusId: string): Promise<GradeHoraria[]>;

  /** Persiste metadados da grade (sem tocar nos intervalos). */
  saveConfig(aggregate: GradeHoraria): Promise<void>;

  /** Persiste uma nova grade completa (metadados + intervalos). */
  saveNew(aggregate: GradeHoraria): Promise<void>;

  // Read side
  getFindByCampusQueryResult(
    accessContext: IAccessContext | null,
    query: GradeHorariaFindByCampusQuery,
  ): Promise<GradeHorariaFindByCampusQueryResult>;
}

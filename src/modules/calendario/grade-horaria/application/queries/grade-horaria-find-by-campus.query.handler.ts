import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import type {
  GradeHorariaFindByCampusQuery,
  GradeHorariaFindByCampusQueryResult,
} from "../../domain/queries";
import { IGradeHorariaFindByCampusQueryHandler } from "../../domain/queries";
import { IGradeHorariaRepository } from "../../domain/repositories";

@Impl()
export class GradeHorariaFindByCampusQueryHandlerImpl
  implements IGradeHorariaFindByCampusQueryHandler
{
  constructor(
    @Dep(IGradeHorariaRepository)
    private readonly repository: IGradeHorariaRepository,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    query: GradeHorariaFindByCampusQuery,
  ): Promise<GradeHorariaFindByCampusQueryResult> {
    return this.repository.getFindByCampusQueryResult(accessContext, query);
  }
}

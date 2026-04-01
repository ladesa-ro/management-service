import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import type {
  GradeHorariaFindByCampusQuery,
  GradeHorariaFindByCampusQueryResult,
} from "../../domain/queries";
import { IGradeHorariaFindByCampusQueryHandler } from "../../domain/queries";
import { IGradeHorariaRepository } from "../../domain/repositories";

@DeclareImplementation()
export class GradeHorariaFindByCampusQueryHandlerImpl
  implements IGradeHorariaFindByCampusQueryHandler
{
  constructor(
    @DeclareDependency(IGradeHorariaRepository)
    private readonly repository: IGradeHorariaRepository,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    query: GradeHorariaFindByCampusQuery,
  ): Promise<GradeHorariaFindByCampusQueryResult> {
    return this.repository.getFindByCampusQueryResult(accessContext, query);
  }
}

import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { ICursoFindOneQueryHandler } from "@/modules/ensino/curso/domain/queries/curso-find-one.query.handler.interface";
import type { CursoFindOneQuery, CursoFindOneQueryResult } from "../../domain/queries";
import { ICursoRepository } from "../../domain/repositories";

@Impl()
export class CursoFindOneQueryHandlerImpl implements ICursoFindOneQueryHandler {
  constructor(
    @Dep(ICursoRepository)
    private readonly repository: ICursoRepository,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: CursoFindOneQuery,
  ): Promise<CursoFindOneQueryResult | null> {
    return this.repository.getFindOneQueryResult(accessContext, dto);
  }
}

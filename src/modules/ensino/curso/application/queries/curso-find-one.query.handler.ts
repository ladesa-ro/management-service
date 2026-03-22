import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { ICursoFindOneQueryHandler } from "@/modules/ensino/curso/domain/queries/curso-find-one.query.handler.interface";
import type { CursoFindOneQuery, CursoFindOneQueryResult } from "../../domain/queries";
import { ICursoRepository } from "../../domain/repositories";

@DeclareImplementation()
export class CursoFindOneQueryHandlerImpl implements ICursoFindOneQueryHandler {
  constructor(
    @DeclareDependency(ICursoRepository)
    private readonly repository: ICursoRepository,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: CursoFindOneQuery,
  ): Promise<CursoFindOneQueryResult | null> {
    return this.repository.findById(accessContext, dto, dto?.selection);
  }
}

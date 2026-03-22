import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { ICursoListQueryHandler } from "@/modules/ensino/curso/domain/queries/curso-list.query.handler.interface";
import type { AccessContext } from "@/server/access-context";
import type { CursoListQuery, CursoListQueryResult } from "../../domain/queries";
import { ICursoRepository } from "../../domain/repositories";

@DeclareImplementation()
export class CursoListQueryHandlerImpl implements ICursoListQueryHandler {
  constructor(
    @DeclareDependency(ICursoRepository)
    private readonly repository: ICursoRepository,
  ) {}

  async execute(
    accessContext: AccessContext | null,
    dto: CursoListQuery | null,
  ): Promise<CursoListQueryResult> {
    return this.repository.findAll(accessContext, dto, dto?.selection);
  }
}

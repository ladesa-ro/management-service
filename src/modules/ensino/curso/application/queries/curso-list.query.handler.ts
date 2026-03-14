import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import {
  type ICursoListQuery,
  ICursoListQueryHandler,
} from "@/modules/ensino/curso/domain/queries/curso-list.query.handler.interface";
import type { CursoListQueryResult } from "../../domain/queries";
import { ICursoRepository } from "../../domain/repositories";
@DeclareImplementation()
export class CursoListQueryHandlerImpl implements ICursoListQueryHandler {
  constructor(
    @DeclareDependency(ICursoRepository)
    private readonly repository: ICursoRepository,
  ) {}

  async execute({ accessContext, dto, selection }: ICursoListQuery): Promise<CursoListQueryResult> {
    return this.repository.findAll(accessContext, dto, selection);
  }
}

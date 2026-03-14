import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import {
  type ICursoFindOneQuery,
  ICursoFindOneQueryHandler,
} from "@/modules/ensino/curso/domain/queries/curso-find-one.query.handler.interface";
import type { CursoFindOneQueryResult } from "../../domain/queries";
import { ICursoRepository } from "../../domain/repositories";

@DeclareImplementation()
export class CursoFindOneQueryHandlerImpl implements ICursoFindOneQueryHandler {
  constructor(
    @DeclareDependency(ICursoRepository)
    private readonly repository: ICursoRepository,
  ) {}

  async execute({
    accessContext,
    dto,
    selection,
  }: ICursoFindOneQuery): Promise<CursoFindOneQueryResult | null> {
    return this.repository.findById(accessContext, dto, selection);
  }
}

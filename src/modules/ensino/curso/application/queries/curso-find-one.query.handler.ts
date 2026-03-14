import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import {
  type ICursoFindOneQuery,
  ICursoFindOneQueryHandler,
} from "@/modules/ensino/curso/domain/queries/curso-find-one.query.handler.interface";
import { ICursoRepository } from "../../domain/repositories";
import type { CursoFindOneOutputDto } from "../dtos";

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
  }: ICursoFindOneQuery): Promise<CursoFindOneOutputDto | null> {
    return this.repository.findById(accessContext, dto, selection);
  }
}

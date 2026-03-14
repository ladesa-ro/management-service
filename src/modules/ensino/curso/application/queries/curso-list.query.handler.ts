import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import {
  type ICursoListQuery,
  ICursoListQueryHandler,
} from "@/modules/ensino/curso/domain/queries/curso-list.query.handler.interface";
import { ICursoRepository } from "../../domain/repositories";
import type { CursoListOutputDto } from "../dtos";

@DeclareImplementation()
export class CursoListQueryHandlerImpl implements ICursoListQueryHandler {
  constructor(
    @DeclareDependency(ICursoRepository)
    private readonly repository: ICursoRepository,
  ) {}

  async execute({ accessContext, dto, selection }: ICursoListQuery): Promise<CursoListOutputDto> {
    return this.repository.findAll(accessContext, dto, selection);
  }
}

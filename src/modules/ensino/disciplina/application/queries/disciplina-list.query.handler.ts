import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import {
  type IDisciplinaListQuery,
  IDisciplinaListQueryHandler,
} from "@/modules/ensino/disciplina/domain/queries/disciplina-list.query.handler.interface";
import { IDisciplinaRepository } from "../../domain/repositories";
import type { DisciplinaListOutputDto } from "../dtos";

@DeclareImplementation()
export class DisciplinaListQueryHandlerImpl implements IDisciplinaListQueryHandler {
  constructor(
    @DeclareDependency(IDisciplinaRepository)
    private readonly repository: IDisciplinaRepository,
  ) {}

  async execute({
    accessContext,
    dto,
    selection,
  }: IDisciplinaListQuery): Promise<DisciplinaListOutputDto> {
    return this.repository.findAll(accessContext, dto, selection);
  }
}

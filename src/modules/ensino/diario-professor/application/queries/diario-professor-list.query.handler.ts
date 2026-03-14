import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import {
  type IDiarioProfessorListQuery,
  IDiarioProfessorListQueryHandler,
} from "@/modules/ensino/diario-professor/domain/queries/diario-professor-list.query.handler.interface";
import type { DiarioProfessorListQueryResult } from "../../domain/queries";
import { IDiarioProfessorRepository } from "../../domain/repositories";

@DeclareImplementation()
export class DiarioProfessorListQueryHandlerImpl implements IDiarioProfessorListQueryHandler {
  constructor(
    @DeclareDependency(IDiarioProfessorRepository)
    private readonly repository: IDiarioProfessorRepository,
  ) {}

  async execute({
    accessContext,
    dto,
    selection,
  }: IDiarioProfessorListQuery): Promise<DiarioProfessorListQueryResult> {
    return this.repository.findAll(accessContext, dto, selection);
  }
}

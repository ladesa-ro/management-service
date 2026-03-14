import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import {
  type IDiarioProfessorFindOneQuery,
  IDiarioProfessorFindOneQueryHandler,
} from "@/modules/ensino/diario-professor/domain/queries/diario-professor-find-one.query.handler.interface";
import type { DiarioProfessorFindOneQueryResult } from "../../domain/queries";
import { IDiarioProfessorRepository } from "../../domain/repositories";
@DeclareImplementation()
export class DiarioProfessorFindOneQueryHandlerImpl implements IDiarioProfessorFindOneQueryHandler {
  constructor(
    @DeclareDependency(IDiarioProfessorRepository)
    private readonly repository: IDiarioProfessorRepository,
  ) {}

  async execute({
    accessContext,
    dto,
    selection,
  }: IDiarioProfessorFindOneQuery): Promise<DiarioProfessorFindOneQueryResult | null> {
    return this.repository.findById(accessContext, dto, selection);
  }
}

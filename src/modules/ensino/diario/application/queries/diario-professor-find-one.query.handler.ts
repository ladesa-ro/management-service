import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { IDiarioProfessorFindOneQueryHandler } from "@/modules/ensino/diario/domain/queries/diario-professor-find-one.query.handler.interface";
import type {
  DiarioProfessorFindOneQuery,
  DiarioProfessorFindOneQueryResult,
} from "../../domain/queries";
import { IDiarioProfessorRepository } from "../../domain/repositories";

@DeclareImplementation()
export class DiarioProfessorFindOneQueryHandlerImpl implements IDiarioProfessorFindOneQueryHandler {
  constructor(
    @DeclareDependency(IDiarioProfessorRepository)
    private readonly repository: IDiarioProfessorRepository,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: DiarioProfessorFindOneQuery,
  ): Promise<DiarioProfessorFindOneQueryResult | null> {
    return this.repository.findById(accessContext, dto);
  }
}

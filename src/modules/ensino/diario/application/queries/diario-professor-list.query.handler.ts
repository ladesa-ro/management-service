import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import { IDiarioProfessorListQueryHandler } from "@/modules/ensino/diario/domain/queries/diario-professor-list.query.handler.interface";
import type {
  DiarioProfessorListQuery,
  DiarioProfessorListQueryResult,
} from "../../domain/queries";
import { IDiarioProfessorRepository } from "../../domain/repositories";

@DeclareImplementation()
export class DiarioProfessorListQueryHandlerImpl implements IDiarioProfessorListQueryHandler {
  constructor(
    @DeclareDependency(IDiarioProfessorRepository)
    private readonly repository: IDiarioProfessorRepository,
  ) {}

  async execute(
    accessContext: AccessContext | null,
    dto: DiarioProfessorListQuery | null,
  ): Promise<DiarioProfessorListQueryResult> {
    return this.repository.findAll(accessContext, dto, dto?.selection);
  }
}

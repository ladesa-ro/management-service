import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import type { DiarioProfessorBulkReplaceCommand } from "../../domain/commands/diario-professor-bulk-replace.command";
import { IDiarioProfessorBulkReplaceCommandHandler } from "../../domain/commands/diario-professor-bulk-replace.command.handler.interface";
import type {
  DiarioProfessorListQuery,
  DiarioProfessorListQueryResult,
} from "../../domain/queries";
import { IDiarioProfessorRepository } from "../../domain/repositories";

@DeclareImplementation()
export class DiarioProfessorBulkReplaceCommandHandlerImpl
  implements IDiarioProfessorBulkReplaceCommandHandler
{
  constructor(
    @DeclareDependency(IDiarioProfessorRepository)
    private readonly repository: IDiarioProfessorRepository,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: DiarioProfessorBulkReplaceCommand,
  ): Promise<DiarioProfessorListQueryResult> {
    await this.repository.softDeleteByDiarioId(dto.diarioId);

    await this.repository.bulkCreate(
      dto.professores.map((p) => ({
        situacao: p.situacao,
        diarioId: dto.diarioId,
        perfilId: p.perfilId,
      })),
    );

    const listQuery: DiarioProfessorListQuery = { "filter.diario.id": [dto.diarioId] };
    return this.repository.getFindAllQueryResult(accessContext, listQuery);
  }
}

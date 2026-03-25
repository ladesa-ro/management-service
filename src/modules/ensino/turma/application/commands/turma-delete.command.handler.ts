import { ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { ITurmaDeleteCommandHandler } from "@/modules/ensino/turma/domain/commands/turma-delete.command.handler.interface";
import type { TurmaFindOneQuery } from "@/modules/ensino/turma/domain/queries";
import { Turma } from "@/modules/ensino/turma/domain/turma";
import { ITurmaPermissionChecker } from "../../domain/authorization";
import { ITurmaRepository } from "../../domain/repositories";

@DeclareImplementation()
export class TurmaDeleteCommandHandlerImpl implements ITurmaDeleteCommandHandler {
  constructor(
    @DeclareDependency(ITurmaRepository)
    private readonly repository: ITurmaRepository,
    @DeclareDependency(ITurmaPermissionChecker)
    private readonly permissionChecker: ITurmaPermissionChecker,
  ) {}

  async execute(accessContext: IAccessContext | null, dto: TurmaFindOneQuery): Promise<boolean> {
    await this.permissionChecker.ensureCanDelete(accessContext, { dto }, dto.id);

    const aggregate = await this.repository.loadById(accessContext, dto.id);

    ensureExists(aggregate, Turma.entityName, dto.id);

    await this.repository.softDeleteById(aggregate.id);

    return true;
  }
}

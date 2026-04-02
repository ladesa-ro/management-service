import { ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { ITurmaDeleteCommandHandler } from "@/modules/ensino/turma/domain/commands/turma-delete.command.handler.interface";
import type { TurmaFindOneQuery } from "@/modules/ensino/turma/domain/queries";
import { Turma } from "@/modules/ensino/turma/domain/turma";
import { ITurmaPermissionChecker } from "../../domain/authorization";
import { ITurmaRepository } from "../../domain/repositories";

@Impl()
export class TurmaDeleteCommandHandlerImpl implements ITurmaDeleteCommandHandler {
  constructor(
    @Dep(ITurmaRepository)
    private readonly repository: ITurmaRepository,
    @Dep(ITurmaPermissionChecker)
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

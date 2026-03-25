import { ensureActiveEntity, ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { IDisciplinaDeleteCommandHandler } from "@/modules/ensino/disciplina/domain/commands/disciplina-delete.command.handler.interface";
import { Disciplina } from "@/modules/ensino/disciplina/domain/disciplina";
import type { DisciplinaFindOneQuery } from "@/modules/ensino/disciplina/domain/queries";
import { IDisciplinaPermissionChecker } from "../../domain/authorization";
import { IDisciplinaRepository } from "../../domain/repositories";

@DeclareImplementation()
export class DisciplinaDeleteCommandHandlerImpl implements IDisciplinaDeleteCommandHandler {
  constructor(
    @DeclareDependency(IDisciplinaRepository)
    private readonly repository: IDisciplinaRepository,
    @DeclareDependency(IDisciplinaPermissionChecker)
    private readonly permissionChecker: IDisciplinaPermissionChecker,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: DisciplinaFindOneQuery,
  ): Promise<boolean> {
    await this.permissionChecker.ensureCanDelete(accessContext, { dto }, dto.id);

    const domain = await this.repository.loadById(accessContext, dto.id);
    ensureExists(domain, Disciplina.entityName, dto.id);
    ensureActiveEntity(domain, Disciplina.entityName, dto.id);

    await this.repository.softDeleteById(domain.id);

    return true;
  }
}

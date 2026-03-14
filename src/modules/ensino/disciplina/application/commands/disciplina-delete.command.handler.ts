import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { ensureExists } from "@/modules/@shared";
import {
  type IDisciplinaDeleteCommand,
  IDisciplinaDeleteCommandHandler,
} from "@/modules/ensino/disciplina/domain/commands/disciplina-delete.command.handler.interface";
import { Disciplina } from "@/modules/ensino/disciplina/domain/disciplina.domain";
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

  async execute({ accessContext, dto }: IDisciplinaDeleteCommand): Promise<boolean> {
    await this.permissionChecker.ensureCanDelete(accessContext, { dto }, dto.id);

    const entity = await this.repository.findById(accessContext, dto);

    ensureExists(entity, Disciplina.entityName, dto.id);

    await this.repository.softDeleteById(entity.id);

    return true;
  }
}

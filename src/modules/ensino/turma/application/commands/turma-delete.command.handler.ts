import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { ensureExists } from "@/modules/@shared";
import {
  type ITurmaDeleteCommand,
  ITurmaDeleteCommandHandler,
} from "@/modules/ensino/turma/domain/commands/turma-delete.command.handler.interface";
import { Turma } from "@/modules/ensino/turma/domain/turma.domain";
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

  async execute({ accessContext, dto }: ITurmaDeleteCommand): Promise<boolean> {
    await this.permissionChecker.ensureCanDelete(accessContext, { dto }, dto.id);

    const entity = await this.repository.findById(accessContext, dto);

    ensureExists(entity, Turma.entityName, dto.id);

    await this.repository.softDeleteById(entity.id);

    return true;
  }
}

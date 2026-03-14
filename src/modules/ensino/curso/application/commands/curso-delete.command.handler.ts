import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { ensureExists } from "@/modules/@shared";
import {
  type ICursoDeleteCommand,
  ICursoDeleteCommandHandler,
} from "@/modules/ensino/curso/domain/commands/curso-delete.command.handler.interface";
import { Curso } from "@/modules/ensino/curso/domain/curso.domain";
import { ICursoPermissionChecker } from "../../domain/authorization";
import { ICursoRepository } from "../../domain/repositories";

@DeclareImplementation()
export class CursoDeleteCommandHandlerImpl implements ICursoDeleteCommandHandler {
  constructor(
    @DeclareDependency(ICursoRepository)
    private readonly repository: ICursoRepository,
    @DeclareDependency(ICursoPermissionChecker)
    private readonly permissionChecker: ICursoPermissionChecker,
  ) {}

  async execute({ accessContext, dto }: ICursoDeleteCommand): Promise<boolean> {
    await this.permissionChecker.ensureCanDelete(accessContext, { dto }, dto.id);

    const entity = await this.repository.findById(accessContext, dto);

    ensureExists(entity, Curso.entityName, dto.id);

    await this.repository.softDeleteById(entity.id);

    return true;
  }
}

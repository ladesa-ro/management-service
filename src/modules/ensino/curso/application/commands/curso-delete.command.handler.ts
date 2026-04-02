import { ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { ICursoDeleteCommandHandler } from "@/modules/ensino/curso/domain/commands/curso-delete.command.handler.interface";
import { Curso } from "@/modules/ensino/curso/domain/curso";
import type { CursoFindOneQuery } from "@/modules/ensino/curso/domain/queries";
import { ICursoPermissionChecker } from "../../domain/authorization";
import { ICursoRepository } from "../../domain/repositories";

@Impl()
export class CursoDeleteCommandHandlerImpl implements ICursoDeleteCommandHandler {
  constructor(
    @Dep(ICursoRepository)
    private readonly repository: ICursoRepository,
    @Dep(ICursoPermissionChecker)
    private readonly permissionChecker: ICursoPermissionChecker,
  ) {}

  async execute(accessContext: IAccessContext | null, dto: CursoFindOneQuery): Promise<boolean> {
    await this.permissionChecker.ensureCanDelete(accessContext, { dto }, dto.id);

    const entity = await this.repository.getFindOneQueryResult(accessContext, dto);

    ensureExists(entity, Curso.entityName, dto.id);

    await this.repository.softDeleteById(entity.id);

    return true;
  }
}

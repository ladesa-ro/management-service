import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import { ensureExists } from "@/modules/@shared";
import { ICursoDeleteCommandHandler } from "@/modules/ensino/curso/domain/commands/curso-delete.command.handler.interface";
import { Curso } from "@/modules/ensino/curso/domain/curso.domain";
import type { CursoFindOneQuery } from "@/modules/ensino/curso/domain/queries";
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

  async execute(accessContext: AccessContext | null, dto: CursoFindOneQuery): Promise<boolean> {
    await this.permissionChecker.ensureCanDelete(accessContext, { dto }, dto.id);

    const entity = await this.repository.findById(accessContext, dto);

    ensureExists(entity, Curso.entityName, dto.id);

    await this.repository.softDeleteById(entity.id);

    return true;
  }
}

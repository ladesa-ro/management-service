import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import { ensureExists } from "@/modules/@shared";
import { Bloco } from "@/modules/ambientes/bloco/domain/bloco.domain";
import { IBlocoDeleteCommandHandler } from "@/modules/ambientes/bloco/domain/commands/bloco-delete.command.handler.interface";
import type { BlocoFindOneQuery } from "@/modules/ambientes/bloco/domain/queries";
import { IBlocoPermissionChecker } from "../../domain/authorization";
import { IBlocoRepository } from "../../domain/repositories";

@DeclareImplementation()
export class BlocoDeleteCommandHandlerImpl implements IBlocoDeleteCommandHandler {
  constructor(
    @DeclareDependency(IBlocoRepository)
    private readonly repository: IBlocoRepository,
    @DeclareDependency(IBlocoPermissionChecker)
    private readonly permissionChecker: IBlocoPermissionChecker,
  ) {}

  async execute(accessContext: AccessContext | null, dto: BlocoFindOneQuery): Promise<boolean> {
    await this.permissionChecker.ensureCanDelete(accessContext, { dto }, dto.id);

    const entity = await this.repository.findById(accessContext, dto);

    ensureExists(entity, Bloco.entityName, dto.id);

    await this.repository.softDeleteById(entity.id);

    return true;
  }
}

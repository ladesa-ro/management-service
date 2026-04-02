import { ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { Bloco } from "@/modules/ambientes/bloco/domain/bloco";
import { IBlocoDeleteCommandHandler } from "@/modules/ambientes/bloco/domain/commands/bloco-delete.command.handler.interface";
import type { BlocoFindOneQuery } from "@/modules/ambientes/bloco/domain/queries";
import { IBlocoPermissionChecker } from "../../domain/authorization";
import { IBlocoRepository } from "../../domain/repositories";

@Impl()
export class BlocoDeleteCommandHandlerImpl implements IBlocoDeleteCommandHandler {
  constructor(
    @Dep(IBlocoRepository)
    private readonly repository: IBlocoRepository,
    @Dep(IBlocoPermissionChecker)
    private readonly permissionChecker: IBlocoPermissionChecker,
  ) {}

  async execute(accessContext: IAccessContext | null, dto: BlocoFindOneQuery): Promise<boolean> {
    await this.permissionChecker.ensureCanDelete(accessContext, { dto }, dto.id);

    const aggregate = await this.repository.loadById(accessContext, dto.id);
    ensureExists(aggregate, Bloco.entityName, dto.id);

    await this.repository.softDeleteById(aggregate.id);

    return true;
  }
}

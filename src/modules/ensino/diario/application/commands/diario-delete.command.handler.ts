import { ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { IDiarioDeleteCommandHandler } from "@/modules/ensino/diario/domain/commands/diario-delete.command.handler.interface";
import { Diario } from "@/modules/ensino/diario/domain/diario";
import type { DiarioFindOneQuery } from "@/modules/ensino/diario/domain/queries";
import { IDiarioPermissionChecker } from "../../domain/authorization";
import { IDiarioRepository } from "../../domain/repositories";

@Impl()
export class DiarioDeleteCommandHandlerImpl implements IDiarioDeleteCommandHandler {
  constructor(
    @Dep(IDiarioRepository)
    private readonly repository: IDiarioRepository,
    @Dep(IDiarioPermissionChecker)
    private readonly permissionChecker: IDiarioPermissionChecker,
  ) {}

  async execute(accessContext: IAccessContext | null, dto: DiarioFindOneQuery): Promise<boolean> {
    await this.permissionChecker.ensureCanDelete(accessContext, { dto }, dto.id);

    const aggregate = await this.repository.loadById(accessContext, dto.id);

    ensureExists(aggregate, Diario.entityName, dto.id);

    await this.repository.softDeleteById(aggregate.id);

    return true;
  }
}

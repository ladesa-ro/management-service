import { ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { IDiarioDeleteCommandHandler } from "@/modules/ensino/diario/domain/commands/diario-delete.command.handler.interface";
import { Diario } from "@/modules/ensino/diario/domain/diario";
import type { DiarioFindOneQuery } from "@/modules/ensino/diario/domain/queries";
import { IDiarioPermissionChecker } from "../../domain/authorization";
import { IDiarioRepository } from "../../domain/repositories";

@DeclareImplementation()
export class DiarioDeleteCommandHandlerImpl implements IDiarioDeleteCommandHandler {
  constructor(
    @DeclareDependency(IDiarioRepository)
    private readonly repository: IDiarioRepository,
    @DeclareDependency(IDiarioPermissionChecker)
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

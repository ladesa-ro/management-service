import { ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { Ambiente } from "@/modules/ambientes/ambiente/domain/ambiente";
import { IAmbienteDeleteCommandHandler } from "@/modules/ambientes/ambiente/domain/commands/ambiente-delete.command.handler.interface";
import type { AmbienteFindOneQuery } from "@/modules/ambientes/ambiente/domain/queries";
import { IAmbientePermissionChecker } from "../../domain/authorization";
import { IAmbienteRepository } from "../../domain/repositories";

@DeclareImplementation()
export class AmbienteDeleteCommandHandlerImpl implements IAmbienteDeleteCommandHandler {
  constructor(
    @DeclareDependency(IAmbienteRepository)
    private readonly repository: IAmbienteRepository,
    @DeclareDependency(IAmbientePermissionChecker)
    private readonly permissionChecker: IAmbientePermissionChecker,
  ) {}

  async execute(accessContext: IAccessContext | null, dto: AmbienteFindOneQuery): Promise<boolean> {
    await this.permissionChecker.ensureCanDelete(accessContext, { dto }, dto.id);

    const entity = await this.repository.findById(accessContext, dto);

    ensureExists(entity, Ambiente.entityName, dto.id);

    await this.repository.softDeleteById(entity.id);

    return true;
  }
}

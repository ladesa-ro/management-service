import { ensureExists } from "@/application/errors";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { Campus } from "@/modules/ambientes/campus/domain/campus";
import { ICampusDeleteCommandHandler } from "@/modules/ambientes/campus/domain/commands/campus-delete.command.handler.interface";
import type { CampusFindOneQuery } from "@/modules/ambientes/campus/domain/queries";
import type { AccessContext } from "@/server/access-context";
import { ICampusPermissionChecker } from "../../domain/authorization";
import { ICampusRepository } from "../../domain/repositories";

@DeclareImplementation()
export class CampusDeleteCommandHandlerImpl implements ICampusDeleteCommandHandler {
  constructor(
    @DeclareDependency(ICampusRepository)
    private readonly repository: ICampusRepository,
    @DeclareDependency(ICampusPermissionChecker)
    private readonly permissionChecker: ICampusPermissionChecker,
  ) {}

  async execute(accessContext: AccessContext | null, dto: CampusFindOneQuery): Promise<boolean> {
    await this.permissionChecker.ensureCanDelete(accessContext, { dto }, dto.id);

    const entity = await this.repository.findById(accessContext, dto);

    ensureExists(entity, Campus.entityName, dto.id);

    await this.repository.softDeleteById(entity.id);

    return true;
  }
}

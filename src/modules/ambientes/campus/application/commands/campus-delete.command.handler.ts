import { Inject, Injectable } from "@nestjs/common";
import { ensureExists } from "@/modules/@shared";
import { Campus } from "@/modules/ambientes/campus/domain/campus.domain";
import {
  type ICampusDeleteCommand,
  ICampusDeleteCommandHandler,
} from "@/modules/ambientes/campus/domain/commands/campus-delete.command.handler.interface";
import { ICampusPermissionChecker } from "../../domain/authorization";
import { ICampusRepository } from "../../domain/repositories";

@Injectable()
export class CampusDeleteCommandHandlerImpl implements ICampusDeleteCommandHandler {
  constructor(
    @Inject(ICampusRepository)
    private readonly repository: ICampusRepository,
    @Inject(ICampusPermissionChecker)
    private readonly permissionChecker: ICampusPermissionChecker,
  ) {}

  async execute({ accessContext, dto }: ICampusDeleteCommand): Promise<boolean> {
    await this.permissionChecker.ensureCanDelete(accessContext, { dto }, dto.id);

    const entity = await this.repository.findById(accessContext, dto);

    ensureExists(entity, Campus.entityName, dto.id);

    await this.repository.softDeleteById(entity.id);

    return true;
  }
}

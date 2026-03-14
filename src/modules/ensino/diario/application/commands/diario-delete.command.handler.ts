import { Inject, Injectable } from "@nestjs/common";
import { ensureExists } from "@/modules/@shared";
import {
  type IDiarioDeleteCommand,
  IDiarioDeleteCommandHandler,
} from "@/modules/ensino/diario/domain/commands/diario-delete.command.handler.interface";
import { Diario } from "@/modules/ensino/diario/domain/diario.domain";
import { IDiarioPermissionChecker } from "../../domain/authorization";
import { IDiarioRepository } from "../../domain/repositories";

@Injectable()
export class DiarioDeleteCommandHandlerImpl implements IDiarioDeleteCommandHandler {
  constructor(
    @Inject(IDiarioRepository)
    private readonly repository: IDiarioRepository,
    @Inject(IDiarioPermissionChecker)
    private readonly permissionChecker: IDiarioPermissionChecker,
  ) {}

  async execute({ accessContext, dto }: IDiarioDeleteCommand): Promise<boolean> {
    await this.permissionChecker.ensureCanDelete(accessContext, { dto }, dto.id);

    const entity = await this.repository.findById(accessContext, dto);

    ensureExists(entity, Diario.entityName, dto.id);

    await this.repository.softDeleteById(entity.id);

    return true;
  }
}

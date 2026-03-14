import { Inject, Injectable } from "@nestjs/common";
import { ensureExists } from "@/modules/@shared";
import { Ambiente } from "@/modules/ambientes/ambiente/domain/ambiente.domain";
import {
  type IAmbienteDeleteCommand,
  IAmbienteDeleteCommandHandler,
} from "@/modules/ambientes/ambiente/domain/commands/ambiente-delete.command.handler.interface";
import { IAmbientePermissionChecker } from "../../domain/authorization";
import { IAmbienteRepository } from "../../domain/repositories";

@Injectable()
export class AmbienteDeleteCommandHandlerImpl implements IAmbienteDeleteCommandHandler {
  constructor(
    @Inject(IAmbienteRepository)
    private readonly repository: IAmbienteRepository,
    @Inject(IAmbientePermissionChecker)
    private readonly permissionChecker: IAmbientePermissionChecker,
  ) {}

  async execute({ accessContext, dto }: IAmbienteDeleteCommand): Promise<boolean> {
    await this.permissionChecker.ensureCanDelete(accessContext, { dto }, dto.id);

    const entity = await this.repository.findById(accessContext, dto);

    ensureExists(entity, Ambiente.entityName, dto.id);

    await this.repository.softDeleteById(entity.id);

    return true;
  }
}

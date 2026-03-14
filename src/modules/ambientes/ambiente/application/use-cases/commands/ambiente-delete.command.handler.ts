import { Inject, Injectable } from "@nestjs/common";
import { ensureExists, IAuthorizationService } from "@/modules/@shared";
import {
  type IAmbienteDeleteCommand,
  IAmbienteDeleteCommandHandler,
} from "@/modules/ambientes/ambiente/domain/commands/ambiente-delete.command.handler.interface";
import { IAmbienteRepository } from "../../../domain/repositories";

@Injectable()
export class AmbienteDeleteCommandHandlerImpl implements IAmbienteDeleteCommandHandler {
  constructor(
    @Inject(IAmbienteRepository)
    private readonly repository: IAmbienteRepository,
    @Inject(IAuthorizationService)
    private readonly authorizationService: IAuthorizationService,
  ) {}

  async execute({ accessContext, dto }: IAmbienteDeleteCommand): Promise<boolean> {
    await this.authorizationService.ensurePermission("ambiente:delete", { dto }, dto.id);

    const entity = await this.repository.findById(accessContext, dto);

    ensureExists(entity, "Ambiente", dto.id);

    await this.repository.softDeleteById(entity.id);

    return true;
  }
}

import { Inject, Injectable } from "@nestjs/common";
import {
  AUTHORIZATION_SERVICE_PORT,
  type IAuthorizationServicePort,
  ResourceNotFoundError,
} from "@/modules/@shared";
import {
  type IDiarioDeleteCommand,
  IDiarioDeleteCommandHandler,
} from "@/modules/ensino/diario/domain/commands/diario-delete.command.handler.interface";
import { DIARIO_REPOSITORY_PORT, type IDiarioRepositoryPort } from "../../ports";

@Injectable()
export class DiarioDeleteCommandHandlerImpl implements IDiarioDeleteCommandHandler {
  constructor(
    @Inject(DIARIO_REPOSITORY_PORT)
    private readonly repository: IDiarioRepositoryPort,
    @Inject(AUTHORIZATION_SERVICE_PORT)
    private readonly authorizationService: IAuthorizationServicePort,
  ) {}

  async execute({ accessContext, dto }: IDiarioDeleteCommand): Promise<boolean> {
    await this.authorizationService.ensurePermission("diario:delete", { dto }, dto.id);

    const entity = await this.repository.findById(accessContext, dto);

    if (!entity) {
      throw new ResourceNotFoundError("Diario", dto.id);
    }

    await this.repository.softDeleteById(entity.id);

    return true;
  }
}

import { Inject, Injectable } from "@nestjs/common";
import {
  AUTHORIZATION_SERVICE_PORT,
  type IAuthorizationServicePort,
  ResourceNotFoundError,
} from "@/modules/@shared";
import {
  type IBlocoDeleteCommand,
  IBlocoDeleteCommandHandler,
} from "@/modules/ambientes/bloco/domain/commands/bloco-delete.command.handler.interface";
import { BLOCO_REPOSITORY_PORT, type IBlocoRepositoryPort } from "../../../domain/repositories";

@Injectable()
export class BlocoDeleteCommandHandlerImpl implements IBlocoDeleteCommandHandler {
  constructor(
    @Inject(BLOCO_REPOSITORY_PORT)
    private readonly repository: IBlocoRepositoryPort,
    @Inject(AUTHORIZATION_SERVICE_PORT)
    private readonly authorizationService: IAuthorizationServicePort,
  ) {}

  async execute({ accessContext, dto }: IBlocoDeleteCommand): Promise<boolean> {
    await this.authorizationService.ensurePermission("bloco:delete", { dto }, dto.id);

    const entity = await this.repository.findById(accessContext, dto);

    if (!entity) {
      throw new ResourceNotFoundError("Bloco", dto.id);
    }

    await this.repository.softDeleteById(entity.id);

    return true;
  }
}

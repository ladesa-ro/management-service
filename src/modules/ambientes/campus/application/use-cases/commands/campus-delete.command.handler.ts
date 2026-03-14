import { Inject, Injectable } from "@nestjs/common";
import {
  AUTHORIZATION_SERVICE_PORT,
  type IAuthorizationServicePort,
  ResourceNotFoundError,
} from "@/modules/@shared";
import {
  type ICampusDeleteCommand,
  ICampusDeleteCommandHandler,
} from "@/modules/ambientes/campus/domain/commands/campus-delete.command.handler.interface";
import { CAMPUS_REPOSITORY_PORT, type ICampusRepositoryPort } from "../../ports";

@Injectable()
export class CampusDeleteCommandHandlerImpl implements ICampusDeleteCommandHandler {
  constructor(
    @Inject(CAMPUS_REPOSITORY_PORT)
    private readonly repository: ICampusRepositoryPort,
    @Inject(AUTHORIZATION_SERVICE_PORT)
    private readonly authorizationService: IAuthorizationServicePort,
  ) {}

  async execute({ accessContext, dto }: ICampusDeleteCommand): Promise<boolean> {
    await this.authorizationService.ensurePermission("campus:delete", { dto }, dto.id);

    const entity = await this.repository.findById(accessContext, dto);

    if (!entity) {
      throw new ResourceNotFoundError("Campus", dto.id);
    }

    await this.repository.softDeleteById(entity.id);

    return true;
  }
}

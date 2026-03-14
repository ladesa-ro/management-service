import { Inject, Injectable } from "@nestjs/common";
import {
  AUTHORIZATION_SERVICE_PORT,
  type IAuthorizationServicePort,
  ResourceNotFoundError,
} from "@/modules/@shared";
import {
  type IAulaDeleteCommand,
  IAulaDeleteCommandHandler,
} from "@/modules/horarios/aula/domain/commands/aula-delete.command.handler.interface";
import { AULA_REPOSITORY_PORT, type IAulaRepositoryPort } from "../../ports";

@Injectable()
export class AulaDeleteCommandHandlerImpl implements IAulaDeleteCommandHandler {
  constructor(
    @Inject(AULA_REPOSITORY_PORT)
    private readonly repository: IAulaRepositoryPort,
    @Inject(AUTHORIZATION_SERVICE_PORT)
    private readonly authorizationService: IAuthorizationServicePort,
  ) {}

  async execute({ accessContext, dto }: IAulaDeleteCommand): Promise<boolean> {
    await this.authorizationService.ensurePermission("aula:delete", { dto }, dto.id);

    const entity = await this.repository.findById(accessContext, dto);

    if (!entity) {
      throw new ResourceNotFoundError("Aula", dto.id);
    }

    await this.repository.softDeleteById(entity.id);

    return true;
  }
}

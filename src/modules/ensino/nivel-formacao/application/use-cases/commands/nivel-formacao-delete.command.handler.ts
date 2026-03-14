import { Inject, Injectable } from "@nestjs/common";
import {
  AUTHORIZATION_SERVICE_PORT,
  type IAuthorizationServicePort,
  ResourceNotFoundError,
} from "@/modules/@shared";
import {
  type INivelFormacaoDeleteCommand,
  INivelFormacaoDeleteCommandHandler,
} from "@/modules/ensino/nivel-formacao/domain/commands/nivel-formacao-delete.command.handler.interface";
import { type INivelFormacaoRepositoryPort, NIVEL_FORMACAO_REPOSITORY_PORT } from "../../ports";

@Injectable()
export class NivelFormacaoDeleteCommandHandlerImpl implements INivelFormacaoDeleteCommandHandler {
  constructor(
    @Inject(NIVEL_FORMACAO_REPOSITORY_PORT)
    private readonly repository: INivelFormacaoRepositoryPort,
    @Inject(AUTHORIZATION_SERVICE_PORT)
    private readonly authorizationService: IAuthorizationServicePort,
  ) {}

  async execute({ accessContext, dto }: INivelFormacaoDeleteCommand): Promise<boolean> {
    await this.authorizationService.ensurePermission("nivel_formacao:delete", { dto }, dto.id);

    const entity = await this.repository.findById(accessContext, dto);

    if (!entity) {
      throw new ResourceNotFoundError("NivelFormacao", dto.id);
    }

    await this.repository.softDeleteById(entity.id);

    return true;
  }
}

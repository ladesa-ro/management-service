import { Inject, Injectable } from "@nestjs/common";
import {
  AUTHORIZATION_SERVICE_PORT,
  type IAuthorizationServicePort,
  ResourceNotFoundError,
} from "@/modules/@shared";
import {
  type IEtapaDeleteCommand,
  IEtapaDeleteCommandHandler,
} from "@/modules/ensino/etapa/domain/commands/etapa-delete.command.handler.interface";
import { ETAPA_REPOSITORY_PORT, type IEtapaRepositoryPort } from "../../ports";

@Injectable()
export class EtapaDeleteCommandHandlerImpl implements IEtapaDeleteCommandHandler {
  constructor(
    @Inject(ETAPA_REPOSITORY_PORT)
    private readonly repository: IEtapaRepositoryPort,
    @Inject(AUTHORIZATION_SERVICE_PORT)
    private readonly authorizationService: IAuthorizationServicePort,
  ) {}

  async execute({ accessContext, dto }: IEtapaDeleteCommand): Promise<boolean> {
    await this.authorizationService.ensurePermission("etapa:delete", { dto }, dto.id);

    const entity = await this.repository.findById(accessContext, dto);

    if (!entity) {
      throw new ResourceNotFoundError("Etapa", dto.id);
    }

    await this.repository.softDeleteById(entity.id);

    return true;
  }
}

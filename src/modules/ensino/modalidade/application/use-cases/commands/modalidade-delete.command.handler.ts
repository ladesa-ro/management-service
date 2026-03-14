import { Inject, Injectable } from "@nestjs/common";
import {
  AUTHORIZATION_SERVICE_PORT,
  type IAuthorizationServicePort,
  ResourceNotFoundError,
} from "@/modules/@shared";
import {
  type IModalidadeDeleteCommand,
  IModalidadeDeleteCommandHandler,
} from "@/modules/ensino/modalidade/domain/commands/modalidade-delete.command.handler.interface";
import {
  type IModalidadeRepositoryPort,
  MODALIDADE_REPOSITORY_PORT,
} from "../../../domain/repositories";

@Injectable()
export class ModalidadeDeleteCommandHandlerImpl implements IModalidadeDeleteCommandHandler {
  constructor(
    @Inject(MODALIDADE_REPOSITORY_PORT)
    private readonly repository: IModalidadeRepositoryPort,
    @Inject(AUTHORIZATION_SERVICE_PORT)
    private readonly authorizationService: IAuthorizationServicePort,
  ) {}

  async execute({ accessContext, dto }: IModalidadeDeleteCommand): Promise<boolean> {
    await this.authorizationService.ensurePermission("modalidade:delete", { dto }, dto.id);

    const entity = await this.repository.findById(accessContext, dto);

    if (!entity) {
      throw new ResourceNotFoundError("Modalidade", dto.id);
    }

    await this.repository.softDeleteById(entity.id);

    return true;
  }
}

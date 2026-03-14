import { Inject, Injectable } from "@nestjs/common";
import {
  AUTHORIZATION_SERVICE_PORT,
  type IAuthorizationServicePort,
  ResourceNotFoundError,
} from "@/modules/@shared";
import {
  type IDiaCalendarioDeleteCommand,
  IDiaCalendarioDeleteCommandHandler,
} from "@/modules/horarios/dia-calendario/domain/commands/dia-calendario-delete.command.handler.interface";
import { DIA_CALENDARIO_REPOSITORY_PORT, type IDiaCalendarioRepositoryPort } from "../../ports";

@Injectable()
export class DiaCalendarioDeleteCommandHandlerImpl implements IDiaCalendarioDeleteCommandHandler {
  constructor(
    @Inject(DIA_CALENDARIO_REPOSITORY_PORT)
    private readonly repository: IDiaCalendarioRepositoryPort,
    @Inject(AUTHORIZATION_SERVICE_PORT)
    private readonly authorizationService: IAuthorizationServicePort,
  ) {}

  async execute({ accessContext, dto }: IDiaCalendarioDeleteCommand): Promise<boolean> {
    await this.authorizationService.ensurePermission("dia_calendario:delete", { dto }, dto.id);

    const entity = await this.repository.findById(accessContext, dto);

    if (!entity) {
      throw new ResourceNotFoundError("DiaCalendario", dto.id);
    }

    await this.repository.softDeleteById(entity.id);

    return true;
  }
}

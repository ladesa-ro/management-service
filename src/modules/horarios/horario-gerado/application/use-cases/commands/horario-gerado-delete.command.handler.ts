import { Inject, Injectable } from "@nestjs/common";
import {
  AUTHORIZATION_SERVICE_PORT,
  type IAuthorizationServicePort,
  ResourceNotFoundError,
} from "@/modules/@shared";
import {
  type IHorarioGeradoDeleteCommand,
  IHorarioGeradoDeleteCommandHandler,
} from "@/modules/horarios/horario-gerado/domain/commands/horario-gerado-delete.command.handler.interface";
import { HORARIO_GERADO_REPOSITORY_PORT, type IHorarioGeradoRepositoryPort } from "../../ports";

@Injectable()
export class HorarioGeradoDeleteCommandHandlerImpl implements IHorarioGeradoDeleteCommandHandler {
  constructor(
    @Inject(HORARIO_GERADO_REPOSITORY_PORT)
    private readonly repository: IHorarioGeradoRepositoryPort,
    @Inject(AUTHORIZATION_SERVICE_PORT)
    private readonly authorizationService: IAuthorizationServicePort,
  ) {}

  async execute({ accessContext, dto }: IHorarioGeradoDeleteCommand): Promise<boolean> {
    await this.authorizationService.ensurePermission("horario_gerado:delete", { dto }, dto.id);

    const entity = await this.repository.findById(accessContext, dto);

    if (!entity) {
      throw new ResourceNotFoundError("HorarioGerado", dto.id);
    }

    await this.repository.softDeleteById(entity.id);

    return true;
  }
}

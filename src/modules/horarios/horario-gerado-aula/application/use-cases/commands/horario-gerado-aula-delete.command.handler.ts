import { Inject, Injectable } from "@nestjs/common";
import {
  AUTHORIZATION_SERVICE_PORT,
  type IAuthorizationServicePort,
  ResourceNotFoundError,
} from "@/modules/@shared";
import {
  type IHorarioGeradoAulaDeleteCommand,
  IHorarioGeradoAulaDeleteCommandHandler,
} from "@/modules/horarios/horario-gerado-aula/domain/commands/horario-gerado-aula-delete.command.handler.interface";
import {
  HORARIO_GERADO_AULA_REPOSITORY_PORT,
  type IHorarioGeradoAulaRepositoryPort,
} from "../../ports";

@Injectable()
export class HorarioGeradoAulaDeleteCommandHandlerImpl
  implements IHorarioGeradoAulaDeleteCommandHandler
{
  constructor(
    @Inject(HORARIO_GERADO_AULA_REPOSITORY_PORT)
    private readonly repository: IHorarioGeradoAulaRepositoryPort,
    @Inject(AUTHORIZATION_SERVICE_PORT)
    private readonly authorizationService: IAuthorizationServicePort,
  ) {}

  async execute({ accessContext, dto }: IHorarioGeradoAulaDeleteCommand): Promise<boolean> {
    await this.authorizationService.ensurePermission("horario_gerado_aula:delete", { dto }, dto.id);

    const entity = await this.repository.findById(accessContext, dto);

    if (!entity) {
      throw new ResourceNotFoundError("HorarioGeradoAula", dto.id);
    }

    await this.repository.softDeleteById(entity.id);

    return true;
  }
}

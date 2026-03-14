import { Inject, Injectable } from "@nestjs/common";
import {
  AUTHORIZATION_SERVICE_PORT,
  type IAuthorizationServicePort,
  ResourceNotFoundError,
} from "@/modules/@shared";
import {
  type IReservaDeleteCommand,
  IReservaDeleteCommandHandler,
} from "@/modules/ambientes/reserva/domain/commands/reserva-delete.command.handler.interface";
import { type IReservaRepositoryPort, RESERVA_REPOSITORY_PORT } from "../../ports";

@Injectable()
export class ReservaDeleteCommandHandlerImpl implements IReservaDeleteCommandHandler {
  constructor(
    @Inject(RESERVA_REPOSITORY_PORT)
    private readonly repository: IReservaRepositoryPort,
    @Inject(AUTHORIZATION_SERVICE_PORT)
    private readonly authorizationService: IAuthorizationServicePort,
  ) {}

  async execute({ accessContext, dto }: IReservaDeleteCommand): Promise<boolean> {
    await this.authorizationService.ensurePermission("reserva:delete", { dto }, dto.id);

    const entity = await this.repository.findById(accessContext, dto);

    if (!entity) {
      throw new ResourceNotFoundError("Reserva", dto.id);
    }

    await this.repository.softDeleteById(entity.id);

    return true;
  }
}

import { Inject, Injectable } from "@nestjs/common";
import {
  AUTHORIZATION_SERVICE_PORT,
  type IAuthorizationServicePort,
  ResourceNotFoundError,
} from "@/modules/@shared";
import { UsuarioService } from "@/modules/acesso/usuario/application/use-cases/usuario.service";
import { AmbienteService } from "@/modules/ambientes/ambiente/application/use-cases/ambiente.service";
import {
  type IReservaCreateCommand,
  IReservaCreateCommandHandler,
} from "@/modules/ambientes/reserva/domain/commands/reserva-create.command.handler.interface";
import { Reserva } from "@/modules/ambientes/reserva/domain/reserva.domain";
import type { ReservaFindOneOutputDto } from "../../dtos";
import { type IReservaRepositoryPort, RESERVA_REPOSITORY_PORT } from "../../ports";

@Injectable()
export class ReservaCreateCommandHandlerImpl implements IReservaCreateCommandHandler {
  constructor(
    @Inject(RESERVA_REPOSITORY_PORT)
    private readonly repository: IReservaRepositoryPort,
    @Inject(AUTHORIZATION_SERVICE_PORT)
    private readonly authorizationService: IAuthorizationServicePort,
    private readonly usuarioService: UsuarioService,
    private readonly ambienteService: AmbienteService,
  ) {}

  async execute({ accessContext, dto }: IReservaCreateCommand): Promise<ReservaFindOneOutputDto> {
    await this.authorizationService.ensurePermission("reserva:create", { dto });

    const ambiente = await this.ambienteService.findByIdStrict(accessContext, {
      id: dto.ambiente.id,
    });
    const usuario = await this.usuarioService.findByIdStrict(accessContext, { id: dto.usuario.id });
    const domain = Reserva.criar({
      situacao: dto.situacao,
      rrule: dto.rrule,
      motivo: dto.motivo,
      tipo: dto.tipo,
      ambiente: { id: ambiente.id },
      usuario: { id: usuario.id },
    });
    const { id } = await this.repository.createFromDomain({
      ...domain,
      ambiente: { id: ambiente.id },
      usuario: { id: usuario.id },
    });

    const result = await this.repository.findById(accessContext, { id });

    if (!result) {
      throw new ResourceNotFoundError("Reserva", id);
    }

    return result;
  }
}

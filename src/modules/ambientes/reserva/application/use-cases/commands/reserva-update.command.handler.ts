import { Inject, Injectable } from "@nestjs/common";
import { has } from "lodash";
import {
  AUTHORIZATION_SERVICE_PORT,
  type IAuthorizationServicePort,
  type PersistInput,
  ResourceNotFoundError,
} from "@/modules/@shared";
import { UsuarioService } from "@/modules/acesso/usuario/application/use-cases/usuario.service";
import { AmbienteService } from "@/modules/ambientes/ambiente/application/use-cases/ambiente.service";
import {
  type IReservaUpdateCommand,
  IReservaUpdateCommandHandler,
} from "@/modules/ambientes/reserva/domain/commands/reserva-update.command.handler.interface";
import { Reserva } from "@/modules/ambientes/reserva/domain/reserva.domain";
import type { IReserva } from "@/modules/ambientes/reserva/domain/reserva.types";
import type { ReservaFindOneOutputDto } from "../../dtos";
import { type IReservaRepositoryPort, RESERVA_REPOSITORY_PORT } from "../../ports";

@Injectable()
export class ReservaUpdateCommandHandlerImpl implements IReservaUpdateCommandHandler {
  constructor(
    @Inject(RESERVA_REPOSITORY_PORT)
    private readonly repository: IReservaRepositoryPort,
    @Inject(AUTHORIZATION_SERVICE_PORT)
    private readonly authorizationService: IAuthorizationServicePort,
    private readonly usuarioService: UsuarioService,
    private readonly ambienteService: AmbienteService,
  ) {}

  async execute({ accessContext, dto }: IReservaUpdateCommand): Promise<ReservaFindOneOutputDto> {
    const current = await this.repository.findById(accessContext, { id: dto.id });

    if (!current) {
      throw new ResourceNotFoundError("Reserva", dto.id);
    }

    await this.authorizationService.ensurePermission("reserva:update", { dto }, dto.id);

    const domain = Reserva.fromData(current);
    domain.atualizar({
      situacao: dto.situacao,
      rrule: dto.rrule,
      motivo: dto.motivo,
      tipo: dto.tipo,
    });
    const updateData: Partial<PersistInput<IReserva>> = {
      situacao: domain.situacao,
      rrule: domain.rrule,
      motivo: domain.motivo,
      tipo: domain.tipo,
    };
    if (has(dto, "ambiente") && dto.ambiente !== undefined) {
      const ambiente = await this.ambienteService.findByIdStrict(accessContext, {
        id: dto.ambiente.id,
      });
      updateData.ambiente = { id: ambiente.id };
    }
    if (has(dto, "usuario") && dto.usuario !== undefined) {
      const usuario = await this.usuarioService.findByIdSimpleStrict(accessContext, dto.usuario.id);
      updateData.usuario = { id: usuario.id };
    }
    await this.repository.updateFromDomain(current.id, updateData);

    const result = await this.repository.findById(accessContext, { id: dto.id });

    if (!result) {
      throw new ResourceNotFoundError("Reserva", dto.id);
    }

    return result;
  }
}

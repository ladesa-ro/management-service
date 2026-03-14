import { Inject, Injectable } from "@nestjs/common";
import {
  AUTHORIZATION_SERVICE_PORT,
  type IAuthorizationServicePort,
  ResourceNotFoundError,
} from "@/modules/@shared";
import {
  type IDisponibilidadeUpdateCommand,
  IDisponibilidadeUpdateCommandHandler,
} from "@/modules/ensino/disponibilidade/domain/commands/disponibilidade-update.command.handler.interface";
import { Disponibilidade } from "@/modules/ensino/disponibilidade/domain/disponibilidade.domain";
import type { DisponibilidadeFindOneOutputDto } from "../../dtos";
import { DISPONIBILIDADE_REPOSITORY_PORT, type IDisponibilidadeRepositoryPort } from "../../ports";

@Injectable()
export class DisponibilidadeUpdateCommandHandlerImpl
  implements IDisponibilidadeUpdateCommandHandler
{
  constructor(
    @Inject(DISPONIBILIDADE_REPOSITORY_PORT)
    private readonly repository: IDisponibilidadeRepositoryPort,
    @Inject(AUTHORIZATION_SERVICE_PORT)
    private readonly authorizationService: IAuthorizationServicePort,
  ) {}

  async execute({
    accessContext,
    dto,
  }: IDisponibilidadeUpdateCommand): Promise<DisponibilidadeFindOneOutputDto> {
    const current = await this.repository.findById(accessContext, { id: dto.id });

    if (!current) {
      throw new ResourceNotFoundError("Disponibilidade", dto.id);
    }

    await this.authorizationService.ensurePermission("disponibilidade:update", { dto }, dto.id);

    const domain = Disponibilidade.fromData(current);
    domain.atualizar({ dataInicio: dto.dataInicio, dataFim: dto.dataFim });
    await this.repository.updateFromDomain(current.id, {
      dataInicio: domain.dataInicio,
      dataFim: domain.dataFim,
    });

    const result = await this.repository.findById(accessContext, { id: dto.id });

    if (!result) {
      throw new ResourceNotFoundError("Disponibilidade", dto.id);
    }

    return result;
  }
}

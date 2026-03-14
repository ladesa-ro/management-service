import { Inject, Injectable } from "@nestjs/common";
import {
  AUTHORIZATION_SERVICE_PORT,
  type IAuthorizationServicePort,
  ResourceNotFoundError,
} from "@/modules/@shared";
import { Ambiente } from "@/modules/ambientes/ambiente/domain/ambiente.domain";
import {
  type IAmbienteUpdateCommand,
  IAmbienteUpdateCommandHandler,
} from "@/modules/ambientes/ambiente/domain/commands/ambiente-update.command.handler.interface";
import type { AmbienteFindOneOutputDto } from "../../dtos";
import { AMBIENTE_REPOSITORY_PORT, type IAmbienteRepositoryPort } from "../../ports";

@Injectable()
export class AmbienteUpdateCommandHandlerImpl implements IAmbienteUpdateCommandHandler {
  constructor(
    @Inject(AMBIENTE_REPOSITORY_PORT)
    private readonly repository: IAmbienteRepositoryPort,
    @Inject(AUTHORIZATION_SERVICE_PORT)
    private readonly authorizationService: IAuthorizationServicePort,
  ) {}

  async execute({ accessContext, dto }: IAmbienteUpdateCommand): Promise<AmbienteFindOneOutputDto> {
    const current = await this.repository.findById(accessContext, { id: dto.id });

    if (!current) {
      throw new ResourceNotFoundError("Ambiente", dto.id);
    }

    await this.authorizationService.ensurePermission("ambiente:update", { dto }, dto.id);

    const domain = Ambiente.fromData(current);
    domain.atualizar({
      nome: dto.nome,
      descricao: dto.descricao,
      codigo: dto.codigo,
      capacidade: dto.capacidade,
      tipo: dto.tipo,
    });

    await this.repository.updateFromDomain(current.id, {
      nome: domain.nome,
      descricao: domain.descricao,
      codigo: domain.codigo,
      capacidade: domain.capacidade,
      tipo: domain.tipo,
    });

    const result = await this.repository.findById(accessContext, { id: dto.id });

    if (!result) {
      throw new ResourceNotFoundError("Ambiente", dto.id);
    }

    return result;
  }
}

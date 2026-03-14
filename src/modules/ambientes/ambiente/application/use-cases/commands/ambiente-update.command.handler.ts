import { Inject, Injectable } from "@nestjs/common";
import { ensureExists, IAuthorizationService } from "@/modules/@shared";
import { Ambiente } from "@/modules/ambientes/ambiente/domain/ambiente.domain";
import {
  type IAmbienteUpdateCommand,
  IAmbienteUpdateCommandHandler,
} from "@/modules/ambientes/ambiente/domain/commands/ambiente-update.command.handler.interface";
import { IAmbienteRepository } from "../../../domain/repositories";
import type { AmbienteFindOneOutputDto } from "../../dtos";

@Injectable()
export class AmbienteUpdateCommandHandlerImpl implements IAmbienteUpdateCommandHandler {
  constructor(
    @Inject(IAmbienteRepository)
    private readonly repository: IAmbienteRepository,
    @Inject(IAuthorizationService)
    private readonly authorizationService: IAuthorizationService,
  ) {}

  async execute({ accessContext, dto }: IAmbienteUpdateCommand): Promise<AmbienteFindOneOutputDto> {
    const current = await this.repository.findById(accessContext, { id: dto.id });

    ensureExists(current, "Ambiente", dto.id);

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

    ensureExists(result, "Ambiente", dto.id);

    return result;
  }
}

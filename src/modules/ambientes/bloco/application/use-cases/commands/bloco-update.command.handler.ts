import { Inject, Injectable } from "@nestjs/common";
import {
  AUTHORIZATION_SERVICE_PORT,
  type IAuthorizationServicePort,
  ResourceNotFoundError,
} from "@/modules/@shared";
import { Bloco } from "@/modules/ambientes/bloco/domain/bloco.domain";
import {
  type IBlocoUpdateCommand,
  IBlocoUpdateCommandHandler,
} from "@/modules/ambientes/bloco/domain/commands/bloco-update.command.handler.interface";
import type { BlocoFindOneOutputDto } from "../../dtos";
import { BLOCO_REPOSITORY_PORT, type IBlocoRepositoryPort } from "../../ports";

@Injectable()
export class BlocoUpdateCommandHandlerImpl implements IBlocoUpdateCommandHandler {
  constructor(
    @Inject(BLOCO_REPOSITORY_PORT)
    private readonly repository: IBlocoRepositoryPort,
    @Inject(AUTHORIZATION_SERVICE_PORT)
    private readonly authorizationService: IAuthorizationServicePort,
  ) {}

  async execute({ accessContext, dto }: IBlocoUpdateCommand): Promise<BlocoFindOneOutputDto> {
    const current = await this.repository.findById(accessContext, { id: dto.id });

    if (!current) {
      throw new ResourceNotFoundError("Bloco", dto.id);
    }

    await this.authorizationService.ensurePermission("bloco:update", { dto }, dto.id);

    const domain = Bloco.fromData(current);
    domain.atualizar({ nome: dto.nome, codigo: dto.codigo });
    await this.repository.updateFromDomain(current.id, {
      nome: domain.nome,
      codigo: domain.codigo,
    });

    const result = await this.repository.findById(accessContext, { id: dto.id });

    if (!result) {
      throw new ResourceNotFoundError("Bloco", dto.id);
    }

    return result;
  }
}

import { Inject, Injectable } from "@nestjs/common";
import {
  AUTHORIZATION_SERVICE_PORT,
  type IAuthorizationServicePort,
  ResourceNotFoundError,
} from "@/modules/@shared";
import {
  type INivelFormacaoUpdateCommand,
  INivelFormacaoUpdateCommandHandler,
} from "@/modules/ensino/nivel-formacao/domain/commands/nivel-formacao-update.command.handler.interface";
import { NivelFormacao } from "@/modules/ensino/nivel-formacao/domain/nivel-formacao.domain";
import type { NivelFormacaoFindOneOutputDto } from "../../dtos";
import { type INivelFormacaoRepositoryPort, NIVEL_FORMACAO_REPOSITORY_PORT } from "../../ports";

@Injectable()
export class NivelFormacaoUpdateCommandHandlerImpl implements INivelFormacaoUpdateCommandHandler {
  constructor(
    @Inject(NIVEL_FORMACAO_REPOSITORY_PORT)
    private readonly repository: INivelFormacaoRepositoryPort,
    @Inject(AUTHORIZATION_SERVICE_PORT)
    private readonly authorizationService: IAuthorizationServicePort,
  ) {}

  async execute({
    accessContext,
    dto,
  }: INivelFormacaoUpdateCommand): Promise<NivelFormacaoFindOneOutputDto> {
    const current = await this.repository.findById(accessContext, { id: dto.id });

    if (!current) {
      throw new ResourceNotFoundError("NivelFormacao", dto.id);
    }

    await this.authorizationService.ensurePermission("nivel_formacao:update", { dto }, dto.id);

    const domain = NivelFormacao.fromData(current);
    domain.atualizar({ slug: dto.slug });
    await this.repository.updateFromDomain(current.id, { slug: domain.slug });

    const result = await this.repository.findById(accessContext, { id: dto.id });

    if (!result) {
      throw new ResourceNotFoundError("NivelFormacao", dto.id);
    }

    return result;
  }
}

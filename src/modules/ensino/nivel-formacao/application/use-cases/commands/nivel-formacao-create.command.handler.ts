import { Inject, Injectable } from "@nestjs/common";
import {
  AUTHORIZATION_SERVICE_PORT,
  type IAuthorizationServicePort,
  ResourceNotFoundError,
} from "@/modules/@shared";
import {
  type INivelFormacaoCreateCommand,
  INivelFormacaoCreateCommandHandler,
} from "@/modules/ensino/nivel-formacao/domain/commands/nivel-formacao-create.command.handler.interface";
import { NivelFormacao } from "@/modules/ensino/nivel-formacao/domain/nivel-formacao.domain";
import {
  type INivelFormacaoRepositoryPort,
  NIVEL_FORMACAO_REPOSITORY_PORT,
} from "../../../domain/repositories";
import type { NivelFormacaoFindOneOutputDto } from "../../dtos";

@Injectable()
export class NivelFormacaoCreateCommandHandlerImpl implements INivelFormacaoCreateCommandHandler {
  constructor(
    @Inject(NIVEL_FORMACAO_REPOSITORY_PORT)
    private readonly repository: INivelFormacaoRepositoryPort,
    @Inject(AUTHORIZATION_SERVICE_PORT)
    private readonly authorizationService: IAuthorizationServicePort,
  ) {}

  async execute({
    accessContext,
    dto,
  }: INivelFormacaoCreateCommand): Promise<NivelFormacaoFindOneOutputDto> {
    await this.authorizationService.ensurePermission("nivel_formacao:create", { dto });

    const domain = NivelFormacao.criar({ slug: dto.slug });
    const { id } = await this.repository.createFromDomain({ ...domain });

    const result = await this.repository.findById(accessContext, { id });

    if (!result) {
      throw new ResourceNotFoundError("NivelFormacao", id);
    }

    return result;
  }
}

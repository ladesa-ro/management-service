import { Inject, Injectable } from "@nestjs/common";
import {
  AUTHORIZATION_SERVICE_PORT,
  type IAuthorizationServicePort,
  ResourceNotFoundError,
} from "@/modules/@shared";
import {
  type IOfertaFormacaoNivelFormacaoDeleteCommand,
  IOfertaFormacaoNivelFormacaoDeleteCommandHandler,
} from "@/modules/ensino/oferta-formacao-nivel-formacao/domain/commands/oferta-formacao-nivel-formacao-delete.command.handler.interface";
import {
  type IOfertaFormacaoNivelFormacaoRepositoryPort,
  OFERTA_FORMACAO_NIVEL_FORMACAO_REPOSITORY_PORT,
} from "../../../domain/repositories";

@Injectable()
export class OfertaFormacaoNivelFormacaoDeleteCommandHandlerImpl
  implements IOfertaFormacaoNivelFormacaoDeleteCommandHandler
{
  constructor(
    @Inject(OFERTA_FORMACAO_NIVEL_FORMACAO_REPOSITORY_PORT)
    private readonly repository: IOfertaFormacaoNivelFormacaoRepositoryPort,
    @Inject(AUTHORIZATION_SERVICE_PORT)
    private readonly authorizationService: IAuthorizationServicePort,
  ) {}

  async execute({
    accessContext,
    dto,
  }: IOfertaFormacaoNivelFormacaoDeleteCommand): Promise<boolean> {
    await this.authorizationService.ensurePermission(
      "oferta_formacao_nivel_formacao:delete",
      { dto },
      dto.id,
    );

    const entity = await this.repository.findById(accessContext, dto);

    if (!entity) {
      throw new ResourceNotFoundError("OfertaFormacaoNivelFormacao", dto.id);
    }

    await this.repository.softDeleteById(entity.id);

    return true;
  }
}

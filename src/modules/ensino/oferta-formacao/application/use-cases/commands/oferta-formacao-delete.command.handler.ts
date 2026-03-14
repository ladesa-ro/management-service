import { Inject, Injectable } from "@nestjs/common";
import {
  AUTHORIZATION_SERVICE_PORT,
  type IAuthorizationServicePort,
  ResourceNotFoundError,
} from "@/modules/@shared";
import {
  type IOfertaFormacaoDeleteCommand,
  IOfertaFormacaoDeleteCommandHandler,
} from "@/modules/ensino/oferta-formacao/domain/commands/oferta-formacao-delete.command.handler.interface";
import {
  type IOfertaFormacaoRepositoryPort,
  OFERTA_FORMACAO_REPOSITORY_PORT,
} from "../../../domain/repositories";

@Injectable()
export class OfertaFormacaoDeleteCommandHandlerImpl implements IOfertaFormacaoDeleteCommandHandler {
  constructor(
    @Inject(OFERTA_FORMACAO_REPOSITORY_PORT)
    private readonly repository: IOfertaFormacaoRepositoryPort,
    @Inject(AUTHORIZATION_SERVICE_PORT)
    private readonly authorizationService: IAuthorizationServicePort,
  ) {}

  async execute({ accessContext, dto }: IOfertaFormacaoDeleteCommand): Promise<boolean> {
    await this.authorizationService.ensurePermission("oferta_formacao:delete", { dto }, dto.id);

    const entity = await this.repository.findById(accessContext, dto);

    if (!entity) {
      throw new ResourceNotFoundError("OfertaFormacao", dto.id);
    }

    await this.repository.softDeleteById(entity.id);

    return true;
  }
}

import { Inject, Injectable } from "@nestjs/common";
import { ensureExists, IAuthorizationService } from "@/modules/@shared";
import {
  type IOfertaFormacaoNivelFormacaoDeleteCommand,
  IOfertaFormacaoNivelFormacaoDeleteCommandHandler,
} from "@/modules/ensino/oferta-formacao-nivel-formacao/domain/commands/oferta-formacao-nivel-formacao-delete.command.handler.interface";
import { OfertaFormacaoNivelFormacao } from "@/modules/ensino/oferta-formacao-nivel-formacao/domain/oferta-formacao-nivel-formacao.domain";
import { IOfertaFormacaoNivelFormacaoRepository } from "../../domain/repositories";

@Injectable()
export class OfertaFormacaoNivelFormacaoDeleteCommandHandlerImpl
  implements IOfertaFormacaoNivelFormacaoDeleteCommandHandler
{
  constructor(
    @Inject(IOfertaFormacaoNivelFormacaoRepository)
    private readonly repository: IOfertaFormacaoNivelFormacaoRepository,
    @Inject(IAuthorizationService)
    private readonly authorizationService: IAuthorizationService,
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

    ensureExists(entity, OfertaFormacaoNivelFormacao.entityName, dto.id);

    await this.repository.softDeleteById(entity.id);

    return true;
  }
}

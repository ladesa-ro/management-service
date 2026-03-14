import { Inject, Injectable } from "@nestjs/common";
import { ensureExists, IAuthorizationService } from "@/modules/@shared";
import {
  type IOfertaFormacaoDeleteCommand,
  IOfertaFormacaoDeleteCommandHandler,
} from "@/modules/ensino/oferta-formacao/domain/commands/oferta-formacao-delete.command.handler.interface";
import { IOfertaFormacaoRepository } from "../../../domain/repositories";

@Injectable()
export class OfertaFormacaoDeleteCommandHandlerImpl implements IOfertaFormacaoDeleteCommandHandler {
  constructor(
    @Inject(IOfertaFormacaoRepository)
    private readonly repository: IOfertaFormacaoRepository,
    @Inject(IAuthorizationService)
    private readonly authorizationService: IAuthorizationService,
  ) {}

  async execute({ accessContext, dto }: IOfertaFormacaoDeleteCommand): Promise<boolean> {
    await this.authorizationService.ensurePermission("oferta_formacao:delete", { dto }, dto.id);

    const entity = await this.repository.findById(accessContext, dto);

    ensureExists(entity, "OfertaFormacao", dto.id);

    await this.repository.softDeleteById(entity.id);

    return true;
  }
}

import { Inject, Injectable } from "@nestjs/common";
import { ensureExists } from "@/modules/@shared";
import {
  type IOfertaFormacaoNivelFormacaoDeleteCommand,
  IOfertaFormacaoNivelFormacaoDeleteCommandHandler,
} from "@/modules/ensino/oferta-formacao-nivel-formacao/domain/commands/oferta-formacao-nivel-formacao-delete.command.handler.interface";
import { OfertaFormacaoNivelFormacao } from "@/modules/ensino/oferta-formacao-nivel-formacao/domain/oferta-formacao-nivel-formacao.domain";
import { IOfertaFormacaoNivelFormacaoPermissionChecker } from "../../domain/authorization";
import { IOfertaFormacaoNivelFormacaoRepository } from "../../domain/repositories";

@Injectable()
export class OfertaFormacaoNivelFormacaoDeleteCommandHandlerImpl
  implements IOfertaFormacaoNivelFormacaoDeleteCommandHandler
{
  constructor(
    @Inject(IOfertaFormacaoNivelFormacaoRepository)
    private readonly repository: IOfertaFormacaoNivelFormacaoRepository,
    @Inject(IOfertaFormacaoNivelFormacaoPermissionChecker)
    private readonly permissionChecker: IOfertaFormacaoNivelFormacaoPermissionChecker,
  ) {}

  async execute({
    accessContext,
    dto,
  }: IOfertaFormacaoNivelFormacaoDeleteCommand): Promise<boolean> {
    await this.permissionChecker.ensureCanDelete(accessContext, { dto }, dto.id);

    const entity = await this.repository.findById(accessContext, dto);

    ensureExists(entity, OfertaFormacaoNivelFormacao.entityName, dto.id);

    await this.repository.softDeleteById(entity.id);

    return true;
  }
}

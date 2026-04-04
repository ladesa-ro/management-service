import { ensureExists } from "@/application/errors";
import { saveEntityImagemField } from "@/application/helpers";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import {
  IImagemSaveImagemCapaCommandHandler,
  type IImagemSaveImagemCapaCommandHandler as IImagemSaveImagemCapaCommandHandlerType,
} from "@/modules/armazenamento/imagem/domain/commands";
import {
  IOfertaFormacaoUpdateImagemCapaCommandHandler,
  type OfertaFormacaoUpdateImagemCapaCommand,
} from "@/modules/ensino/oferta-formacao/domain/commands/oferta-formacao-update-imagem-capa.command.handler.interface";
import { OfertaFormacao } from "@/modules/ensino/oferta-formacao/domain/oferta-formacao";
import { IOfertaFormacaoPermissionChecker } from "../../domain/authorization";
import { IOfertaFormacaoRepository } from "../../domain/repositories";

@Impl()
export class OfertaFormacaoUpdateImagemCapaCommandHandlerImpl
  implements IOfertaFormacaoUpdateImagemCapaCommandHandler
{
  constructor(
    @Dep(IOfertaFormacaoRepository)
    private readonly repository: IOfertaFormacaoRepository,
    @Dep(IOfertaFormacaoPermissionChecker)
    private readonly permissionChecker: IOfertaFormacaoPermissionChecker,
    @Dep(IImagemSaveImagemCapaCommandHandler)
    private readonly saveImagemCapaHandler: IImagemSaveImagemCapaCommandHandlerType,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    { dto, file }: OfertaFormacaoUpdateImagemCapaCommand,
  ): Promise<boolean> {
    const current = await this.repository.getFindOneQueryResult(accessContext, dto);

    ensureExists(current, OfertaFormacao.entityName, dto.id);

    await this.permissionChecker.ensureCanUpdate(
      accessContext,
      { dto: { id: current.id } },
      current.id,
    );

    return saveEntityImagemField(
      current.id,
      file,
      "imagemCapa",
      this.saveImagemCapaHandler,
      this.repository,
    );
  }
}

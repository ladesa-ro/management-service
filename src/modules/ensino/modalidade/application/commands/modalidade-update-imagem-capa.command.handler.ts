import { ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import {
  IImagemSaveImagemCapaCommandHandler,
  type IImagemSaveImagemCapaCommandHandler as IImagemSaveImagemCapaCommandHandlerType,
} from "@/modules/armazenamento/imagem/domain/commands";
import {
  IModalidadeUpdateImagemCapaCommandHandler,
  type ModalidadeUpdateImagemCapaCommand,
} from "@/modules/ensino/modalidade/domain/commands/modalidade-update-imagem-capa.command.handler.interface";
import { Modalidade } from "@/modules/ensino/modalidade/domain/modalidade";
import { IModalidadePermissionChecker } from "../../domain/authorization";
import { IModalidadeRepository } from "../../domain/repositories";

@Impl()
export class ModalidadeUpdateImagemCapaCommandHandlerImpl
  implements IModalidadeUpdateImagemCapaCommandHandler
{
  constructor(
    @Dep(IModalidadeRepository)
    private readonly repository: IModalidadeRepository,
    @Dep(IModalidadePermissionChecker)
    private readonly permissionChecker: IModalidadePermissionChecker,
    @Dep(IImagemSaveImagemCapaCommandHandler)
    private readonly saveImagemCapaHandler: IImagemSaveImagemCapaCommandHandlerType,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    { dto, file }: ModalidadeUpdateImagemCapaCommand,
  ): Promise<boolean> {
    const domain = await this.repository.loadById(accessContext, dto.id);
    ensureExists(domain, Modalidade.entityName, dto.id);

    await this.permissionChecker.ensureCanUpdate(
      accessContext,
      { dto: { id: domain.id } },
      domain.id,
    );

    const { imagem } = await this.saveImagemCapaHandler.execute(null, { file });
    domain.imagemCapa = { id: imagem.id };

    await this.repository.save(domain);

    return true;
  }
}

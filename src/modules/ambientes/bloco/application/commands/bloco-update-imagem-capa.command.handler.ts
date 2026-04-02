import { ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { Bloco } from "@/modules/ambientes/bloco/domain/bloco";
import {
  type BlocoUpdateImagemCapaCommand,
  IBlocoUpdateImagemCapaCommandHandler,
} from "@/modules/ambientes/bloco/domain/commands/bloco-update-imagem-capa.command.handler.interface";
import {
  IImagemSaveImagemCapaCommandHandler,
  type IImagemSaveImagemCapaCommandHandler as IImagemSaveImagemCapaCommandHandlerType,
} from "@/modules/armazenamento/imagem/domain/commands";
import { IBlocoPermissionChecker } from "../../domain/authorization";
import { IBlocoRepository } from "../../domain/repositories";

@Impl()
export class BlocoUpdateImagemCapaCommandHandlerImpl
  implements IBlocoUpdateImagemCapaCommandHandler
{
  constructor(
    @Dep(IBlocoRepository)
    private readonly repository: IBlocoRepository,
    @Dep(IBlocoPermissionChecker)
    private readonly permissionChecker: IBlocoPermissionChecker,
    @Dep(IImagemSaveImagemCapaCommandHandler)
    private readonly saveImagemCapaHandler: IImagemSaveImagemCapaCommandHandlerType,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    { dto, file }: BlocoUpdateImagemCapaCommand,
  ): Promise<boolean> {
    const domain = await this.repository.loadById(accessContext, dto.id);
    ensureExists(domain, Bloco.entityName, dto.id);

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

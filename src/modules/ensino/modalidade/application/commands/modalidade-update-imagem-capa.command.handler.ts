import { ensureExists } from "@/application/errors";
import { saveEntityImagemField } from "@/application/helpers";
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
    const current = await this.repository.loadById(accessContext, dto.id);
    ensureExists(current, Modalidade.entityName, dto.id);

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

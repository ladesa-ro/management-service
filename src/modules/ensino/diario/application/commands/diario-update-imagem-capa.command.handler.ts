import { ensureExists } from "@/application/errors";
import { saveEntityImagemField } from "@/application/helpers";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import {
  IImagemSaveImagemCapaCommandHandler,
  type IImagemSaveImagemCapaCommandHandler as IImagemSaveImagemCapaCommandHandlerType,
} from "@/modules/armazenamento/imagem/domain/commands";
import {
  type DiarioUpdateImagemCapaCommand,
  IDiarioUpdateImagemCapaCommandHandler,
} from "@/modules/ensino/diario/domain/commands/diario-update-imagem-capa.command.handler.interface";
import { Diario } from "@/modules/ensino/diario/domain/diario";
import { IDiarioPermissionChecker } from "../../domain/authorization";
import { IDiarioRepository } from "../../domain/repositories";

@Impl()
export class DiarioUpdateImagemCapaCommandHandlerImpl
  implements IDiarioUpdateImagemCapaCommandHandler
{
  constructor(
    @Dep(IDiarioRepository)
    private readonly repository: IDiarioRepository,
    @Dep(IDiarioPermissionChecker)
    private readonly permissionChecker: IDiarioPermissionChecker,
    @Dep(IImagemSaveImagemCapaCommandHandler)
    private readonly saveImagemCapaHandler: IImagemSaveImagemCapaCommandHandlerType,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    { dto, file }: DiarioUpdateImagemCapaCommand,
  ): Promise<boolean> {
    const aggregate = await this.repository.loadById(accessContext, dto.id);

    ensureExists(aggregate, Diario.entityName, dto.id);

    await this.permissionChecker.ensureCanUpdate(
      accessContext,
      { dto: { id: aggregate.id } },
      aggregate.id,
    );

    return saveEntityImagemField(
      aggregate.id,
      file,
      "imagemCapa",
      this.saveImagemCapaHandler,
      this.repository,
    );
  }
}

import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { ensureExists, saveEntityImagemField } from "@/modules/@shared";
import { Bloco } from "@/modules/ambientes/bloco/domain/bloco.domain";
import {
  type IBlocoUpdateImagemCapaCommand,
  IBlocoUpdateImagemCapaCommandHandler,
} from "@/modules/ambientes/bloco/domain/commands/bloco-update-imagem-capa.command.handler.interface";
import {
  IImagemSaveImagemCapaCommandHandler,
  type IImagemSaveImagemCapaCommandHandler as IImagemSaveImagemCapaCommandHandlerType,
} from "@/modules/armazenamento/imagem/domain/commands";
import { IBlocoPermissionChecker } from "../../domain/authorization";
import { IBlocoRepository } from "../../domain/repositories";

@DeclareImplementation()
export class BlocoUpdateImagemCapaCommandHandlerImpl
  implements IBlocoUpdateImagemCapaCommandHandler
{
  constructor(
    @DeclareDependency(IBlocoRepository)
    private readonly repository: IBlocoRepository,
    @DeclareDependency(IBlocoPermissionChecker)
    private readonly permissionChecker: IBlocoPermissionChecker,
    @DeclareDependency(IImagemSaveImagemCapaCommandHandler)
    private readonly saveImagemCapaHandler: IImagemSaveImagemCapaCommandHandlerType,
  ) {}

  async execute({ accessContext, dto, file }: IBlocoUpdateImagemCapaCommand): Promise<boolean> {
    const current = await this.repository.findById(accessContext, dto);

    ensureExists(current, Bloco.entityName, dto.id);

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

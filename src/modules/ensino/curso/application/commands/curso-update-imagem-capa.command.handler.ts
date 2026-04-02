import { ensureExists } from "@/application/errors";
import { saveEntityImagemField } from "@/application/helpers";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import {
  IImagemSaveImagemCapaCommandHandler,
  type IImagemSaveImagemCapaCommandHandler as IImagemSaveImagemCapaCommandHandlerType,
} from "@/modules/armazenamento/imagem/domain/commands";
import {
  type CursoUpdateImagemCapaCommand,
  ICursoUpdateImagemCapaCommandHandler,
} from "@/modules/ensino/curso/domain/commands/curso-update-imagem-capa.command.handler.interface";
import { Curso } from "@/modules/ensino/curso/domain/curso";
import { ICursoPermissionChecker } from "../../domain/authorization";
import { ICursoRepository } from "../../domain/repositories";

@Impl()
export class CursoUpdateImagemCapaCommandHandlerImpl
  implements ICursoUpdateImagemCapaCommandHandler
{
  constructor(
    @Dep(ICursoRepository)
    private readonly repository: ICursoRepository,
    @Dep(ICursoPermissionChecker)
    private readonly permissionChecker: ICursoPermissionChecker,
    @Dep(IImagemSaveImagemCapaCommandHandler)
    private readonly saveImagemCapaHandler: IImagemSaveImagemCapaCommandHandlerType,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    { dto, file }: CursoUpdateImagemCapaCommand,
  ): Promise<boolean> {
    const current = await this.repository.getFindOneQueryResult(accessContext, dto);

    ensureExists(current, Curso.entityName, dto.id);

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

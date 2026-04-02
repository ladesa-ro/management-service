import { ensureExists } from "@/application/errors";
import { saveEntityImagemField } from "@/application/helpers";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import {
  IUsuarioUpdateImagemCapaCommandHandler,
  type UsuarioUpdateImagemCapaCommand,
} from "@/modules/acesso/usuario/domain/commands/usuario-update-imagem-capa.command.handler.interface";
import { Usuario } from "@/modules/acesso/usuario/domain/usuario";
import {
  IImagemSaveImagemCapaCommandHandler,
  type IImagemSaveImagemCapaCommandHandler as IImagemSaveImagemCapaCommandHandlerType,
} from "@/modules/armazenamento/imagem/domain/commands";
import { IUsuarioPermissionChecker } from "../../domain/authorization";
import { IUsuarioRepository } from "../../domain/repositories";

@Impl()
export class UsuarioUpdateImagemCapaCommandHandlerImpl
  implements IUsuarioUpdateImagemCapaCommandHandler
{
  constructor(
    @Dep(IUsuarioRepository)
    private readonly repository: IUsuarioRepository,
    @Dep(IImagemSaveImagemCapaCommandHandler)
    private readonly saveImagemCapaHandler: IImagemSaveImagemCapaCommandHandlerType,
    @Dep(IUsuarioPermissionChecker)
    private readonly permissionChecker: IUsuarioPermissionChecker,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    { dto, file }: UsuarioUpdateImagemCapaCommand,
  ): Promise<boolean> {
    const currentUsuario = await this.repository.getFindOneQueryResult(accessContext, {
      id: dto.id,
    });

    ensureExists(currentUsuario, Usuario.entityName, dto.id);

    await this.permissionChecker.ensureCanUpdate(
      accessContext,
      { dto: { id: currentUsuario.id } },
      currentUsuario.id,
    );

    return saveEntityImagemField(
      currentUsuario.id,
      file,
      "imagemCapa",
      this.saveImagemCapaHandler,
      this.repository,
    );
  }
}

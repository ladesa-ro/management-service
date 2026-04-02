import { ensureExists } from "@/application/errors";
import { saveEntityImagemField } from "@/application/helpers";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import {
  IUsuarioUpdateImagemPerfilCommandHandler,
  type UsuarioUpdateImagemPerfilCommand,
} from "@/modules/acesso/usuario/domain/commands/usuario-update-imagem-perfil.command.handler.interface";
import { Usuario } from "@/modules/acesso/usuario/domain/usuario";
import {
  IImagemSaveImagemCapaCommandHandler,
  type IImagemSaveImagemCapaCommandHandler as IImagemSaveImagemCapaCommandHandlerType,
} from "@/modules/armazenamento/imagem/domain/commands";
import { IUsuarioPermissionChecker } from "../../domain/authorization";
import { IUsuarioRepository } from "../../domain/repositories";

@Impl()
export class UsuarioUpdateImagemPerfilCommandHandlerImpl
  implements IUsuarioUpdateImagemPerfilCommandHandler
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
    { dto, file }: UsuarioUpdateImagemPerfilCommand,
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
      "imagemPerfil",
      this.saveImagemCapaHandler,
      this.repository,
    );
  }
}

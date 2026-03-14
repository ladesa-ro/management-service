import { Inject, Injectable } from "@nestjs/common";
import { ensureExists, saveEntityImagemField } from "@/modules/@shared";
import {
  type IUsuarioUpdateImagemPerfilCommand,
  IUsuarioUpdateImagemPerfilCommandHandler,
} from "@/modules/acesso/usuario/domain/commands/usuario-update-imagem-perfil.command.handler.interface";
import { Usuario } from "@/modules/acesso/usuario/domain/usuario.domain";
import {
  IImagemSaveImagemCapaCommandHandler,
  type IImagemSaveImagemCapaCommandHandler as IImagemSaveImagemCapaCommandHandlerType,
} from "@/modules/armazenamento/imagem/domain/commands";
import { IUsuarioPermissionChecker } from "../../domain/authorization";
import { IUsuarioRepository } from "../../domain/repositories";

@Injectable()
export class UsuarioUpdateImagemPerfilCommandHandlerImpl
  implements IUsuarioUpdateImagemPerfilCommandHandler
{
  constructor(
    @Inject(IUsuarioRepository)
    private readonly repository: IUsuarioRepository,
    @Inject(IImagemSaveImagemCapaCommandHandler)
    private readonly saveImagemCapaHandler: IImagemSaveImagemCapaCommandHandlerType,
    @Inject(IUsuarioPermissionChecker)
    private readonly permissionChecker: IUsuarioPermissionChecker,
  ) {}

  async execute({ accessContext, dto, file }: IUsuarioUpdateImagemPerfilCommand): Promise<boolean> {
    const currentUsuario = await this.repository.findById(accessContext, { id: dto.id });

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

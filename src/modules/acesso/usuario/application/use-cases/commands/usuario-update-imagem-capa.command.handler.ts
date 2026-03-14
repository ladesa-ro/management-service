import { Inject, Injectable } from "@nestjs/common";
import { ensureExists, saveEntityImagemField } from "@/modules/@shared";
import {
  type IUsuarioUpdateImagemCapaCommand,
  IUsuarioUpdateImagemCapaCommandHandler,
} from "@/modules/acesso/usuario/domain/commands/usuario-update-imagem-capa.command.handler.interface";
import {
  IImagemSaveImagemCapaCommandHandler,
  type IImagemSaveImagemCapaCommandHandler as IImagemSaveImagemCapaCommandHandlerType,
} from "@/modules/armazenamento/imagem/domain/commands";
import { IUsuarioRepository } from "../../../domain/repositories";

@Injectable()
export class UsuarioUpdateImagemCapaCommandHandlerImpl
  implements IUsuarioUpdateImagemCapaCommandHandler
{
  constructor(
    @Inject(IUsuarioRepository)
    private readonly repository: IUsuarioRepository,
    @Inject(IImagemSaveImagemCapaCommandHandler)
    private readonly saveImagemCapaHandler: IImagemSaveImagemCapaCommandHandlerType,
  ) {}

  async execute({ accessContext, dto, file }: IUsuarioUpdateImagemCapaCommand): Promise<boolean> {
    const currentUsuario = await this.repository.findById(accessContext, { id: dto.id });

    ensureExists(currentUsuario, "Usuario", dto.id);

    await accessContext.ensurePermission(
      "usuario:update",
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

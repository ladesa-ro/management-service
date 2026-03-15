import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import { ensureExists, saveEntityImagemField } from "@/modules/@shared";
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

@DeclareImplementation()
export class UsuarioUpdateImagemCapaCommandHandlerImpl
  implements IUsuarioUpdateImagemCapaCommandHandler
{
  constructor(
    @DeclareDependency(IUsuarioRepository)
    private readonly repository: IUsuarioRepository,
    @DeclareDependency(IImagemSaveImagemCapaCommandHandler)
    private readonly saveImagemCapaHandler: IImagemSaveImagemCapaCommandHandlerType,
    @DeclareDependency(IUsuarioPermissionChecker)
    private readonly permissionChecker: IUsuarioPermissionChecker,
  ) {}

  async execute(
    accessContext: AccessContext | null,
    { dto, file }: UsuarioUpdateImagemCapaCommand,
  ): Promise<boolean> {
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
      "imagemCapa",
      this.saveImagemCapaHandler,
      this.repository,
    );
  }
}

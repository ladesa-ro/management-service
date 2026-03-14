import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { ensureExists } from "@/modules/@shared";
import {
  type IUsuarioDeleteCommand,
  IUsuarioDeleteCommandHandler,
} from "@/modules/acesso/usuario/domain/commands/usuario-delete.command.handler.interface";
import { Usuario } from "@/modules/acesso/usuario/domain/usuario.domain";
import { IUsuarioPermissionChecker } from "../../domain/authorization";
import { IUsuarioRepository } from "../../domain/repositories";

@DeclareImplementation()
export class UsuarioDeleteCommandHandlerImpl implements IUsuarioDeleteCommandHandler {
  constructor(
    @DeclareDependency(IUsuarioRepository)
    private readonly repository: IUsuarioRepository,
    @DeclareDependency(IUsuarioPermissionChecker)
    private readonly permissionChecker: IUsuarioPermissionChecker,
  ) {}

  async execute({ accessContext, dto }: IUsuarioDeleteCommand): Promise<boolean> {
    await this.permissionChecker.ensureCanDelete(accessContext, { dto }, dto.id);

    const usuario = await this.repository.findById(accessContext, dto);

    ensureExists(usuario, Usuario.entityName, dto.id);

    await this.repository.softDeleteById(usuario.id);

    return true;
  }
}

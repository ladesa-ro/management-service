import { ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { IUsuarioDeleteCommandHandler } from "@/modules/acesso/usuario/domain/commands/usuario-delete.command.handler.interface";
import type { UsuarioFindOneQuery } from "@/modules/acesso/usuario/domain/queries";
import { Usuario } from "@/modules/acesso/usuario/domain/usuario";
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

  async execute(accessContext: IAccessContext | null, dto: UsuarioFindOneQuery): Promise<boolean> {
    await this.permissionChecker.ensureCanDelete(accessContext, { dto }, dto.id);

    const usuario = await this.repository.findById(accessContext, dto);

    ensureExists(usuario, Usuario.entityName, dto.id);

    await this.repository.softDeleteById(usuario.id);

    return true;
  }
}

import { ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { IUsuarioDeleteCommandHandler } from "@/modules/acesso/usuario/domain/commands/usuario-delete.command.handler.interface";
import type { UsuarioFindOneQuery } from "@/modules/acesso/usuario/domain/queries";
import { Usuario } from "@/modules/acesso/usuario/domain/usuario";
import { IUsuarioPermissionChecker } from "../../domain/authorization";
import { IUsuarioRepository } from "../../domain/repositories";

@Impl()
export class UsuarioDeleteCommandHandlerImpl implements IUsuarioDeleteCommandHandler {
  constructor(
    @Dep(IUsuarioRepository)
    private readonly repository: IUsuarioRepository,
    @Dep(IUsuarioPermissionChecker)
    private readonly permissionChecker: IUsuarioPermissionChecker,
  ) {}

  async execute(accessContext: IAccessContext | null, dto: UsuarioFindOneQuery): Promise<boolean> {
    await this.permissionChecker.ensureCanDelete(accessContext, { dto }, dto.id);

    const usuario = await this.repository.getFindOneQueryResult(accessContext, dto);

    ensureExists(usuario, Usuario.entityName, dto.id);

    await this.repository.softDeleteById(usuario.id);

    return true;
  }
}

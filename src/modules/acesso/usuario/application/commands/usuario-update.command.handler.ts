import { has } from "lodash";
import { ensureExists, ServiceUnavailableError } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { IIdpUserService } from "@/domain/abstractions/identity-provider";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import type { UsuarioUpdateCommand } from "@/modules/acesso/usuario/domain/commands/usuario-update.command";
import { IUsuarioUpdateCommandHandler } from "@/modules/acesso/usuario/domain/commands/usuario-update.command.handler.interface";
import type { UsuarioFindOneQuery } from "@/modules/acesso/usuario/domain/queries";
import { Usuario } from "@/modules/acesso/usuario/domain/usuario";
import { IPerfilDefinirPerfisAtivosCommandHandler } from "@/modules/acesso/usuario/perfil/domain/commands/perfil-definir-perfis-ativos.command.handler.interface";
import { IUsuarioPermissionChecker } from "../../domain/authorization";
import type { UsuarioFindOneQueryResult } from "../../domain/queries";
import { IUsuarioRepository } from "../../domain/repositories";
import { IUsuarioAvailabilityChecker } from "../../domain/services";

@DeclareImplementation()
export class UsuarioUpdateCommandHandlerImpl implements IUsuarioUpdateCommandHandler {
  constructor(
    @DeclareDependency(IUsuarioRepository)
    private readonly repository: IUsuarioRepository,
    @DeclareDependency(IIdpUserService)
    private readonly idpUserService: IIdpUserService,
    @DeclareDependency(IUsuarioPermissionChecker)
    private readonly permissionChecker: IUsuarioPermissionChecker,
    @DeclareDependency(IPerfilDefinirPerfisAtivosCommandHandler)
    private readonly definirPerfisAtivosHandler: IPerfilDefinirPerfisAtivosCommandHandler,
    @DeclareDependency(IUsuarioAvailabilityChecker)
    private readonly availabilityChecker: IUsuarioAvailabilityChecker,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: UsuarioFindOneQuery & UsuarioUpdateCommand,
  ): Promise<UsuarioFindOneQueryResult> {
    const currentUsuario = await this.repository.findById(accessContext, dto);

    ensureExists(currentUsuario, Usuario.entityName, dto.id);

    const currentMatricula =
      currentUsuario.matricula ?? (await this.repository.resolveMatricula(currentUsuario.id));

    if (!currentMatricula) {
      throw new ServiceUnavailableError();
    }

    const exists = await this.idpUserService.existsByMatricula(currentMatricula);

    if (!exists) {
      throw new ServiceUnavailableError();
    }

    await this.permissionChecker.ensureCanUpdate(accessContext, { dto }, dto.id);

    const input = {
      nome: dto.nome,
      matricula: dto.matricula,
      email: dto.email,
    };

    await this.availabilityChecker.ensureAvailable(input, dto.id);

    const domain = Usuario.load(currentUsuario);
    domain.update(input);

    await this.repository.update(currentUsuario.id, domain);

    const changedEmail = has(dto, "email");
    const changedMatricula = has(dto, "matricula");

    if (changedEmail || changedMatricula) {
      await this.idpUserService.syncUser(currentMatricula, {
        matricula: domain.matricula,
        email: domain.email,
      });
    }

    if (dto.vinculos !== undefined) {
      await this.definirPerfisAtivosHandler.execute(accessContext, {
        vinculos: dto.vinculos,
        usuario: { id: currentUsuario.id },
      });
    }

    const result = await this.repository.findById(accessContext, { id: currentUsuario.id });

    ensureExists(result, Usuario.entityName, currentUsuario.id);

    return result;
  }
}

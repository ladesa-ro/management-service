import { ApplicationError, ensureExists, InternalError } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { IIdpUserService } from "@/domain/abstractions/identity-provider";
import { Dep, Impl } from "@/domain/dependency-injection";
import type { UsuarioCreateCommand } from "@/modules/acesso/usuario/domain/commands/usuario-create.command";
import { IUsuarioCreateCommandHandler } from "@/modules/acesso/usuario/domain/commands/usuario-create.command.handler.interface";
import { Usuario } from "@/modules/acesso/usuario/domain/usuario";
import { IPerfilDefinirPerfisAtivosCommandHandler } from "@/modules/acesso/usuario/perfil/domain/commands/perfil-definir-perfis-ativos.command.handler.interface";
import { IUsuarioPermissionChecker } from "../../domain/authorization";
import type { UsuarioFindOneQueryResult } from "../../domain/queries";
import { IUsuarioRepository } from "../../domain/repositories";
import { IUsuarioAvailabilityChecker } from "../../domain/services";

@Impl()
export class UsuarioCreateCommandHandlerImpl implements IUsuarioCreateCommandHandler {
  constructor(
    @Dep(IUsuarioRepository)
    private readonly repository: IUsuarioRepository,
    @Dep(IIdpUserService)
    private readonly idpUserService: IIdpUserService,
    @Dep(IUsuarioPermissionChecker)
    private readonly permissionChecker: IUsuarioPermissionChecker,
    @Dep(IPerfilDefinirPerfisAtivosCommandHandler)
    private readonly definirPerfisAtivosHandler: IPerfilDefinirPerfisAtivosCommandHandler,
    @Dep(IUsuarioAvailabilityChecker)
    private readonly availabilityChecker: IUsuarioAvailabilityChecker,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: UsuarioCreateCommand,
  ): Promise<UsuarioFindOneQueryResult> {
    await this.permissionChecker.ensureCanCreate(accessContext, { dto });

    const input = {
      nome: dto.nome,
      matricula: dto.matricula,
      email: dto.email,
    };

    await this.availabilityChecker.ensureAvailable(input, null);

    try {
      const { id } = await this.repository.create({
        ...input,
        isSuperUser: false,
      });

      await this.idpUserService.provisionUser({
        matricula: input.matricula,
        email: input.email,
      });

      if (dto.vinculos && dto.vinculos.length > 0) {
        await this.definirPerfisAtivosHandler.execute(accessContext, {
          vinculos: dto.vinculos,
          usuario: { id },
        });
      }

      const result = await this.repository.getFindOneQueryResult(accessContext, { id });

      ensureExists(result, Usuario.entityName, id);

      return result;
    } catch (err) {
      if (err instanceof ApplicationError) {
        throw err;
      }
      throw new InternalError("Erro ao cadastrar usuario.", err instanceof Error ? err : undefined);
    }
  }
}

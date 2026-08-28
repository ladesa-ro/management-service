import { ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import type { PerfilUpdateCommand } from "@/modules/acesso/usuario/perfil/domain/commands/perfil-update.command";
import { IPerfilUpdateCommandHandler } from "@/modules/acesso/usuario/perfil/domain/commands/perfil-update.command.handler.interface";
import { Perfil } from "@/modules/acesso/usuario/perfil/domain/perfil";
import type {
  PerfilFindOneQuery,
  PerfilFindOneQueryResult,
} from "@/modules/acesso/usuario/perfil/domain/queries";
import { IPerfilRepository } from "@/modules/acesso/usuario/perfil/domain/repositories";

@Impl()
export class PerfilUpdateCommandHandlerImpl implements IPerfilUpdateCommandHandler {
  constructor(
    @Dep(IPerfilRepository)
    private readonly repository: IPerfilRepository,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: PerfilFindOneQuery & PerfilUpdateCommand,
  ): Promise<PerfilFindOneQueryResult> {
    const existente = await this.repository.getFindOneQueryResult(accessContext, { id: dto.id });
    ensureExists(existente, Perfil.entityName, dto.id);

    const domain = Perfil.load({
      id: existente.id,
      ativo: existente.ativo,
      cargo: existente.cargo?.nome ?? "",
      campus: { id: existente.campus.id },
      usuario: { id: existente.usuario.id },
      cargaMaximaSemanal: existente.cargaMaximaSemanal,
      dateCreated: existente.dateCreated,
      dateUpdated: existente.dateUpdated,
      dateDeleted: existente.dateDeleted,
    });

    domain.update({
      ativo: dto.ativo,
      cargo: dto.cargo,
      cargaMaximaSemanal: dto.cargaMaximaSemanal,
    });

    await this.repository.update(dto.id, {
      ativo: domain.ativo,
      cargo: domain.cargo,
      campus: domain.campus,
      usuario: domain.usuario,
      cargaMaximaSemanal: domain.cargaMaximaSemanal,
      dateUpdated: domain.dateUpdated,
    });

    const result = await this.repository.getFindOneQueryResult(accessContext, { id: dto.id });
    ensureExists(result, Perfil.entityName, dto.id);

    return result;
  }
}

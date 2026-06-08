import { ensureActiveEntity, ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { EstagioNotificacaoPushService } from "@/modules/acesso/notificacao/application/services";
import { IEstagioDeleteCommandHandler } from "@/modules/estagio/estagio/domain/commands/estagio-delete.command.handler.interface";
import { Estagio } from "@/modules/estagio/estagio/domain/estagio";
import type { EstagioFindOneQuery } from "@/modules/estagio/estagio/domain/queries";
import { IEstagioRepository } from "../../domain/repositories";

@Impl()
export class EstagioDeleteCommandHandlerImpl implements IEstagioDeleteCommandHandler {
  constructor(
    @Dep(IEstagioRepository)
    private readonly repository: IEstagioRepository,
    private readonly pushService: EstagioNotificacaoPushService,
  ) {}

  async execute(accessContext: IAccessContext | null, { id }: EstagioFindOneQuery): Promise<void> {
    const domain = await this.repository.loadById(accessContext, id);
    ensureExists(domain, Estagio.entityName, id);
    ensureActiveEntity(domain, Estagio.entityName, id);

    const result = await this.repository
      .getFindOneQueryResult(accessContext, { id })
      .catch(() => null);
    const estagiarioNome = (result as any)?.estagiario?.perfil?.usuario?.nome as string | undefined;

    await this.repository.softDeleteHorariosEstagio(id);
    await this.repository.softDeleteById(id);

    this.pushService.notificarEstagioEncerrado(id, estagiarioNome, "Deletado via sistema");
  }
}

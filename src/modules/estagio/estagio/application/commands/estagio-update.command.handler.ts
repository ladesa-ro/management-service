import { ensureActiveEntity, ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { EstagioNotificacaoPushService } from "@/modules/acesso/notificacao/application/services";
import type { EstagioUpdateCommand } from "@/modules/estagio/estagio/domain/commands/estagio-update.command";
import { IEstagioUpdateCommandHandler } from "@/modules/estagio/estagio/domain/commands/estagio-update.command.handler.interface";
import { Estagio, EstagioStatus } from "@/modules/estagio/estagio/domain/estagio";
import type { EstagioFindOneQuery } from "@/modules/estagio/estagio/domain/queries";
import type { EstagioFindOneQueryResult } from "../../domain/queries";
import { IEstagioRepository } from "../../domain/repositories";

@Impl()
export class EstagioUpdateCommandHandlerImpl implements IEstagioUpdateCommandHandler {
  constructor(
    @Dep(IEstagioRepository)
    private readonly repository: IEstagioRepository,
    private readonly pushService: EstagioNotificacaoPushService,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    command: EstagioFindOneQuery & EstagioUpdateCommand,
  ): Promise<EstagioFindOneQueryResult> {
    const { id, ...dto } = command;

    const domain = await this.repository.loadById(accessContext, id);
    ensureExists(domain, Estagio.entityName, id);
    ensureActiveEntity(domain, Estagio.entityName, id);

    const oldStatus = domain.status;

    const oldFoiOuSeraContratado = domain.foiOuSeraContratado;

    domain.update(dto);

    await this.repository.save(domain);

    const result = await this.repository.getFindOneQueryResult(accessContext, { id });
    ensureExists(result, Estagio.entityName, id);

    const estagiarioNome = (result as any)?.estagiario?.perfil?.usuario?.nome as string | undefined;

    if (oldStatus !== domain.status) {
      switch (domain.status) {
        case EstagioStatus.EM_ANDAMENTO:
          this.pushService.notificarEstagioEmAndamento(id, estagiarioNome);
          break;
        case EstagioStatus.APTO_PARA_ENCERRAMENTO:
          this.pushService.notificarEstagioAptoEncerramento(id, estagiarioNome);
          break;
        case EstagioStatus.ENCERRADO:
          this.pushService.notificarEstagioEncerrado(id, estagiarioNome, domain.encerramentoPor);
          break;
        case EstagioStatus.RESCINDIDO:
          this.pushService.notificarEstagioRescindido(id, estagiarioNome, domain.motivoRescisao);
          break;
        case EstagioStatus.COM_PENDENCIA:
          this.pushService.notificarEstagioComPendencia(
            id,
            domain.resumoPendencias || "Pendências não especificadas",
            estagiarioNome,
          );
          break;
        default:
          this.pushService.notificarStatusAtualizado(id, domain.status, estagiarioNome);
          break;
      }
    }

    if (oldFoiOuSeraContratado !== domain.foiOuSeraContratado && domain.foiOuSeraContratado) {
      this.pushService.notificarEstagiarioContratado(id, estagiarioNome);
    }

    return result;
  }
}

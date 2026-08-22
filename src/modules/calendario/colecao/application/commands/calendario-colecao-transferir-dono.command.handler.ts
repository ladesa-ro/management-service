import { ensureActiveEntity, ensureExists, ForbiddenError } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { IUsuarioFindByIdSimpleQueryHandler, Usuario } from "@/modules/acesso/usuario";
import { CalendarioColecao } from "../../domain/calendario-colecao";
import type { CalendarioColecaoTransferirDonoCommand } from "../../domain/commands/calendario-colecao-transferir-dono.command";
import { ICalendarioColecaoTransferirDonoCommandHandler } from "../../domain/commands/calendario-colecao-transferir-dono.command.handler.interface";
import type { CalendarioColecaoFindOneQuery } from "../../domain/queries/calendario-colecao-find-one.query";
import type { CalendarioColecaoFindOneQueryResult } from "../../domain/queries/calendario-colecao-find-one.query.result";
import { ICalendarioColecaoRepository } from "../../domain/repositories";

@Impl()
export class CalendarioColecaoTransferirDonoCommandHandlerImpl
  implements ICalendarioColecaoTransferirDonoCommandHandler
{
  constructor(
    @Dep(ICalendarioColecaoRepository)
    private readonly repository: ICalendarioColecaoRepository,
    @Dep(IUsuarioFindByIdSimpleQueryHandler)
    private readonly usuarioFindByIdSimpleHandler: IUsuarioFindByIdSimpleQueryHandler,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: CalendarioColecaoFindOneQuery & CalendarioColecaoTransferirDonoCommand,
  ): Promise<CalendarioColecaoFindOneQueryResult> {
    const domain = await this.repository.loadById(accessContext, dto.id);
    ensureExists(domain, CalendarioColecao.entityName, dto.id);
    ensureActiveEntity(domain, CalendarioColecao.entityName, dto.id);

    const requestActorId = accessContext?.requestActor?.id;
    if (!requestActorId || requestActorId !== domain.dono.id) {
      throw new ForbiddenError(
        "Somente o dono atual da coleção pode transferir a titularidade.",
      );
    }

    const novoDono = await this.usuarioFindByIdSimpleHandler.execute(accessContext, {
      id: dto.novoDonoId,
    });
    ensureExists(novoDono, Usuario.entityName, dto.novoDonoId);

    domain.transferirDono({ id: dto.novoDonoId });

    await this.repository.save(domain);

    const result = await this.repository.getFindOneQueryResult(accessContext, { id: domain.id });
    ensureExists(result, CalendarioColecao.entityName, domain.id);

    return result;
  }
}

import { ensureActiveEntity, ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { ICalendarioColecaoPermissionChecker } from "../../domain/authorization";
import { CalendarioColecao } from "../../domain/calendario-colecao";
import type { CalendarioColecaoUpdateCommand } from "../../domain/commands/calendario-colecao-update.command";
import { ICalendarioColecaoUpdateCommandHandler } from "../../domain/commands/calendario-colecao-update.command.handler.interface";
import type { CalendarioColecaoFindOneQuery } from "../../domain/queries/calendario-colecao-find-one.query";
import type { CalendarioColecaoFindOneQueryResult } from "../../domain/queries/calendario-colecao-find-one.query.result";
import { ICalendarioColecaoRepository } from "../../domain/repositories";

@Impl()
export class CalendarioColecaoUpdateCommandHandlerImpl
  implements ICalendarioColecaoUpdateCommandHandler
{
  constructor(
    @Dep(ICalendarioColecaoRepository)
    private readonly repository: ICalendarioColecaoRepository,
    @Dep(ICalendarioColecaoPermissionChecker)
    private readonly permissionChecker: ICalendarioColecaoPermissionChecker,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: CalendarioColecaoFindOneQuery & CalendarioColecaoUpdateCommand,
  ): Promise<CalendarioColecaoFindOneQueryResult> {
    await this.permissionChecker.ensureCanUpdate(accessContext, { dto }, dto.id);

    const domain = await this.repository.loadById(accessContext, dto.id);
    ensureExists(domain, CalendarioColecao.entityName, dto.id);
    ensureActiveEntity(domain, CalendarioColecao.entityName, dto.id);

    domain.update({
      campus: dto.campus,
      nome: dto.nome,
      cor: dto.cor,
      visibilidade: dto.visibilidade,
    });

    await this.repository.save(domain);

    const result = await this.repository.getFindOneQueryResult(accessContext, { id: domain.id });
    ensureExists(result, CalendarioColecao.entityName, domain.id);

    return result;
  }
}

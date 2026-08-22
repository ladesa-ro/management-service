import { ensureActiveEntity, ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { ICalendarioColecaoPermissionChecker } from "../../domain/authorization";
import { CalendarioColecao } from "../../domain/calendario-colecao";
import { ICalendarioColecaoDeleteCommandHandler } from "../../domain/commands/calendario-colecao-delete.command.handler.interface";
import type { CalendarioColecaoFindOneQuery } from "../../domain/queries/calendario-colecao-find-one.query";
import { ICalendarioColecaoRepository } from "../../domain/repositories";

@Impl()
export class CalendarioColecaoDeleteCommandHandlerImpl
  implements ICalendarioColecaoDeleteCommandHandler
{
  constructor(
    @Dep(ICalendarioColecaoRepository)
    private readonly repository: ICalendarioColecaoRepository,
    @Dep(ICalendarioColecaoPermissionChecker)
    private readonly permissionChecker: ICalendarioColecaoPermissionChecker,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: CalendarioColecaoFindOneQuery,
  ): Promise<boolean> {
    await this.permissionChecker.ensureCanDelete(accessContext, { dto }, dto.id);

    const aggregate = await this.repository.loadById(accessContext, dto.id);
    ensureExists(aggregate, CalendarioColecao.entityName, dto.id);
    ensureActiveEntity(aggregate, CalendarioColecao.entityName, dto.id);

    await this.repository.softDeleteById(aggregate.id);

    return true;
  }
}

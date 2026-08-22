import { ensureActiveEntity, ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { ICalendarioColecaoAcessoPermissionChecker } from "../../domain/authorization";
import { CalendarioColecaoAcesso } from "../../domain/calendario-colecao-acesso";
import { ICalendarioColecaoAcessoRevogarCommandHandler } from "../../domain/commands/calendario-colecao-acesso-revogar.command.handler.interface";
import type { CalendarioColecaoAcessoFindOneQuery } from "../../domain/queries/calendario-colecao-acesso-find-one.query";
import { ICalendarioColecaoAcessoRepository } from "../../domain/repositories";

@Impl()
export class CalendarioColecaoAcessoRevogarCommandHandlerImpl
  implements ICalendarioColecaoAcessoRevogarCommandHandler
{
  constructor(
    @Dep(ICalendarioColecaoAcessoRepository)
    private readonly repository: ICalendarioColecaoAcessoRepository,
    @Dep(ICalendarioColecaoAcessoPermissionChecker)
    private readonly permissionChecker: ICalendarioColecaoAcessoPermissionChecker,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: CalendarioColecaoAcessoFindOneQuery,
  ): Promise<boolean> {
    await this.permissionChecker.ensureCanDelete(accessContext, { dto }, dto.id);

    const aggregate = await this.repository.loadById(accessContext, dto.id);
    ensureExists(aggregate, CalendarioColecaoAcesso.entityName, dto.id);
    ensureActiveEntity(aggregate, CalendarioColecaoAcesso.entityName, dto.id);

    await this.repository.softDeleteById(aggregate.id);

    return true;
  }
}
